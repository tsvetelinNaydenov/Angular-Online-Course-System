// Add your code here
import { createFeatureSelector, createSelector } from '@ngrx/store';
import { coursesFeatureKey, CoursesState } from './courses.reducer';

// Select the courses feature state
export const selectCoursesState = createFeatureSelector<CoursesState>(coursesFeatureKey);

// Selectors for loading states
export const isAllCoursesLoadingSelector = createSelector(
    selectCoursesState,
    (state) => state.isAllCoursesLoading
);

export const isSearchingStateSelector = createSelector(
    selectCoursesState,
    (state) => state.isSearchState
);

export const isSingleCourseLoadingSelector = createSelector(
    selectCoursesState,
    (state) => state.isSingleCourseLoading
);

// Selector for getting all courses
export const getAllCourses = createSelector(
    selectCoursesState,
    (state) => state.allCourses
);

// Selector for getting a specific course
export const getCourse = createSelector(
    selectCoursesState,
    (state) => state.course
);

// Selector for getting the error message
export const getErrorMessage = createSelector(
    selectCoursesState,
    (state) => state.errorMessage
);

export const coursesQuery = {
    isAllCoursesLoadingSelector,
    isSearchingStateSelector,
    isSingleCourseLoadingSelector,
    getAllCourses,
    getCourse,
    getErrorMessage
}
