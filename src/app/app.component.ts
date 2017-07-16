import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { AngularFireAuth } from 'angularfire2/auth';

import { ChatsList } from '../chat/chats-list.component';
import { Login } from '../login/login.component';

@Component({
  templateUrl: 'app.component.html'
})
export class MyApp {
  rootPage : any = ChatsList;

  constructor(private afAuth : AngularFireAuth, platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen) {

    this.afAuth.authState.subscribe(auth => {
      if(!auth)
        this.rootPage = Login;
      else
        this.rootPage = ChatsList;
    });

    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
    });
  }
}
