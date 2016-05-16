import {Component, Input, OnInit} from '@angular/core'
import {CookieService} from 'angular2-cookie/core';
import {MD_INPUT_DIRECTIVES} from '@angular2-material/input';
import {MD_LIST_DIRECTIVES} from '@angular2-material/list';
import {MdToolbar} from '@angular2-material/toolbar';
import {MdButton} from '@angular2-material/button';
import {jsonrpcService} from '../jsonrpc/jsonrpc.service';
import {User} from './user';

@Component({
    selector: 'user-login',
    templateUrl: 'app/components/user/user-login.component.html',
    styleUrls: ['app/components/user/user-login.component.css'],
    directives: [
        MD_INPUT_DIRECTIVES,
        MD_LIST_DIRECTIVES,
        MdToolbar,
        MdButton
    ]
})
export class UserLoginComponent implements OnInit {
    @Input()
    private _rpc: jsonrpcService;
    @Input()
    private _cookieService: CookieService;
    @Input()
    user: User;

    userLogin: UserLogin = {
        Username: "",
        Password: ""
    };

    ngOnInit() {
        let username = this._cookieService.get("username");
        let password = this._cookieService.get("password");
        if (username && password) {
            this.userLogin.Username = username;
            this.userLogin.Password  = password;
            this.submit();
        }
    }

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
        this._cookieService.put("username", this.user.Username);
        this._cookieService.put("password", this.user.Password);
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
