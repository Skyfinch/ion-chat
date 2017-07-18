import { Component } from '@angular/core';

import { Nav } from 'ionic-angular';

import * as firebase from 'firebase/app';

import ChatDetail from '../chat-detail/chat-detail.component';

import { ChatService } from '../chat.service';
import { UserService } from '../../user/user.service';

import { Chat } from '../chat';

@Component({
  templateUrl: 'create-chat.component.html'
})
export class CreateChat {

    chat : Chat = new Chat();

    constructor(private chatService: ChatService, private nav : Nav, private userService : UserService){
    }
    createNewChat(){
       //this.chatService.createChat(this.chat);
        this.nav.pop();
    }

    onUserClicked(userUid : string) {
        let chatUid = this.chatService.createOneToOneChat(userUid, firebase.auth().currentUser.uid);
        this.nav.pop();
    }

}
