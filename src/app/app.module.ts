import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';

import { MyApp } from './app.component';

import { Chat } from '../chat/chat.component';
import { ChatsList } from '../chat/chats-list.component';
import { CreateChat } from '../chat/create-chat.component';
import { UserProfile } from '../user/user-profile.component';
import { Login } from '../login/login.component';
import { Home } from '../home/home.component';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';

import { UserService } from '../services/user.service';
import { ChatService } from '../services/chat.service';

import {env} from '../env/env'

@NgModule({
  declarations: [
    MyApp,
    Chat,
    ChatsList,
    CreateChat,
    UserProfile,
    Login,
    Home
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(env.firebase),
    AngularFireDatabaseModule,
    AngularFireAuthModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    Chat,
    ChatsList,
    CreateChat,
    UserProfile,
    Login,
    Home
  ],
  providers: [
    ChatService,
    StatusBar,
    SplashScreen,
    UserService,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
