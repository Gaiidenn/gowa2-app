import {Component} from 'angular2/core'
import {NgForm} from 'angular2/common'
import {User} from './user'

@Component({
    selector: 'user-form',
    'templateUrl': 'app/components/user/user-form.component.html'
})
export class UserFormComponent {

    genders = ['M', 'F'];
    test = [1, 2, 3, 4, 5];
    user = new User();
    submitted = false;

    onSubmit() {
        this.submitted = true;
    }

    // TODO: Remove this when we're done
    get diagnostic() { return JSON.stringify(this.user); }
}
