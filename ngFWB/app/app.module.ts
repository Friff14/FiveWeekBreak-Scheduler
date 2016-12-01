// The imports we need for this module.
import { NgModule } from '@angular/core';
// Angular imports
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';

// The imports from the modules we have made.
import { AppComponent } from './app.component';
import { CourseModule } from './resources/courses/course.module';
import { InstructorModule } from './resources/instructors/instructor.module';
import { RoomModule } from './resources/rooms/room.module';
import { SectionModule } from './resources/sections/section.module';
import { SemesterModule } from './resources/semesters/semester.module';
import { BuildingModule } from './resources/buildings/building.module';
import { CampusModule } from './resources/campuses/campus.module';
import { PrefixModule } from './resources/prefixes/prefix.module';
import { ViewsModule } from './views/views.module';


// Home component
import { HomeViewComponent } from './views/home-view.component';
import { InstrViewComponent } from './views/instr-view.component';

import { SectionFormComponent } from './resources/sections/section-form.component';

// The NgModule decorator for metadata.
@NgModule({
    imports: 
    [ 
        BrowserModule,
        FormsModule,
        HttpModule, 
        RouterModule.forRoot([
            { path: 'home', component: HomeViewComponent },
            //{ path: 'instrView', component: InstrViewComponent},       
            { path: '', redirectTo: 'home', pathMatch: 'full' },
            { path: '**', redirectTo: 'home', pathMatch: 'full' }
        ]), 
        CourseModule,
        InstructorModule,
        RoomModule,
        SectionModule,
        SemesterModule,
        BuildingModule,
        CampusModule,
        PrefixModule,
        ViewsModule
    ],
    declarations: 
    [
         AppComponent, 
         HomeViewComponent,
         //InstrViewComponent
    ],
    providers:
    [
        {
            provide: LocationStrategy, 
            useClass: HashLocationStrategy
        }
    ],
    bootstrap: 
    [ 
        AppComponent 
    ]
})
export class AppModule { }