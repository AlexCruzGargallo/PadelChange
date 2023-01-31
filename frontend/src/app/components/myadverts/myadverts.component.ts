import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-myadverts',
  templateUrl: './myadverts.component.html',
  styleUrls: ['./myadverts.component.css'],
})
export class MyadvertsComponent implements OnInit {
  apiUrl: string = 'http://localhost:4000/api';
  adverts: any;
  advertFiltered: any;
  id: any = '';
  constructor(private _router: Router) {}

  async ngOnInit(): Promise<void> {
    this.checkLoggedIn();
    this.adverts = await this.getAllAdvertsData();
    this.advertFiltered = this.adverts.filter(
      (a: any) => a.user_id == localStorage.getItem('userId')
    );
    console.log(this.advertFiltered);
  }

  checkLoggedIn() {
    const user = localStorage.getItem('userId');
    const token = localStorage.getItem('token');
    if (user && token) {
      this.id = localStorage.getItem('userId');
      console.log(this.id);
    } else {
      this._router.navigate(['/']);
    }
  }

  public async getAllAdvertsData(): Promise<any> {
    const response = await fetch(`${this.apiUrl}/adverts/`, {
      method: 'GET',
      mode: 'cors',
      cache: 'no-cache',
      credentials: 'same-origin',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const { adverts } = await response.json();

    if (!response.ok) {
      return Promise.reject();
    }
    return Promise.resolve(adverts);
  }
}
