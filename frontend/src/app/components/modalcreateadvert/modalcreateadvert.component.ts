import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ModalsearchracketComponent } from '../modalsearchracket/modalsearchracket.component';
import axios, { isCancel, AxiosError } from 'axios';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-modalcreateadvert',
  templateUrl: './modalcreateadvert.component.html',
  styleUrls: ['./modalcreateadvert.component.css'],
})
export class ModalcreateadvertComponent implements OnInit {
  public stateSelected: string = 'Sin especificar';
  public changeFor: string = 'Palas';
  apiUrl: string = 'http://localhost:4000/api';
  racketsData: any;

  myRacket: any = '';
  want_items: any[] = [];
  accept_offers: boolean = false;
  result: string = '';
  images: any = [];
  tagList: string[] = [];
  description: string = '';
  lat: number = 0;
  lon: number = 0;
  city: any;
  area: any;

  constructor(private matDialog: MatDialog, private _http: HttpClient) {}

  onCheckboxChange() {
    this.accept_offers = !this.accept_offers;
  }
  onChangeDesc(event: any) {
    this.description = event.target.value;
  }
  onSelectState() {
    console.log(this.stateSelected);
  }
  onSelectChangeFor() {
    console.log(this.changeFor);
  }
  onBlurTag(e: any) {
    if (e.target.value) {
      this.tagList.push(e.target.value);
    }
    e.target.value = '';
  }
  removeFromTagList(index: number) {
    this.tagList.splice(index, 1);
  }

  save(event: any): void {
    if (this.images.length < 5) {
      var reader = new FileReader();
      reader.readAsDataURL(event.target.files[0]);
      let image = { file: event.target.files, url: '' };
      reader.onload = async (event: any) => {
        console.log(event.target.result);
        image.url = event.target.result;
      };

      this.images.push(image);
      var selectFile = event.target.files;
      console.log(this.images);
    }
  }

  async onSubmit() {
    let want_items_ids: any[] = [];
    let imagesName: string[] = [];
    this.images.map((i: any) => {
      console.log(i);
      console.log('=>>', i.file[0].name);
      imagesName.push(i.file[0].name);
    });
    this.want_items.map((wi) => want_items_ids.push(wi._id));

    let payload = {
      user_id: localStorage.getItem('userId'),
      images: imagesName,
      //images: this.images,
      sell_item: this.myRacket._id,
      racket_state: this.stateSelected,
      want_items: want_items_ids,
      accept_offers: this.accept_offers,
      start_date: new Date(),
      final_date: null,
      description: this.description,
      tags: this.tagList,
      location: {
        area: this.area,
        city: this.city,
        lat: this.lat,
        lon: this.lon,
      },
      tokenPayload: {
        accessToken: localStorage.getItem('token'),
        _id: localStorage.getItem('userId'),
      },
    };
    let res = await this.createAdvert(payload);
    console.log('AWQUUQWUEQWEQWEQWE', res);
    this.uploadImagesToFolder(res.id);
    console.log(payload);
  }

  openRacketModal() {
    const dialogRef = this.matDialog.open(ModalsearchracketComponent, {
      data: this.racketsData,
    });
    dialogRef.afterClosed().subscribe((result: any) => {
      if (result.racket) {
        if (result.racket._id) {
          console.log(result.racket._id);
          this.myRacket = result.racket;
        }
      }
      console.log('The dialog was closed', result);
    });
  }
  openWantRacketModal() {
    const dialogRef = this.matDialog.open(ModalsearchracketComponent, {
      data: this.racketsData,
    });
    dialogRef.afterClosed().subscribe((result: any) => {
      if (result.racket) {
        if (result.racket._id) {
          console.log(result.racket._id);
          this.want_items.push(result.racket);
        }
      }
    });
  }

  async ngOnInit(): Promise<void> {
    console.log('holaa');
    const pos: any = await new Promise((resolve, reject): any => {
      navigator.geolocation.getCurrentPosition(resolve, reject);
    });

    this.lat = pos.coords.latitude;
    this.lon = pos.coords.longitude;

    const options = {
      method: 'GET',
      url: 'https://trueway-geocoding.p.rapidapi.com/ReverseGeocode',
      params: { location: this.lat + ',' + this.lon, language: 'en' },
      headers: {
        'X-RapidAPI-Key': '6b3bace803msh1c3a2968f9ac789p1c908ajsn4052d05ed24e',
        'X-RapidAPI-Host': 'trueway-geocoding.p.rapidapi.com',
      },
    };
    let cityDetails: any = {};
    let city: any = await axios
      .request(options)
      .then((response) => {
        cityDetails = response.data.results[0];
        console.log(response.data);
      })
      .catch(function (error) {
        console.error(error);
      });
    if (cityDetails.locality && cityDetails.area) {
      this.city = cityDetails.locality;
      this.area = cityDetails.area;
    }
    this.racketsData = await this.getAllRacketsData();
  }

  public async getAllRacketsData(): Promise<any> {
    const response = await fetch(`${this.apiUrl}/rackets/`, {
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

  public async createAdvert(args: any): Promise<any> {
    const response = await fetch(`${this.apiUrl}/adverts/advert`, {
      method: 'POST',
      mode: 'cors',
      cache: 'no-cache',
      credentials: 'same-origin',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + localStorage.getItem('token'),
      },
      body: JSON.stringify(args),
    });

    const res = await response.json();
    console.log(res);
    if (!response.ok) {
      return Promise.reject();
    }
    return Promise.resolve(res);
  }

  dataURItoBlob(dataURI: any) {
    console.log('LLEGA', dataURI);
    let array = dataURI.split(',');
    let data = array[1];
    const byteString = atob(data);
    const arrayBuffer = new ArrayBuffer(byteString.length);
    const int8Array = new Uint8Array(arrayBuffer);
    for (let i = 0; i < byteString.length; i++) {
      int8Array[i] = byteString.charCodeAt(i);
    }
    const blob = new Blob([int8Array], { type: 'image/png' });
    return blob;
  }

  uploadImagesToFolder(id: string) {
    this.images.map((image: any) => {
      let fileName = '';

      const urla = image.url;
      console.log('IMAGENNNNN', urla);
      const imageBlob = this.dataURItoBlob(urla);
      const imageFile = new File([imageBlob], image.file[0].name, {
        type: 'image/png',
      });
      console.log('aaa', imageFile);
      const fd = new FormData();
      if (!imageFile) {
        console.log(imageFile);
        return;
      }
      fd.append('file', imageFile);

      let url = `${this.apiUrl}/adverts/upload`;

      if (imageFile) {
        fileName = imageFile.name;
        const formData = new FormData();
        formData.append('thumbnail', imageFile);
        const upload$ = this._http.post(
          `${this.apiUrl}/adverts/upload/${id}`,
          formData
        );
        upload$.subscribe();
      }
    });
  }
}
