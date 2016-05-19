import {Component, OnInit, Input} from '@angular/core';
import {RouteData} from '@angular/router-deprecated';
import {TemplatePortalDirective} from '@angular2-material/core';
import {MdToolbar} from '@angular2-material/toolbar';
import {MD_CARD_DIRECTIVES} from '@angular2-material/card';
import {MD_LIST_DIRECTIVES} from '@angular2-material/list';
import {jsonrpcService} from '../jsonrpc/jsonrpc.service';
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
    ]
})
export class DashboardComponent {
    users: Array<User> = [];
    usersLoading: boolean = true;
    @Input()
    user: User;
    @Input()
    private _rpc: jsonrpcService;

    constructor(
        data: RouteData
    ) {
        if (!this._rpc) {
            this._rpc = data.get('_rpc');
        }
        console.log(this._rpc);
    }

    ngOnInit() {
        this._rpc.Call("UserService.GetAll", "", this.setUsers.bind(this));
    }
    setUsers(users: Array<User>) {
        if (users.length > 0) {
            this.users = users;
        }
        this.usersLoading = false;
    }
}
