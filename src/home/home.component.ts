import { Component } from '@angular/core';
import { NavParams } from 'ionic-angular';

import { Chat } from '../chat/chat.component';
import { UserProfile } from '../user/user-profile.component';

@Component({
  templateUrl: 'home.component.html'
})
export class Home {

  index = 0;
  
  tab1Root = UserProfile;
  tab2Root = Chat;

  constructor(navParams : NavParams){
   this.index = navParams.get('index');
  }

}
