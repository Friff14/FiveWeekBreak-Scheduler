// The imports we need for this module.
import { NgModule } from '@angular/core';
// Angular imports
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';

// The imports from the modules we have made.
import { AppComponent } from './app.component';
import { CourseModule } from './courses/course.module';
import { InstructorModule } from './instructors/instructor.module';
import { RoomModule } from './rooms/room.module';

// Until modules connections are taken care of, use components for now.
import { HomeComponent } from './home/home.component';
import { CourseListComponent } from './courses/course-list.component';
import { RoomFormComponent } from './rooms/room-form.component';
import { RoomListComponent } from './rooms/room-list.component';
import { InstructorListComponent } from './instructors/instructor-list.component';

import { CourseFormComponent } from './courses/course-form.component';
import { SectionFormComponent } from './sections/section-form.component';
import { CourseService } from './courses/course.service';

// The NgModule decorator for metadata.
@NgModule({
    imports: [ BrowserModule, 
                HttpModule, 
               RouterModule.forRoot([
                { path: 'home', component: HomeComponent },
                { path: 'courseForm', component: CourseFormComponent },
                { path: 'courseList', component: CourseListComponent },
                { path: 'instructorList', component: InstructorListComponent },
                { path: 'roomList', component: RoomListComponent },
                { path: 'sectionForm', component: SectionFormComponent },
                { path: 'addCourse', component: CourseFormComponent },                
                { path: '', redirectTo: 'home', pathMatch: 'full' },
                { path: '**', redirectTo: 'home', pathMatch: 'full' }
                ]), 
                //CourseModule
                 ],
    declarations: [ AppComponent, 
                    HomeComponent,
                    CourseListComponent,
                    InstructorListComponent,
                    CourseFormComponent,
                    SectionFormComponent,
                    RoomFormComponent,
                    RoomListComponent
                      ],
    bootstrap: [ AppComponent ],
    providers: [ CourseService ]
})
export class AppModule { }