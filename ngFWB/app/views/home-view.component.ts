import { Component } from '@angular/core';

@Component({
    moduleId: module.id,
    templateUrl: 'home-view.component.html',
    styleUrls: ['home-view.component.css']
})
export class HomeViewComponent {
    pageTitle: string = 'Current Schedule';

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

