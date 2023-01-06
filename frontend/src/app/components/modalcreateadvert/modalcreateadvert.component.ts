import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ModalsearchracketComponent } from '../modalsearchracket/modalsearchracket.component';

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

  constructor(private matDialog: MatDialog) {}

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

  onSubmit() {
    let want_items_ids: any[] = [];
    this.want_items.map((wi) => want_items_ids.push(wi._id));

    let payload = {
      user_id: localStorage.getItem('userId'),
      images: '',
      //images: this.images,
      sell_item: this.myRacket._id,
      racket_state: this.stateSelected,
      want_items: want_items_ids,
      accept_offers: this.accept_offers,
      start_date: new Date(),
      final_date: null,
      description: this.description,
      tags: this.tagList,
      location: '',
      tokenPayload: {
        accessToken: localStorage.getItem('token'),
        _id: localStorage.getItem('userId'),
      },
    };
    this.createAdvert(payload);

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

    const { message, payload } = await response.json();
    console.log(response);

    return Promise.reject(payload?.errorMsg || message);
  }
}
