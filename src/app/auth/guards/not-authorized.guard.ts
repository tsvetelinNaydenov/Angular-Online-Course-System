import { Injectable } from '@angular/core';
import { CanLoad, Route, Router, UrlSegment, UrlTree } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable({
    providedIn: 'root'
})
export class NotAuthorizedGuard implements CanLoad {
    constructor(
        private authService: AuthService,
        private router: Router
    ) { }

    canLoad(
        route: Route, 
        segmets: UrlSegment[]
    ): boolean | UrlTree {
        if(!this.authService.isAuthorised){
            return true;
        }
        
        return this.router.createUrlTree(['/courses']);
    }
}
