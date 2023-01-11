import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-modalsearchracket',
  templateUrl: './modalsearchracket.component.html',
  styleUrls: ['./modalsearchracket.component.css'],
})
export class ModalsearchracketComponent implements OnInit {
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef: MatDialogRef<ModalsearchracketComponent>
  ) {}
  search: string = '';

  ngOnInit(): void {
    console.log('aaa:', this.data);
  }
  onSearchRacket(search: string) {
    this.search = search;
  }
  onClickRacketDiv(racket: any) {
    this.dialogRef.close({ racket });
    console.log(racket);
  }
}
