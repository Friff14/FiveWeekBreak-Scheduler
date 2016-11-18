// The imports we need for this module.
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';

// The imports from the components we have made.
import { AppComponent } from './app.component';
//import { ResourceModule } from './resources/resource.module';
//import { CourseModule } from './courses/course.module';
import { HomeComponent } from './home/home.component';
import { CourseListComponent } from './courses/course-list.component';
import { CourseFormComponent } from './forms/course-form.component';
import { CalendarComponent } from './calendar/calendar.component';
import { CourseService } from './courses/course.service';
//import { CourseFormComponent } from './courses/course-form.component';

// The NgModule decorator for metadata.
@NgModule({
    imports: [ BrowserModule, 
                HttpModule, 
               RouterModule.forRoot([
                { path: 'home', component: HomeComponent },
                { path: 'courses', component: CourseFormComponent },
                { path: 'courseList', component: CourseListComponent },
                { path: 'calendar', component: CalendarComponent },
                { path: 'add', component: CourseFormComponent },
                { path: '', redirectTo: 'home', pathMatch: 'full' },
                { path: '**', redirectTo: 'home', pathMatch: 'full' }
                ]), 
              // CourseModule
                 ],
    declarations: [ AppComponent, 
                    HomeComponent,
                    CourseListComponent,
                    CourseFormComponent,
                    CalendarComponent
                      ],
    bootstrap: [ AppComponent ],
    providers: [ CourseService ]
})
export class AppModule { }