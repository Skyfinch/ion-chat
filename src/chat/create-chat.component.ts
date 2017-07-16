import { Component } from '@angular/core';

import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';

import { Nav } from 'ionic-angular';

import { ChatService } from '../services/chat.service';

import { Chat } from '../models/Chat'

@Component({
  templateUrl: 'create-chat.component.html'
})
export class CreateChat {

    chat : Chat = new Chat();

    constructor(private chatService: ChatService, private nav : Nav){
    }

    createNewChat(){
        this.chatService.createChat(this.chat);
        this.nav.pop();
    }

}
