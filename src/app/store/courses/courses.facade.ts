import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { coursesQuery } from './courses.selectors';
import * as CoursesActions from '../courses/courses.actions';
import { Course } from '@app/services/course.models';

@Injectable({
    providedIn: 'root'
})
export class CoursesStateFacade {
    isAllCoursesLoading$ = this.store.select(coursesQuery.isAllCoursesLoadingSelector);
    isSingleCourseLoading$ = this.store.select(coursesQuery.isSingleCourseLoadingSelector);
    isSearchingState$ = this.store.select(coursesQuery.isSearchingStateSelector);
    courses$ = this.store.select(coursesQuery.getAllCourses)
    allCourses$ = this.store.select(coursesQuery.getAllCourses);
    course$ = this.store.select(coursesQuery.getCourse);
    errorMessage$ = this.store.select(coursesQuery.getErrorMessage);


    constructor(private store: Store) { }

    getAllCourses(): void {
        this.store.dispatch(CoursesActions.requestAllCourses());
    }

    getSingleCourse(id: string): void {
        this.store.dispatch(CoursesActions.requestSingleCourse({ id }))
    }

    getFilteredCourses(searchValue: string): void {
        this.store.dispatch(CoursesActions.requestFilteredCourses({ title: searchValue }));
    }

    editCourse(body: Course, id: string): void {
        this.store.dispatch(CoursesActions.requestEditCourse({ id, course: body }));
    }

    createCourse(body: Course): void {
        this.store.dispatch(CoursesActions.requestCreateCourse({ course: body }));
    }

    deleteCourse(id: string): void {
        this.store.dispatch(CoursesActions.requestDeleteCourse({ id }));
    }
}
