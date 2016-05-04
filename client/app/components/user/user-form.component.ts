import {Component, Input} from 'angular2/core'
import {CookieService} from 'angular2-cookie/core';
import {jsonrpcService} from '../jsonrpc/jsonrpc.service';
import {NgForm} from 'angular2/common'
import {User} from './user'

@Component({
    selector: 'user-form',
    'templateUrl': 'app/components/user/user-form.component.html'
})
export class UserFormComponent {

    genders = ['M', 'F'];

    @Input()
    user: User;
    @Input()
    private _rpc: jsonrpcService;
    @Input()
    private _cookieService: CookieService;

    constructor() {

    }

    register() {
        console.log('trying to call');
        this._rpc.Call("UserService.Save", this.user, this.onRegisterResponse);
    }
    onRegisterResponse(result: any, error: any) {
        console.log("result : " + JSON.stringify(result) + " | error : " + error);
        //if (result && result.)
    }

    // TODO: Remove this when we're done
    diagnostic() {
        console.log(this.user);
    }
}
