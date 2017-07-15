import { Component } from '@angular/core';
import { Nav } from 'ionic-angular';

import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';

import { Home } from '../home/home.component';

@Component({
  selector: 'login',
  templateUrl: 'login.component.html',
})
export class Login {
 
  constructor(private nav : Nav, private afAuth: AngularFireAuth) { }
 
   signInWithFacebook() {
    this.afAuth.auth
      .signInWithPopup(new firebase.auth.FacebookAuthProvider())
      .then(res => {
          console.log(res);
           this.nav.setRoot( Home, {});
        });
  }

  signOut() {
    this.afAuth.auth.signOut();
  }
}