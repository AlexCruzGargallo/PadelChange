import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-modalconfirmfinishadvert',
  templateUrl: './modalconfirmfinishadvert.component.html',
  styleUrls: ['./modalconfirmfinishadvert.component.css'],
})
export class ModalconfirmfinishadvertComponent implements OnInit {
  apiUrl: string = 'http://localhost:4000/api';
  constructor(
    public dialogRef: MatDialogRef<ModalconfirmfinishadvertComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  ngOnInit(): void {
    console.log(this.data);
  }

  closeModal() {
    this.dialogRef.close();
  }
  finishAdvert() {
    this.dialogRef.close();
    this.finish(this.data._id);
  }

  public async finish(id: string): Promise<any> {
    const response = await fetch(
      `${this.apiUrl}/adverts/finish/${id}`,
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

    const { message, payload } = await response.json();
    console.log(response);

    return Promise.reject(payload?.errorMsg || message);
  }
}
