import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  apiUrl: string = 'http://localhost:4000/api';
  hide = true;

  email = new FormControl('');
  password = new FormControl('');

  form = new FormGroup({
    email: this.email,
    password: this.password,
  });

  constructor(private _router: Router) {}

  ngOnInit(): void {}

  onClick() {
    if (this.form.valid) {
      this.login(this.form.value).then(
        (res) => {
          this._router.navigate(['']);
        },
        (err) => {
          //this.errorMsg = err;
        }
      );
    }
  }

  public async login(args: any): Promise<any> {
    const response = await fetch(`${this.apiUrl}/users/login`, {
      method: 'POST',
      mode: 'cors',
      cache: 'no-cache',
      credentials: 'same-origin',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(args),
    });

    const { message, payload } = await response.json();
    console.log(payload);
    if (response.ok) {
      if (payload?.accessToken) {
        localStorage.setItem('token', payload.accessToken);
        localStorage.setItem('userId', payload.user._id);
        return Promise.resolve(message);
      }
    }

    return Promise.reject(payload?.errorMsg || message);
  }
}
