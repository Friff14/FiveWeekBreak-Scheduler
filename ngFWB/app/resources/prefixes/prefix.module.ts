/**
 * Created by bpalm_000 on 11/28/2016.
 */
import { NgModule } from '@angular/core';
import { RouterModule} from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { PrefixFormComponent } from './prefix-form.component';

import { PrefixService } from './prefix.service';

@NgModule({
  imports:
  [
    CommonModule,
    FormsModule,
    RouterModule.forChild([
      { path: 'prefixForm', component: PrefixFormComponent }
    // { path: 'product/:id',
    //  canActivate: [ ProductDetailGuard],
      // component: ProductDetailComponent
    //}
    ])
  ],
  declarations:
  [
    PrefixFormComponent
  ],
  exports:
  [
    PrefixFormComponent
  ],
  providers:
  [
    PrefixService
  ]
})
export class PrefixModule {}