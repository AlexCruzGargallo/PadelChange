import { Component, OnInit } from '@angular/core';
import {
  UntypedFormGroup,
  ValidatorFn,
  UntypedFormControl,
  Validators,
  ValidationErrors,
  AbstractControl,
} from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  apiUrl: string = 'http://localhost:4000/api';
  regexName: RegExp = /^[a-z À-ÿ\u00f1\u00d1,.'-]+$/i;
  regexlastName: RegExp = /^[a-z À-ÿ\u00f1\u00d1,.'-]+$/i;
  regexPassword: RegExp = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;

  name = new UntypedFormControl('', [
    Validators.required,
    Validators.minLength(2),
    Validators.maxLength(60),
    Validators.pattern(this.regexName),
  ]);
  email = new UntypedFormControl('', [Validators.required, Validators.email]);
  password = new UntypedFormControl('', [
    Validators.required,
    Validators.minLength(8),
    Validators.pattern(this.regexPassword),
  ]);
  confirmPassword = new UntypedFormControl('', [
    Validators.required,
    Validators.minLength(8),
    this.confirmPasswordValidator(),
  ]);

  //Creating Formgroup for register
  form = new UntypedFormGroup({
    name: this.name,
    email: this.email,
    password: this.password,
    confirmPassword: this.confirmPassword,
  });
  errorMsg: string = '';

  constructor(private _router: Router) {}

  ngOnInit(): void {}

  submit(): void {
    if (this.form.valid) {
      this.register(this.form.value).then(
        (res) => {
          this._router.navigate(['']);
        },
        (err) => {
          this.errorMsg = err;
        }
      );
    }
  }

  public async register(args: any): Promise<any> {
    const response = await fetch(`${this.apiUrl}/users/register`, {
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
    if (response.ok) {
      if (payload?.accessToken) {
        localStorage.setItem('token', payload.accessToken);
        localStorage.setItem('userId', payload.user._id);
        return Promise.resolve(message);
      }
    }

    return Promise.reject(payload?.errorMsg || message);
  }

  getNameErrorMessage(): string {
    let msg: string = '';
    if (this.name.hasError('required')) {
      msg = 'Debes introducir un nombre';
    } else if (this.name.hasError('minlength')) {
      msg = 'El nombre tiene menos de 2 caracteres.';
    } else if (this.name.hasError('maxlength')) {
      msg = 'El nombre tiene mas de 60 caracteres.';
    } else if (this.name.hasError('pattern')) {
      msg = 'El nombre debe contener solo letras.';
    }
    return msg;
  }

  getEmailErrorMessage(): string {
    let msg: string = '';
    if (this.email.hasError('required')) {
      msg = 'Debes introducir un correo';
    } else if (this.email.hasError('email')) {
      msg = 'La dirección de correo no es válida';
    }

    return msg;
  }

  getPasswordErrorMessage(): string {
    let msg: string = '';
    if (this.password.hasError('required')) {
      msg = 'Debes introducir una contraseña.';
    } else if (this.password.hasError('minlength')) {
      msg = 'La contraseña debe tener al menos 8 caracteres.';
    } else if (this.password.hasError('pattern')) {
      msg =
        'La contraseña debe tener una letra mayuscula, una letra minuscula y un número.';
    }

    return msg;
  }

  getConfirmPasswordErrorMessage(): string {
    let msg: string = '';
    if (this.confirmPassword.hasError('required')) {
      msg = 'Debes confirmar la contraseña.';
    } else if (this.confirmPassword.hasError('minlength')) {
      msg = 'La contraseña debe tener al menos 8 caracteres.';
    } else if (this.confirmPassword.hasError('passwordConfirm')) {
      msg = 'Las contraseñas no son iguales.';
    }
    return msg;
  }

  confirmPasswordValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      if (this.confirmPassword && this.password) {
        if (this.confirmPassword.value != this.password.value) {
          return { passwordConfirm: true };
        } else {
          return null;
        }
      } else {
        return null;
      }
    };
  }
}
