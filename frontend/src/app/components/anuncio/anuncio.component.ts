import { Component, Input, OnInit } from '@angular/core';
import { UntypedFormControl } from '@angular/forms';

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

  rating = new UntypedFormControl();

  constructor() {}

  async ngOnInit(): Promise<void> {
    this.userData = await this.getUserData(this.data.user_id);
    this.sellItemData = await this.getRacketData(this.data.sell_item);
    this.rating.setValue(this.userData.overall_rating);

    this.data.want_items.map(async (item: any) => {
      this.wantItemsData.push(await this.getRacketData(item));
    });

    console.log(this.data);
    console.log(this.wantItemsData);
    console.log('jeje', this.userData, this.sellItemData);
    console.log(this.data.location[0].lat);
    console.log(this.data.location[0].lon);
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
