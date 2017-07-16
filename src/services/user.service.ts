import { Injectable } from '@angular/core';

import * as firebase from 'firebase/app';

@Injectable()
export class UserService {

    usersRef: any = firebase.database().ref('users');

    constructor() {
    }

    getUser(userUid: string) {
        return this.usersRef.child(userUid).once('value');
    }

    getUsers(){
        return this.usersRef();
    }

}