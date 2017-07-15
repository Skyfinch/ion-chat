import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { Home } from '../home/home.component';
import { Login } from '../login/login.component';

import { Auth } from '../services/auth.service';

@Component({
  templateUrl: 'app.component.html'
})
export class MyApp {
  public rootPage : any;

  constructor(auth : Auth, platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();

      auth.isLoggedIn.subscribe(isLoggedIn => {
        console.log(isLoggedIn);
        if ( isLoggedIn ) this.rootPage = Home;
        else this.rootPage = Login;
      });
    });
  }
}
