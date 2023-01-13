import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-anuncioinfo',
  templateUrl: './anuncioinfo.component.html',
  styleUrls: ['./anuncioinfo.component.css'],
})
export class AnuncioinfoComponent implements OnInit {
  apiUrl: string = 'http://localhost:4000/api';
  id: string = '';
  user: any;
  advertData: any;
  km: number = 0;
  lon: number = 0;
  lat: number = 0;
  sell_item: any;
  rating: FormControl = new FormControl();
  imgCollection: Array<Object> = [];

  constructor(private actRoute: ActivatedRoute) {}

  async ngOnInit(): Promise<void> {
    const id = this.actRoute.snapshot.paramMap.get('id');
    if (id) {
      this.id = id;
    }
    this.advertData = await this.getAdvertsData(this.id);
    this.user = await this.getUserData(this.advertData.user_id);
    this.lat = this.advertData.location[0].lat;
    this.lon = this.advertData.location[0].lon;
    this.rating.setValue(5);
    this.sell_item = await this.getRacketData(this.advertData.sell_item);
    this.advertData.images.map((image: string) => {
      const i = {
        image:
          'http://localhost:4000/adverts/' + this.advertData._id + '/' + image,
        thumbImage:
          'http://localhost:4000/adverts/' + this.advertData._id + '/' + image,
        title: image,
        alt: image,
      };
      console.log('IIIIII: ', i);
      this.imgCollection.push(i);
    });
    console.log(this.imgCollection);
    this.km = this.calcCrow(this.lat, this.lon, 41.385063, 2.173404);
  }

  public async getAdvertsData(id: string): Promise<any> {
    const response = await fetch(`${this.apiUrl}/adverts/${id}`, {
      method: 'GET',
      mode: 'cors',
      cache: 'no-cache',
      credentials: 'same-origin',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const { advert } = await response.json();

    if (!response.ok) {
      return Promise.reject();
    }
    return Promise.resolve(advert);
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
