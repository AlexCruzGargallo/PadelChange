import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-petitions',
  templateUrl: './petitions.component.html',
  styleUrls: ['./petitions.component.css'],
})
export class PetitionsComponent {
  apiUrl: string = 'http://localhost:4000/api';
  petitions: any;
  constructor(private router: Router, private actRoute: ActivatedRoute) {}

  async ngOnInit(): Promise<void> {
    if (!localStorage.getItem('isAdmin')) {
      this.router.navigate(['/']);
    }
    this.petitions = await this.getAllPetitionsData();
    this.petitions.map(async (p: any) => {
      p.open = false;
      p.userInfo = await this.getUserData(p.user_id);
    });
  }

  async accept(data: any) {
    const response = await fetch(`${this.apiUrl}/racketPetitions/accept`, {
      method: 'POST',
      mode: 'cors',
      cache: 'no-cache',
      credentials: 'same-origin',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        data,
      }),
    });
    
    const { res } = await response.json();

    if(response.ok){
      window.location.reload();
    }
  }

  async decline(data: any) {
    const response = await fetch(`${this.apiUrl}/racketPetitions/decline`, {
      method: 'POST',
      mode: 'cors',
      cache: 'no-cache',
      credentials: 'same-origin',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        data,
      }),
    });
    const { res } = await response.json();

    if(response.ok){
      window.location.reload();
    }
  }

  public async getAllPetitionsData(): Promise<any> {
    const response = await fetch(`${this.apiUrl}/racketPetitions/`, {
      method: 'GET',
      mode: 'cors',
      cache: 'no-cache',
      credentials: 'same-origin',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const { petitions } = await response.json();

    if (!response.ok) {
      return Promise.reject();
    }
    return Promise.resolve(petitions);
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
