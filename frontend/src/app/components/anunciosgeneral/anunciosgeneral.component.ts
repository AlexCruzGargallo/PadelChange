import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ModalcreateadvertComponent } from '../modalcreateadvert/modalcreateadvert.component';

@Component({
  selector: 'app-anunciosgeneral',
  templateUrl: './anunciosgeneral.component.html',
  styleUrls: ['./anunciosgeneral.component.css'],
})
export class AnunciosgeneralComponent implements OnInit {
  constructor(private matDialog: MatDialog) {}

  ngOnInit(): void {}

  openModalCreateAd() {
    
    this.matDialog.open(ModalcreateadvertComponent);
  }
}
