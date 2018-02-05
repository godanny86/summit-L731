import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { IonicPage, NavController, MenuController } from 'ionic-angular';

@IonicPage()
@Component({
    selector: 'page-caas-detail',
    templateUrl: 'caas-detail.html'
})
export class CAASDetailPage {

    constructor(public menuCtrl: MenuController, public translateService: TranslateService) {
        console.log("In CAASDetailPage constructor");
    }

}
