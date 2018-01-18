import { Injectable } from '@angular/core';
import { App, Platform } from 'ionic-angular';

declare var ADB: any; // adobe global variable

/*
  Analytics Service, currently utilizing Adobe Analytics
  ////// Adobe Analytics
  Methods available on the ADB object can be found here:
  iOS: https://marketing.adobe.com/resources/help/en_US/mobile/ios/phonegap_methods.html
  Android: https://marketing.adobe.com/resources/help/en_US/mobile/android/phonegap_methods.html
  The ADB object is only available on devices via the Adobe Mobile Services Plugin
  https://github.com/Adobe-Marketing-Cloud/mobile-services/tree/master/sdks/Cordova  
*/
@Injectable()
export class Analytics {
  onDevice: boolean;
  deviceMid: String = "";

  constructor(
    private platform: Platform,
    private app: App
  ) {
    
  }

  public analyticsInit(userData) {
    
      let nav = this.app.getActiveNav();
      if (nav['root'] && nav['root']['name']) {
        let currentNav = nav['root']['name'];
        this.viewEnterListener({name:currentNav},userData);
      }
    
  }

  
  /**
   * This listens to every page / view change event in the app.
   * This is triggered as a callback from app.component.ts.
   *  @param {String} data, current page / view data
   *  @param {String} userData, user information
   */
  viewEnterListener(data,userData) {
        console.log("viewEnterListenerFired for Page: ", data);
        window['ADB'].trackState(data.name, null);

  }

 }
