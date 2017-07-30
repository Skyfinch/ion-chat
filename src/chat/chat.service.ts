import { Injectable } from '@angular/core';

import { AngularFireDatabase, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2/database';
import * as firebase from 'firebase/app';

import { Observable } from 'rxjs/Rx';
import { Subject }    from 'rxjs/Subject';
import 'rxjs/add/operator/map'

import { UserService} from '../user/user.service'

import { Chat } from './chat'
import { Message } from './message'

@Injectable()
export class ChatService {

    constructor(private afDb : AngularFireDatabase,
                private userService : UserService) {
    }

    /**
     * Get a fully populated chat.
     * @param chatUid Chat's uid.
     */
    getChat(chatUid : string) : Observable<Chat>{
        return this.afDb.object("chats/" + chatUid)
                .flatMap( (chat: Chat) => {
                    let obsDefaultTitle = this.getChatTitle(chat);
                    let obsDefaultPicture = this.getChatPicture(chat);
                    return Observable.zip(Observable.of(chat), obsDefaultTitle, obsDefaultPicture)
                        .map((data : any[]) => {
                            let chat = data[0];
                            chat.title = data[1];
                            chat.photoUrl = data[2];
                            return chat;
                        })
                });
    }

    getChats() : FirebaseListObservable<Chat[]>{
        return this.afDb.list("chats");
    }

    addUserToChat(chatUid : string, userUid : string){
        this.afDb.object("chats/" + chatUid + "/members/" + userUid).set(true);
        this.afDb.object("users/" + userUid + "/chats/" + chatUid).set(true);        
    }

    /**
     * Get chat refs by user.
     * @param userUid User's uid.
     */
    getChatsByUser(userUid : string) : Observable<Chat[]> {
        return this.afDb.list("users/" + userUid + "/chats/");
    }
    
    /**
     * Search public chats.
     */
    searchPublicChats(start, end) : Observable<Chat[]> {
        return this.afDb.list('/chats', {
            query: {
                orderByChild: 'title',
                limitToFirst: 10,
                startAt: start,
                endAt: end
            }
        });
    }

    /**
     * Get chat title.
     * @param chat The chat.
     */
    getChatTitle(chat : Chat) : Observable<string> {
        if(!!chat.title) return Observable.of(chat.title);
        else return Observable.of(Object.keys(chat.members))
                        .flatMap((memberUids: string[]) =>{
                            return Observable.forkJoin(
                                        memberUids
                                            .filter(memberUid => memberUid != firebase.auth().currentUser.uid)
                                            .map((memberUid: any) => {
                                                return  this.userService.getUser(memberUid).take(1)
                                                            .map(member => member.displayName)
                                            }))
                                            .reduce((title, displayName) => {
                                                return title += displayName;
                                            },"")
                        })
    }

    /**
     * Get chat picture.
     * @param chat The chat.
     */
    getChatPicture(chat : Chat) : Observable<string> {
        if(!!chat.photoUrl) return Observable.of(chat.photoUrl);
        else if(!!chat.oneToOne){
            let userUid = Object.keys(chat.members).find(userRef => userRef != firebase.auth().currentUser.uid);
            return this.userService.getUser(userUid)
                    .map(user => user.photoUrl);
        }
        else return Observable.of(null);
    }

    /**
     * Creates a one-to-one chat.
     * @param userUidFst The first user's id.
     * @param userUidSnd  The second users' id.
     */
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

    /**
     * Create a public chat.
     * @param userUid The chat creator's id.
     * @param title Chat's title.
     */
    createPublicChat(userUid: string, title: string) {
        console.log(title);
        let chatUid = this.afDb.list("chats").push({
             oneToOne : false,
             private : false,
             title: title
         }).key;
        this.addUserToChat(chatUid, userUid);
    }
   
    getMessages(chatUid : string) : FirebaseListObservable<Message[]>{
        return this.afDb.list("messages/" + chatUid);
    }

    createMessage(chatUid : string, message : Message){
        return this.afDb.list("messages/" + chatUid).push(message);
    }
}