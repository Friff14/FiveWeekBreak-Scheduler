/**
 * Created by adsal on 11/26/2016.
 */
import { NgModule } from '@angular/core';
import { RouterModule} from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { CampusFormComponent } from './campus-form.component';
import { CampusListComponent } from './campus-list.component';

import { CampusService } from './campus.service';

@NgModule({
  imports:
  [
    CommonModule,
    FormsModule,
    RouterModule.forChild([
        { path: 'campusForm', component: CampusFormComponent },
        { path: 'campusForm/edit/:id', component: CampusFormComponent },
        { path: 'campusList', component: CampusListComponent }
    ])
  ],
  declarations:
  [
      CampusFormComponent,
      CampusListComponent
  ],
  exports:
  [
      CampusFormComponent,
      CampusListComponent
  ],
  providers:
  [
      CampusService
  ]
})
export class CampusModule {}
