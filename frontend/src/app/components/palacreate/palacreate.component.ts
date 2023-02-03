import { Component, OnInit } from '@angular/core';
import { UntypedFormControl, UntypedFormGroup } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-palacreate',
  templateUrl: './palacreate.component.html',
  styleUrls: ['./palacreate.component.css'],
})
export class PalacreateComponent implements OnInit {
  apiUrl: string = 'http://localhost:4000/api';
  racketsData: any;
  public brands: any[] = [];
  public shapes: any[] = [];
  public touches: any[] = [];
  _brand: string = 'Ninguna';
  _touch: string = 'Ninguno';
  _shape: string = 'Ninguna';
  errorMsg: string = '';
  result: string = '';
  imageF: any;

  name = new UntypedFormControl('');
  price = new UntypedFormControl('');
  season = new UntypedFormControl('');
  material_frame = new UntypedFormControl('');
  material_flat = new UntypedFormControl('');
  material_rubber = new UntypedFormControl('');
  weight = new UntypedFormControl('');
  brand = new UntypedFormControl('');
  shape = new UntypedFormControl('');
  touch = new UntypedFormControl('');

  form = new UntypedFormGroup({
    name: this.name,
    price: this.price,
    brand: this.brand,
    season: this.season,
    frame_material: this.material_frame,
    flat_material: this.material_flat,
    rubber_material: this.material_rubber,
    weight: this.weight,
    shape: this.shape,
    touch: this.touch,
  });

  constructor(private _http: HttpClient) {}

  async ngOnInit(): Promise<void> {
    this.racketsData = await this.getAllRacketsData();
    this.brands = [
      ...new Set(this.racketsData.map((item: { brand: any }) => item.brand)),
    ];
    this.brands.sort();

    this.shapes = [
      ...new Set(this.racketsData.map((item: { shape: any }) => item.shape)),
    ];

    this.touches = [
      ...new Set(this.racketsData.map((item: { touch: any }) => item.touch)),
    ];
    console.log(this.brands);
    console.log(this.shapes);
    console.log(this.touches);
  }

  onChangeBrand() {
    console.log('brand', this._brand);
    this.brand.setValue(this._brand);
  }

  onChangeTouch() {
    console.log('touch', this._touch);
    this.touch.setValue(this._touch);
  }

  onChangeShape() {
    console.log('shape', this._shape);
    this.shape.setValue(this._shape);
  }

  save(event: any): void {
    var reader = new FileReader();
    reader.readAsDataURL(event.target.files[0]);
    let image = { file: event.target.files, url: '' };
    reader.onload = async (event: any) => {
      console.log(event.target.result);
      image.url = event.target.result;
      this.imageF = image;
      console.log(this.imageF, this.imageF.file[0].name);
    };
  }

  onClick() {
    let isValid = true;
    for (var key in this.form.value) {
      if (this.form.value[key] === '') {
        isValid = false;
      }
    }
    if (!this.imageF) {
      isValid = false;
    }
    if (isValid) {
      let racketData = this.form.value;
      racketData.img = this.imageF.file[0].name;
      this.createPetition({
        user_id: localStorage.getItem('userId'),
        racket: racketData,
      });
      this.uploadImage();
    } else {
      this.errorMsg = 'Rellena todos los campos del formularios porfavor.';
    }

    console.log(this.form.value);
  }

  dataURItoBlob(dataURI: any) {
    console.log('LLEGA', dataURI);
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

  uploadImage() {
    let fileName = '';

    const urla = this.imageF.url;
    console.log('IMAGENNNNN', urla);
    const imageBlob = this.dataURItoBlob(urla);
    const imageFile = new File([imageBlob], this.imageF.file[0].name, {
      type: 'image/png',
    });
    console.log('aaa', imageFile);
    const fd = new FormData();
    if (!imageFile) {
      console.log(imageFile);
      return;
    }
    fd.append('file', imageFile);

    let url = `${this.apiUrl}/adverts/upload`;

    if (imageFile) {
      fileName = imageFile.name;
      const formData = new FormData();
      formData.append('thumbnail', imageFile);
      const upload$ = this._http.post(
        `${this.apiUrl}/racketPetitions/upload/`,
        formData
      );
      upload$.subscribe();
    }
  }

  public async getAllRacketsData(): Promise<any> {
    const response = await fetch(`${this.apiUrl}/rackets/`, {
      method: 'GET',
      mode: 'cors',
      cache: 'no-cache',
      credentials: 'same-origin',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const { rackets } = await response.json();

    if (!response.ok) {
      return Promise.reject();
    }
    return Promise.resolve(rackets);
  }

  public async createPetition(args: any): Promise<any> {
    const response = await fetch(`${this.apiUrl}/racketPetitions/create`, {
      method: 'POST',
      mode: 'cors',
      cache: 'no-cache',
      credentials: 'same-origin',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(args),
    });
    const { racketPet } = await response.json();

    if (!response.ok) {
      return Promise.reject();
    }
    return Promise.resolve(racketPet);
  }
}
