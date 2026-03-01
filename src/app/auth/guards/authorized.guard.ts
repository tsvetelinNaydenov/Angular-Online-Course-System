import { Injectable } from '@angular/core';
import { UrlTree, Router, Route, UrlSegment, CanActivate } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable({
    providedIn: 'root'
})
export class AuthorizedGuard implements CanActivate {
    constructor(
        private authService: AuthService,
        private router: Router
    ) { }

    canActivate(): boolean | UrlTree {

        if (this.authService.isAuthorised) {
            return true;
        }

        return this.router.createUrlTree(['/login']);
    }
}
