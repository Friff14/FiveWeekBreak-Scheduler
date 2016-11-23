import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

import { IInstructor } from './instructor';

@Injectable()
export class InstructorService {
    private _instructorUrl = 'http://localhost:8000/course/1';

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

    private handleError(error: Response) {
        // in a real world app, we may send the server to some remote logging infrastructure
        // instead of just logging it to the console
        console.error(error);
        return Observable.throw(error.json().error || 'Server error');
    }
}
