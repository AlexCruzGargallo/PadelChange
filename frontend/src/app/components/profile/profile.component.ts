import { Component, OnInit } from '@angular/core';
import { FormControl, UntypedFormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { ModalpleaseloginComponent } from '../modalpleaselogin/modalpleaselogin.component';
import { ModalrateuserComponent } from '../modalrateuser/modalrateuser.component';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent implements OnInit {
  apiUrl: string = 'http://localhost:4000/api';
  id: string = '';
  user: any;
  userRatings: any;
  ovrRating: number = 0;
  adverts: any;
  advertsResult: any;
  advertsResultFinished: any;
  advertsResultNotFinished: any;
  advertsResultReversed: any;
  rating = new UntypedFormControl({ disabled: true });
  racketData: any;
  constructor(
    private router: Router,
    private actRoute: ActivatedRoute,
    private matDialog: MatDialog
  ) {this.router.routeReuseStrategy.shouldReuseRoute = () => false;}

  async ngOnInit(): Promise<void> {
    const id = this.actRoute.snapshot.paramMap.get('id');
    if (id) {
      this.id = id;
    }
    this.user = await this.getUserData(this.id);
    this.userRatings = await this.getAllUsersRatingData(this.user._id);

    let i = 0;
    this.userRatings.map((rating: any) => {
      i += rating.rating;
    });
    this.userRatings.map(async (rating: any) => {
      console.log(rating.created_by);
      let user: any = await this.getUserData(rating.created_by);
      rating.user = user;
    });
    this.ovrRating = i / this.userRatings.length;
    this.rating.setValue(this.ovrRating | 0);

    this.adverts = await this.getAllAdvertsData();

    this.advertsResult = this.adverts.filter((a: any) => a.user_id == id);
    this.advertsResultReversed = this.advertsResult.reverse();
    this.advertsResultFinished = this.advertsResult.filter(
      (a: any) => a.final_date != null
    );
    this.advertsResultFinished = this.advertsResult.filter(
      (a: any) => a.final_date != null
    );
    this.advertsResultNotFinished = this.advertsResult.filter(
      (a: any) => a.final_date == null
    );

    console.log(this.userRatings);
    console.log(this.ovrRating);
    console.log(this.userRatings);
  }

  itsMe(): boolean {
    if (
      this.actRoute.snapshot.paramMap.get('id') ==
      localStorage.getItem('userId')
    ) {
      return true;
    }
    return false;
  }

  openModalVote() {
    if (this.isLoggedIn()) {
      this.matDialog.open(ModalrateuserComponent, { data: this.user });
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

  navigateTo(id: number) {
    this.router.navigate(['profile/' , id]);
  }
}
