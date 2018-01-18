
import {Injectable} from "@angular/core";
import 'rxjs/add/observable/fromPromise';
import { InAppBrowser } from '@ionic-native/in-app-browser';

@Injectable()
export class MSKInAppBrowser {

    constructor(private iab: InAppBrowser) {
    }

    create(url, target, options){
        return this.iab.create(url, target, options);
    }

}
