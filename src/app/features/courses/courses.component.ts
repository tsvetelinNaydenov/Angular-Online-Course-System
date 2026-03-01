import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Course } from '@app/services/course.models';
import { CoursesStoreService } from '@app/services/courses-store.service';
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
    public coursesStore: CoursesStoreService,
    public userStore: UserStoreService,
    private router: Router) { }

  isSearching = false;
  filteredCourses: Course[] | null = null;

  // combining courses with their author names
  coursesWithAuthors$ = combineLatest([
    this.coursesStore.courses$,
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
    this.coursesStore.getAll();
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
    this.coursesStore.deleteCourse(course.id);
  }
  searchCoursesHandler(value: string) {
    if (value.length > 2) {
      this.isSearching = true;

      this.coursesStore.courses$.subscribe(courses => {
        this.filteredCourses = courses.filter(course =>
          course.title.toLowerCase().includes(value.toLowerCase())
        );
      });

    } else {
      this.isSearching = false;
      this.filteredCourses = null;
    }
  }
}
