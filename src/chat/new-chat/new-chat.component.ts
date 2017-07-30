import { Component } from '@angular/core';

import { Nav } from 'ionic-angular';

import * as firebase from 'firebase/app';

import ChatDetail from '../chat-detail/chat-detail.component';

import { ChatService } from '../chat.service';
import { UserService } from '../../user/user.service';

import { Chat } from '../chat';

@Component({
    selector: 'new-chat',
    templateUrl: 'new-chat.component.html'
})
export class NewChat {

    constructor(private chatService: ChatService, private nav : Nav, private userService : UserService){
    }
    createNewChat(chatTitle: string){
        this.chatService.createPublicChat(firebase.auth().currentUser.uid, chatTitle);
        this.nav.pop();
    }

    onUserClicked(userUid : string) {
        let chatUid = this.chatService.createOneToOneChat(userUid, firebase.auth().currentUser.uid);
        this.nav.pop();
    }

    onChatClicked(chatUid : string) {
        this.chatService.addUserToChat(chatUid, firebase.auth().currentUser.uid);
        this.nav.pop();
    }

}
