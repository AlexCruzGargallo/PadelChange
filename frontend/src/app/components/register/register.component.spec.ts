import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';

import { RegisterComponent } from './register.component';

describe('RegisterComponent', () => {
  let component: RegisterComponent
  let fixture: ComponentFixture<RegisterComponent>
  const regexPassword = new RegExp(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/
  )
  const regexName = new RegExp(/^[a-z À-ÿ\u00f1\u00d1,.'-]+$/i)
  beforeEach(async () => {
      await TestBed.configureTestingModule({
          declarations: [RegisterComponent],
          imports: [
              RouterTestingModule,
              FormsModule,
              ReactiveFormsModule,
          ],
          providers: [],
      }).compileComponents()
  })

  beforeEach(() => {
      fixture = TestBed.createComponent(RegisterComponent)
      component = fixture.componentInstance
      fixture.detectChanges()
      component.form = new FormGroup({
          email: new FormControl('', [Validators.required, Validators.email]),
          password: new FormControl('', [
              Validators.required,
              Validators.minLength(8),
              Validators.pattern(regexPassword),
          ]),
          firstName: new FormControl('', [
              Validators.required,
              Validators.minLength(2),
              Validators.maxLength(60),
              Validators.pattern(regexName),
          ]),
          lastName: new FormControl('', [
              Validators.required,
              Validators.minLength(2),
              Validators.maxLength(60),
              Validators.pattern(regexName),
          ]),
          confirmPassword: new FormControl('', [
              Validators.required,
              Validators.minLength(8),
          ]),
      })
  })

  it('Email-Check - Invalid email address [format]', () => {
      let email = component.form.controls['email']
      expect(email.valid).toBeFalsy()
      expect(email.pristine).toBeTruthy()
      expect(email.hasError('required')).toBeTruthy()
      email.setValue('adc')
      expect(email.hasError('email')).toBeTruthy()
  })
  it('Email-Check - Valid email address', () => {
      let email = component.form.controls['email']
      expect(email.valid).toBeFalsy()
      expect(email.pristine).toBeTruthy()
      expect(email.hasError('required')).toBeTruthy()
      email.setValue('abc@gmail.com')
      expect(email.hasError('email')).toBeFalsy()
  })
  it('Password-Check - Invalid password [min length]', () => {
      let password = component.form.controls['password']
      expect(password.valid).toBeFalsy()
      expect(password.pristine).toBeTruthy()
      expect(password.hasError('required')).toBeTruthy()
      password.setValue('1234567')
      expect(password.hasError('minlength')).toBeTruthy()
  })
  it('Password-Check - Invalid password [pattern]', () => {
      let password = component.form.controls['password']
      expect(password.valid).toBeFalsy()
      expect(password.pristine).toBeTruthy()
      expect(password.hasError('required')).toBeTruthy()
      password.setValue('123456789')
      expect(password.hasError('pattern')).toBeTruthy()
      password.setValue('AlexCruzGargallo')
      expect(password.hasError('pattern')).toBeTruthy()
  })
  it('Password-Check - Valid password', () => {
      let password = component.form.controls['password']
      expect(password.valid).toBeFalsy()
      expect(password.pristine).toBeTruthy()
      expect(password.hasError('required')).toBeTruthy()
      password.setValue('Alex12345')
      expect(password.hasError('minlength')).toBeFalsy()
  })
  it('FirstName-Check - Valid name', () => {
      let firstName = component.form.controls['firstName']
      expect(firstName.valid).toBeFalsy()
      expect(firstName.pristine).toBeTruthy()
      expect(firstName.hasError('required')).toBeTruthy()
      firstName.setValue('Alex')
      expect(firstName.hasError('required')).toBeFalsy()
      expect(firstName.hasError('maxlength')).toBeFalsy()
      expect(firstName.hasError('minlength')).toBeFalsy()
      expect(firstName.hasError('pattern')).toBeFalsy()
  })
  it('FirstName-Check - Invalid name[minlength]', () => {
      let firstName = component.form.controls['firstName']
      expect(firstName.valid).toBeFalsy()
      expect(firstName.pristine).toBeTruthy()
      expect(firstName.hasError('required')).toBeTruthy()
      firstName.setValue('A')
      expect(firstName.hasError('required')).toBeFalsy()
      expect(firstName.hasError('maxlength')).toBeFalsy()
      expect(firstName.hasError('minlength')).toBeTruthy()
      expect(firstName.hasError('pattern')).toBeFalsy()
  })
  it('FirstName-Check - Invalid name[maxlength]', () => {
      let firstName = component.form.controls['firstName']
      expect(firstName.valid).toBeFalsy()
      expect(firstName.pristine).toBeTruthy()
      expect(firstName.hasError('required')).toBeTruthy()
      firstName.setValue(
          'asdasdasdasdsaddsaasdasdasdasdsaddsaasdasdasdasdsaddsaasdasdasdasdsaddsaasdasdasdasdsaddsaasdasdasdasdsaddsa'
      )
      expect(firstName.hasError('required')).toBeFalsy()
      expect(firstName.hasError('maxlength')).toBeTruthy()
      expect(firstName.hasError('minlength')).toBeFalsy()
      expect(firstName.hasError('pattern')).toBeFalsy()
  })
  it('FirstName-Check - Invalid name[pattern]', () => {
      let firstName = component.form.controls['firstName']
      expect(firstName.valid).toBeFalsy()
      expect(firstName.pristine).toBeTruthy()
      expect(firstName.hasError('required')).toBeTruthy()
      firstName.setValue('?¿)?=)')
      expect(firstName.hasError('required')).toBeFalsy()
      expect(firstName.hasError('maxlength')).toBeFalsy()
      expect(firstName.hasError('minlength')).toBeFalsy()
      expect(firstName.hasError('pattern')).toBeTruthy()
  })
  it('LastName-Check - Valid name', () => {
      let lastName = component.form.controls['lastName']
      expect(lastName.valid).toBeFalsy()
      expect(lastName.pristine).toBeTruthy()
      expect(lastName.hasError('required')).toBeTruthy()
      lastName.setValue('Cruuz')
      expect(lastName.hasError('required')).toBeFalsy()
      expect(lastName.hasError('maxlength')).toBeFalsy()
      expect(lastName.hasError('minlength')).toBeFalsy()
      expect(lastName.hasError('pattern')).toBeFalsy()
  })
  it('LastName-Check - Invalid name[minlength]', () => {
      let lastName = component.form.controls['lastName']
      expect(lastName.valid).toBeFalsy()
      expect(lastName.pristine).toBeTruthy()
      expect(lastName.hasError('required')).toBeTruthy()
      lastName.setValue('C')
      expect(lastName.hasError('required')).toBeFalsy()
      expect(lastName.hasError('maxlength')).toBeFalsy()
      expect(lastName.hasError('minlength')).toBeTruthy()
      expect(lastName.hasError('pattern')).toBeFalsy()
  })
  it('LastName-Check - Invalid name[maxlength]', () => {
      let lastName = component.form.controls['lastName']
      expect(lastName.valid).toBeFalsy()
      expect(lastName.pristine).toBeTruthy()
      expect(lastName.hasError('required')).toBeTruthy()
      lastName.setValue(
          'CruuzCruuzCruuzCruuzCruuzCruuzCruuzCruuzCruuzCruuzCruuzCruuzCruuzCruuzCruuzCruuzCruuzCruuzCruuz'
      )
      expect(lastName.hasError('required')).toBeFalsy()
      expect(lastName.hasError('maxlength')).toBeTruthy()
      expect(lastName.hasError('minlength')).toBeFalsy()
      expect(lastName.hasError('pattern')).toBeFalsy()
  })
  it('LastName-Check - Invalid name[pattern]', () => {
      let lastName = component.form.controls['lastName']
      expect(lastName.valid).toBeFalsy()
      expect(lastName.pristine).toBeTruthy()
      expect(lastName.hasError('required')).toBeTruthy()
      lastName.setValue('^*¿?*^?')
      expect(lastName.hasError('required')).toBeFalsy()
      expect(lastName.hasError('maxlength')).toBeFalsy()
      expect(lastName.hasError('minlength')).toBeFalsy()
      expect(lastName.hasError('pattern')).toBeTruthy()
  })
  it('Password-Check - Valid password', () => {
      let password = component.form.controls['password']
      expect(password.valid).toBeFalsy()
      expect(password.pristine).toBeTruthy()
      expect(password.hasError('required')).toBeTruthy()
      password.setValue('Alex12345')
      expect(password.hasError('minlength')).toBeFalsy()
  })
  it('Password-Check - Valid password', () => {
      let password = component.form.controls['password']
      expect(password.valid).toBeFalsy()
      expect(password.pristine).toBeTruthy()
      expect(password.hasError('required')).toBeTruthy()
      password.setValue('Alex12345')
      expect(password.hasError('minlength')).toBeFalsy()
  })
  it('ConfirmPassword-Check - Valid confirm password', () => {
      let confirmPassword = component.form.controls['confirmPassword']
      expect(confirmPassword.valid).toBeFalsy()
      expect(confirmPassword.pristine).toBeTruthy()
      expect(confirmPassword.hasError('required')).toBeTruthy()
      confirmPassword.setValue('Alex12345')
      expect(confirmPassword.hasError('minlength')).toBeFalsy()
      expect(confirmPassword.hasError('required')).toBeFalsy()
  })
  it('ConfirmPassword-Check - paswords match', () => {
      let password = component.form.controls['password']
      let confirmPassword = component.form.controls['confirmPassword']
      expect(confirmPassword.valid).toBeFalsy()
      expect(confirmPassword.pristine).toBeTruthy()
      expect(confirmPassword.hasError('required')).toBeTruthy()
      password.setValue('Alex12345')
      confirmPassword.setValue('Alex12345')
      expect(password.value).toEqual(confirmPassword.value)
  })
})
