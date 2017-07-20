import { Component, Input } from '@angular/core';

import * as firebase from 'firebase/app';

import { ChatService } from '../chat.service';
import { UserService } from '../../user/user.service';

import { Chat } from '../chat';

@Component({
  selector: 'chat-title',
  template: '{{title}}'
})
export class ChatTitle {

    @Input() chat: Chat;

    title : string = "";
 
    constructor(private chatService: ChatService, private userService : UserService){}

    ngOnChanges(changes: any) {
        this.chat = changes.chat.currentValue;
        if(!!this.chat){
            if(this.chat.title)
                this.title = this.chat.title;
            else {
                this.chatService.getChatDefaultTitle(this.chat, firebase.auth().currentUser.uid)
                    .subscribe((title) => this.title = title);
            }
        }
    }
}