import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { IonicPage, NavController, MenuController } from 'ionic-angular';
import { User } from "../../providers/user/user";

@IonicPage()
@Component({
    selector: 'page-caas-overview',
    templateUrl: 'caas-overview.html'
})
export class CAASOverviewPage {

    constructor(public menuCtrl: MenuController, public translateService: TranslateService, public user: User, public navCtrl: NavController) {
        console.log("In CaaS Overview Page constructor");
    }

    goToCaasDetail() {
        this.navCtrl.push('CAASDetailPage');
    }
}
