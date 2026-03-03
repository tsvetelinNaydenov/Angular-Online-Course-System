import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { UserService } from './user.service';
import { SessionStorageService } from '@app/auth/services/session-storage.service';

@Injectable({
    providedIn: 'root'
})
export class UserStoreService {
    private name$$ = new BehaviorSubject<string | null>(null);
    public name$ = this.name$$.asObservable();

    private isAdmin$$ = new BehaviorSubject<boolean>(false);
    public isAdmin$ = this.isAdmin$$.asObservable();

    constructor(
        private userService: UserService,
        private sessionStorageService: SessionStorageService
    ) { }

    getUser(): void {
        const token = this.sessionStorageService.getToken();

        if (!token) {
            return;
        }

        this.userService.getUser()
            .subscribe(responce => {
                if (responce.successful) {
                    const user = responce.result;

                    this.name$$.next(user.name);
                    this.isAdmin$$.next(user.role === 'admin')
                }
            });
    }

    clearUser(): void {
        this.name$$.next('');
    }

    get isAdmin() {
        return this.isAdmin$$.value;
    }

    set isAdmin(value: boolean) {
        this.isAdmin$$.next(value);
    }
}
