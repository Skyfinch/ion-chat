import { Component } from '@angular/core';
import { App } from 'ionic-angular';

import { Observable } from 'rxjs/Observable';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';

import Login from '../login/login.component'

import { Auth } from '../services/auth.service';

@Component({
  templateUrl: 'user-profile.component.html'
})
export class UserProfile {

  user: Observable<firebase.User>;

  constructor(private app : App, private auth : Auth, private afAuth: AngularFireAuth) {
    this.user = afAuth.authState;
    console.log(this.user);
  }

  logout() {
    this.afAuth.auth.signOut();
    this.auth.logout();
  }

}
