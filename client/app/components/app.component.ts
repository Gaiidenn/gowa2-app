import {Component} from 'angular2/core';
import {RouteConfig, ROUTER_DIRECTIVES, ROUTER_PROVIDERS, Router} from 'angular2/router';
import {$WebSocket} from 'angular2-websocket/angular2-websocket';
import {CookieService} from 'angular2-cookie/core';
import {jsonrpcService} from '../components/jsonrpc/jsonrpc.service';
import {Observable} from 'rxjs/Rx';
import {User} from './user/user'
import {UserFormComponent} from './user/user-form.component'
import {UserLoginComponent} from './user/user-login.component'
import {DashboardComponent} from '../components/dashboard/dashboard.component';
import {TodoComponent} from '../components/todo/todo.component';

@Component({
    selector: 'my-app',
    templateUrl: 'app/components/app.component.html',
    directives: [
        ROUTER_DIRECTIVES,
        UserFormComponent,
        UserLoginComponent
    ],
    providers: [
        ROUTER_PROVIDERS,
        CookieService,
        jsonrpcService
    ]
})
@RouteConfig([
    {
        path: '/dashboard',
        name: 'Dashboard',
        component: DashboardComponent,
        useAsDefault: true
    },
    {
        path: '/todo',
        name: 'Todo',
        component: TodoComponent
    }
])
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

        var userTmp = this._cookieService.getObject("user") as User;
        if (userTmp) {
            this.user = userTmp;
        } else {
            this.user = new User();
        }
        console.log(this.user.isRegistered());
    }

    // TODO remove this once REAL rpcServer methods are implemented
    log(message: string): boolean {
        console.log("Yeaaaah test passed : " + message);
        return true;
    }

    logout(): void {
        this.user = new User(); // TODO implement a cleaner method to logout
    }

    getRpcService(): jsonrpcService {
        return this._rpc;
    }

    getCookieService(): CookieService {
        return this._cookieService;
    }
}
