import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';

@Component({
  selector: 'app-modalconfirmdeleteadvert',
  templateUrl: './modalconfirmdeleteadvert.component.html',
  styleUrls: ['./modalconfirmdeleteadvert.component.css'],
})
export class ModalconfirmdeleteadvertComponent implements OnInit {
  apiUrl: string = 'http://localhost:4000/api';
  constructor(
    private router: Router,
    public dialogRef: MatDialogRef<ModalconfirmdeleteadvertComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  ngOnInit(): void {
    console.log(this.data);
  }

  closeModal() {
    this.dialogRef.close();
  }
  deleteAdvert() {
    this.dialogRef.close();
    this.delete(this.data._id);
    this.router.navigate(['/adverts']);
  }

  public async delete(id: string): Promise<any> {
    const response = await fetch(`${this.apiUrl}/adverts/delete/${id}`, {
      method: 'DELETE',
      mode: 'cors',
      cache: 'no-cache',
      credentials: 'same-origin',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + localStorage.getItem('token'),
      },
    });

    const { message, payload } = await response.json();
    console.log(response);

    return Promise.reject(payload?.errorMsg || message);
  }
}
