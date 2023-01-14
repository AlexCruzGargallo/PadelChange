import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent implements OnInit {
  apiUrl: string = 'http://localhost:4000/api';
  id: string = '';
  user: any;
  adverts: any;
  advertsResult: any;
  advertsResultFinished: any;
  advertsResultNotFinished: any;
  constructor(private actRoute: ActivatedRoute) {}

  async ngOnInit(): Promise<void> {
    const id = this.actRoute.snapshot.paramMap.get('id');
    if (id) {
      this.id = id;
    }
    this.user = await this.getUserData(this.id);
    this.adverts = await this.getAllAdvertsData();
    this.advertsResult = this.adverts.filter((a: any) => a.user_id == id);
    this.advertsResultFinished = this.advertsResult.filter(
      (a: any) => a.final_date != null
    );
    this.advertsResultFinished = this.advertsResult.filter(
      (a: any) => a.final_date != null
    );
    this.advertsResultNotFinished = this.advertsResult.filter(
      (a: any) => a.final_date == null
    );
    console.log(this.advertsResult);
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
