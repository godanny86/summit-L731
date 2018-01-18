import { Component } from '@angular/core';
import { IonicPage, NavParams } from 'ionic-angular';
import { User } from "../../providers/user/user";
import {Settings} from "../../providers/settings/settings";
import {SETTINGS_USERNAME_KEY} from "../../providers/config";

@IonicPage()
@Component({
    selector: 'page-landing',
    templateUrl: 'landing.html'
})
export class LandingPage {

    public username: string;

    constructor(private user: User, private navParams: NavParams, private settings: Settings) {
        console.log("In Landing Page constructor");
        this.username = "";
        this.settings.load();
        let accessToken = navParams.get("access_token");
        if(accessToken != null) {
            //Coming in from the login screen
            console.log("Landing Page: Get User details: "+accessToken);
            this.user.getUserDetails(accessToken).map((res)=>res.json()).subscribe((res)=>{
                console.log("User details: "+JSON.stringify(res));
                this.username = res.familyName;
                this.settings.setValue(SETTINGS_USERNAME_KEY,this.username);
            }, (err)=>{
                console.error("Error getting user details: "+err);
                //TODO: Need to refresh token or start OAuth flow if it isn't working
            });
        } else {
            //Coming in from regular menu
          console.log("No Access Token passed into this page. Check if username already exists");
          if(this.username != ""){
            //Do Nothing We are good.
          }else{
              //Try and get the username from stored settings
              this.settings.getValue(SETTINGS_USERNAME_KEY).then( val => {
                  this.username = val;
                  if(this.username != null){
                      console.log("Username from stored settings: "+this.username);
                  } else{
                      this.username = "";
                      console.error("Unable to get username from settings. Value is null");
                      //TODO: No username stored. Need to refresh token or start OAuth flow
                  }
              });
          }
        }
    }
}