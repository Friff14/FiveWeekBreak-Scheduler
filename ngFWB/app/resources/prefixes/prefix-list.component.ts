/**
 * Created by Tanner_2 on 12/5/2016.
 */
import { Component } from '@angular/core';

import { IPrefix } from './prefix';
import {PrefixService} from "./prefix.service";

@Component({
    moduleId: module.id,
    templateUrl: 'prefix-list.component.html'
})
export class PrefixListComponent {
    prefixes: IPrefix[];
    pageTitle: string = 'Prefix List';

    constructor(
        private _prefixService: PrefixService
    ){}

    ngOnInit(): void {
            this._prefixService.getPrefixes()
                .subscribe(prefixes => this.prefixes = prefixes,
                error => console.log('get error: ', error));
    }
}