import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';

import { MyApp } from './app.component';

import { UserProfile } from '../user/user-profile.component';
import { Login } from '../login/login.component';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';

import { UserService } from '../services/user.service';

import { ChatModule } from '../chat/chat.module'

import {env} from '../env/env'

@NgModule({
  declarations: [
    MyApp,
    UserProfile,
    Login
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(env.firebase),
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    ChatModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    UserProfile,
    Login
  ],
  providers: [
    StatusBar,
    SplashScreen,
    UserService,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
