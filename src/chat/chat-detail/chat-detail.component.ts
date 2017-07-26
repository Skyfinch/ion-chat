import { Component } from '@angular/core';

import { Events, Nav, NavParams } from 'ionic-angular';

import { FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2/database';
import * as firebase from 'firebase/app';

import {Observable} from 'rxjs/Observable';

import { ChatService } from '../chat.service';

import { Chat } from '../chat';
import { Message } from '../message';


@Component({
  selector: 'chat-detail',
  templateUrl: 'chat-detail.component.html'
})
export class ChatDetail {

    userUid : string;
    chat : Chat
    messages: FirebaseListObservable<Message[]>;

    inputMessageContent : string;

    constructor(public chatService : ChatService, events : Events, public nav : Nav, public navParams: NavParams){
      let chatUid = this.navParams.get('chatUid');
      this.chatService.getChat(chatUid).subscribe(chat => this.chat = chat);
      this.messages = this.chatService.getMessages(chatUid);
      firebase.auth().onAuthStateChanged((user) => {
        if (user) {
          this.userUid = firebase.auth().currentUser.uid;
        }
      });
    }
    
    sendMessage(chatUid : string) {
        if(!!this.inputMessageContent){
            this.chatService.createMessage(chatUid, new Message(this.inputMessageContent, this.userUid));
            this.inputMessageContent = "";
        }
    }

}
