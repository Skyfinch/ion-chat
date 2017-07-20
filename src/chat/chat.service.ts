import { Injectable } from '@angular/core';

import { AngularFireDatabase, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2/database';

import {Observable} from 'rxjs/Observable';
import { Subject }    from 'rxjs/Subject';

import { UserService} from '../user/user.service'

import { Chat } from './chat'
import { Message } from './message'

@Injectable()
export class ChatService {

    constructor(private afDb : AngularFireDatabase,
                private userService : UserService) {
    }

    getChat(chatUid : string) : FirebaseObjectObservable<Chat>{
        return this.afDb.object("chats/" + chatUid);
    }

    getChats() : FirebaseListObservable<Chat[]>{
        return this.afDb.list("chats");
    }

    addUserToChat(chatUid : string, userUid : string){
        this.afDb.object("chats/" + chatUid + "/members/" + userUid).set(true);
        this.afDb.object("users/" + userUid + "/chats/" + chatUid).set(true);        
    }

    getChatsByUser(userUid : string) : Observable<Chat[]> {
        return new Observable<Chat[]>(observer => {
            let chats = [];
            this.afDb.list("users/" + userUid + "/chats/").take(1).subscribe( chatRefs => {
                chatRefs.forEach(chatRef => {
                    console.log(chatRef);
                    this.getChat(chatRef.$key).take(1).subscribe( chat => {
                        chats.push(chat);
                        observer.next(chats);
                    }) 
                });
            })
        })
    }

    getChatDefaultTitle(chat : Chat, currentUserUid : string) : Observable<string> {
        return new Observable<string>(observer => {
            let title = "";
            for(var memberUid in chat.members) {
                if(memberUid != currentUserUid)
                    this.userService.getUser(memberUid).take(1).subscribe( user => {
                        title += user.displayName;
                        observer.next(title);
                    })
            }
        })
    }

    createOneToOneChat(userUidFst : string, userUidSnd : string){
        let chatUid = this.afDb.list("chats").push({
             oneToOne : true,
             private : true
         }).key;
        this.addUserToChat(chatUid, userUidFst);
        this.addUserToChat(chatUid, userUidSnd);   
        this.afDb.object("users/" + userUidFst + "/relationships/" + userUidSnd).set(chatUid);         
        this.afDb.object("users/" + userUidSnd + "/relationships/" + userUidFst).set(chatUid);       
        return chatUid;    
    }
   
    getMessages(chatUid : string) : FirebaseListObservable<Message[]>{
        return this.afDb.list("messages/" + chatUid);
    }

    createMessage(chatUid : string, message : Message){
        return this.afDb.list("messages/" + chatUid).push(message);
    }
}