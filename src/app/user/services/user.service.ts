import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FailedRequest, SuccessfulRequest } from '@app/services/course.models';
import { Observable } from 'rxjs';
import { User } from '../user.models';

@Injectable({
    providedIn: 'root'
})
export class UserService {
    private readonly BASE_URL = 'http://localhost:4000';

    constructor(private http: HttpClient) { }

    getUser(): Observable<SuccessfulRequest<User> | FailedRequest> {
        return this.http.get<SuccessfulRequest<User> | FailedRequest>(
            `${this.BASE_URL}/users/me`
        );
    }
}
