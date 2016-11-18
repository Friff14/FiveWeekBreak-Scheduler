import { NgModule } from '@angular/core';
import { RouterModule} from '@angular/router';

import { CourseListComponent } from './course-list.component';

import { CourseService } from './course.service';

@NgModule({
  imports: [
    RouterModule.forChild([
      { path: 'courses', component: CourseListComponent },
     // { path: 'product/:id',
      //  canActivate: [ ProductDetailGuard],
       // component: ProductDetailComponent
      //}
    ])
  ],
  declarations: [
    CourseListComponent
  ],
  providers: [
    CourseService
  ]
})
export class CourseModule {}
