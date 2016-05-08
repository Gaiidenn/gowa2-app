import {Component, Input} from '@angular/core'
import {jsonrpcService} from '../jsonrpc/jsonrpc.service';
import {User} from './user';

@Component({
    selector: 'user-login',
    'templateUrl': 'app/components/user/user-login.component.html'
})
export class UserLoginComponent {
    @Input()
    private _rpc: jsonrpcService;
    @Input()
    user: User;

    userLogin: UserLogin = {
        Username: "",
        Password: ""
    };

    submit() {
        console.log("submit login!");
        this._rpc.Call("UserService.Login", this.userLogin, this.submitResponse.bind(this));
    }
    submitResponse(result: any, error: any) {
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

    valid(): boolean {
        return this.userLogin.Username.length >= 3 && this.userLogin.Password.length >= 3;
    }
}

interface UserLogin {
    Username: string;
    Password: string;
}
