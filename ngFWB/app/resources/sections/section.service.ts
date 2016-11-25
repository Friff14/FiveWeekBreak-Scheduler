import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

import { ISection } from './section';

@Injectable()
export class SectionService {
    private _sectionUrl = 'http://localhost:8000/course/1';

    constructor(private _http: Http) { }

    getSections(): Observable<ISection[]> {
        return this._http.get(this._sectionUrl)
            .map((response: Response) => <ISection[]> response.json())
            .do(data => console.log(JSON.stringify(data)))
            .catch(this.handleError);
    }

    getSection(id: number): Observable<ISection> {
        return this.getSections()
            .map((sections: ISection[]) => sections.find(c => c.section_id === id));
    }

    private handleError(error: Response) {
        // in a real world app, we may send the server to some remote logging infrastructure
        // instead of just logging it to the console
        console.error(error);
        return Observable.throw(error.json().error || 'Server error');
    }
}
