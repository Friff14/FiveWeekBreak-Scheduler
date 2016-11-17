// imports the component to be used as the decorator.
import { Component } from '@angular/core';

// The function decorator that determines the selector directive as well as the template (metadata)
@Component({
    selector: 'fwb-app',
    templateUrl: './app/app.component.html'
})
// The class itself. Export keyword allows it to be used in other components.
export class AppComponent { 
    appTitle: string = 'Five Week Break Scheduler'
}