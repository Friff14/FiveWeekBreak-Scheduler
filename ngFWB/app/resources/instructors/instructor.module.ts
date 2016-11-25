import { NgModule } from '@angular/core';
import { RouterModule} from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { InstructorListComponent } from './instructor-list.component';
import { InstructorFormComponent } from './instructor-form.component';

import { InstructorService } from './instructor.service';

@NgModule({
  imports:
  [
    CommonModule,
    FormsModule,
    RouterModule.forChild([
      { path: 'instructorList', component: InstructorListComponent },
      { path: 'instructorForm', component: InstructorFormComponent }
    // { path: 'product/:id',
    //  canActivate: [ ProductDetailGuard],
      // component: ProductDetailComponent
    //}
    ])
  ],
  declarations: 
  [
    InstructorListComponent,
    InstructorFormComponent
  ],
  exports: 
  [ 
    InstructorListComponent, 
    InstructorFormComponent 
  ],
  providers: 
  [
    InstructorService
  ]
})
export class InstructorModule {}
