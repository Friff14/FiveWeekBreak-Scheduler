import { Injectable } from '@angular/core';
import { Http, Response, RequestOptions, Headers} from '@angular/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/Rx';

import { IRoom } from './room';
import { Room } from './room.model'
import {ICampus} from "../campuses/campus";
import {IBuilding} from "../buildings/building";

@Injectable()
export class RoomService {
    private _roomUrl = 'http://localhost:8000/room/';

    constructor(private _http: Http) { }

    // getCampuses(): Observable<ICampus[]> {
    //     return this._http.get('http://localhost:8000/campus/list')
    //         .map((response: Response) => <ICampus[]> response.json())
    //         .do(data => console.log(JSON.stringify(data)))
    //         .catch(this.handleError);
    // }

    getBuildings(): Observable<IBuilding[]> {
        return this._http.get('http://localhost:8000/building/list')
            .map((response: Response) => <IBuilding[]> response.json())
            .do(data => console.log(JSON.stringify(data)))
            .catch(this.handleError);
    }

    getRooms(): Observable<IRoom[]> {
        return this._http.get(this._roomUrl)
            .map((response: Response) => <IRoom[]> response.json())
            .do(data => console.log(JSON.stringify(data)))
            .catch(this.handleError);
    }

    getRoom(id: number): Observable<IRoom> {
        console.log(this._roomUrl + String(id));
        return this._http.get(this._roomUrl+ String(id))
            .map((response: Response) => <IRoom> response.json())
            .do(data => console.log(JSON.stringify(data)))
            .catch(this.handleError);
    }

    putRoomForm(room: Room): Observable<any> {
        console.log('posting room: ', room);

        let body = JSON.stringify(room);
        let headers = new Headers({ 'Content-type': 'application/json'});
        let options = new RequestOptions({ headers: headers });

        return this._http.put(this._roomUrl, body, options)
            .map(this.extractData)
            .catch(this.handleError);
    }

    postRoomForm(room: Room): Observable<any> {
        console.log('posting room: ', room);
        let body = JSON.stringify(room);

        let headers = new Headers({ 'Content-type': 'application/json'});
        let options = new RequestOptions({ headers: headers });

        return this._http.post(this._roomUrl, body, options)
            .map(this.extractData)
            .catch(this.handleError);
    }

    private extractData(res: Response) {
        let body = res.json();
        return body.fields || { };
    }

    // getRoom(id: number): Observable<IRoom> {
    //     return this.getRooms()
    //         .map((rooms: IRoom[]) => rooms.find(i => i.room_id === id));
    // }

    private handleError(error: Response) {
        // in a real world app, we may send the server to some remote logging infrastructure
        // instead of just logging it to the console
        console.error(error);
        return Observable.throw(error.json().error || 'Server error');
    }
}
