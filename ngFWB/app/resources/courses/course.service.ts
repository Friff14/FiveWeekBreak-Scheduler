import { Injectable } from '@angular/core';
import {Http, Response, RequestOptions, Headers} from '@angular/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/Rx';

import { ICourse } from './course';
import {Course} from "./course.model";

@Injectable()
export class CourseService {
    private _courseUrl = 'http://localhost:8000/course/';

    constructor(private _http: Http) { }

    getCourses(): Observable<ICourse[]> {
        return this._http.get(this._courseUrl)
            .map((response: Response) => <ICourse[]> response.json())
            .do(data => console.log(JSON.stringify(data)))
            .catch(this.handleError);
    }

    getCourse(id: number): Observable<ICourse> {
        return this.getCourses()
            .map((courses: ICourse[]) => courses.find(i => i.course_id === id));
    }

    postCourseForm(course: Course): Observable<any> {
        console.log('posting course: ', course);

        let body = JSON.stringify(course);
        let headers = new Headers({ 'Content-type': 'application/json'});
        let options = new RequestOptions({ headers: headers });

        return this._http.post(this._courseUrl, body, options)
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
