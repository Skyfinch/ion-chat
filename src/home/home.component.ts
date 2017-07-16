import { Component, ViewChild } from '@angular/core';
import { Events, NavParams, Tabs } from 'ionic-angular';

import { ChatsList } from '../chat/chats-list.component';
import { Chat } from '../chat/chat.component';
import { UserProfile } from '../user/user-profile.component';

@Component({
  templateUrl: 'home.component.html'
})
export class Home {

  @ViewChild(Tabs) tabs: Tabs;

  index = 0;
  
  tab1Root = UserProfile;
  tab2Root = ChatsList;
  tab3Root = Chat

  constructor( events: Events, navParams : NavParams){
    this.index = navParams.get('index');
    events.subscribe('switch-to-chat', (chatUid) => {
      this.tabs.select(2);
    });
  }

}
