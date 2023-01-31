import { Component, OnInit } from '@angular/core';
import { UntypedFormControl } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { ModalrateracketComponent } from '../modalrateracket/modalrateracket.component';
import { ModalpleaseloginComponent } from '../modalpleaselogin/modalpleaselogin.component';

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
  ovrRating: number = 0;
  id: string = '';
  imgpath: string = 'assets/imgs/rackets/';
  rating = new UntypedFormControl({ disabled: true });

  constructor(private actRoute: ActivatedRoute, private matDialog: MatDialog) {}

  async ngOnInit(): Promise<void> {
    const id = this.actRoute.snapshot.paramMap.get('id');
    if (id) {
      this.id = id;
    }
    this.racketData = await this.getRacketData(this.id);
    console.log(this.racketData);
    console.log('aa', this.racketData._id);
    let racket = await this.addViewRacket(this.racketData._id);
    console.log('aa', racket);
    this.racketsRatingData = await this.getAllRacketsRatingData(this.id);
    this.ratingsLength = this.racketsRatingData.length;
    this.imgpath = this.imgpath + this.racketData.img;
    this.rating.setValue(this.racketData.ovr_rating);

    console.log(this.racketData);
    console.log(this.racketsRatingData);
    let i = 0;
    this.racketsRatingData.map((rating: any) => {
      i += rating.rating;
    });
    this.racketsRatingData.map(async (rating: any) => {
      console.log(rating.created_by);
      let user: any = await this.getUserData(rating.created_by);
      rating.user = user;
    });

    console.log(this.racketsRatingData);
    this.ovrRating = i / this.racketsRatingData.length;
    console.log(this.ovrRating | 0);
    this.rating.setValue(this.ovrRating | 0);
  }

  openModalVote() {
    if (this.isLoggedIn()) {
      this.matDialog.open(ModalrateracketComponent, { data: this.racketData });
    } else {
      this.matDialog.open(ModalpleaseloginComponent);
    }
  }

  isLoggedIn(): boolean {
    if (localStorage.getItem('userId') && localStorage.getItem('token')) {
      return true;
    } else {
      return false;
    }
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

  public async addViewRacket(id: string): Promise<any> {
    const response: Response = await fetch(
      `${this.apiUrl}/rackets/addView/${id}`,
      {
        method: 'PUT',
        mode: 'cors',
        cache: 'no-cache',
        credentials: 'same-origin',
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + localStorage.getItem('token'),
        },
      }
    );

    if (!response.ok) {
      return Promise.reject();
    }
    return Promise.resolve();
  }
}
