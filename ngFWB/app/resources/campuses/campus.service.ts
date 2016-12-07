/**
 * Created by adsal on 11/26/2016.
 */
import { Injectable } from '@angular/core';
import {Http, Response, RequestOptions, Headers} from '@angular/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/Rx';

import { ICampus } from './campus';
import { Campus } from "./campus.model";

@Injectable()
export class CampusService {
    //private _campusUrl = 'http://localhost:8000/campus/';
    private _campusUrl = 'http://friff14.pythonanywhere.com/campus/';

    constructor(private _http: Http) { }

    getCampuses(): Observable<ICampus[]> {
        return this._http.get(this._campusUrl)
            .map((response: Response) => <ICampus[]> response.json())
            .do(data => console.log(JSON.stringify(data)))
            .catch(this.handleError);
    }

    getCampus(id: number): Observable<ICampus> {
        console.log(this._campusUrl + String(id));
        return this._http.get(this._campusUrl + String(id))
            .map((response: Response) => <ICampus> response.json())
            .do(data => console.log(JSON.stringify(data)))
            .catch(this.handleError);
    }

    // getInstructor(id: number): Observable<IInstructor> {
    //     return this.getInstructors()
    //         .map((instructors: IInstructor[]) => instructors.find(i => i.instructor_id === id));
    // }

    putCampusForm(campus: Campus): Observable<any> {
        console.log('putting campus: ', campus);

        let body = JSON.stringify(campus);
        let headers = new Headers({ 'Content-type': 'application/json'});
        let options = new RequestOptions({ headers: headers });

        return this._http.put(this._campusUrl, body, options)
            .map(this.extractData)
            .catch(this.handleError);
    }

    postCampusForm(campus: Campus): Observable<any> {
        console.log('posting campus: ', campus);

        let body = JSON.stringify(campus);
        let headers = new Headers({ 'Content-type': 'application/json'});
        let options = new RequestOptions({ headers: headers });

        return this._http.post(this._campusUrl, body, options)
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
