import { NgModule } from '@angular/core';
import { RouterModule} from '@angular/router';

import { RoomListComponent } from './room-list.component';
import { RoomFormComponent } from './room-form.component';

import { RoomService } from './room.service';

@NgModule({
  imports: [
    RouterModule.forChild([
      { path: 'courses', component: RoomListComponent },
     // { path: 'product/:id',
      //  canActivate: [ ProductDetailGuard],
       // component: ProductDetailComponent
      //}
    ])
  ],
  declarations: [
    RoomListComponent,
    RoomFormComponent
  ],
  providers: [
    RoomService
  ]
})
export class RoomModule {}
