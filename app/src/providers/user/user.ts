import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/observable/fromPromise';
import {Observable} from 'rxjs';
import { Injectable } from '@angular/core';
import {Http, Headers, RequestOptions, Response} from '@angular/http';
import { MSKStorage } from '../../providers/mskstorage/mskstorage';
import { MSKInAppBrowser } from '../../providers/mskinappbrowser/mskinappbrowser';
import {SERVER_URL, OAUTH_CLIENT_ID, OAUTH_REDIRECT_URI, OAUTH_SCOPE, OAUTH_CLIENT_SECRET, USER_DETAILS, SETTINGS_ACCESS_TOKEN_KEY} from '../config';

@Injectable()
export class User {
    //_user: any;

    // Request Token Endpoint
    // Example: http://or1010051029155.corp.adobe.com:4502/oauth/authorize?response_type=code&client_id=oo1rdcg3k2hi61li1vm78vb11-8vzmvlgn&redirect_uri=http://localhost/callback&scope=profile
    oauthUrl = SERVER_URL+"/oauth/authorize?response_type=code&client_id="+OAUTH_CLIENT_ID+"&redirect_uri="+OAUTH_REDIRECT_URI+"&scope="+OAUTH_SCOPE;

    //Access Token
    accessToken: any;

    //Browser
    browser: any;

    //Validity of Access Token
    accessTokenValid: boolean = true;

    constructor(private iab: MSKInAppBrowser, public storage: MSKStorage, private http: Http) { }

    /**
     * Login functionality
     */
    login() {
        return null;
    }
    /**
     * Send a POST request to our signup endpoint with the data
     * the user entered on the form.
     */
    signup(accountInfo: any) {
        return null;
    }

    /**
     * Log the user out, which forgets the session
     */
    logout() {
        return this.storage.set("access_token",null);
    }

    /**
     * Process a login/signup response to store user data
     */
    _loggedIn(resp) {
        if(resp){
            this.accessToken = resp.get("access_token");
            this.setAccessToken(this.accessToken);
            console.log("User Logged in and the Access Token is stored");
        } else{
            console.error("JSON parse response is not valid");
        }
    }

    getAccessToken(): Observable<any> {
       return this.storage.get(SETTINGS_ACCESS_TOKEN_KEY);
    }

    checkAccessTokenValidity(accessToken: string){
        //Make a quick call out to AEM to check if this access token is still valid
        //this.accessTokenValid = true;
        return this.accessTokenValid;
    }

    startOAuthLogin(){
        //STEP 1: Kick off the OAuth flow to get the request token
        this.browser = this.iab.create(this.oauthUrl, '_system', 'location=yes');
    }

    setAccessToken(accessToken: string): Observable<any>{
        return this.storage.set(SETTINGS_ACCESS_TOKEN_KEY,accessToken);
    }

    exchangeRequestTokenForAccessToken(requestToken: string): Observable<Response> {
        //STEP 2: Now use the request token and exchange it for the access token by posting the following:
        // /oauth/token?grant_type=authorization_code&code=<REQUEST TOKEN>&client_id=<CLIENT_ID>&client_secret=<CLIENT SECRET>&redirect_uri=<REDIRECT_URI>
        var OAUTH_ACCESS_URL = SERVER_URL + "/oauth/token";
        let payload = 'grant_type=authorization_code&code=' + encodeURIComponent(requestToken) + '&client_id=' + OAUTH_CLIENT_ID + '&client_secret=' + OAUTH_CLIENT_SECRET + '&redirect_uri=' + OAUTH_REDIRECT_URI;

        //Add Headers to the POST Call
        let headers = new Headers();
        //Add Form Header to post to the login endpoint
        headers.append('Content-Type', 'application/x-www-form-urlencoded');

        let requestOptions = new RequestOptions();
        requestOptions.headers = headers;

        console.log("OAUTH_ACCESS_URL: "+OAUTH_ACCESS_URL+", urlSearchParams: "+payload+", Headers: "+headers.values());
        return this.http.post(OAUTH_ACCESS_URL, payload, requestOptions);
    }

    getUserDetails(accessToken: string): Observable<Response>{
        //Get User Details
        //Add Headers to the Call
        let headers = new Headers();
        //Add Auth header with Access Token
        headers.append('Authorization', 'Bearer '+encodeURIComponent(accessToken));
        let requestOptions = new RequestOptions();
        requestOptions.headers = headers;
        return this.http.get(SERVER_URL+USER_DETAILS,requestOptions);
    }
}
