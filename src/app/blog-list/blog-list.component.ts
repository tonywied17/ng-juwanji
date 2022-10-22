import { Component, OnInit } from '@angular/core';
import { BlogService } from 'src/app/_services/blog.service';
import { Blog } from 'src/app/_models/blog.model';
import { UserService } from '../_services/user.service';
import { TokenStorageService } from '../_services/token-storage.service';

@Component({
  selector: 'app-blog-list',
  templateUrl: './blog-list.component.html',
  styleUrls: ['./blog-list.component.scss']
})
export class BlogListComponent implements OnInit {

  blog?: Blog[];
  currentBlog: Blog = {};
  currentIndex = -1;
  title = '';
  currentUser: any;
  isLoggedIn = false;
  showBlogPage = false;
  private roles: string[] = [];

  constructor(
    private blogService: BlogService,
    private userService: UserService, 
    private token: TokenStorageService,
    ) { }

  ngOnInit(): void {
    this.retrieveBlog();

    this.isLoggedIn = !!this.token.getToken();
    this.currentUser = this.token.getUser();

    if (this.isLoggedIn) {
      const user = this.token.getUser();
      this.roles = user.roles;
      this.showBlogPage = this.roles.includes('ROLE_MODERATOR') ? true : false;
      this.showBlogPage = this.roles.includes('ROLE_ADMIN') ? true : false;
    }
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
