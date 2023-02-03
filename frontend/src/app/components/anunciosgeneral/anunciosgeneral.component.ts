import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
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
  userData: any;
  constructor(private router: Router, private matDialog: MatDialog) {}

  async ngOnInit(): Promise<void> {
    this.adverts = await this.getAllAdvertsData();
    console.log('FILTRADO:', this.advertFiltered);
    const Userid = localStorage.getItem('userId');
    if (Userid) {
      this.userData = await this.getUserData(Userid);
    }

    if (this.userData && !this.userData.admin) {
      this.advertFiltered = this.adverts.filter(
        (a: any) =>
          a.user_id != localStorage.getItem('userId') && a.final_date == null
      );
    } else {
      this.advertFiltered = this.adverts;
    }

    console.log('FILTRADO:', this.advertFiltered);
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
}
