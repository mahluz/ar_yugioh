/// <reference path="WikitudePlugin.d.ts" />
import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { TabsPage } from '../pages/tabs/tabs';


@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage = TabsPage;

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();

      /** Enter your Wikitude (trial) License Key here */
      WikitudePlugin._sdkKey = "i656/PfQDruKCcbGhzOnaxnet56bJGFXf+TqvGABFGKFPV2TOGsZ6bgES/0j0ISlr/DJJd3juXRG/MyiNJ/DOrkMtwy4Ph6ndr4lnraPxmzGVecKy0DfNTAfb1ziZfaZ7w3gGjyTJ5ipSGTTb/zYRoRcb5khjUasi12PV3J20OZTYWx0ZWRfX7UhErTW/VoCdifEos1u10NSqfC3fei30zUKSMQUVlBA6NLDuobKXpJwqMLE5UdeTxsHtopXpc/WIEsV26BkpUdKy89rcDFRaYZ2Qr8CQG9URejLYVujklnGvF1b9+u9TURPkJKNO2ZvPwAsw0fOQ43+BWwdzQg+7hNikJtKyY+7kCSSnsW8dZ12iwnrbXPnLSD+dYyx00TvHa+VBgjJGstkBLcDfthp2Zo0RTU2kACYXmbu2oWBP1GiRd1MhYDyaMnFt9r9s+NTcEKE5Vn+skcVaiZHonHI/6xfNpEaqoAThHrNYuJBQFXPIRwdcBHzDr3bkhJVK/ogVr47Tn6S5St+ud4cZRtEOYXmrnYurROj22WGfXiy7EL3yIyzp3pY57EjwANjQNDOUQcoTxRtBkrsp+QGKnERmufLn5XqcWk0DZlXb6UC3JrZ3LArmwxdp4wdUTjq+H6lu5x+3sM9ALt9bD5hHti4HYCQDn/NYqlkC2OEsy4hyCY=";

      /** Check if your device supports AR */
      WikitudePlugin.isDeviceSupported(
          function(success) {
            console.log("Your platform supports AR/Wikitude. Have fun developing!!");
          },
          function(fail) {
            console.log("Your platform failed to run AR/Wikitude: "+fail);
          },
          [WikitudePlugin.FeatureGeo] // or WikitudePlugin.Feature2DTracking 
      );                  

      /** The Wikitude AR View creates it's own context. Communication between the main Ionic App and Wikitude SDK works 
       * through the function below for the direction Ionic2 app --> Wikitude SDK 
       * For calls from Wikitude SDK --> Ionic2 app see the captureScreen example in 
       * WikitudeIonic2StarterApp/www/assets/3_3dModels_6_3dModelAtGeoLocation/js/3dmodelatgeolocation.js*/
      // set the function to be called, when a "communication" is indicated from the AR View  
      WikitudePlugin.setOnUrlInvokeCallback(function(url) {

        // this an example of how to receive a call from a function in the Wikitude SDK (Wikitude SDK --> Ionic2)
        if (url.indexOf('captureScreen') > -1) {
            WikitudePlugin.captureScreen(
                (absoluteFilePath) => {
                    console.log("snapshot stored at:\n" + absoluteFilePath);

                    // this an example of how to call a function in the Wikitude SDK (Ionic2 app --> Wikitude SDK)
                    WikitudePlugin.callJavaScript("World.testFunction('Screenshot saved at: " + absoluteFilePath +"');");
                },
                (errorMessage) => {
                    console.log(errorMessage);
                },
                true, null
            );
        } else {
            alert(url + "not handled");
        }
      });

      /**
       * Define the generic ok callback
       */
      WikitudePlugin.onWikitudeOK = function() {
          console.log("Things went ok.");
      }
      
      /**
       * Define the generic failure callback
       */
      WikitudePlugin.onWikitudeError = function() {
          console.log("Something went wrong");
      }

      // Just as an example: set the location within the Wikitude SDK, if you need this (You can get the geo coordinates by using ionic native 
      // GeoLocation plugin: http://ionicframework.com/docs/v2/native/geolocation/
      //WikitudePlugin.setLocation(47, 13, 450, 1);

      /* for Android only
      WikitudePlugin.setBackButtonCallback(
          () => {
              console.log("Back button has been pressed...");
          }
      );                  
      */

    });
  }
}
