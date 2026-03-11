import { Action, createReducer, on } from '@ngrx/store';
import * as CoursesActions from '../courses/courses.actions';
import { Course } from '@app/services/course.models';

// Add your code here
export const coursesFeatureKey = 'courses';

export interface CoursesState {
    allCourses: Course[];
    course: Course | null;
    isAllCoursesLoading: boolean;
    isSingleCourseLoading: boolean;
    isSearchState: boolean;
    errorMessage: string;
}

export const initialState: CoursesState = {
    allCourses: [],
    course: null,
    isAllCoursesLoading: false,
    isSingleCourseLoading: false,
    isSearchState: false,
    errorMessage: ''
};

export const coursesReducer = createReducer(
    initialState,
    on(CoursesActions.requestAllCourses, (state) => ({
        ...state,
        isAllCoursesLoading: true
    })),

    on(CoursesActions.requestAllCoursesSuccess, (state, { courses }) => ({
        ...state,
        allCourses: courses,
        isAllCoursesLoading: false
    })),

    on(CoursesActions.requestAllCoursesFail, (state, { error }) => ({
        ...state,
        errorMessage: error,
        isAllCoursesLoading: false,
    })),

    on(CoursesActions.requestSingleCourse, (state) => ({
        ...state,
        isSingleCourseLoading: true
    })),

    on(CoursesActions.requestSingleCourseSuccess, (state, { course }) => ({
        ...state,
        course,
        isSingleCourseLoading: false
    })),

    on(CoursesActions.requestSingleCourseFail, (state, { error }) => ({
        ...state,
        errorMessage: error,
        isSingleCourseLoading: false,
    })),

    on(CoursesActions.requestFilteredCourses, (state) => ({
        ...state,
        isSearchState: true,
        isAllCoursesLoading: true
    })),

    on(CoursesActions.requestFilteredCoursesSuccess, (state, { courses }) => ({
        ...state,
        allCourses: courses,
        isSearchState: false,
        isAllCoursesLoading: false
    })),

    on(CoursesActions.requestFilteredCoursesFail, (state, { error }) => ({
        ...state,
        errorMessage: error,
        isSearchState: false,
        isAllCoursesLoading: false
    })),

    on(CoursesActions.requestDeleteCourse, (state) => ({
        ...state,
        isAllCoursesLoading: true,
        errorMessage: ''
    })),

    on(CoursesActions.requestDeleteCourseSuccess, (state, { id }) => ({
        ...state,
        allCourses: state.allCourses.filter(c => c.id !== id),
        isAllCoursesLoading: false
    })),

    on(CoursesActions.requestDeleteCourseFail, (state, { error }) => ({
        ...state,
        errorMessage: error,
        isAllCoursesLoading: false
    })),

    on(CoursesActions.requestEditCourse, (state) => ({
        ...state,
        isSingleCourseLoading: true,
        errorMessage: ''
    })),

    on(CoursesActions.requestEditCourseSuccess, (state, { course }) => ({
        ...state,
        course: course,
        isSingleCourseLoading: false
    })),

    on(CoursesActions.requestEditCourseFail, (state, { error }) => ({
        ...state,
        errorMessage: error,
        isSingleCourseLoading: false
    })),

    on(CoursesActions.requestCreateCourse, (state) => ({
        ...state,
        isAllCoursesLoading: true,
        errorMessage: ''
    })),

    on(CoursesActions.requestCreateCourseSuccess, (state, { course }) => ({
        ...state,
        course,
        isAllCoursesLoading: false
    })),

    on(CoursesActions.requestCreateCourseFail, (state, { error }) => ({
        ...state,
        errorMessage: error,
        isAllCoursesLoading: false
    }))
); 

export let reducer = (state: CoursesState, action: Action): CoursesState => coursesReducer(state, action);
