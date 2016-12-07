/**
 * Created by doebo on 11/27/2016.
 */
import { NgModule } from '@angular/core';
import { RouterModule} from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { BuildingFormComponent } from './building-form.component';
import { BuildingListComponent } from './building-list.component';

import { BuildingService } from './building.service';

@NgModule({
  imports:
  [
      CommonModule,
      FormsModule,
      RouterModule.forChild([
          { path: 'buildingForm', component: BuildingFormComponent },
          { path: 'buildingForm/edit/:id', component: BuildingFormComponent},
          { path: 'buildingList', component: BuildingListComponent }
        ])
  ],
  declarations:
  [
      BuildingFormComponent,
      BuildingListComponent
  ],
  exports:
  [
      BuildingFormComponent,
      BuildingListComponent
  ],
  providers:
  [
    BuildingService
  ]
})
export class BuildingModule {}

