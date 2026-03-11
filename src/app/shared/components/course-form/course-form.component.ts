import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormArray,
  FormBuilder, FormControl, FormGroup,
  Validators
} from '@angular/forms';
import { FaIconLibrary } from '@fortawesome/angular-fontawesome';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { ActivatedRoute, Router } from '@angular/router';
import { CoursesStoreService } from '@app/services/courses-store.service';
import { Author, Course } from '@app/services/course.models';
import { UserStoreService } from '@app/user/services/user-store.service';
import { map, Observable } from 'rxjs';
import { CoursesStateFacade } from '@app/store/courses/courses.facade';


@Component({
  selector: 'app-course-form',
  templateUrl: './course-form.component.html',
  styleUrls: ['./course-form.component.scss'],
})
export class CourseFormComponent implements OnInit {
  constructor(
    public library: FaIconLibrary,
    private coursesStore: CoursesStoreService, // for using authors$
    private coursesFacade: CoursesStateFacade,
    private route: ActivatedRoute,
    private router: Router,
    private userStore: UserStoreService
  ) {
    library.addIconPacks(fas);
  }

  isEditMode = false;
  courseId = '';
  avaliableAuthors$ = this.coursesStore.authors$;

  courseForm = new FormGroup({
    title: new FormControl('', [Validators.required, Validators.minLength(2)]),
    description: new FormControl('', [Validators.required, Validators.minLength(2)]),
    duration: new FormControl(0, [Validators.required, Validators.min(0)]),
    newAuthor: new FormControl('', [Validators.minLength(2), Validators.pattern(/^[a-zA-Z0-9]+(?: [a-zA-Z0-9]+)*$/)]),
    authors: new FormArray([], [this.minAuthorsValidator.bind(this)]) // attaching validation function
  }, {
    updateOn: 'blur'
  });

  // getters to make it simpler in the template
  get title() { return this.courseForm.get('title')!; }
  get description() { return this.courseForm.get('description')!; }
  get duration() { return this.courseForm.get('duration')!; }
  get newAuthor() { return this.courseForm.get('newAuthor')!; }
  get authors() { return this.courseForm.get('authors')! as FormArray; }

  submitted = false;

  ngOnInit(): void {
    this.userStore.getUser();
    this.coursesFacade.getAllCourses();
    
    this.coursesStore.getAllAuthors();

    this.route.params.subscribe(params => {
      const id = params['id'];

      if (id) {
        this.isEditMode = true;
        this.courseId = id;

        this.coursesFacade.courses$
          .subscribe(courses => {
            const course = courses[0];
            if (course) {
              this.populateForm(course);
            }
          });
      }
    });
  }

  private populateForm(course: Course): void {
    this.courseForm.patchValue({
      title: course.title,
      description: course.description,
      duration: course.duration
    });

    // clear existing authors
    this.authors.clear();

    // add author IDs to FormArray
    course.authors.forEach(authorId => {
      this.authors.push(new FormControl(authorId));
    });
  }

  getCourseById(id: string): Observable<Course | undefined> {
    return this.coursesFacade.courses$.pipe(
      map(courses => courses.find(course => course.id === id))
    );
  }

  // factory function to check if there is at least one author added to course 
  minAuthorsValidator(control: AbstractControl) {
    const formArray = control as FormArray; // casting AbstractControl to FormArray
    return formArray.controls.length > 0 ? null : { noAuthors: true };
  }

  onSubmit() {
    if (this.courseForm.invalid) {
      return;
    }
    const formValue = this.courseForm.value;

    const course: Course = {
      id: this.isEditMode ? this.courseId : crypto.randomUUID(),
      title: formValue.title!,
      description: formValue.description!,
      duration: formValue.duration!,
      creationDate: new Date().toISOString(),
      authors: formValue.authors as string[]
    };

    if (this.isEditMode) {
      this.coursesFacade.editCourse(course, this.courseId);
    } else {
      this.coursesFacade.createCourse(course);
    }

    this.submitted = true;

    this.router.navigate(['/courses']);
  }

  onAddAuthor(author: Author) {
    const alreadyAdded = this.authors.value.includes(author.id);
    if (alreadyAdded) return;

    this.authors.push(new FormControl(author.id));
  }

  onCourseAuthorDelete(index: number) {
    this.authors.removeAt(index);
  }

  onCreateNewAuthor() {
    if (this.newAuthor.invalid || !this.newAuthor.value) {
      return;
    }

    this.coursesStore.createAuthor(this.newAuthor.value);

    this.newAuthor.reset();
  }

  onAuthorListDelete(author: Author) {
    //this.coursesStore.deleteAuthor(author.id);
  }

  onCancel() {
    this.router.navigate(["/courses"]);
  }

  getAuthorName(authorId: string, authors: Author[]): string {
    return authors.find(a => a.id === authorId)?.name || '';
  }
}
