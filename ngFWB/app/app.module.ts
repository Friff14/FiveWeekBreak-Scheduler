// The imports we need for this module.
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

// The imports from the components we have made.
import { AppComponent } from './app.component';

// The NgModule decorator for metadata.
@NgModule({
    imports: [ BrowserModule ],
    declarations: [ AppComponent ],
    bootstrap: [ AppComponent ]
})
export class AppModule { }