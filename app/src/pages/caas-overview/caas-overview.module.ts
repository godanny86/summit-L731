import { NgModule } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { IonicPageModule } from 'ionic-angular';

import { CAASOverviewPage } from './caas-overview';

@NgModule({
    declarations: [
        CAASOverviewPage,
    ],
    imports: [
        IonicPageModule.forChild(CAASOverviewPage),
        TranslateModule.forChild()
    ],
    exports: [
        CAASOverviewPage
    ]
})
export class CAASOverviewPageModule { }
