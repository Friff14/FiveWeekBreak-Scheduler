/**
 * Created by bpalm_000 on 11/28/2016.
 */
import { NgModule } from '@angular/core';
import { RouterModule} from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { PrefixFormComponent } from './prefix-form.component';
import { PrefixListComponent } from './prefix-list.component';

import { PrefixService } from './prefix.service';

@NgModule({
  imports:
  [
    CommonModule,
    FormsModule,
    RouterModule.forChild([
        { path: 'prefixForm', component: PrefixFormComponent },
        { path: 'prefixForm/edit/:id', component: PrefixFormComponent},
        { path: 'prefixList', component: PrefixListComponent }
    ])
  ],
  declarations:
  [
    PrefixFormComponent,
    PrefixListComponent
  ],
  exports:
  [
    PrefixFormComponent,
    PrefixListComponent
  ],
  providers:
  [
    PrefixService
  ]
})
export class PrefixModule {}