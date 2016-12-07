/**
 * Created by Tanner_2 on 11/27/2016.
 */
import { NgModule } from '@angular/core';
import { RouterModule} from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { SemesterListComponent } from './semester-list.component';
import { SemesterFormComponent } from './semester-form.component';

import { SemesterService } from './semester.service';

@NgModule({
  imports:
  [
    CommonModule,
    FormsModule,
    RouterModule.forChild([
        { path: 'semesterList', component: SemesterListComponent },
        { path: 'semesterForm', component: SemesterFormComponent },
        { path: 'semesterForm/edit/:id', component: SemesterFormComponent },
        { path: 'editSemester', component: SemesterFormComponent },
        { path: 'remove', component: SemesterFormComponent }
    ])
  ],
  declarations:
  [
      SemesterListComponent,
      SemesterFormComponent
  ],
  exports:
  [
      SemesterFormComponent
  ],
  providers:
  [
      SemesterService
  ]
})
export class SemesterModule {}