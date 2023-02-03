import { Component, OnInit } from '@angular/core';
import { ChatService } from '../chat/chat.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
  providers: [ChatService],
})
export class NavbarComponent implements OnInit {
  submenu: boolean = false;
  sidemenu: boolean = false;
  apiUrl: string = 'http://localhost:4000/api';
  apiImgUrl: string = 'http://localhost:4000/imgs/';
  userData: any = '';

  constructor(private _chatService: ChatService) {}

  async ngOnInit(): Promise<void> {
    const id = localStorage.getItem('userId');

    if (id) {
      this.userData = await this.getUserData(id);
      console.log(this.apiImgUrl + this.userData.image);
    }

    this.getNumChats();
  }

  numChats$: number = 0;

  getNumChats() {
    this._chatService.getChats().subscribe((result) => {
      this.numChats$ = Number(result);
    });
    return this.numChats$;
  }

  changeSubmenu() {
    this.submenu = !this.submenu;
  }
  changeSidemenu() {
    this.sidemenu = !this.sidemenu;
  }
  isLoggedIn(): boolean {
    if (localStorage.getItem('userId') && localStorage.getItem('token')) {
      return true;
    } else {
      return false;
    }
  }
  logout() {
    localStorage.removeItem('userId');
    localStorage.removeItem('token');
    localStorage.removeItem('userImage');
    localStorage.removeItem('isAdmin');
    window.location.reload();
  }

  getUserImage(): string {
    const imageName = localStorage.getItem('userImage');
    if (imageName) {
      return imageName;
    } else {
      return '';
    }
  }
  getUserId(): string {
    const userId = localStorage.getItem('userId');
    if (userId) {
      return userId;
    } else {
      return '';
    }
  }

  public async getUserData(id: string): Promise<any> {
    const response = await fetch(`${this.apiUrl}/users/${id}`, {
      method: 'GET',
      mode: 'cors',
      cache: 'no-cache',
      credentials: 'same-origin',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const { user } = await response.json();

    if (!response.ok) {
      return Promise.reject();
    }
    return Promise.resolve(user);
  }
}
