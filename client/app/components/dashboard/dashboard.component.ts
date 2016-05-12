import {Component} from '@angular/core';
import {MdToolbar} from '@angular2-material/toolbar';

@Component({
    selector: 'my-dashboard',
    template: '<md-toolbar><span>Dashboard</span></md-toolbar><p>This will be my dashboard component !!!</p>',
    directives: [
        MdToolbar
    ]
})
export class DashboardComponent {

}
