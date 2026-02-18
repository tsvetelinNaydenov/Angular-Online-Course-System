import { Component } from '@angular/core';
import {
  AbstractControl,
  FormArray,
  FormBuilder, FormControl, FormGroup,
  Validators
} from '@angular/forms';
import { FaIconLibrary } from '@fortawesome/angular-fontawesome';
import { fas } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-course-form',
  templateUrl: './course-form.component.html',
  styleUrls: ['./course-form.component.scss'],
})
export class CourseFormComponent {
  constructor(public fb: FormBuilder, public library: FaIconLibrary) {
    library.addIconPacks(fas);
  }
  courseForm = new FormGroup({
    title: new FormControl('', [Validators.required, Validators.minLength(2)]),
    description: new FormControl('', [Validators.required, Validators.minLength(2)]),
    duration: new FormControl(null, [Validators.required, Validators.min(0)]),
    newAuthor: new FormControl('', [Validators.minLength(2), Validators.pattern(/^[a-zA-Z0-9]+(?: [a-zA-Z0-9]+)*$/)]),
    authors: new FormArray([], [this.minAuthorsValidator.bind(this)]) // attaching validation function
  }, {
    updateOn: 'blur'
  });

  // factory function to check if there is at least one author added to course 
  minAuthorsValidator(control: AbstractControl) {
    const formArray = control as FormArray; // casting AbstractControl to FormArray
    return formArray.controls.length > 0 ? null : { noAuthors: true };
  }

  // getters to make it simpler in the template
  get title() { return this.courseForm.get('title')!; }
  get description() { return this.courseForm.get('description')!; }
  get duration() { return this.courseForm.get('duration')!; }
  get newAuthor() { return this.courseForm.get('newAuthor')!; }
  get authors() { return this.courseForm.get('authors')! as FormArray; }

  submitted = false;

  // mock data for authors for testing purposes
  mockedAuthorsList = [
    {
        id: '27cc3006-e93a-4748-8ca8-73d06aa93b6d',
        name: 'Vasiliy Dobkin'
    },
    {
        id: 'f762978b-61eb-4096-812b-ebde22838167',
        name: 'Nicolas Kim'
    },
    {
        id: 'df32994e-b23d-497c-9e4d-84e4dc02882f',
        name: 'Anna Sidorenko'
    },
    {
        id: '095a1817-d45b-4ed7-9cf7-b2417bcbf748',
        name: 'Valentina Larina'
    },
];

  onSubmit(){
    this.submitted = true;
  }

  onAddAuthor(author: any){
    this.authors.push(new FormControl(author)); // push new form control with added author's id into the form groups's authors form array
    this.mockedAuthorsList = this.mockedAuthorsList.filter(el => el.id !== author.id); // remove the author from the mock data
  }

  onCourseAuthorDelete(author: any, index: number) {
    this.authors.removeAt(index); // removes author from course authors with the provided index
    this.mockedAuthorsList.push(author);
  }

  onCreateNewAuthor(){
    const authorName = this.newAuthor.value;
    if(this.newAuthor.invalid || !authorName){
      return;
    }

    const newAuthorObj = {
      id: crypto.randomUUID(),
      name: authorName
    }

    this.mockedAuthorsList.push(newAuthorObj);
    this.newAuthor.reset();
    console.log(newAuthorObj);
  }

  onAuthorListDelete(author: {id: string, name: string}){
    this.mockedAuthorsList = this.mockedAuthorsList.filter(
      el => el.id !== author.id
    );
  }
}
