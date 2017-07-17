import { Component } from '@angular/core';

import { Nav } from 'ionic-angular';

import { FirebaseListObservable } from 'angularfire2/database';

import { ChatService } from '../chat.service';
import { CreateChat } from '../create-chat/create-chat.component'
import { ChatDetail } from '../chat-detail/chat-detail.component'

import { UserProfile } from '../../user/user-profile/user-profile.component'

@Component({
  templateUrl: 'chats-list.component.html'
})
export class ChatsList {

  public chats : FirebaseListObservable<any[]>

  constructor(private chatService: ChatService, private nav : Nav){
      this.chats = this.chatService.getChats();
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
