import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

import { ICourse } from './course';

@Injectable()
export class CourseService {
    private _courseUrl = 'http://localhost:8000/course/1';

    constructor(private _http: Http) { }

    getCourses(): Observable<ICourse[]> {
        return this._http.get(this._courseUrl)
            .map((response: Response) => <ICourse[]> response.json())
            .do(data => console.log(JSON.stringify(data)))
            .catch(this.handleError);
    }

    getCourse(id: number): Observable<ICourse> {
        return this.getCourses()
            .map((courses: ICourse[]) => courses.find(c => c.course_id === id));
    }

    private handleError(error: Response) {
        // in a real world app, we may send the server to some remote logging infrastructure
        // instead of just logging it to the console
        console.error(error);
        return Observable.throw(error.json().error || 'Server error');
    }
}
