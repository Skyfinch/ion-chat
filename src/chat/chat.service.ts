import { Injectable } from '@angular/core';

import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';

import { Chat } from './Chat'
import { Message } from './Message'

@Injectable()
export class ChatService {

    private chats : FirebaseListObservable<any>;

    constructor(private afDb : AngularFireDatabase) {
        this.chats = this.afDb.list("chats");
    }

    getChat(chatUid : string){
        return this.afDb.object("chats/" + chatUid);
    }

    getChats(){
        return this.chats;
    }

    getMessages(chatUid : string){
        return this.afDb.list("messages/" + chatUid);
    }

    createChat(chat : Chat){
        return this.chats.push(chat);
    }

    createMessage(chatUid : string, message : Message){
        return this.afDb.list("messages/" + chatUid).push(message);
    }
}