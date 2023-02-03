import { Component, Input, OnInit } from '@angular/core';
import { UntypedFormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-anuncio',
  templateUrl: './anuncio.component.html',
  styleUrls: ['./anuncio.component.css'],
})
export class AnuncioComponent implements OnInit {
  @Input() data: any;
  apiUrl: string = 'http://localhost:4000/api';
  apiImgUrl: string = 'http://localhost:4000/imgs/';
  userData: any;
  sellItemData: any;
  wantItemsData: any = [];
  km: number = 0;
  lon: number = 0;
  lat: number = 0;
  userRatings: any;
  ovrRating: number = 0;

  ratingadvert = new UntypedFormControl({ disabled: true });

  constructor(private actRoute: ActivatedRoute) {}

  async ngOnInit(): Promise<void> {
    this.userData = await this.getUserData(this.data.user_id);

    this.userRatings = await this.getAllUsersRatingData(this.userData._id);

    let x = 0;
    this.userRatings.map((rating: any) => {
      x += rating.rating;
    });
    this.userRatings.map(async (rating: any) => {
      console.log(rating.created_by);
      let user: any = await this.getUserData(rating.created_by);
      rating.user = user;
    });
    this.ovrRating = x / this.userRatings.length; 

    this.ratingadvert.setValue(this.ovrRating | 0);

    console.log('epaa', this.ovrRating, this.ratingadvert);

    this.sellItemData = await this.getRacketData(this.data.sell_item);
    this.data.want_items.map(async (item: any) => {
      this.wantItemsData.push(await this.getRacketData(item));
    });

    this.lat = this.data.location[0].lat;
    this.lon = this.data.location[0].lon;

    console.log(41.385063);
    console.log(2.173404);
    this.km = this.calcCrow(this.lat, this.lon, 41.385063, 2.173404);
    console.log(this.km);
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

  public async getRacketData(id: string): Promise<any> {
    const response = await fetch(`${this.apiUrl}/rackets/${id}`, {
      method: 'GET',
      mode: 'cors',
      cache: 'no-cache',
      credentials: 'same-origin',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const { racket } = await response.json();

    if (!response.ok) {
      return Promise.reject();
    }
    return Promise.resolve(racket);
  }

  public async getAllUsersRatingData(id: string): Promise<any> {
    const response = await fetch(`${this.apiUrl}/userratings/${id}`, {
      method: 'GET',
      mode: 'cors',
      cache: 'no-cache',
      credentials: 'same-origin',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const { racketRatings } = await response.json();

    if (!response.ok) {
      return Promise.reject();
    }
    return Promise.resolve(racketRatings);
  }

  calcCrow(lat1: number, lon1: number, lat2: number, lon2: number): number {
    var R = 6371; // km
    var dLat = this.toRad(lat2 - lat1);
    var dLon = this.toRad(lon2 - lon1);
    var lat1 = this.toRad(lat1);
    var lat2 = this.toRad(lat2);

    var a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.sin(dLon / 2) * Math.sin(dLon / 2) * Math.cos(lat1) * Math.cos(lat2);
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    var d = R * c;
    return Math.trunc(d);
  }

  // Converts numeric degrees to radians
  toRad(Value: number): number {
    return (Value * Math.PI) / 180;
  }
}
