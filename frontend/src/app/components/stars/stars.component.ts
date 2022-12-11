import { Component, Input, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-stars',
  templateUrl: './stars.component.html',
  styleUrls: ['./stars.component.css'],
})
export class StarsComponent implements OnInit {
  @Input() data: any;
  rating = new FormControl({ disabled: true });
  constructor() {}

  ngOnInit(): void {
    this.rating.setValue(this.data);
  }
}
