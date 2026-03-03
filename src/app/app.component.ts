import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { map } from 'rxjs';
import { AuthService } from '@app/auth/services/auth.service';
import { UserStoreService } from '@app/user/services/user-store.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'courses-app';
  constructor(
    private userStore: UserStoreService, 
    private authService: AuthService,
  private router: Router) { }

  username$ = this.userStore.name$;

  loginBtnText$ = this.authService.isAuthorized$.pipe(
    map(isAuthorized => isAuthorized ? 'Logout' : 'Login')
  );

  ngOnInit(): void {
    this.userStore.getUser();
  }

  onAuthButtonClick(): void {
    if (this.authService.isAuthorised) {
      this.authService.logout().subscribe({
        next: () => {
          this.userStore.clearUser();
          this.router.navigate(['/login']);
        },
        error: err => {
          console.error('Logout failed', err);
        }
      });
    } else {
      this.router.navigate(['/login']);
    }
  }
}
