import {Component} from '@angular/core';
import {HTTP_PROVIDERS} from '@angular/http';
import {RouteConfig, ROUTER_DIRECTIVES, ROUTER_PROVIDERS, Router} from '@angular/router-deprecated';
import {MD_SIDENAV_DIRECTIVES} from '@angular2-material/sidenav';
import {MD_LIST_DIRECTIVES} from '@angular2-material/list';
import {MD_CARD_DIRECTIVES} from '@angular2-material/card';
import {MdIcon, MdIconRegistry} from '@angular2-material/icon';
import {MdButton} from '@angular2-material/button';
import {MdToolbar} from '@angular2-material/toolbar';
import {$WebSocket} from 'angular2-websocket/angular2-websocket';
import {CookieService} from 'angular2-cookie/core';
import {jsonrpcService} from '../components/jsonrpc/jsonrpc.service';
import {Observable} from 'rxjs/Rx';
import {User} from './user/user';
import {UserService} from './user/user.service';
import {UserFormComponent} from './user/user-form.component';
import {UserLoginComponent} from './user/user-login.component';
import {DashboardComponent} from '../components/dashboard/dashboard.component';
import {TodoComponent} from '../components/todo/todo.component';

@Component({
    selector: 'my-app',
    templateUrl: 'app/components/app.component.html',
    styleUrls: ['app/components/app.component.css'],
    directives: [
        ROUTER_DIRECTIVES,
        MD_SIDENAV_DIRECTIVES,
        MD_CARD_DIRECTIVES,
        MD_LIST_DIRECTIVES,
        MdIcon,
        MdButton,
        MdToolbar,
        UserFormComponent,
        UserLoginComponent
    ],
    providers: [
        HTTP_PROVIDERS,
        ROUTER_PROVIDERS,
        MdIconRegistry,
        CookieService,
        jsonrpcService,
        UserService
    ]
})
@RouteConfig([
    {
        path: '/dashboard',
        name: 'Dashboard',
        component: DashboardComponent,
        useAsDefault: true,
    },
    {
        path: '/todo',
        name: 'Todo',
        component: TodoComponent
    }
])
export class AppComponent{
    title = 'My GoWA2 APP !!';

    constructor(
        private _router: Router,
        private _cookieService: CookieService,
        private _rpc: jsonrpcService,
        private _userService: UserService
    ) {
        let baseUrl = this.getBaseUrl();
        this._rpc.newClient("ws://" + baseUrl + "/jsonrpc");
        this._rpc.newServer("ws://" + baseUrl + "/push");

        this._rpc.Register("App.log", this.log);
    }

    // TODO remove this once REAL rpcServer methods are implemented
    log(message: string): string {
        console.log("Yeaaaah test passed : " + message);
        return "test passed!";
    }

    logout(): void {
        this._userService.logout();
    }

    isUserRegistered(): boolean {
        return this._userService.isUserRegistered();
    }

    private getBaseUrl(): string {
        let baseUrl = window.location.href;
        let prefix = "https://";
        if (baseUrl.indexOf(prefix) == 0) {
            baseUrl = baseUrl.substr(prefix.length);
        } else {
            prefix = "http://";
            baseUrl = baseUrl.substr(prefix.length);
        }
        return baseUrl.split("/")[0];
    }
}
