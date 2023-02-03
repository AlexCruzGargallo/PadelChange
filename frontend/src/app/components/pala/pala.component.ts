import { Component, OnInit, Input } from '@angular/core';
import { UntypedFormControl } from '@angular/forms';

@Component({
  selector: 'app-pala',
  templateUrl: './pala.component.html',
  styleUrls: ['./pala.component.css'],
})
export class PalaComponent implements OnInit {
  @Input() data: any;
  imgpath: string = 'http://localhost:4000/rackets/';
  rating = new UntypedFormControl();

  constructor() {}

  ngOnInit(): void {
    this.imgpath = this.imgpath + this.data.img;
    this.rating.setValue(this.data.ovr_rating);
  }
}
