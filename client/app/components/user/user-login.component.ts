import {Component, Input, OnInit} from '@angular/core'
import {CookieService} from 'angular2-cookie/core';
import {MD_INPUT_DIRECTIVES} from '@angular2-material/input';
import {MD_LIST_DIRECTIVES} from '@angular2-material/list';
import {MdToolbar} from '@angular2-material/toolbar';
import {MdButton} from '@angular2-material/button';
import {jsonrpcService} from '../jsonrpc/jsonrpc.service';
import {User} from './user';
import {UserService, UserLogin} from './user.service';

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

    userLogin: UserLogin = {
        Username: "",
        Password: ""
    };

    constructor(
        private _rpc: jsonrpcService,
        private _cookieService: CookieService,
        private _userService: UserService
    ) {

    }

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
        this._userService.login(this.userLogin);
    }

    valid(): boolean {
        return this.userLogin.Username.length >= 3 && this.userLogin.Password.length >= 3;
    }
}
