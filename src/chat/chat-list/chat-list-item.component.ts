import { Component, Input } from '@angular/core';

import { FirebaseObjectObservable } from 'angularfire2/database';

import { ChatService } from '../chat.service';

import { Chat } from '../chat';

@Component({
    selector: 'chat-list-item',
    templateUrl: 'chat-list-item.component.html'
})
export class ChatListItem {

  @Input() chatUid : string;
    
  public chat = null;

  constructor(private chatService: ChatService){}

  ngOnInit(){
    this.chatService.getChat(this.chatUid).subscribe(
      (chat) => { 
        console.log(chat);
        this.chat = chat; }
    );
  }

}
