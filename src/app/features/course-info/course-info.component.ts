import { Component, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Course } from '@app/services/course.models';
import { CoursesStoreService } from '@app/services/courses-store.service';

@Component({
  selector: 'app-course-info',
  templateUrl: './course-info.component.html',
  styleUrls: ['./course-info.component.scss']
})
export class CourseInfoComponent {
  course!: Course;
  authorNames: string[] = [];

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private coursesStore: CoursesStoreService) { }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');

    if (id) {
      this.coursesStore.getCourse(id);

      this.coursesStore.courses$.subscribe(courses => {
        if (courses.length > 0) {
          this.course = courses[0];

          this.coursesStore.authors$.subscribe(authors => {
            if (this.course) {
              this.authorNames = this.course.authors.map(id =>
                authors.find(a => a.id === id)?.name || ''
              );
            }
          });
        }
      });
    }
  }

  onBack() {
    this.router.navigate(["/courses"]);
  }
}
