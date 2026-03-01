import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Course } from '@app/services/course.models';

@Component({
  selector: 'app-courses-list',
  templateUrl: './courses-list.component.html',
  styleUrls: ['./courses-list.component.scss']
})
export class CoursesListComponent {
  @Input() courses!: Course[];
  @Input() editable!: boolean;

  @Output() showCourse = new EventEmitter<Course>(); // event emitter for show course
  @Output() editCourse = new EventEmitter<Course>(); // event emitter for edit course
  @Output() deleteCourse = new EventEmitter<Course>(); // event emitter for delete course

  onShowCourse(course: Course){
    this.showCourse.emit(course); // re-emitt the event to upper component and pass the course from the context
  }

  onEditCourse(course: Course){
    this.editCourse.emit(course); // emitt the event from a click to upper component and pass the course from the context
  }
  onDeleteCourse(course: Course){
    this.deleteCourse.emit(course); // emitt the event from a click to upper component and pass the course from the context
  }
}
