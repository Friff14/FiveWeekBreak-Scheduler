import { Component, OnInit } from '@angular/core';

import { Section } from '../resources/sections/section.model';
import { SectionService } from '../resources/sections/section.service';

@Component({
    selector: 'instr-view-app',
    moduleId: module.id,
    templateUrl: 'instr-view.component.html'
})
export class InstrViewComponent implements OnInit{
    pageTitle: string = 'Current Schedule';
    sections: Section[];

    constructor(
        private _sectionService: SectionService
    ){}

    ngOnInit(): void {
        this._sectionService.getSections()
            .subscribe(sections => this.sections = sections)
    }
}