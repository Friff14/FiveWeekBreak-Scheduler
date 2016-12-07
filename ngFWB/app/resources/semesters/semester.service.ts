/**
 * Created by Tanner_2 on 11/27/2016.
 */
import { Injectable } from '@angular/core';
import {Http, Response, RequestOptions, Headers} from '@angular/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/Rx';

import { ISemester } from './semester';
import { Semester } from "./semester.model";

@Injectable()
export class SemesterService {
    //private _semesterUrl = 'http://localhost:8000/semester/';
    private _semesterUrl = 'http://friff14.pythonanywhere.com/semester/';
    private _semesterListUrl = 'http://friff14.pythonanywhere.com/semester/list';

    constructor(private _http: Http) { }

    getSemesters(): Observable<ISemester[]> {
        //return this._http.get('http://localhost:8000/semester/list')
        return this._http.get(this._semesterListUrl)
            .map((response: Response) => <ISemester[]> response.json())
            .do(data => console.log(JSON.stringify(data)))
            .catch(this.handleError);
    }

    getSemester(id: number): Observable<ISemester> {
        console.log(this._semesterUrl + String(id));
        return this._http.get(this._semesterUrl + String(id))
            .map((response: Response) => <ISemester> response.json())
            .do(data => console.log(JSON.stringify(data)))
            .catch(this.handleError);
    }

    putSemesterForm(semester: Semester): Observable<any> {
        console.log('putting semester: ', semester);

        let body = JSON.stringify(semester);
        let headers = new Headers({ 'Content-type': 'application/json'});
        let options = new RequestOptions({ headers: headers });

        return this._http.put(this._semesterUrl, body, options)
            .map(this.extractData)
            .catch(this.handleError);
    }

    postSemesterForm(semester: Semester): Observable<any> {
        console.log('posting semester: ', semester);

        let body = JSON.stringify(semester);
        let headers = new Headers({ 'Content-type': 'application/json'});
        let options = new RequestOptions({ headers: headers });

        return this._http.post(this._semesterUrl, body, options)
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