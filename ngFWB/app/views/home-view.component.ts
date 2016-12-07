import { Component } from '@angular/core';
import {ISemester} from "../resources/semesters/semester";
import {HomeService} from "./home.service";
import {Semester} from "../resources/semesters/semester.model";
import {Router} from "@angular/router";

@Component({
    moduleId: module.id,
    templateUrl: 'home-view.component.html',
    styleUrls: ['home-view.component.css']
})
export class HomeViewComponent {
    pageTitle: string = 'Current Schedule';
    semesters: ISemester[];
    model = new Semester(null, null, null);
    download_url = `http://localhost:8000/xlsx/1/output.xlsx`;
     constructor(
        private homeService: HomeService,
        private router: Router) {
    }

    change_download_url(event): void{
         this.download_url = `http://localhost:8000/xlsx/` + String(event) + '/output.xlsx'
    }

    ngOnInit(): void {
        console.log(this.homeService);
        this.homeService.getSemesters()
            .subscribe(semesters => this.semesters = semesters,
                error => console.log('get error: ', error));

    }
    /*
    downloadURI(uri, name) {
        var link = document.createElement("a");
        link.download = name;
        link.href = uri;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    }
    */
}

