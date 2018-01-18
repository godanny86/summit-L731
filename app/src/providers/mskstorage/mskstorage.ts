
import {Injectable} from "@angular/core";
import 'rxjs/add/observable/fromPromise';
import {Observable} from "rxjs";
import {Storage} from "@ionic/storage";

@Injectable()
export class MSKStorage {

    constructor(private storage: Storage) {
    }

    driver(){
        return this.storage.driver;
    }

    ready(){
        return Observable.fromPromise(this.storage.ready());
    }

    get(key){
        return Observable.fromPromise(this.storage.get(key));
    }

    set(key, value){
        return Observable.fromPromise(this.storage.set(key,value));
    }

    remove(key){
        return Observable.fromPromise(this.storage.remove(key));
    }

    length(){
        return Observable.fromPromise(this.storage.length());
    }

    keys(){
        return Observable.fromPromise(this.storage.keys());
    }

    forEach(iteratorCallback){
        return Observable.fromPromise(this.storage.forEach(iteratorCallback));
    }

}