// The imports we need for this module.
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

// The imports from the components we have made.
import { AppComponent } from './app.component';
import { CourseListComponent } from './courses/course-list.component';
import { CourseService } from './courses/course.service';

// The NgModule decorator for metadata.
@NgModule({
    imports: [ BrowserModule, HttpModule, FormsModule ],
    declarations: [ AppComponent, CourseListComponent ],
    bootstrap: [ AppComponent ],
    providers: [ CourseService ]
})
export class AppModule { }