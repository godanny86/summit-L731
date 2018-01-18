import { KeychainTouchId } from '@ionic-native/keychain-touch-id';
import {Injectable} from "@angular/core";
import 'rxjs/add/observable/fromPromise';
import {Observable} from "rxjs";

@Injectable()
export class TouchId {

    constructor(private keychainTouchId: KeychainTouchId) {
    }

    isAvailable(){
        return Observable.fromPromise(this.keychainTouchId.isAvailable());
    }

    save(key, password){
        return Observable.fromPromise(this.keychainTouchId.save(key, password));
    }

    verify(key, message){
        return Observable.fromPromise(this.keychainTouchId.verify(key, message));
    }

    has(key){
        return Observable.fromPromise(this.keychainTouchId.has(key));
    }

    delete(key){
        return Observable.fromPromise(this.keychainTouchId.delete(key));
    }

    setLocale(locale){
        this.keychainTouchId.setLocale(locale);
    }
}