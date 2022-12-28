import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-modalcreateadvert',
  templateUrl: './modalcreateadvert.component.html',
  styleUrls: ['./modalcreateadvert.component.css'],
})
export class ModalcreateadvertComponent implements OnInit {
  want_items: any[] = [];
  form: FormGroup;
  constructor() {
    this.form = new FormGroup({
      username: new FormControl(''),
      racket: new FormControl(''),
    });
  }
  onCheckboxChange() {}
  onSubmit() {
    console.log(this.form.value);
  }
  ngOnInit(): void {}
}
