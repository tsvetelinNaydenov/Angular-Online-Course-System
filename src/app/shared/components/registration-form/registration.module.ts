import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { SharedModule } from '@app/shared/shared.module';
import { RegistrationFormComponent } from './registration-form.component';

const routes: Routes = [
  {
    path: '',
    component: RegistrationFormComponent
  }
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    FormsModule,
    SharedModule,
    RouterModule.forChild(routes)
  ]
})
export class RegistrationModule {}