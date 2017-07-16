import { Component } from '@angular/core';

import { Events, Nav} from 'ionic-angular';

import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';

import { UserService } from '../services/user.service';
import { ChatService } from '../services/chat.service';

import { CreateChat } from './create-chat.component'
import { Chat } from './chat.component'

@Component({
  templateUrl: 'chats-list.component.html'
})
export class ChatsList {

  public chats : FirebaseListObservable<any[]>

  constructor(private chatService: ChatService, private events: Events, private nav : Nav, private userService: UserService){
      this.chats = this.chatService.getChats();
  }

  createNewChat(){
      this.nav.push(CreateChat);
  }

  goToChat(chatUid : string){
    this.events.publish('switch-to-chat', chatUid);
  }

}
