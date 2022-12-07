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
  public page: number = 0;
  public search: string = '';
  public brands: any[] = [];
  public brandSelected: string = 'Sin filtrar';
  public orderSelected: string = 'No ordenar';

  constructor() {}

  async ngOnInit(): Promise<void> {
    this.racketsData = await this.getAllRacketsData();
    this.brands = [
      ...new Set(this.racketsData.map((item: { brand: any }) => item.brand)),
    ];
    this.brands.sort();
    console.log(this.brands);
  }

  nextPage() {
    this.page += 8;
  }

  prevPage() {
    if (this.page > 0) {
      this.page -= 8;
    }
  }

  onSearchRacket(search: string) {
    this.page = 0;
    this.search = search;
  }
  onSelect() {
    console.log("ssss")
    this.page = 0;
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
