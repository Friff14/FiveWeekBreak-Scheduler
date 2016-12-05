import { Component, OnInit } from '@angular/core';

import { ISection } from './section';
import { Section } from './section.model';
import { SectionService } from './section.service';

@Component({
    moduleId: module.id,
    templateUrl: 'section-list.component.html'
})
export class SectionListComponent implements OnInit{
    pageTitle: string = 'Section List';
    sections: Section[];

    constructor(
        private _sectionService: SectionService
    ){}

    ngOnInit(): void {
        this._sectionService.getSections()
            .subscribe(sections => this.sections = sections,
                error => console.log('get error: ', error));
    }
}