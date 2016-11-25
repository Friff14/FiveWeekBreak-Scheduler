import { Component } from '@angular/core';

import { ISection } from './section';

@Component({
    moduleId: module.id,
    templateUrl: 'section-list.component.html'
})
export class SectionListComponent {
    sections: ISection[];
}