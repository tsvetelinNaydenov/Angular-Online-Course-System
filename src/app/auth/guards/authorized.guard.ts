    import { Injectable } from '@angular/core';
    import { UrlTree, Router, CanMatch, Route, UrlSegment } from '@angular/router';
    import { AuthService } from '../services/auth.service';

    @Injectable({
        providedIn: 'root'
    })
    export class AuthorizedGuard implements CanMatch {
        constructor(
            private authService: AuthService,
            private router: Router
        ) { }

        canMatch(route: Route, segments: UrlSegment[]): boolean | UrlTree {
            if (this.authService.isAuthorised){
                return true;
            }
            console.log('AuthorizedGuard triggered');
            return this.router.createUrlTree(['/login']);
        }
    }
