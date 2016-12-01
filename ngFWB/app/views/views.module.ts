import { NgModule } from '@angular/core';
import { RouterModule} from '@angular/router';
import { CommonModule } from '@angular/common';

//import { HomeViewComponent } from './home-view.component';
import { InstrViewComponent } from './instr-view.component';
import { RoomViewComponent } from './room-view.component';
import { CourseViewComponent } from './course-view.component';

//import { SectionModule } from './section.

import { HomeService } from './home.service';

@NgModule({
  imports: 
  [ 
    CommonModule,
    RouterModule.forChild([
      //{ path: 'homeView', component: HomeViewComponent },
      { path: 'instrView', component: InstrViewComponent },
      { path: 'roomView', component: RoomViewComponent },
      { path: 'courseView', component: RoomViewComponent }
    ])
  ],
  declarations: 
  [
    //HomeViewComponent,
    InstrViewComponent,
    RoomViewComponent,
    CourseViewComponent
  ],
  exports: 
  [ 
    //HomeViewComponent, 
    InstrViewComponent,
    RoomViewComponent,
    CourseViewComponent 
  ],
  providers: 
  [
    HomeService
  ]
})
export class ViewsModule {}
