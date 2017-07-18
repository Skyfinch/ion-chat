import { Injectable } from '@angular/core';

import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';

import { Subject }    from 'rxjs/Subject';

import { Chat } from './chat'
import { Message } from './message'

@Injectable()
export class ChatService {

    private chats : FirebaseListObservable<any>;

    constructor(private afDb : AngularFireDatabase) {
        this.chats = this.afDb.list("chats");
    }

    addUserToChat(chatUid : string, userUid : string){
        this.afDb.object("chats/" + chatUid + "/members/" + userUid).set(true);
        this.afDb.object("users/" + userUid + "/chats/" + chatUid).set(true);        
    }

    getChat(chatUid : string){
        return this.afDb.object("chats/" + chatUid);
    }

    getChats(){
        return this.chats;
    }

    getChatsByUser(userUid : string){
        return  this.afDb.list("users/" + userUid + "/chats/");
    }

    getMessages(chatUid : string){
        return this.afDb.list("messages/" + chatUid);
    }

    createOneToOneChat(userUidFst : string, userUidSnd : string){
        let chatUid = this.chats.push({
             oneToOne : true,
             private : true
         }).key;
        this.addUserToChat(chatUid, userUidFst);
        this.addUserToChat(chatUid, userUidSnd);   
        this.afDb.object("users/" + userUidFst + "/relationships/" + userUidSnd).set(chatUid);         
        this.afDb.object("users/" + userUidSnd + "/relationships/" + userUidFst).set(chatUid);       
        return chatUid;    
    }

    createMessage(chatUid : string, message : Message){
        return this.afDb.list("messages/" + chatUid).push(message);
    }
}