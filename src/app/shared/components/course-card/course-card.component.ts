import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Course } from '@app/services/course.models';

@Component({
  selector: 'app-course-card',
  templateUrl: './course-card.component.html',
  styleUrls: ['./course-card.component.scss']
})
export class CourseCardComponent {
  @Input() course!: Course;
  @Input() isEditable!: boolean;
  @Output() clickOnShow = new EventEmitter(); // create new clickOnShow event

  onShowClick(){
    this.clickOnShow.emit(); // emit the event to the parent component
  }
}
