// The imports we need for this module.
import { NgModule } from '@angular/core';
// Angular imports
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';

// The imports from the modules we have made.
import { AppComponent } from './app.component';
import { CourseModule } from './resources/courses/course.module';
import { InstructorModule } from './resources/instructors/instructor.module';
import { RoomModule } from './resources/rooms/room.module';

// Home component
import { HomeComponent } from './home/home.component';

import { SectionFormComponent } from './resources/sections/section-form.component';

// The NgModule decorator for metadata.
@NgModule({
    imports: [ BrowserModule, 
                HttpModule, 
               RouterModule.forRoot([
                { path: 'home', component: HomeComponent },
                { path: 'sectionForm', component: SectionFormComponent },             
                { path: '', redirectTo: 'home', pathMatch: 'full' },
                { path: '**', redirectTo: 'home', pathMatch: 'full' }
                ]), 
                CourseModule,
                InstructorModule,
                RoomModule
                 ],
    declarations: [ AppComponent, 
                    HomeComponent,
                    SectionFormComponent,
                      ],
    bootstrap: [ AppComponent ]
})
export class AppModule { }