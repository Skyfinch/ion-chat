import { Component } from '@angular/core';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';

@Component({
  selector: 'ar-chat',
  templateUrl: 'chat.component.html'
})
export class Chat {

    messages: FirebaseListObservable<any[]>;

  constructor(public db: AngularFireDatabase) { }

  ngOnInit() {
	  this.getChatData();
  }
  
  getChatData() {
	  this.messages = this.db.list('chat_messages');
  }

  newMessage(message) {
	  this.messages.push(message);
  }

}
