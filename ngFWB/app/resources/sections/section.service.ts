import { Injectable } from '@angular/core';
import {Http, Response, RequestOptions, Headers} from '@angular/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/Rx';

import { ISection } from './section';
import {Section} from "./section.model";
import {ICourse} from "../courses/course";
import {IInstructor} from "../instructors/instructor";
import {ISemester} from "../semesters/semester";
import {IRoom} from "../rooms/room";

@Injectable()
export class SectionService {
    //private _sectionUrl = 'http://localhost:8000/section/';
    private _sectionUrl = 'http://friff14.pythonanywhere.com/section/';
    private _sectionCourseUrl = 'http://friff14.pythonanywhere.com/course/list';
    private _sectionInstrUrl = 'http://friff14.pythonanywhere.com/instructor/list';
    private _sectionSemUrl = 'http://friff14.pythonanywhere.com/semester/list';
    private _sectionRoomUrl = 'http://friff14.pythonanywhere.com/room/list';

    constructor(private _http: Http) { }

    getCourses(): Observable<ICourse[]> {
        //return this._http.get('http://localhost:8000/course/list')
        return this._http.get(this._sectionCourseUrl)
            .map((response: Response) => <ICourse[]> response.json())
            .do(data => console.log(JSON.stringify(data)))
            .catch(this.handleError);
    }

    getInstructors(): Observable<IInstructor[]> {
      //return this._http.get('http://localhost:8000/instructor/list')
      return this._http.get(this._sectionInstrUrl)
        .map((response: Response) => <IInstructor[]> response.json())
        .do(data => console.log(JSON.stringify(data)))
        .catch(this.handleError);
    }

    getSemesters(): Observable<ISemester[]> {
      //return this._http.get('http://localhost:8000/semester/list')
      return this._http.get(this._sectionSemUrl)
        .map((response: Response) => <ISemester[]> response.json())
        .do(data => console.log(JSON.stringify(data)))
        .catch(this.handleError);
    }

    getRooms(): Observable<IRoom[]> {
      //return this._http.get('http://localhost:8000/room/list')
      return this._http.get(this._sectionRoomUrl)
        .map((response: Response) => <IRoom[]> response.json())
        .do(data => console.log(JSON.stringify(data)))
        .catch(this.handleError);
    }

    getSections(): Observable<Section[]> {
        return this._http.get(this._sectionUrl)
            .map((response: Response) => <Section[]> response.json())
            .do(data => console.log(JSON.stringify(data)))
            .catch(this.handleError);
    }

    getSection(id: number): Observable<Section> {
        return this.getSections()
            .map((sections: Section[]) => sections.find(i => i.section_id === id));
    }

    postSectionForm(section: Section): Observable<any> {
        console.log('posting section: ', section);

        let body = JSON.stringify(section);
        let headers = new Headers({ 'Content-type': 'application/json'});
        let options = new RequestOptions({ headers: headers });

        return this._http.post(this._sectionUrl, body, options)
            .map(this.extractData)
            .catch(this.handleError);
    }

    private extractData(res: Response) {
        let body = res.json();
        return body.fields || { };
    }

    private handleError(error: Response) {
        // in a real world app, we may send the server to some remote logging infrastructure
        // instead of just logging it to the console
        alert("You have a scheduling conflict!");
        console.error('post error: ', error);
        return Observable.throw(error.json().error || 'Server error');
    }
}
