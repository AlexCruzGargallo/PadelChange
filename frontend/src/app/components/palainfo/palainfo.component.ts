import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { ModalrateracketComponent } from '../modalrateracket/modalrateracket.component';

@Component({
  selector: 'app-palainfo',
  templateUrl: './palainfo.component.html',
  styleUrls: ['./palainfo.component.css'],
})
export class PalainfoComponent implements OnInit {
  apiUrl: string = 'http://localhost:4000/api';
  racketData: any;
  racketsRatingData: any;
  ratingsLength: number = 0;

  id: string = '';
  imgpath: string = 'assets/imgs/rackets/';
  rating = new FormControl({ disabled: true });

  constructor(private actRoute: ActivatedRoute, private matDialog: MatDialog) {}

  async ngOnInit(): Promise<void> {
    const id = this.actRoute.snapshot.paramMap.get('id');
    if (id) {
      this.id = id;
    }
    this.racketData = await this.getRacketData(this.id);
    this.racketsRatingData = await this.getAllRacketsRatingData(this.id);
    this.ratingsLength = this.racketsRatingData.length;
    this.imgpath = this.imgpath + this.racketData.img;
    this.rating.setValue(this.racketData.ovr_rating);

    console.log(this.racketData);
    console.log(this.racketsRatingData);
    console.log(this.id);
  }

  openModalVote() {
    this.matDialog.open(ModalrateracketComponent, { data: this.racketData });
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

  public async getAllRacketsRatingData(id: string): Promise<any> {
    const response = await fetch(`${this.apiUrl}/racketratings/${id}`, {
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
}
