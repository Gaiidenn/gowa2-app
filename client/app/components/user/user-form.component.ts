import {Component, Input} from '@angular/core';
import {MD_LIST_DIRECTIVES} from '@angular2-material/list';
import {MD_INPUT_DIRECTIVES} from '@angular2-material/input';
import {MdRadioGroup, MdRadioButton, MdRadioDispatcher} from '@angular2-material/radio';
import {MdToolbar} from '@angular2-material/toolbar';
import {MdButton} from '@angular2-material/button';
import {MdIcon} from '@angular2-material/icon';
import {CookieService} from 'angular2-cookie/core';
import {jsonrpcService} from '../jsonrpc/jsonrpc.service';
import {NgForm} from '@angular/common';
import {User} from './user';

@Component({
    selector: 'user-form',
    templateUrl: 'app/components/user/user-form.component.html',
    styleUrls: ['app/components/user/user-form.component.css'],
    directives: [
        MD_LIST_DIRECTIVES,
        MD_INPUT_DIRECTIVES,
        MdToolbar,
        MdButton,
        MdRadioGroup,
        MdRadioButton,
        MdIcon
    ],
    providers: [
        MdRadioDispatcher
    ]
})
export class UserFormComponent {

    genders = ['M', 'F'];

    @Input()
    user: User;
    tmpUser: User = new User();
    @Input()
    private _rpc: jsonrpcService;
    @Input()
    private _cookieService: CookieService;
    private _editEnabled: boolean = false;

    save() {
        this._rpc.Call("UserService.Save", this.user, this.onSaveResponse.bind(this));
    }
    onSaveResponse(result: any, error: any) {
        if (error != null) {
            console.log(error);
            return;
        }
        for (let attr in result) {
            this.user[attr] = result[attr];
        }
        this._cookieService.put("username", this.user.Username);
        this._cookieService.put("password", this.user.Password);
        this._editEnabled = false;
    }

    toggleEdit() {
        if (this._editEnabled == false) {
            for (let attr in this.user) {
                this.tmpUser[attr] = this.user[attr];
            }
        } else {
            for (let attr in this.user) {
                this.user[attr] = this.tmpUser[attr];
            }
        }
        this._editEnabled = !this._editEnabled;
    }
    isEditEnabled(): boolean{
        return this._editEnabled;
    }
}
