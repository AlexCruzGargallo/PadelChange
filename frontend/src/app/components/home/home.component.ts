import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  apiUrl: string = 'http://localhost:4000/api';
  adverts: any;
  rackets: any;

  constructor() {}

  async ngOnInit(): Promise<void> {
    this.adverts = await this.getAllAdvertsData();
    this.adverts = this.adverts.reverse();

    this.rackets = await this.getMostViewedRackets();
    console.log(this.rackets);
    console.log(this.adverts);
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

  public async getMostViewedRackets(): Promise<any> {
    const response = await fetch(`${this.apiUrl}/rackets/byViews/`, {
      method: 'GET',
      mode: 'cors',
      cache: 'no-cache',
      credentials: 'same-origin',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const { rackets } = await response.json();

    if (!response.ok) {
      return Promise.reject();
    }
    return Promise.resolve(rackets);
  }
}
