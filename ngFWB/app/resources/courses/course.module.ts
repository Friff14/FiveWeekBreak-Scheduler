import { NgModule } from '@angular/core';
import { RouterModule} from '@angular/router';
import { CommonModule } from '@angular/common';

import { CourseListComponent } from './course-list.component';
import { CourseFormComponent } from './course-form.component';

import { CourseService } from './course.service';

@NgModule({
  imports: 
  [ 
    CommonModule,
    RouterModule.forChild([
      { path: 'courseList', component: CourseListComponent },
     // { path: 'product/:id',
      //  canActivate: [ ProductDetailGuard],
       // component: ProductDetailComponent
      //}
      { path: 'addCourse', component: CourseFormComponent },
      { path: 'editCourse', component: CourseFormComponent },
      { path: 'removeCourse', component: CourseListComponent }
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
