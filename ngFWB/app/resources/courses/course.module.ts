import { NgModule } from '@angular/core';
import { RouterModule} from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { CourseListComponent } from './course-list.component';
import { CourseFormComponent } from './course-form.component';

import { CourseService } from './course.service';

@NgModule({
  imports: 
  [ 
    CommonModule,
    FormsModule,
    RouterModule.forChild([
      { path: 'courseList', component: CourseListComponent },
      { path: 'courseForm', component: CourseFormComponent },
      { path: 'courseForm/edit/:id', component: CourseFormComponent }
    ])
  ],
  declarations: 
  [
    CourseListComponent,
    CourseFormComponent
  ],
  exports: 
  [ 
    CourseListComponent, 
    CourseFormComponent 
  ],
  providers: 
  [
    CourseService
  ]
})
export class CourseModule {}
