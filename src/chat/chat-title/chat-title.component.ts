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
                for (var memberUid in this.chat.members) {
                    if(memberUid !== firebase.auth().currentUser.uid)
                    this.userService.getUser(memberUid).take(1).subscribe((user) => {
                        this.title += user.displayName;
                    });
                }    
            }
        }
    }
}