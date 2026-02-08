import { Component } from '@angular/core';
import { Course } from '@app/shared/models/course.interface';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.scss']
})
export class CoursesComponent {
  // testing events
  showCourseHandler(course: Course){
    console.log(`Show course for: ${course.title}`);
  }
  editCourseHandler(course: Course){
    console.log(`Edit course for: ${course.title}`);
  }
  deleteCourseHandler(course: Course){
    console.log(`Delete course for: ${course.title}`);
  }

  //creating mock data for testing purposes
  sampleCourse: Course[] = [{
    id: '12345',
    title: 'Angular Fundamentals',
    description: "Angular is the best front-end framework!",
    creationDate: new Date,
    duration: 200,
    authors: ['Tsvetelin Naydenov', 'Rustam Levkovsky']
  },{
    id: '54321',
    title: 'Music Basics',
    description: "Learn the basics of music theory!",
    creationDate: new Date,
    duration: 500,
    authors: ['Sir Elton John', 'Freddie Mercury']
  }];
}
