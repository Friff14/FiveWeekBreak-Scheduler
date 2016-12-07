import { Injectable } from '@angular/core';
import {Http, Response, RequestOptions, Headers, Jsonp } from '@angular/http';


import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/Rx';

import { IInstructor } from './instructor';
import {Instructor} from "./instructor.model";

@Injectable()
export class InstructorService {
    //private _instructorUrl = 'http://localhost:8000/instructor/';
    //private _otherInstructorUrl = 'mockapi/mock-instructors.json';
    private _instructorUrl = 'http://friff14.pythonanywhere.com/instructor/';

    constructor(private _http: Http, private jsonp: Jsonp) { }


   getInstructors(): Observable<IInstructor[]> {
      return this._http.get(this._instructorUrl)
        .map((response: Response) => <IInstructor[]> response.json())
        .do(data => console.log(JSON.stringify(data)))
        .catch(this.handleError);
    }

    // getInstructors(): Observable<IInstructor[]> {
    //   return this._http.get(this._otherInstructorUrl)
    //     .map(this.extractData)
    //     //.do(data => console.log(JSON.stringify(data)))
    //     .catch(this.handleError);
    // }

    getInstructor(id: number): Observable<IInstructor> {
        console.log(this._instructorUrl + String(id));
        return this._http.get(this._instructorUrl + String(id))
            .map((response: Response) => <IInstructor> response.json())
            .do(data => console.log(JSON.stringify(data)))
            .catch(this.handleError);
    }


    putInstructorForm(instructor: Instructor): Observable<any> {
        console.log('putting instructor: ', instructor);

        let body = JSON.stringify(instructor);
        let headers = new Headers({ 'Content-type': 'application/json'});
        let options = new RequestOptions({ headers: headers });

        return this._http.put(this._instructorUrl, body, options)
            .map(this.extractData)
            .catch(this.handleError);
    }

    postInstructorForm(instructor: Instructor): Observable<any> {
        console.log('posting instructor: ', instructor);

        let body = JSON.stringify(instructor);
        let headers = new Headers({ 'Content-type': 'application/json'});
        let options = new RequestOptions({ headers: headers });

        return this._http.post(this._instructorUrl, body, options)
            .map(this.extractData)
            .catch(this.handleError);
    }

    private extractData(res: Response) {
        let body = res.json();
        return body.fields || { };
    }

    // private handleError(error: Response) {
    //     // in a real world app, we may send the server to some remote logging infrastructure
    //     // instead of just logging it to the console
    //     console.error('post error: ', error);
    //     return Observable.throw(error.json().error || 'Server error');
    // }

    private handleError (error: Response | any) {
        let errMsg: string;
        if (error instanceof Response) {
            const body = error.json() || '';
            const err = body.error || JSON.stringify(body);
            errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
        }
        else {
            errMsg = error.message ? error.message : error.toString(); 
        }
        console.error(errMsg);
        return Observable.throw(errMsg);
    }

    // private handleError(error: Response) {
    //     console.error('post error: ', error);
    //     return Observable.throw(error.json().error || 'Server error');
    // }

}
