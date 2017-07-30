import { Component, Input } from '@angular/core';

import { Events } from 'ionic-angular';

import {Observable} from 'rxjs/Observable';

import { ChatService } from '../chat.service';

import { Chat } from '../chat';
import { Message } from '../message';


@Component({
  selector: 'chat-list-item',
  templateUrl: 'chat-list-item.component.html'
})
export class ChatListItem {

    @Input("uid") chatUid : string;

    chat : Chat

    sub;

    constructor(public chatService : ChatService, events : Events){}
    
    ngOnInit() {
        this. sub = this.chatService.getChat(this.chatUid).subscribe(chat => this.chat = chat);
    }

    
    ngOnDestroy(){
        this.sub.unsubscribe();
    }

}
