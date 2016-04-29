import {Component} from 'angular2/core';
import {RouteConfig, ROUTER_DIRECTIVES, ROUTER_PROVIDERS, Router} from 'angular2/router';
import {$WebSocket} from 'angular2-websocket/angular2-websocket';
import {jsonrpcService} from '../components/jsonrpc/jsonrpc.service';
import {DashboardComponent} from '../components/dashboard/dashboard.component';
import {TodoComponent} from '../components/todo/todo.component';

@Component({
    selector: 'my-app',
    templateUrl: 'app/components/app.component.html',
    directives: [
        ROUTER_DIRECTIVES
    ],
    providers: [
        ROUTER_PROVIDERS
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
    //private _ws: $WebSocket;
    private _rpc: jsonrpcService;

    constructor(
        private _router: Router
    ) {
        this._rpc.newClient("ws://localhost:8080/jsonrpc");
        /*this._ws = new $WebSocket("ws://localhost:8080/jsonrpc");

        let cb = function(message: any) {
            if (message.data.length > 0) {
                alert(message.data);
            }
        }
        this._ws.onMessage(cb, null);*/
    }

    sendMessage(message: string) {
        /*if (message.length > 0) {
            let rpcRequest = {
                "jsonrpc": "2.0",
                "method": "Msg.Echo",
                "params": [message],
                "id": 1
            }
            this._ws.send(JSON.stringify(rpcRequest));
        }*/
    }
}
