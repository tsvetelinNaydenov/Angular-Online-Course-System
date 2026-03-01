import { Injectable } from '@angular/core';
import { BehaviorSubject, finalize } from 'rxjs';
import { CoursesService } from './courses.service';
import { Author, Course } from './course.models';

@Injectable({
    providedIn: 'root'
})
export class CoursesStoreService {
    private isLoading$$ = new BehaviorSubject<boolean>(false);
    public isLoading$ = this.isLoading$$.asObservable();

    private courses$$ = new BehaviorSubject<Course[]>([]);
    public courses$ = this.courses$$.asObservable();

    private authors$$ = new BehaviorSubject<Author[]>([]);
    public authors$ = this.authors$$.asObservable();

    constructor(private coursesService: CoursesService) { }

    getAll(): void {
        this.isLoading$$.next(true);

        this.coursesService.getAll()
            .pipe(
                finalize(() => this.isLoading$$.next(false))
            )
            .subscribe(responce => {
                if (responce.successful && Array.isArray(responce.result)) {
                    this.courses$$.next(responce.result);
                }
            })
    }

    createCourse(course: Course): void {
        this.isLoading$$.next(true);

        this.coursesService.createCourse(course)
            .pipe(
                finalize(() => this.isLoading$$.next(false))
            )
            .subscribe(responce => {
                if (responce.successful && typeof responce.result !== 'string') {
                    const currentCourses = this.courses$$.value;

                    this.courses$$.next([
                        ...currentCourses, responce.result
                    ]);
                }
            })
    }

    getCourse(id: string): void {
        this.isLoading$$.next(true);

        this.coursesService.getCourse(id)
            .pipe(
                finalize(() => this.isLoading$$.next(false))
            )
            .subscribe(responce => {
                if (responce.successful && typeof responce.result !== 'string') {
                    this.courses$$.next([responce.result]);
                }
            })
    }

    editCourse(id: string, course: Course): void {
        this.isLoading$$.next(true);

        this.coursesService.editCourse(id, course)
            .pipe(
                finalize(() => this.isLoading$$.next(false))
            )
            .subscribe(responce => {
                if (responce.successful) {
                    const updatedCourses = this.courses$$.value.map(c =>
                        c.id === id ? course : c
                    );

                    this.courses$$.next(updatedCourses);
                }
            })
    }

    deleteCourse(id: string): void {
        this.isLoading$$.next(true);

        this.coursesService.deleteCourse(id)
            .pipe(
                finalize(() => this.isLoading$$.next(false))
            )
            .subscribe(responce => {
                if (responce.successful) {
                    const updatedCourses = this.courses$$.value.filter(c => c.id !== id);

                    this.courses$$.next(updatedCourses);
                }
            })
    }

    filterCourses(value: string): void {
        this.isLoading$$.next(true);

        this.coursesService.filterCourses(value)
            .pipe(
                finalize(() => this.isLoading$$.next(false))
            )
            .subscribe(responce => {
                if (responce.successful && Array.isArray(responce.result)) {
                    this.courses$$.next(responce.result);
                }
            })
    }

    getAllAuthors(): void {
        this.isLoading$$.next(true);

        this.coursesService.getAllAuthors()
            .pipe(
                finalize(() => this.isLoading$$.next(false))
            )
            .subscribe(responce => {
                if (responce.successful && Array.isArray(responce.result)) {
                    this.authors$$.next(responce.result);
                }
            })
    }

    createAuthor(name: string): void {
        this.isLoading$$.next(true);

        this.coursesService.createAuthor(name)
            .pipe(
                finalize(() => this.isLoading$$.next(false))
            )
            .subscribe(responce => {
                if (responce.successful && typeof responce.result !== 'string') {
                    const currentAuthors = this.authors$$.value;

                    this.authors$$.next([
                        ...currentAuthors, responce.result
                    ]);
                }
            })
            console.log('Updated authors:', this.authors$$.value);
    }

    getAuthorById(id: string) {
        this.isLoading$$.next(true);

        this.coursesService.getAuthorById(id)
            .pipe(
                finalize(() => this.isLoading$$.next(false))
            )
            .subscribe(responce => {
                if (responce.successful && typeof responce.result !== 'string') {
                    this.authors$$.next([responce.result]);
                }
            })
    }
}
