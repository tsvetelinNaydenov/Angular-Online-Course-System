import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Course } from '@app/services/course.models';
import { CoursesStoreService } from '@app/services/courses-store.service';
import { CoursesStateFacade } from '@app/store/courses/courses.facade';
import { UserStoreService } from '@app/user/services/user-store.service';
import { combineLatest, map } from 'rxjs';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.scss']
})
export class CoursesComponent implements OnInit {
  // injecting courses store, user store and router
  constructor(
    public coursesFacade: CoursesStateFacade,
    public coursesStore: CoursesStoreService,
    public userStore: UserStoreService,
    private router: Router) { }

  isSearching = false;
  filteredCourses: Course[] | null = null;

  // combining courses with their author names
  coursesWithAuthors$ = combineLatest([
    this.coursesFacade.courses$,
    this.coursesStore.authors$
  ]).pipe(
    map(([courses, authors]) =>
      courses.map(course => ({
        ...course, authorNames: course.authors.map(id => authors.find(a => a.id === id)?.name || '')
      }))
    )
  );

  // load courses and user
  ngOnInit(): void {
    this.coursesFacade.getAllCourses();
    this.coursesStore.getAllAuthors();
    this.userStore.getUser();
  }

  addNewCourseHandler() {
    this.router.navigate(['/courses/add']);
  }

  showCourseHandler(course: Course) {
    this.router.navigate(['/courses', course.id]);
  }
  editCourseHandler(course: Course) {
    this.router.navigate(['/courses/edit', course.id]);
  }
  deleteCourseHandler(course: Course) {
    this.coursesFacade.deleteCourse(course.id);
  }
  searchCoursesHandler(value: string) {
    if (value.length > 2) {
      this.isSearching = true;

      this.coursesFacade.getFilteredCourses(value);

    } else {
      this.isSearching = false;
      this.filteredCourses = null;
    }
  }
}
