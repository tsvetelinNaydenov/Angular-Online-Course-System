import { Component } from '@angular/core';
import { Course } from './shared/models/course.interface';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'courses-app';
  username = 'Harry Potter'; //placehoder for testing purposes
  loginBtnText = 'Logout'; //placeholder for testing purposes

  // sample course for testing course-info component
  sampleCourse: Course = {
    id: '12345',
    title: 'Angular Fundamentals',
    description: "Angular is the best front-end framework!",
    creationDate: new Date,
    duration: 200,
    authors: ['Tsvetelin Naydenov', 'Rustam Levkovsky']
  }
}
