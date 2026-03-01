import { Injectable } from '@angular/core';
import { CanActivate, Route, UrlSegment, UrlTree } from '@angular/router';
import { UserStoreService } from '../services/user-store.service';
import { Router } from '@angular/router';

@Injectable({
    providedIn: 'root'
})
export class AdminGuard implements CanActivate{
    constructor(
        private userStore: UserStoreService, 
        private router: Router) { }

    canActivate(): boolean | UrlTree{
        if (this.userStore.isAdmin){
            return true;
        }

        return this.router.createUrlTree(['/courses']);
    }
}
