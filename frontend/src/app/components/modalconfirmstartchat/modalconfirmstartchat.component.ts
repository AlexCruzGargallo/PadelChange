import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';

@Component({
  selector: 'app-modalconfirmstartchat',
  templateUrl: './modalconfirmstartchat.component.html',
  styleUrls: ['./modalconfirmstartchat.component.css'],
})
export class ModalconfirmstartchatComponent implements OnInit {
  apiUrl: string = 'http://localhost:4000/api';
  constructor(
    private _router: Router,
    public dialogRef: MatDialogRef<ModalconfirmstartchatComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  ngOnInit(): void {
    console.log(this.data);
  }

  closeModal() {
    this.dialogRef.close();
  }
  startChat() {
    const id = localStorage.getItem('userId');
    const sellerId = this.data.user_id;
    const advertId = this.data._id;
    const args = { members: [sellerId, id], advert_id: advertId };
    this.start(args);
    this.dialogRef.close();
    this._router.navigate(['/chat']);
  }

  public async start(args: any): Promise<any> {
    const response = await fetch(`${this.apiUrl}/chat/create`, {
      method: 'POST',
      mode: 'cors',
      cache: 'no-cache',
      credentials: 'same-origin',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + localStorage.getItem('token'),
      },
      body: JSON.stringify(args),
    });

    const { message, payload } = await response.json();
    console.log(response);

    return Promise.reject(payload?.errorMsg || message);
  }
}
