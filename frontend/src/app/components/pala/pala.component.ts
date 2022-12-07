import { Component, OnInit, Input } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-pala',
  templateUrl: './pala.component.html',
  styleUrls: ['./pala.component.css'],
})
export class PalaComponent implements OnInit {
  @Input() data: any;
  imgpath: string = 'assets/imgs/rackets/';
  rating = new FormControl();
  constructor() {}

  ngOnInit(): void {
    this.imgpath = this.imgpath + this.data.img;
    this.rating.setValue(this.data.ovr_rating);
  }
}
