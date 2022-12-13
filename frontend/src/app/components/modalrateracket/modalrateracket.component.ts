import { Component, Inject, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-modalrateracket',
  templateUrl: './modalrateracket.component.html',
  styleUrls: ['./modalrateracket.component.css'],
})
export class ModalrateracketComponent implements OnInit {
  apiUrl: string = 'http://localhost:4000/api';
  description = new FormControl('');
  rating = new FormControl(0);
  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {}

  ngOnInit(): void {
    console.log('hola', this.data);
  }
  vote() {
    let ratingRacket = {
      racket_id: this.data._id,
      created_by: localStorage.getItem('userId'),
      comment: this.description.value,
      rating: this.rating.value,
      date: new Date(),
      tokenPayload: {
        accessToken: localStorage.getItem('token'),
        _id: localStorage.getItem('userId'),
      },
    };
    this.sendRating(ratingRacket);
    window.location.reload();
    console.log(ratingRacket);
  }

  public async sendRating(args: any): Promise<any> {
    const response = await fetch(
      `${this.apiUrl}/racketratings/rating/${this.data._id}`,
      {
        method: 'POST',
        mode: 'cors',
        cache: 'no-cache',
        credentials: 'same-origin',
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + localStorage.getItem('token'),
        },
        body: JSON.stringify(args),
      }
    );

    const { message, payload } = await response.json();
    console.log(response);

    return Promise.reject(payload?.errorMsg || message);
  }
}
