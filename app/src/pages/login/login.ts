import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { IonicPage, NavController } from 'ionic-angular';

import { User } from '../../providers/user/user';
import { MSKStorage } from '../../providers/mskstorage/mskstorage';
import { LandingPage } from '../pages';
import { Deeplinks } from '@ionic-native/deeplinks';
import { Api } from '../../providers/api/api';

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {

  // Our translated text strings
  private loginErrorString: string;

  constructor(public navCtrl: NavController,
    public user: User,
    public translateService: TranslateService,
    public storage: MSKStorage,
    public deeplinks: Deeplinks,
    public api: Api) {

    this.translateService.get('LOGIN_ERROR').subscribe((value) => {
      this.loginErrorString = value;
    });

      this.deeplinks.route({
          '/msklogin': {}
      }).subscribe((match) => {
          // match.$route - the route we matched, which is the matched entry from the arguments to route()
          // match.$args - the args passed in the link
          // match.$link - the full link data
          let match_link = JSON.parse(JSON.stringify(match));
          let accessToken = "";
          console.log("Login Page: Successfully matched route: " +JSON.stringify(match));
          let request_token = match_link.$args.code;
          console.log("Login Page: Matched link arguments : "+request_token);
          //let request_token = ((match_params.split("code=")[1]).split("&state"))[0];
          this.user.exchangeRequestTokenForAccessToken(request_token).map( (res) => res.json()).subscribe((res) => {
              console.log("Post call result: "+JSON.stringify(res));
              //get the "access_token" json variable value from the response
              accessToken = res.access_token;
              console.log("Trying to exchange request token for access token. This is the result "+accessToken);
              this.user.setAccessToken(accessToken).subscribe((res)=>{
                  console.log("Access Token stored successfully: "+res);
                  this.navCtrl.setRoot(LandingPage, {'access_token':accessToken});
              }, (err)=>{
                  console.log("Access Token was not able to be stored "+err);
                  this.navCtrl.setRoot(LandingPage);
              });
          }, err =>{
              console.log("Error while exchanging request token for access token: "+err.message());
          });
      }, (nomatch) => {
          // nomatch.$link - the full link data
          console.log('Login Page: Got a deeplink that did not match', nomatch);
      });
  }


  // Attempt to login in through our User service
  doLogin() {
      //Get stored access token and check validity otherwise start Oauth login process
      this.user.getAccessToken().subscribe( (res)=>{
          if(res!=null){
              console.log("Saved Access Token is "+res);
              //this.user.checkAccessTokenValidity(access_token)
              //User has valid access token. Move to the next screen
              this.navCtrl.setRoot(LandingPage, {'access_token':res});
          } else{
              console.log("Access Token is null. Get a new one");
              this.user.startOAuthLogin();
          }
      }, (err)=>{
          console.log("No Access Token saved. Get a new one");
          this.user.startOAuthLogin();
      });
  }

  doNoAuthLogin() {
      this.navCtrl.setRoot(LandingPage);
  }

}
