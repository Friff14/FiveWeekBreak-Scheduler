/**
 * Created by adsal on 11/26/2016.
 */
import { NgModule } from '@angular/core';
import { RouterModule} from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { CampusFormComponent } from './campus-form.component';

import { CampusService } from './campus.service';

@NgModule({
  imports:
  [
    CommonModule,
    FormsModule,
    RouterModule.forChild([
      { path: 'campusForm', component: CampusFormComponent }
    // { path: 'product/:id',
    //  canActivate: [ ProductDetailGuard],
      // component: ProductDetailComponent
    //}
    ])
  ],
  declarations:
  [
    CampusFormComponent
  ],
  exports:
  [
    CampusFormComponent
  ],
  providers:
  [
    CampusService
  ]
})
export class CampusModule {}
