import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { SessionStorageService } from './session-storage.service';
import { HttpClient } from '@angular/common/http';
import { LoginRequest, LoginResponce, RegisterRequest } from '../auth.interfaces';

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    private readonly BASE_URL = 'http://localhost:4000';
    private isAuthorized$$!: BehaviorSubject<boolean>;
    public isAuthorized$!: Observable<boolean>;

    constructor(private http: HttpClient, private sessionStorageService: SessionStorageService) {
        this.isAuthorized$$ = new BehaviorSubject<boolean>(
            !!sessionStorageService.getToken()
        );

        this.isAuthorized$ = this.isAuthorized$$.asObservable();

        console.log('Token:', sessionStorageService.getToken());
        console.log('Initial isAuthorized:', this.isAuthorized$$.value);
    }

    login(user: LoginRequest): Observable<LoginResponce> {
        return this.http.post<LoginResponce>(
            `${this.BASE_URL}/login`,
            user).pipe(
                tap(responce => {
                    if (responce.successful) {
                        this.sessionStorageService.setToken(responce.result);
                        this.isAuthorised = true;
                    }
                })
            )
    }

    logout(): Observable<void> {
        const token = this.sessionStorageService.getToken();

        return this.http.delete<void>(
            `${this.BASE_URL}/logout`,
            {
                headers: {
                    Authorization: token || ''
                }
            }
        ).pipe(
            tap(() => {
                this.sessionStorageService.deleteToken();
                this.isAuthorised = false;
            })
        );
    }

    register(user: RegisterRequest): Observable<any> {
        return this.http.post(
            `${this.BASE_URL}/register`,
            user
        );
    }

    get isAuthorised(): boolean {
        return this.isAuthorized$$.value;
    }

    set isAuthorised(value: boolean) {
        this.isAuthorized$$.next(value);
    }

    getLoginUrl() {
        return '/login';
    }
}
