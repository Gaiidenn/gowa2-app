import {Component, Input} from '@angular/core'
import {CookieService} from 'angular2-cookie/core';
import {jsonrpcService} from '../jsonrpc/jsonrpc.service';
import {NgForm} from '@angular/common'
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
        this._rpc.Call("UserService.Save", this.user, this.onRegisterResponse.bind(this));
    }
    onRegisterResponse(result: any, error: any) {
        if (error != null) {
            console.log(error);
            return;
        }
        console.log(JSON.stringify(result));
        for (let attr in result) {
            this.user[attr] = result[attr]
        }
        console.log(this.user);
        console.log(this.user.isRegistered());
    }
}
