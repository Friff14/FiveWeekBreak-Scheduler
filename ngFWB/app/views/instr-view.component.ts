import { Component } from '@angular/core';

//import { SectionListComponent } from './section-list.component';

@Component({
    selector: 'instr-view-app',
    moduleId: module.id,
    templateUrl: 'instr-view.component.html'
})
export class InstrViewComponent {
    pageTitle: string = 'Current Schedule';
}