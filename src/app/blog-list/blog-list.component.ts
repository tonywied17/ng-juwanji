import { Component, OnInit } from '@angular/core';
import { BlogService } from 'src/app/_services/blog.service';
import { Blog } from 'src/app/_models/blog.model';

@Component({
  selector: 'app-blog-list',
  templateUrl: './blog-list.component.html',
  styleUrls: ['./blog-list.component.css']
})
export class BlogListComponent implements OnInit {

  blog?: Blog[];
  currentBlog: Blog = {};
  currentIndex = -1;
  title = '';

  constructor(private blogService: BlogService) { }

  ngOnInit(): void {
    this.retrieveBlog();
  }

  retrieveBlog(): void {
    this.blogService.getAll()
      .subscribe({
        next: (data) => {
          this.blog = data;
          console.log(data);
        },
        error: (e) => console.error(e)
      });
  }

  refreshList(): void {
    this.retrieveBlog();
    this.currentBlog = {};
    this.currentIndex = -1;
  }

  setActiveBlog(blog: Blog, index: number): void {
    this.currentBlog = blog;
    this.currentIndex = index;
  }

  removeAllBlog(): void {
    this.blogService.deleteAll()
      .subscribe({
        next: (res) => {
          console.log(res);
          this.refreshList();
        },
        error: (e) => console.error(e)
      });
  }

  searchTitle(): void {
    this.currentBlog = {};
    this.currentIndex = -1;

    this.blogService.findByTitle(this.title)
      .subscribe({
        next: (data) => {
          this.blog = data;
          console.log(data);
        },
        error: (e) => console.error(e)
      });
  }

}
