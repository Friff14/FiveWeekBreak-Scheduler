/**
 * Created by doebo on 11/27/2016.
 */
import { Injectable } from '@angular/core';
import {Http, Response, RequestOptions, Headers} from '@angular/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/Rx';

import { IBuilding } from './building';
import { Building } from "./building.model";

@Injectable()
export class BuildingService {
    private _buildingUrl = 'http://localhost:8000/building/';

    constructor(private _http: Http) { }

    getBuildings(): Observable<IBuilding[]> {
        return this._http.get(this._buildingUrl)
            .map((response: Response) => <IBuilding[]> response.json())
            .do(data => console.log(JSON.stringify(data)))
            .catch(this.handleError);
    }

    // getBuilding(id: number): Observable<IBuilding> {
    //     return this.getBuildings()
    //         .map((buildings: IBuilding[]) => buildings.find(i => i.building_id === id));
    // }

    postBuildingForm(building: Building): Observable<any> {
        console.log('posting building: ', building);

        let body = JSON.stringify(building);
        let headers = new Headers({ 'Content-type': 'application/json'});
        let options = new RequestOptions({ headers: headers });

        return this._http.post(this._buildingUrl, body, options)
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