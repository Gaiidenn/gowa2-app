import {Component} from 'angular2/core';
import {RouteConfig, ROUTER_DIRECTIVES, ROUTER_PROVIDERS, Router} from 'angular2/router';
import {$WebSocket} from 'angular2-websocket/angular2-websocket';
import {jsonrpcService} from '../components/jsonrpc/jsonrpc.service';
import {Observable} from 'rxjs/Rx';
import {DashboardComponent} from '../components/dashboard/dashboard.component';
import {TodoComponent} from '../components/todo/todo.component';

@Component({
    selector: 'my-app',
    templateUrl: 'app/components/app.component.html',
    directives: [
        ROUTER_DIRECTIVES
    ],
    providers: [
        ROUTER_PROVIDERS,
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

    constructor(
        private _router: Router,
        private _rpc: jsonrpcService
    ) {
        this._rpc.newClient("ws://localhost:8080/jsonrpc");
        this._rpc.newServer("ws://localhost:8080/push");
    }

    sendMessage(message: string, i: number = 1) {
        let j = ((10*i) + (100 * i / 5)) / 5;
        this._rpc.Call("Msg.Echo", "message " + j + " : " + message);
        i++;
        if (i <= 50) {
            let timer = Observable.timer(100);
            timer.subscribe(() => {
                this.sendMessage(message, i);
            })
        }
    }
}
