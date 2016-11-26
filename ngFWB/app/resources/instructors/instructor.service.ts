import { Injectable } from '@angular/core';
import {Http, Response, RequestOptions, Headers} from '@angular/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/Rx';

import { IInstructor } from './instructor';
import {Instructor} from "./instructor.model";

@Injectable()
export class InstructorService {
    private _instructorUrl = 'http://localhost:8000/instructor/';

    constructor(private _http: Http) { }

    getInstructors(): Observable<IInstructor[]> {
        return this._http.get(this._instructorUrl)
            .map((response: Response) => <IInstructor[]> response.json())
            .do(data => console.log(JSON.stringify(data)))
            .catch(this.handleError);
    }

    getInstructor(id: number): Observable<IInstructor> {
        return this.getInstructors()
            .map((instructors: IInstructor[]) => instructors.find(i => i.instructor_id === id));
    }

    postInstructorForm(instructor: Instructor): Observable<any> {
        console.log('posting instructor: ', instructor);

        let body = JSON.stringify(instructor);
        let headers = new Headers({ 'Content-type': 'application/json', 'Access-Control-Allow-Origin': '*' });
        let options = new RequestOptions({ headers: headers });

        return this._http.post(this._instructorUrl, body, options)
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
