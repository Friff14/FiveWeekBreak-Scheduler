import { Component } from '@angular/core';
import {FormsModule, NgForm} from '@angular/forms';
import { Location } from '@angular/common';
import { Section } from './section.model'
import {SectionService} from "./section.service";
import {ActivatedRoute} from '@angular/router';
import {ICourse} from "../courses/course";
import {IInstructor} from "../instructors/instructor";
import {ISemester} from "../semesters/semester";
import {IRoom} from "../rooms/room";
import {SectionTime} from "./section-time.model";

@Component({
    selector: 'section-form',
    moduleId: module.id,
    templateUrl: 'section-form.component.html'
})
export class SectionFormComponent {
    pageTitle: string = 'Section Form';
    courses: ICourse[];
    instructors: IInstructor[];
    semesters: ISemester[];
    rooms: IRoom[];
    model = new Section(null, ' ', null, null, null, null, null, null, null);
    sectiontime = new SectionTime(null, null, null);
    starttime: string;
    endtime: string;
    days: boolean[] = [false, false, false, false, false, false];
    day_strings: string[] = ['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];
    id: number;

    constructor(
        private sectionService: SectionService,
        private location: Location,
        private _route: ActivatedRoute) {
    }
//TODO: EDIT SECTION POPULATE FORM
    submitForm(form: NgForm) {
        this.model.schedule_times = [];
        console.log(this.model.schedule_times);
        for(let i = 0; i < this.days.length; i++){
            if (this.days[i]){
                this.model.schedule_times.push(new SectionTime(this.starttime, this.endtime, this.day_strings[i]))
            }
        }
        console.log(this.model); this.sectionService.postSectionForm(this.model)
            .subscribe(
                data => console.log('success: ', data),
                err => console.log('error: ', err)
            )
    }

    ngOnInit(): void {
        this.sectionService.getCourses()
                .subscribe(courses => this.courses = courses,
                    error => console.log('get error: ', error));
        this.sectionService.getInstructors()
                .subscribe(instructors => this.instructors = instructors,
                    error => console.log('get error: ', error));
        this.sectionService.getSemesters()
                .subscribe(semesters => this.semesters = semesters,
                    error => console.log('get error: ', error));
        this.sectionService.getRooms()
                .subscribe(rooms => this.rooms = rooms,
                    error => console.log('get error: ', error));



        this.id = +this._route.snapshot.params['id'];
        if (this.id) {
            this.pageTitle = `Edit Section: ${this.id}`;

            this.sectionService.getSection(this.id)
                .subscribe(prefix => this.model = prefix,
                    error => console.log('get error: ', error));
        }
    }
    goBack(): void {
        this.location.back();
    }

    
}