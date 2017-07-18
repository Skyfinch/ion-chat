import { Injectable } from '@angular/core';

import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import * as firebase from 'firebase/app';

import { User } from './user';

@Injectable()
export class UserService {

    constructor(private db: AngularFireDatabase) {
    }

    getUser(userUid: string) {
        return this.db.object('/users/' + userUid);
    }

    getUsers(start, end): FirebaseListObservable<any> {
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