import {Component} from '@angular/core';
import {TemplatePortalDirective} from '@angular2-material/core';
import {MdToolbar} from '@angular2-material/toolbar';
import {MD_CARD_DIRECTIVES} from '@angular2-material/card';

@Component({
    selector: 'my-dashboard',
    templateUrl: 'app/components/dashboard/dashboard.component.html',
    styleUrls: ['app/components/dashboard/dashboard.component.css'],
    directives: [
        MdToolbar,
        MD_CARD_DIRECTIVES,
        TemplatePortalDirective
    ]
})
export class DashboardComponent {

}
