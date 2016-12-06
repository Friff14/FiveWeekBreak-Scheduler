/**
 * Created by bpalm_000 on 11/28/2016.
 */
import { Injectable } from '@angular/core';
import {Http, Response, RequestOptions, Headers} from '@angular/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/Rx';

import { IPrefix } from './prefix';
import { Prefix } from "./prefix.model";

@Injectable()
export class PrefixService {
    private _prefixUrl = 'http://localhost:8000/prefix/';

    constructor(private _http: Http) { }

    getPrefixes(): Observable<IPrefix[]> {
        return this._http.get(this._prefixUrl)
            .map((response: Response) => <IPrefix[]> response.json())
            .do(data => console.log(JSON.stringify(data)))
            .catch(this.handleError);
    }

    getPrefix(id: number): Observable<IPrefix> {
        console.log(this._prefixUrl + String(id));
        return this._http.get(this._prefixUrl + String(id))
            .map((response: Response) => <IPrefix> response.json())
            .do(data => console.log(JSON.stringify(data)))
            .catch(this.handleError);
    }

    putPrefixForm(prefix: Prefix): Observable<any> {
        console.log('putting prefix: ', prefix);

        let body = JSON.stringify(prefix);
        let headers = new Headers({ 'Content-type': 'application/json'});
        let options = new RequestOptions({ headers: headers });

        return this._http.put(this._prefixUrl, body, options)
            .map(this.extractData)
            .catch(this.handleError);
    }

    postPrefixForm(prefix: Prefix): Observable<any> {
        console.log('posting prefix: ', prefix);

        let body = JSON.stringify(prefix);
        let headers = new Headers({ 'Content-type': 'application/json'});
        let options = new RequestOptions({ headers: headers });

        return this._http.post(this._prefixUrl, body, options)
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