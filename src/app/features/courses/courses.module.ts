import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CoursesComponent } from './courses.component';
import { CoursesListModule } from './courses-list/courses-list.module';
import { SharedModule } from '@app/shared/shared.module';
import { RouterModule, Routes } from '@angular/router';
import { CourseFormComponent } from '@app/shared/components';
import { CourseInfoComponent } from '../course-info/course-info.component';
import { AdminGuard } from '@app/user/guards/admin.guard';

const routes: Routes = [
  { path: "", component: CoursesComponent },
  { path: "add", component: CourseFormComponent, canActivate: [AdminGuard] },
  { path: ":id", component: CourseInfoComponent },
  { path: "edit/:id", component: CourseFormComponent, canActivate: [AdminGuard] }
]

@NgModule({
  declarations: [CoursesComponent],
  imports: [
    CommonModule,
    CoursesListModule,
    SharedModule,
    RouterModule.forChild(routes)
  ],
  exports: [
    CoursesComponent
  ]
})
export class CoursesModule {}
