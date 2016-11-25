import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

import { IRoom } from './room';

@Injectable()
export class RoomService {
    private _roomUrl = 'http://localhost:8000/room/';

    constructor(private _http: Http) { }

    getRooms(): Observable<IRoom[]> {
        return this._http.get(this._roomUrl)
            .map((response: Response) => <IRoom[]> response.json())
            .do(data => console.log(JSON.stringify(data)))
            .catch(this.handleError);
    }

    getRoom(id: number): Observable<IRoom> {
        return this.getRooms()
            .map((rooms: IRoom[]) => rooms.find(i => i.room_id === id));
    }

    private handleError(error: Response) {
        // in a real world app, we may send the server to some remote logging infrastructure
        // instead of just logging it to the console
        console.error(error);
        return Observable.throw(error.json().error || 'Server error');
    }
}
