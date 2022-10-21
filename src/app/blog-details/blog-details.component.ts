import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BlogService } from 'src/app/_services/blog.service';
import { Blog } from 'src/app/_models/blog.model';
import { UserService } from '../_services/user.service';
import { TokenStorageService } from '../_services/token-storage.service';

@Component({
  selector: 'app-blog-details',
  templateUrl: './blog-details.component.html',
  styleUrls: ['./blog-details.component.css']
})
export class BlogDetailsComponent implements OnInit {

  currentUser: any;
  isLoggedIn = false;
  showBlogPage = false;
  private roles: string[] = [];

  @Input() viewMode = false;

  @Input() currentBlog: Blog = {
    title: '',
    post: '',
    tag: '',
    author: '',
    published: false
  };

  message = '';
  selectedTeam = '';
  constructor(
  private blogService: BlogService,
  private route: ActivatedRoute,
  private router: Router,
  private userService: UserService, 
  private token: TokenStorageService
  ) { }

  ngOnInit(): void {
    this.isLoggedIn = !!this.token.getToken();
    this.currentUser = this.token.getUser();

    if (this.isLoggedIn) {
      const user = this.token.getUser();
      this.roles = user.roles;
      this.showBlogPage = this.roles.includes('ROLE_MODERATOR') ? true : false;
      this.showBlogPage = this.roles.includes('ROLE_ADMIN') ? true : false;
    }
    if (!this.viewMode) {
      this.message = '';
      this.getBlog(this.route.snapshot.params["id"]);
      //this.getBlogFromTag(this.route.snapshot.params["tag"]);
    }
  }

  getBlog(id: string): void {
    this.blogService.get(id)
      .subscribe({
        next: (data) => {
          this.currentBlog = data;
          console.log(data);
        },
        error: (e) => console.error(e)
      });
  }

  onSelected(value:string): void {
		this.selectedTeam = value;
    this.currentBlog.tag = this.selectedTeam;
	}

  updatePublished(status: boolean): void {
    const data = {
      title: this.currentBlog.title,
      post: this.currentBlog.post,
      tag: this.selectedTeam,
      author: this.currentUser.username,
      published: status
    };

    this.message = '';
    console.log(data)
    this.blogService.update(this.currentBlog.id, data)
      .subscribe({
        next: (res) => {
          console.log(res);
          this.currentBlog.published = status;
          this.message = res.message ? res.message : 'The status was updated successfully!';
        },
        error: (e) => console.error(e)
      });
  }

  updateBlog(): void {
    this.message = '';
    console.log(this.currentBlog)
    this.blogService.update(this.currentBlog.id, this.currentBlog)
      .subscribe({
        next: (res) => {
          console.log(res);
          this.message = res.message ? res.message : 'This blog was updated successfully!';
        },
        error: (e) => console.error(e)
      });
  }

  deleteBlog(): void {
    this.blogService.delete(this.currentBlog.id)
      .subscribe({
        next: (res) => {
          console.log(res);
          this.router.navigate(['/blog']);
        },
        error: (e) => console.error(e)
      });
  }

}
