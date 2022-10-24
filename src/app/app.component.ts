import { JsonPipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { TokenStorageService } from './_services/token-storage.service';
import { UserService } from './_services/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  bodyTag = document.body;

  private roles: string[] = [];
  isLoggedIn = false;
  showAdminBoard = false;
  showModeratorBoard = false;
  username?: string;
  titlePage: any;
  opened: boolean = false

  constructor(private tokenStorageService: TokenStorageService, private userService: UserService, ) { }

  ngOnInit(): void {

    this.getTitle();

    this.isLoggedIn = !!this.tokenStorageService.getToken();

    if (this.isLoggedIn) {
      const user = this.tokenStorageService.getUser();
      this.roles = user.roles;

      this.showAdminBoard = this.roles.includes('ROLE_ADMIN');
      this.showModeratorBoard = this.roles.includes('ROLE_MODERATOR');

      this.username = user.username;
    }

    
    
  }

  getTitle(): void {

    this.titlePage = this.userService.pageTitle;

    return this.titlePage;
    
  }


  theme(theme: any) {
    if (theme) {
      this.bodyTag.classList.remove(this.bodyTag.classList.toString())
      this.bodyTag.classList.add("theme-" + theme);
    } else {
      this.bodyTag.classList.remove(this.bodyTag.classList.toString())
      this.bodyTag.classList.add("main");
    }
  }
  
  mainTheme() {
    this.bodyTag.classList.remove(this.bodyTag.classList.toString())
    this.bodyTag.classList.add("main");
  }

  logout(): void {
    this.tokenStorageService.signOut();
    window.location.reload();
  }
}
