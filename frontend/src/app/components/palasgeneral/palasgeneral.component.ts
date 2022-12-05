import { Component, OnInit } from '@angular/core';
import { PalaComponent } from '../pala/pala.component';

@Component({
  selector: 'app-palasgeneral',
  templateUrl: './palasgeneral.component.html',
  styleUrls: ['./palasgeneral.component.css'],
})
export class PalasgeneralComponent implements OnInit {
  apiUrl: string = 'http://localhost:4000/api';
  racketsData: any;
  constructor() {}

  async ngOnInit(): Promise<void> {
    this.racketsData = await this.getAllRacketsData();
    console.log(this.apiUrl);
    console.log(this.racketsData);
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
}
