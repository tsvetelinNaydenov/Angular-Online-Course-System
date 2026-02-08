import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CoursesComponent } from './courses.component';
import { CoursesListModule } from './courses-list/courses-list.module';
import { SharedModule } from '@app/shared/shared.module';


@NgModule({
  declarations: [CoursesComponent],
  imports: [
    CommonModule,
    CoursesListModule,
    SharedModule
  ],
  exports: [
    CoursesComponent
  ]
})
export class CoursesModule {}
