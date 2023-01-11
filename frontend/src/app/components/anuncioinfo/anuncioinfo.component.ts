import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-anuncioinfo',
  templateUrl: './anuncioinfo.component.html',
  styleUrls: ['./anuncioinfo.component.css'],
})
export class AnuncioinfoComponent implements OnInit {
  apiUrl: string = 'http://localhost:4000/api';
  id: string = '';
  advertData: any;

  constructor(private actRoute: ActivatedRoute) {}

  async ngOnInit(): Promise<void> {
    const id = this.actRoute.snapshot.paramMap.get('id');
    if (id) {
      this.id = id;
    }
    this.advertData = await this.getAdvertsData(this.id);
    console.log(this.advertData);
  }

  public async getAdvertsData(id: string): Promise<any> {
    const response = await fetch(`${this.apiUrl}/adverts/${id}`, {
      method: 'GET',
      mode: 'cors',
      cache: 'no-cache',
      credentials: 'same-origin',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const { advert } = await response.json();

    if (!response.ok) {
      return Promise.reject();
    }
    return Promise.resolve(advert);
  }
}
