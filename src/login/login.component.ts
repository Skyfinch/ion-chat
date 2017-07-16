import { Component } from '@angular/core';
import { Nav } from 'ionic-angular';

import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';

import { Signup } from '../signup/signup.component';

@Component({
  selector: 'login',
  templateUrl: 'login.component.html',
})
export class Login {

  email: string;
  password: string;
  message: string;

  constructor(private afAuth: AngularFireAuth, private nav: Nav) {
    this.email = "";
    this.password = "";
    this.message = "";
  }

  signInWithFacebook() {
    this.afAuth.auth.signInWithPopup(new firebase.auth.FacebookAuthProvider());
  }

  signInWithGoogle() {
    this.afAuth.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider());
  }

  signInWithEmailAndPassword() {
    console.log("Trying to login using : " + this.email);
    this.afAuth.auth
      .signInWithEmailAndPassword(this.email, this.password)
      .catch(
        error => {this.message = "No account found";}
      );
  }

  forgotPassword(){
    
  }

  signUp(){
    this.nav.push(Signup);
  }
}