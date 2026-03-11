import { Injectable } from '@angular/core';
import { catchError, mergeMap, map, of, tap, withLatestFrom } from 'rxjs';
import { CoursesService } from '@app/services/courses.service';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as CoursesActions from '../courses/courses.actions';
import { Router } from '@angular/router';
import { Course } from '@app/services/course.models';
import { CoursesStateFacade } from './courses.facade';

@Injectable()
export class CoursesEffects {
    constructor(
        private coursesService: CoursesService,
        private actions$: Actions,
        private router: Router,
        private coursesStateFacade: CoursesStateFacade
    ) { }

    getAll$ = createEffect(() => this.actions$.pipe(
        ofType(CoursesActions.requestAllCourses),
        mergeMap(() => this.coursesService.getAll()
            .pipe(
                map(response => CoursesActions.requestAllCoursesSuccess({ courses: response.result as Course[] })),
                catchError(error => of(CoursesActions.requestAllCoursesFail({ error })))
            ))
    ));

    filteredCourses$ = createEffect(() => this.actions$.pipe(
        ofType(CoursesActions.requestFilteredCourses),
        withLatestFrom(this.coursesStateFacade.allCourses$),
        map(([{ title }, courses]) => {
            const filteredCourses = courses.filter(course => 
                course.title.toLowerCase().includes(title.toLowerCase())
            );

            return CoursesActions.requestFilteredCoursesSuccess({ courses: filteredCourses })
        })
    ));

    getSpecificCourse$ = createEffect(() => this.actions$.pipe(
        ofType(CoursesActions.requestSingleCourse),
        mergeMap(({ id }) => this.coursesService.getCourse(id)
            .pipe(
                map(response => CoursesActions.requestSingleCourseSuccess({ course: response.result as Course })),
                catchError(error => of(CoursesActions.requestSingleCourseFail({ error })))
            ))
    ));

    deleteCourse$ = createEffect(() => this.actions$.pipe(
        ofType(CoursesActions.requestDeleteCourse),
        mergeMap(({ id }) => this.coursesService.deleteCourse(id)
            .pipe(
                map(() => CoursesActions.requestAllCourses()),
                catchError(error => of(CoursesActions.requestDeleteCourseFail({ error })))
            ))
    ));

    editCourse$ = createEffect(() => this.actions$.pipe(
        ofType(CoursesActions.requestEditCourse),
        mergeMap(({ id, course }) => this.coursesService.editCourse(id, course)
            .pipe(
                map(() => CoursesActions.requestEditCourseSuccess({ course })),
                catchError(error => of(CoursesActions.requestEditCourseFail({ error })))
            ))
    ));

    createCourse$ = createEffect(() => this.actions$.pipe(
        ofType(CoursesActions.requestCreateCourse),
        mergeMap(({ course }) => this.coursesService.createCourse(course)
            .pipe(
                map(response => CoursesActions.requestCreateCourseSuccess({ course: response.result as Course})),
                catchError(error => of(CoursesActions.requestCreateCourseFail({ error })))
            ))
    ));

    redirectToTheCoursesPage$ = createEffect(() => this.actions$.pipe(
        ofType(
            CoursesActions.requestCreateCourseSuccess,
            CoursesActions.requestEditCourseSuccess,
            CoursesActions.requestSingleCourseFail
        ),
        tap(() => this.router.navigate(['/courses']))
    ), { dispatch: false });
}
