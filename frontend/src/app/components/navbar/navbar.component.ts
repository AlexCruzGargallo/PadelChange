import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
  submenu: boolean = false;

  constructor() {}

  ngOnInit(): void {}

  changeSubmenu() {
    this.submenu = !this.submenu;
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
  }
}
