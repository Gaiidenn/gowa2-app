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
        this.client.ws.onMessage(this.onClientMessage.bind(this), null);
        return this.client;
    }

    Call(method: string, params: any) {
        var data: string;
        var dataObj: rpcRequest;

        while (this.client.request[this.client.i] != null) {
            this.client.i++;

            if (this.client.i >= this.client.maxRequest) {
                this.client.i = 0;
            }
        }

        dataObj = {
            id: this.client.i,
            method: method,
            params: [params]
        };
        this.client.request[this.client.i] = dataObj;
        data = JSON.stringify(dataObj);
        this.client.ws.send(data);
    }

    onClientMessage(message: any) {
        var data = JSON.parse(message.data);
        console.log(data.result);
        this.client.request[data.id] = null;
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

interface rpcRequest {
    id: number;
    method: string;
    params?: any;
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
