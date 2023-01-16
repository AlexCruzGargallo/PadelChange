import { Component, Inject, OnInit } from '@angular/core';
import { UntypedFormControl } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-modalrateuser',
  templateUrl: './modalrateuser.component.html',
  styleUrls: ['./modalrateuser.component.css'],
})
export class ModalrateuserComponent implements OnInit {
  apiUrl: string = 'http://localhost:4000/api';
  description = new UntypedFormControl('');
  rating = new UntypedFormControl(0);
  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {}

  ngOnInit(): void {}
  vote() {
    let ratingUser = {
      user_id: this.data._id,
      created_by: localStorage.getItem('userId'),
      comment: this.description.value,
      rating: this.rating.value,
      date: new Date(),
      tokenPayload: {
        accessToken: localStorage.getItem('token'),
        _id: localStorage.getItem('userId'),
      },
    };
    this.sendRating(ratingUser);
    window.location.reload();
    console.log(ratingUser);
  }

  public async sendRating(args: any): Promise<any> {
    const response = await fetch(
      `${this.apiUrl}/userratings/rating/${this.data._id}`,
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
