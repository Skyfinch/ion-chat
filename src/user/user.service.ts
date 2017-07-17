import { Injectable } from '@angular/core';

import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import * as firebase from 'firebase/app';

import { User } from './user';

@Injectable()
export class UserService {

    usersRef: any = firebase.database().ref('users');

    constructor(private db: AngularFireDatabase) {
    }

    getUser(userUid: string) {
        return this.usersRef.child(userUid).once('value');
    }

    getUsers(start, end): FirebaseListObservable<User[]> {
        return this.db.list('/users', {
        query: {
            orderByChild: 'displayName',
            limitToFirst: 10,
            startAt: start,
            endAt: end
        }
    });
  }

}