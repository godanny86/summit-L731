import { NgModule } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { IonicPageModule } from 'ionic-angular';

import { CAASDetailPage } from './caas-detail';

@NgModule({
    declarations: [
        CAASDetailPage,
    ],
    imports: [
        IonicPageModule.forChild(CAASDetailPage),
        TranslateModule.forChild()
    ],
    exports: [
        CAASDetailPage
    ]
})
export class CAASDetailPageModule { }
