import { Component } from '@angular/core';
import { Nav } from 'ionic-angular';

import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';

@Component({
  selector: 'signup',
  templateUrl: 'signup.component.html',
})

export class Signup {

  email: string;
  password: string;
  confirm_password: string;
  display_name: string;

  message: string;

  constructor(private afAuth: AngularFireAuth, private nav: Nav) {
    this.email = "";
    this.password = "";
    this.confirm_password = "";

    this.display_name = "";
    this.message = "";
  }

  signUp(){
    if(this.password == this.confirm_password){
      this.afAuth.auth
        .createUserWithEmailAndPassword(this.email, this.password)
        .then(
          () => {
            console.log("User successfully created !");
            this.nav.pop();
        })
        .catch(
          error => { 
            console.log("Could not create user : " + error);
            this.message = "Cannot create user.";
          });
    }
    else{
      this.message = "The 2 pwd must be identical !";
    }
  }
}