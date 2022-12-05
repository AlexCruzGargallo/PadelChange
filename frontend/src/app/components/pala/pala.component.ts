import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-pala',
  templateUrl: './pala.component.html',
  styleUrls: ['./pala.component.css'],
})
export class PalaComponent implements OnInit {
  @Input() data: any;

  constructor() {}

  ngOnInit(): void {}
}
