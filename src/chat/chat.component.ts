import { Component } from '@angular/core';

import { Events, Nav, NavParams } from 'ionic-angular';

import { FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2/database';
import * as firebase from 'firebase/app';

import { ChatService } from '../services/chat.service';

import { Message } from '../models/Message';


@Component({
  selector: 'chat',
  templateUrl: 'chat.component.html'
})
export class Chat {

    chatUid : string;
    userUid : string;
    chat : FirebaseObjectObservable<Chat>
    messages: FirebaseListObservable<Message[]>;

    inputMessageContent : string;

    constructor(public chatService : ChatService, events : Events, public nav : Nav, public navParams: NavParams){
      this.chatUid = this.navParams.get('chatUid');
      this.chat = this.chatService.getChat(this.chatUid);
      this.messages = this.chatService.getMessages(this.chatUid);
      events.subscribe('switch-to-chat', (chatUid) => {
        this.chatUid = chatUid
        this.messages = this.chatService.getMessages(this.chatUid);
      });
      firebase.auth().onAuthStateChanged((user) => {
        if (user) {
          this.userUid = firebase.auth().currentUser.uid;
        }
      });
    }
    
    sendMessage() {
        if(!!this.inputMessageContent){
            this.chatService.createMessage(this.chatUid, new Message(this.inputMessageContent, this.userUid));
            this.inputMessageContent = "";
        }
    }

}
