import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { RegisterRequest } from '@app/auth/auth.interfaces';
import { AuthService } from '@app/auth/services/auth.service';

@Component({
  selector: 'app-registration-form',
  templateUrl: './registration-form.component.html',
  styleUrls: ['./registration-form.component.scss'],
})
export class RegistrationFormComponent {
  constructor(
    private authService: AuthService,
    private router: Router
  ) { }

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
  get name() { return this.registrationForm.get('name')!; }
  get email() { return this.registrationForm.get('email')!; }
  get password() { return this.registrationForm.get('password')!; }

  submitted = false;

  onSubmit() {
    this.submitted = true;

    if(this.registrationForm.invalid){
      return;
    }

    const user: RegisterRequest = this.registrationForm.value as RegisterRequest;

    this.authService.register(user).subscribe({
      next: () => {
        this.router.navigate(['/login']);
      },
      error: err => {
        console.log('Registration failed:', err);
      }
    })
  }
}