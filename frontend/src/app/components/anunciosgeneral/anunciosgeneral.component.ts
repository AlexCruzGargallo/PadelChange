import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ModalcreateadvertComponent } from '../modalcreateadvert/modalcreateadvert.component';

@Component({
  selector: 'app-anunciosgeneral',
  templateUrl: './anunciosgeneral.component.html',
  styleUrls: ['./anunciosgeneral.component.css'],
})
export class AnunciosgeneralComponent implements OnInit {
  apiUrl: string = 'http://localhost:4000/api';
  adverts: any;
  advertFiltered: any;
  constructor(private matDialog: MatDialog) {}

  async ngOnInit(): Promise<void> {
    this.adverts = await this.getAllAdvertsData();
    this.advertFiltered = this.adverts.filter(
      (a: any) => a.user_id != localStorage.getItem('userId')
    );
    console.log(this.advertFiltered);
  }

  openModalCreateAd() {
    this.matDialog.open(ModalcreateadvertComponent);
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
