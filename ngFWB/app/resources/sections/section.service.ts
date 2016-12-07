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
    private _sectionUrl = 'http://localhost:8000/section/';

    constructor(private _http: Http) { }

    // For the section list component
   // getSections(): Observable<ISection[]> {
     //   return this._http.get(this._sectionUrl)
       //     .map((response: Response) => <ISection[]> response.json())
         //   .do(data => console.log(JSON.stringify(data)))
           // .catch(this.handleError);
   // }

    //getSection(id: number): Observable<ISection> {
      //  return this.getSections()
        //    .map((sections: ISection[]) => sections.find(i => i.section_id === id));
    //}

    getCourses(): Observable<ICourse[]> {
        return this._http.get('http://localhost:8000/course/list')
            .map((response: Response) => <ICourse[]> response.json())
            .do(data => console.log(JSON.stringify(data)))
            .catch(this.handleError);
    }

    getInstructors(): Observable<IInstructor[]> {
      return this._http.get('http://localhost:8000/instructor/list')
        .map((response: Response) => <IInstructor[]> response.json())
        .do(data => console.log(JSON.stringify(data)))
        .catch(this.handleError);
    }

    getSemesters(): Observable<ISemester[]> {
      return this._http.get('http://localhost:8000/semester/list')
        .map((response: Response) => <ISemester[]> response.json())
        .do(data => console.log(JSON.stringify(data)))
        .catch(this.handleError);
    }

    getRooms(): Observable<IRoom[]> {
      return this._http.get('http://localhost:8000/room/list')
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
        console.error('post error: ', error);
        return Observable.throw(error.json().error || 'Server error');
    }
}
