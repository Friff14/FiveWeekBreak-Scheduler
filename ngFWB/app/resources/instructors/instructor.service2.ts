import { Injectable } from '@angular/core';
import 
{
    Http,
    Response,
    Jsonp
} from '@angular/http';
import { IInstructor } from './instructor';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class InstructorService2 {
    private _instructorUrl = 'http://localhost:8000/instructor/';
    
    constructor(
        private _http: Http,
        private _jsonp: Jsonp
    ){}

    getInstructors(): Observable<IInstructor[]> {
        return this._jsonp.get(this._instructorUrl)
            .map((res: Response) => <IInstructor[]> res.json())
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
