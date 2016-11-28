/**
 * Created by doebo on 11/27/2016.
 */
import { NgModule } from '@angular/core';
import { RouterModule} from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { BuildingFormComponent } from './building-form.component';

import { BuildingService } from './building.service';

@NgModule({
  imports:
  [
      CommonModule,
      FormsModule,
      RouterModule.forChild([
          { path: 'buildingForm', component: BuildingFormComponent }

        // { path: 'product/:id',
        //  canActivate: [ ProductDetailGuard],
        // component: ProductDetailComponent
        //}
        ])
  ],
  declarations:
  [
    BuildingFormComponent
  ],
  exports:
  [
      BuildingFormComponent
  ],
  providers:
  [
    BuildingService
  ]
})
export class BuildingModule {}

