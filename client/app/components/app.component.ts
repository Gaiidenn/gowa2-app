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
        jsonrpcService
    ]
})
export class AppComponent{
    title = 'My GoWA2 APP !!';
    user: User;

    constructor(
        private _router: Router,
        private _cookieService: CookieService,
        private _rpc: jsonrpcService
    ) {
        this._rpc.newClient("ws://localhost:8080/jsonrpc");
        this._rpc.newServer("ws://localhost:8080/push");

        this._rpc.Register("App.log", this.log);

        this.user = new User();


        _router.config([
            {
                path: '/dashboard',
                name: 'Dashboard',
                component: DashboardComponent,
                useAsDefault: true,
                data: {
                    _rpc: this._rpc
                }
            },
            {
                path: '/todo',
                name: 'Todo',
                component: TodoComponent
            }
        ]);
    }

    // TODO remove this once REAL rpcServer methods are implemented
    log(message: string): string {
        console.log("Yeaaaah test passed : " + message);
        return "test passed!";
    }

    logout(): void {
        this.user = null;
        this.user = new User(); // TODO implement a cleaner method to logout
        this._cookieService.put("username", null);
        this._cookieService.put("password", null);
    }

    getRpcService(): jsonrpcService {
        return this._rpc;
    }

    getCookieService(): CookieService {
        return this._cookieService;
    }
}
