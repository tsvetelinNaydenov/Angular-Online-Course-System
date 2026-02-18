import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-registration-form',
  templateUrl: './registration-form.component.html',
  styleUrls: ['./registration-form.component.scss'],
})
export class RegistrationFormComponent {
  // Use the names `name`, `email`, `password` for the form controls.
  registrationForm = new FormGroup({
    name: new FormControl('', [
      Validators.required,
      Validators.minLength(6)
    ]),
    email: new FormControl('', [
      Validators.required
    ]),
    password: new FormControl('', [
      Validators.required
    ])
  });
  
  // getters to make it simpler in the template
  get name(){ return this.registrationForm.get('name')!; }
  get email(){ return this.registrationForm.get('email')!; }
  get password(){ return this.registrationForm.get('password')!; }

  submitted = false;

  onSubmit(){
    this.submitted = true;
  }
}