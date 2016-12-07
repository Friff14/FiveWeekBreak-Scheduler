import { NgModule } from '@angular/core';
import { RouterModule} from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { RoomListComponent } from './room-list.component';
import { RoomFormComponent } from './room-form.component';


import { RoomService } from './room.service';

@NgModule({
  imports: 
  [
      CommonModule,
      FormsModule,
      RouterModule.forChild([
          { path: 'roomList', component: RoomListComponent },
          { path: 'roomForm/edit/:id', component: RoomFormComponent},
          { path: 'roomForm', component: RoomFormComponent },
          
        // { path: 'product/:id',
        //  canActivate: [ ProductDetailGuard],
        // component: ProductDetailComponent
        //}
        ])
  ],
  declarations: 
  [
    RoomListComponent,
    RoomFormComponent,
  ],
  exports:
  [
      RoomListComponent,
      RoomFormComponent
  ],
  providers: 
  [
    RoomService
  ]
})
export class RoomModule {}
