// This will be the app component that 

// imports the component to be used as the decorator.
import { Component } from '@angular/core';

// The function decorator that determines the selector directive as well as the template (metadata)
@Component({
    selector: 'fwb-app',
    template: '<h1>{{ appTitle }}</h1>'
})
// The class itself. Export keyword allows it to be used in other components.
export class AppComponent { 
    appTitle: string = 'Five Week Break Scheduler'
}