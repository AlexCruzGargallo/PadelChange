import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-editprofile',
  templateUrl: './editprofile.component.html',
  styleUrls: ['./editprofile.component.css'],
})
export class EditprofileComponent implements OnInit {
  id: any = '';
  constructor() {}

  ngOnInit(): void {
    if (localStorage.getItem('userId') != null) {
      this.id = localStorage.getItem('userId');
      console.log(this.id);
    }
    if (true) {
    }
  }
}
