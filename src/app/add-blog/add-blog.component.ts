import { Component, OnInit } from '@angular/core';
import { Blog } from 'src/app/_models/blog.model';
import { BlogService } from 'src/app/_services/blog.service';
import { UserService } from '../_services/user.service';
import { TokenStorageService } from '../_services/token-storage.service';

@Component({
  selector: 'app-add-blog',
  templateUrl: './add-blog.component.html',
  styleUrls: ['./add-blog.component.scss']
})


export class AddBlogComponent implements OnInit {

  currentUser: any;
  isLoggedIn = false;
  showBlogPage = false;
  private roles: string[] = [];

  selectedTeam = '';


  blog: Blog = {
    title: '',
    post: '',
    tag: '',
    author: '',
    published: false
  };

  submitted = false;



  constructor(private userService: UserService, private token: TokenStorageService, private blogService: BlogService) { }

  ngOnInit(): void {
    this.isLoggedIn = !!this.token.getToken();
    this.currentUser = this.token.getUser();

    if (this.isLoggedIn) {
      const user = this.token.getUser();
      this.roles = user.roles;
      this.showBlogPage = this.roles.includes('ROLE_MODERATOR') ? true : false;
      this.showBlogPage = this.roles.includes('ROLE_ADMIN') ? true : false;
    }
  }


  onSelected(value:string): void {
		this.selectedTeam = value;
	}

  saveBlog(): void {
    const data = {
      title: this.blog.title,
      post: this.blog.post,
      tag: this.selectedTeam,
      author: this.currentUser.username,
    };

    console.log(data)

    this.blogService.create(data)
      .subscribe({
        next: (res) => {
          console.log(res);
          this.submitted = true;
        },
        error: (e) => console.error(e)
      });
  }

  newBlog(): void {
    this.submitted = false;
    this.blog = {
      title: '',
      post: '',
      author: '',
      published: false
    };
  }

}
