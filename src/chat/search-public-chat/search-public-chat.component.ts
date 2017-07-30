import { Component, EventEmitter, Output } from '@angular/core';
import { Subject } from 'rxjs/Subject';

import * as firebase from 'firebase/app';

import { ChatService } from '../chat.service';

import { Chat } from '../chat';

@Component({
  selector: 'search-public-chat',
  templateUrl: 'search-public-chat.component.html'
})
export class SearchPublicChat {

  @Output() clickOnChat: EventEmitter<any> = new EventEmitter();

  sub;

  chats;
  startAt = new Subject()
  endAt = new Subject()

  constructor(private chatService: ChatService) { }

  ngOnInit() {
    this.sub = this.chatService.searchPublicChats(this.startAt, this.endAt)
        .subscribe(chats =>
                    { 
                        this.chats = chats;
                    });
  }

  ngOnDestroy(){
    this.sub.unsubscribe();
  }

  search($event) {
      let q = $event.target.value;
      if(!!q) {
          this.startAt.next(q);
          this.endAt.next(q+"\uf8ff");
      }
  }

  onChatClicked(chatUid : string) {
     this.clickOnChat.emit(chatUid);
  }

}