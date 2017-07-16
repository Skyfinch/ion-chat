import { Component } from '@angular/core';

import { Nav, NavParams } from 'ionic-angular';

import { FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2/database';
import * as firebase from 'firebase/app';

import { ChatService } from '../services/chat.service';

import { Message } from '../models/Message';


@Component({
  selector: 'ar-chat',
  templateUrl: 'chat.component.html'
})
export class Chat {

    chatUid : string;
    userUid : string;
    messages: FirebaseListObservable<Message[]>;

    constructor(public chatService : ChatService, public nav : Nav, public navParams: NavParams){
    }
      
    ngOnInit() {
      this.chatUid = this.navParams.get('chatUid');
      firebase.auth().onAuthStateChanged((user) => {
        if (user) {
          this.userUid = firebase.auth().currentUser.uid;
        }
      });
      this.messages = this.chatService.getMessages(this.chatUid);
      console.log(this.chatUid);
      console.log(this.messages);
    }
    
    newMessage(content : string) {
      this.chatService.createMessage(this.chatUid, new Message(content, this.userUid));
    }

}
