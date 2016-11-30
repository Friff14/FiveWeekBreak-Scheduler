import { Injectable } from '@angular/core';
import {Http, Response, RequestOptions, Headers} from '@angular/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/Rx';

//import { Ihome } from './home';
//import {home} from "./home.model";

@Injectable()
export class HomeService {
    private _homeUrl = 'http://localhost:8000/home/';

    constructor(private _http: Http) { }


}
