/**
 * Created by Tanner_2 on 11/27/2016.
 */
import { NgModule } from '@angular/core';
import { RouterModule} from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { SemesterFormComponent } from './semester-form.component';

import { SemesterService } from './semester.service';

@NgModule({
  imports:
  [
    CommonModule,
    FormsModule,
    RouterModule.forChild([
      { path: 'semesterForm', component: SemesterFormComponent }
    // { path: 'product/:id',
    //  canActivate: [ ProductDetailGuard],
      // component: ProductDetailComponent
    //}
    ])
  ],
  declarations:
  [
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