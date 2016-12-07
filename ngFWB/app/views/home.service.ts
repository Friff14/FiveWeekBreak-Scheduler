import { Injectable } from '@angular/core';
import {Http, Response, RequestOptions, Headers} from '@angular/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/Rx';
import { SectionService } from "../resources/sections/section.service"
import {ISemester} from "../resources/semesters/semester";

//import { Ihome } from './home';
//import {home} from "./home.model";

@Injectable()
export class HomeService {
    private _homeUrl = 'http://localhost:8000/home/';
    constructor(private _http: Http) { }

    getSemesters(): Observable<ISemester[]> {
        console.log('Getting semesters from home service');
      return this._http.get('http://localhost:8000/semester/list')
        .map((response: Response) => <ISemester[]> response.json())
        .do(data => console.log(JSON.stringify(data)))
        .catch(this.handleError);
    }

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
}
