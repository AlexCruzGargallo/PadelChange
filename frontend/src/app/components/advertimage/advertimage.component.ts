import { Component, Input, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-advertimage',
  templateUrl: './advertimage.component.html',
  styleUrls: ['./advertimage.component.css'],
})
export class AdvertimageComponent implements OnInit {
  apiUrl: string = 'http://localhost:4000/api';
  racketData: any;
  
  @Input() advert: any;

  async ngOnInit(): Promise<void> {
    
    this.racketData = await this.getRacketData(this.advert.sell_item);
    console.log(this.racketData);
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
}
