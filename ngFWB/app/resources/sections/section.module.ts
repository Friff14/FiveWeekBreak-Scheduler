import { NgModule } from '@angular/core';
import { RouterModule} from '@angular/router';
import { CommonModule } from '@angular/common';

import { SectionListComponent } from './section-list.component';
import { SectionFormComponent } from './section-form.component';

import { SectionService } from './section.service';

@NgModule({
  imports: 
  [ 
    CommonModule,
    RouterModule.forChild([
      { path: 'courseList', component: SectionListComponent },
     // { path: 'product/:id',
      //  canActivate: [ ProductDetailGuard],
       // component: ProductDetailComponent
      //}
      { path: 'sectionForm', component: SectionFormComponent },
      { path: 'editCourse', component: SectionFormComponent },
      { path: 'removeCourse', component: SectionListComponent }
    ])
  ],
  declarations: 
  [
    SectionListComponent,
    SectionFormComponent
  ],
  exports: 
  [ 
    SectionListComponent, 
    SectionFormComponent 
  ],
  providers: 
  [
    SectionService
  ]
})
export class SectionModule {}