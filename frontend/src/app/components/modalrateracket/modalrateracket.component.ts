import { Component, Inject, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-modalrateracket',
  templateUrl: './modalrateracket.component.html',
  styleUrls: ['./modalrateracket.component.css'],
})
export class ModalrateracketComponent implements OnInit {
  description = new FormControl('');
  rating = new FormControl(2);
  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {}

  ngOnInit(): void {
    console.log('hola', this.data);
  }
  vote() {}
}
