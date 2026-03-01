import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Author, Course, FailedRequest, SuccessfulRequest } from './course.models';

@Injectable({
    providedIn: 'root'
})
export class CoursesService {
    private readonly BASE_URL = 'http://localhost:4000';

    constructor(private http: HttpClient) { }

    getAll(): Observable<SuccessfulRequest<Course[] | string> | FailedRequest> {
        return this.http.get<SuccessfulRequest<Course[] | string> | FailedRequest>(
            `${this.BASE_URL}/courses/all`
        );
    }

    createCourse(course: Course): Observable<SuccessfulRequest<string | Course> | FailedRequest> {
        return this.http.post<SuccessfulRequest<string | Course> | FailedRequest>(
            `${this.BASE_URL}/courses/add`, course
        );
    }

    editCourse(id: string, course: Course): Observable<SuccessfulRequest<string> | FailedRequest> {
        return this.http.put<SuccessfulRequest<string> | FailedRequest>(
            `${this.BASE_URL}/courses/${id}`, course
        );
    }

    getCourse(id: string): Observable<SuccessfulRequest<Course | string> | FailedRequest> {
        return this.http.get<SuccessfulRequest<Course | string> | FailedRequest>(
            `${this.BASE_URL}/courses/${id}`
        );
    }

    deleteCourse(id: string): Observable<SuccessfulRequest<string> | FailedRequest> {
        return this.http.delete<SuccessfulRequest<string> | FailedRequest>(
            `${this.BASE_URL}/courses/${id}`
        );
    }

    filterCourses(value: string): Observable<SuccessfulRequest<Course[] | string> | FailedRequest> {
        return this.http.get<SuccessfulRequest<Course[] | string> | FailedRequest>(
            `${this.BASE_URL}/courses/filter`,
            {
                params: { title: value }
            }
        );
    }

    getAllAuthors(): Observable<SuccessfulRequest<Author[] | string> | FailedRequest> {
        return this.http.get<SuccessfulRequest<Author[] | string> | FailedRequest>(
            `${this.BASE_URL}/authors/all`
        );
    }

    createAuthor(name: string): Observable<SuccessfulRequest<Author | string> | FailedRequest> {
        const newAuthor: Author = {
            id: crypto.randomUUID(),
            name: name
        };

        return this.http.post<SuccessfulRequest<string | Author> | FailedRequest>(
            `${this.BASE_URL}/authors/add`, newAuthor
        );
    }

    getAuthorById(id: string): Observable<SuccessfulRequest<Author | string> | FailedRequest> {
        return this.http.get<SuccessfulRequest<Author | string> | FailedRequest>(
            `${this.BASE_URL}/authors/${id}`
        );
    }
}
