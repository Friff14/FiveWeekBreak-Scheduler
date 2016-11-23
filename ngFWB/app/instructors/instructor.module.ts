import { NgModule } from '@angular/core';
import { RouterModule} from '@angular/router';

import { InstructorListComponent } from './instructor-list.component';
import { InstructorFormComponent } from './instructor-form.component';

import { InstructorService } from './instructor.service';

@NgModule({
  imports: [
    RouterModule.forChild([
      { path: 'courses', component: InstructorListComponent },
     // { path: 'product/:id',
      //  canActivate: [ ProductDetailGuard],
       // component: ProductDetailComponent
      //}
    ])
  ],
  declarations: [
    InstructorListComponent,
    InstructorFormComponent
  ],
  providers: [
    InstructorService
  ]
})
export class InstructorModule {}
