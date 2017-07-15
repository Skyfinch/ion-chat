import { Injectable } from '@angular/core';

import { Subject }           from 'rxjs/Subject';

import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';


@Injectable()
export class Auth {

    public isLoggedIn = new Subject<Boolean>(); 

    constructor(afAuth : AngularFireAuth) {
         this.isLoggedIn.next(!!afAuth.auth.currentUser);
    }

    public logout(): void {
        this.isLoggedIn.next(false);
    }
}