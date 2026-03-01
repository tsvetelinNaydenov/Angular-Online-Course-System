import { Component, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '@app/auth/services/auth.service';
import { UserStoreService } from '@app/user/services/user-store.service';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss'],
})
export class LoginFormComponent {
  @ViewChild("loginForm") public loginForm!: NgForm;
  constructor(
    private authService: AuthService,
    private router: Router,
    private userStore: UserStoreService) { }

    onSubmit() {
      this.authService.login({ email: this.email, password: this.password })
        .subscribe({
          next: () => {
            this.router.navigate(['/courses']);
          },
          error: (err) => {
            this.errorMessage = err?.error?.result || "Login failed. Please check your credentials."
          }
        });
    }
  email = ''; // placeholder
  password = ''; // placeholder
  errorMessage = '';
}
