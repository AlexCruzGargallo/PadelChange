import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ModalsearchracketComponent } from '../modalsearchracket/modalsearchracket.component';

@Component({
  selector: 'app-modalcreateadvert',
  templateUrl: './modalcreateadvert.component.html',
  styleUrls: ['./modalcreateadvert.component.css'],
})
export class ModalcreateadvertComponent implements OnInit {
  myRacket: any = '';
  apiUrl: string = 'http://localhost:4000/api';
  racketsData: any;
  want_items: any[] = [];
  public stateSelected: string = 'Sin especificar';
  public changeFor: string = 'Palas';

  form: FormGroup;
  constructor(private matDialog: MatDialog) {
    this.form = new FormGroup({
      username: new FormControl(''),
      racket: new FormControl(''),
    });
  }
  onCheckboxChange() {}
  onSubmit() {
    console.log(this.form.value);
  }
  onSelectState() {
    console.log(this.stateSelected);
  }
  onSelectChangeFor() {
    console.log(this.changeFor);
  }
  openRacketModal() {
    const dialogRef = this.matDialog.open(ModalsearchracketComponent, {
      data: this.racketsData,
    });
    dialogRef.afterClosed().subscribe((result: any) => {
      if (result.racket) {
        if (result.racket._id) {
          console.log(result.racket._id);
          this.myRacket = result.racket;
        }
      }
      console.log('The dialog was closed', result);
    });
  }
  openWantRacketModal() {
    const dialogRef = this.matDialog.open(ModalsearchracketComponent, {
      data: this.racketsData,
    });
    dialogRef.afterClosed().subscribe((result: any) => {
      if (result.racket) {
        if (result.racket._id) {
          console.log(result.racket._id);
          this.want_items.push(result.racket);
        }
      }
    });
  }
  async ngOnInit(): Promise<void> {
    this.racketsData = await this.getAllRacketsData();
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
