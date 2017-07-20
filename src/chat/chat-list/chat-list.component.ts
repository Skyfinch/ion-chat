import { Component } from '@angular/core';

import { Nav } from 'ionic-angular';

import {Observable} from 'rxjs/Observable';

import { FirebaseListObservable } from 'angularfire2/database';
import * as firebase from 'firebase/app';

import { ChatService } from '../chat.service';
import { CreateChat } from '../create-chat/create-chat.component'
import { ChatDetail } from '../chat-detail/chat-detail.component'

import { UserProfile } from '../../user/user-profile/user-profile.component'

import { Chat } from '../chat';

@Component({
  templateUrl: 'chat-list.component.html'
})
export class ChatList {

  public chats : Observable<Chat[]>

  constructor(private chatService: ChatService, private nav : Nav){}

  ngOnInit(){
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
          this.chats = this.chatService.getChatsByUser(firebase.auth().currentUser.uid);
      }
    });
  }

  createNewChat(){
      this.nav.push(CreateChat);
  }

  goToChat(chatUid : string){
    this.nav.push(ChatDetail, {chatUid: chatUid});
  }

  goToUserProfile() {
    this.nav.push(UserProfile);
  }
}
