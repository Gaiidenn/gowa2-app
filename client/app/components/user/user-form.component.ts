import {Component, Input, OnInit} from 'angular2/core'
import {jsonrpcService} from '../jsonrpc/jsonrpc.service';
import {NgForm} from 'angular2/common'
import {User} from './user'

@Component({
    selector: 'user-form',
    'templateUrl': 'app/components/user/user-form.component.html'
})
export class UserFormComponent {

    genders = ['M', 'F'];
    user = new User("", "M", [], []);

    @Input()
    private _rpc: jsonrpcService;

    constructor() {

    }

    ngOnInit() {
        console.log("-- RPC --");
        console.log(this._rpc);
    }

    register() {
        console.log('trying to call');
        this._rpc.Call("UserService.Save", this.user, this.submitResponse);
    }
    submitResponse(result: any, error: any) {
        console.log("result : " + JSON.stringify(result) + " | error : " + error);
    }

    // TODO: Remove this when we're done
    diagnostic() {
        console.log(this.user);
    }
}
