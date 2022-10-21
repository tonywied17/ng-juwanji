import { Component, OnInit } from '@angular/core';
import { UserService } from '../_services/user.service';
import { TokenStorageService } from '../_services/token-storage.service';

@Component({
  selector: 'app-board-moderator',
  templateUrl: './board-moderator.component.html',
  styleUrls: ['./board-moderator.component.css']
})
export class BoardModeratorComponent implements OnInit {
  content?: string;
  currentUser: any;
  isLoggedIn = false;
  showUserFeed = false;
  private roles: string[] = [];

  constructor(private userService: UserService, private token: TokenStorageService,) { }

  ngOnInit(): void {

    this.isLoggedIn = !!this.token.getToken();
    this.currentUser = this.token.getUser();

    if (this.isLoggedIn) {
      const user = this.token.getUser();
      this.roles = user.roles;
      this.showUserFeed = this.roles.includes('ROLE_MODERATOR') ? true : false;
      this.showUserFeed = this.roles.includes('ROLE_ADMIN') ? true : false;
    }

    this.userService.getModeratorBoard().subscribe({
      next: data => {
        this.content = data;
      },
      error: err => {
        this.content = JSON.parse(err.error).message;
      }
    });
  }
}
