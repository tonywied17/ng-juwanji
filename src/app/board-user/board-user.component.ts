import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BlogService } from 'src/app/_services/blog.service';
import { Blog } from 'src/app/_models/blog.model';
import { UserService } from '../_services/user.service';
import { TokenStorageService } from '../_services/token-storage.service';

@Component({
  selector: 'app-board-user',
  templateUrl: './board-user.component.html',
  styleUrls: ['./board-user.component.css']
})
export class BoardUserComponent implements OnInit {
  content?: string;
  currentUser: any;
  isLoggedIn = false;
  Blogs: any;
  showAdminControls = false;
  private roles: string[] = [];

  message = '';

  constructor(
    private userService: UserService, 
    private token: TokenStorageService, 
    private blogService: BlogService, 
    ) { }

  ngOnInit(): void {
    this.isLoggedIn = !!this.token.getToken();
    this.currentUser = this.token.getUser();

    if (this.isLoggedIn) {
      const user = this.token.getUser();
      this.roles = user.roles;
      this.showAdminControls = this.roles.includes('ROLE_ADMIN');
    }


    this.userService.getUserBoard().subscribe({
      next: data => {
        this.content = data;
      },
      error: err => {
        this.content = JSON.parse(err.error).message;
      }
    });

    this.getBlog();
  }

  getBlog(): void {
    this.blogService.getAll()
      .subscribe({
        next: (data) => {
          this.Blogs = data;
          console.log(data);
        },
        error: (e) => console.error(e)
      });
  }

  getBlogFromTag(tag: string): void {
    console.log(tag)
    this.blogService.getByTag(tag)
      .subscribe({
        next: (data) => {
          this.Blogs = data;
          console.log(data);
        },
        error: (e) => console.error(e)
      });
  }

}
