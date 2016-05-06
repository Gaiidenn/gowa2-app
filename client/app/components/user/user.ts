import {Injectable} from 'angular2/core';

@Injectable()
export class User {
    public Username: string;
    public Password: string;
    public Email: string;
    public Gender: string;
    public Likes: Array<string>;
    public Meets: Array<string>;
    public Age: number;
    private _id: string;
    private _rev: string;
    private _key: string;

    public isRegistered(): boolean {
        return this._id ? true : false;
    }
}
