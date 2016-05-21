import {Component, OnInit, Input} from '@angular/core';
import {TemplatePortalDirective} from '@angular2-material/core';
import {MdToolbar} from '@angular2-material/toolbar';
import {MD_CARD_DIRECTIVES} from '@angular2-material/card';
import {MD_LIST_DIRECTIVES} from '@angular2-material/list';
import {UsersService} from '../users/users.service';
import {User} from '../user/user';

@Component({
    selector: 'my-dashboard',
    templateUrl: 'app/components/dashboard/dashboard.component.html',
    styleUrls: ['app/components/dashboard/dashboard.component.css'],
    directives: [
        MdToolbar,
        MD_CARD_DIRECTIVES,
        MD_LIST_DIRECTIVES,
        TemplatePortalDirective
    ],
    providers: [
        UsersService
    ]
})
export class DashboardComponent {
    usersLoading: boolean = true;

    constructor(
        private _usersService: UsersService
    ) {

    }
}
