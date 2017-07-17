import { Component } from '@angular/core';

import { Nav } from 'ionic-angular';

import { ChatService } from '../chat.service';

import { Chat } from '../Chat'

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
