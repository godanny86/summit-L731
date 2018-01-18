import 'rxjs/add/operator/map';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import {Http, RequestOptions, Headers, Response} from '@angular/http';

import {Settings} from '../settings/settings';
import {PRODUCT_CATEGORIES, SERVER_URL, SETTINGS_PRODUCT_DETAILS_SELECTOR} from '../config';
import {User} from '../user/user';

@Injectable()
export class Products {

    private categories: any;
    private accessToken: string;

    constructor(private http: Http, private settings: Settings, private user: User) {
    }

    getCategories(): Observable<Response>{
        //Make call out to Products List endpoint and get JSON back. Store JSON.
        //If JSON available locally, check timestamp and use it, Else go and get a fresh list from endpoint
        console.log("Make a call out to get the categories");
        //Make a call out to get the categories
        //this.accessToken = accessToken;
        //let headers = new Headers();
        //Add Auth header with Access Token
        //headers.append('Authorization', 'Bearer '+encodeURIComponent(this.accessToken));
        let requestOptions = new RequestOptions();
        //requestOptions.headers = headers;
        console.log("Making a call out to "+SERVER_URL+PRODUCT_CATEGORIES);
        return this.http.get(SERVER_URL+PRODUCT_CATEGORIES,requestOptions);
    }

    getProductDetails(path: string): Observable<Response>{
        //Make call out to Product Details endpoint and get JSON back. Store JSON.
        //If JSON available locally, check timestamp and use it, Else go and get a fresh list from endpoint
        console.log("Make a call out to get the product details");
        //Make a call out to get the categories
        //this.accessToken = accessToken;
        //let headers = new Headers();
        //Add Auth header with Access Token
        //headers.append('Authorization', 'Bearer '+encodeURIComponent(this.accessToken));
        let requestOptions = new RequestOptions();
        //requestOptions.headers = headers;
        console.log("Making a call out to "+SERVER_URL+path+SETTINGS_PRODUCT_DETAILS_SELECTOR);
        return this.http.get(SERVER_URL+path+SETTINGS_PRODUCT_DETAILS_SELECTOR,requestOptions);
    }
}
