import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import {
  UntypedFormControl,
  Validators,
  UntypedFormGroup,
  AbstractControl,
  ValidationErrors,
  ValidatorFn,
} from '@angular/forms';
import { Router } from '@angular/router';
import { ImageCroppedEvent } from 'ngx-image-cropper';
import { ImageCropperComponent } from 'ngx-image-cropper';

@Component({
  selector: 'app-editprofile',
  templateUrl: './editprofile.component.html',
  styleUrls: ['./editprofile.component.css'],
})
export class EditprofileComponent implements OnInit {
  imageName: string = '';
  id: any = '';
  imgChangeEvt: any = '';
  croppedImage: any = '';
  userData: any = '';
  imgPath: string = '';
  errorFileMsg: string = '';

  apiUrl: string = 'http://localhost:4000/api';
  regexName: RegExp = /^[a-z À-ÿ\u00f1\u00d1,.'-]+$/i;
  regexlastName: RegExp = /^[a-z À-ÿ\u00f1\u00d1,.'-]+$/i;
  regexPassword: RegExp = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;

  imgpath = new UntypedFormControl('');
  name = new UntypedFormControl('', [
    Validators.required,
    Validators.minLength(2),
    Validators.maxLength(60),
    Validators.pattern(this.regexName),
  ]);
  email = new UntypedFormControl('', [Validators.required, Validators.email]);

  //Creating Formgroup for register
  form = new UntypedFormGroup({
    name: this.name,
    email: this.email,
  });
  errorMsg: string = '';

  constructor(private _router: Router, private _http: HttpClient) {}

  async ngOnInit(): Promise<void> {
    this.checkLoggedIn();
    const id = localStorage.getItem('userId');
    if (id) {
      this.userData = await this.getUserData(id);
    }
    console.log(this.userData);
    if (this.userData) {
      this.name.setValue(this.userData.name);
      this.email.setValue(this.userData.email);
      this.imgPath = 'http://localhost:4000/imgs/' + this.userData.image;
    }
    console.log(this.imageName);
    console.log(this.imgPath);
  }

  checkLoggedIn() {
    const user = localStorage.getItem('userId');
    const token = localStorage.getItem('token');
    if (user && token) {
      this.id = localStorage.getItem('userId');
      console.log(this.id);
    } else {
      this._router.navigate(['/login']);
    }
  }

  submit(): void {
    if (this.form.valid) {
      this.editUserData();
      window.location.reload();
    }
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

  imgLoad() {}
  initCropper() {}
  imageCropped(event: ImageCroppedEvent) {
    this.croppedImage = event.base64;
    console.log('CROPPED', this.croppedImage);
  }
  imgFailed() {
    alert('Image failed to show');
  }

  onFileChange(event: any) {
    this.imgChangeEvt = event;
    this.imageName = event.target.files[0].name;
    this.errorFileMsg = '';
    console.log(event.target.files[0].name);
    console.log(this.imageName);
  }

  async onSaveImage() {
    if (this.croppedImage) {
      //let image_file = this.dataToFile(this.croppedImage);

      let fileName = '';
      const imageBlob = this.dataURItoBlob(this.croppedImage);
      const imageFile = new File([imageBlob], this.imageName, {
        type: 'image/png',
      });
      console.log('aaa', imageFile);
      const fd = new FormData();
      if (!imageFile) {
        console.log(imageFile);
        return;
      }
      fd.append('file', imageFile);

      let url = `${this.apiUrl}/users/upload`;

      if (imageFile) {
        fileName = imageFile.name;
        const formData = new FormData();
        formData.append('thumbnail', imageFile);
        const upload$ = this._http.post(
          `${this.apiUrl}/users/upload`,
          formData
        );
        upload$.subscribe();
        localStorage.setItem('userImage', imageFile.name);
      }
    } else {
      this.errorFileMsg = 'No hay ningun fichero seleccionado';
    }
  }

  dataURItoBlob(dataURI: any) {
    let array = dataURI.split(',');
    let data = array[1];
    const byteString = atob(data);
    const arrayBuffer = new ArrayBuffer(byteString.length);
    const int8Array = new Uint8Array(arrayBuffer);
    for (let i = 0; i < byteString.length; i++) {
      int8Array[i] = byteString.charCodeAt(i);
    }
    const blob = new Blob([int8Array], { type: 'image/png' });
    return blob;
  }

  public async getUserData(id: string): Promise<any> {
    const response = await fetch(`${this.apiUrl}/users/${id}`, {
      method: 'GET',
      mode: 'cors',
      cache: 'no-cache',
      credentials: 'same-origin',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const { user } = await response.json();

    if (!response.ok) {
      return Promise.reject();
    }
    return Promise.resolve(user);
  }

  public async editUserData(): Promise<any> {
    const response: Response = await fetch(`${this.apiUrl}/users/`, {
      method: 'PUT',
      mode: 'cors',
      cache: 'no-cache',
      credentials: 'same-origin',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + localStorage.getItem('token'),
      },
      body: JSON.stringify({
        image: this.imageName == '' ? this.userData.image : this.imageName,
        name: this.name.value,
        email: this.email.value,
        tokenPayload: {
          _id: localStorage.getItem('userId'),
          token: localStorage.getItem('token'),
        },
      }),
    });

    const { user } = await response.json();

    if (!response.ok) {
      return Promise.reject();
    }
    return Promise.resolve(user);
  }
}
