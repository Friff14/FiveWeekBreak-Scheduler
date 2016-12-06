/**
 * Created by Tanner_2 on 12/5/2016.
 */
import { Component } from '@angular/core';

import { IPrefix } from './prefix';

@Component({
    moduleId: module.id,
    templateUrl: 'prefix-list.component.html'
})
export class PrefixListComponent {
    prefixes: IPrefix[];
    pageTitle: string = 'Prefix List';
}