import {$WebSocket} from 'angular2-websocket/angular2-websocket';
import {Injectable} from 'angular2/core';

@Injectable()
export class jsonrpcService{
    private _maxRequest: number = 10;
    public client: jsonrpcClient;
    public server: jsonrpcServer;

    newClient(addr: string) {
        this.client = {
            i: 0,
            maxRequest: this._maxRequest,
            request: [],
            addr: addr,
            ws: new $WebSocket(addr),
        };
        this.client.ws.onMessage(this.onClientMessage, null);
        return this.client;
    }

    onClientMessage(message: any) {
        if (message.data.length > 0) {
            alert(message.data);
        }
    }

    newServer(addr: string) {
        this.server = {
            i: 0,
            method: [],
            addr: addr
        };
        return this.server;
    }
}

interface jsonrpcClient {
    i: number;
    maxRequest: number;
    request: Array<any>;
    addr: string;
    ws: $WebSocket;
}

interface jsonrpcServer {
    i: number;
    method: Array<any>;
    addr: string;
}
