import { Component } from '@angular/core';
import { LoadingController, ToastController } from 'ionic-angular';

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

  constructor(private afAuth: AngularFireAuth, public loadingCtrl: LoadingController, private toastCtrl: ToastController) {
    this.email = "";
    this.password = "";
    this.confirm_password = "";

    this.display_name = "";
    this.message = "";
  }

  signUp() {
    if (this.password == this.confirm_password) {
      let loader = this.loadingCtrl.create({
        content: "Please wait..."
      });
      loader.present();
      this.afAuth.auth
        .createUserWithEmailAndPassword(this.email, this.password)
        .then(() => {
          console.log("User successfully created !");
          loader.dismiss();
          this.presentToast();
        })
        .catch(error => {
          console.log("Could not create user : " + error);
          loader.dismiss();
          this.message = "Cannot create user.";
        })
    }
    else {
      this.message = "The 2 pwd must be identical !";
    }
  }

  presentToast() {
    let toast = this.toastCtrl.create({
      message: 'Welcome !',
      position: 'bottom',
      duration: 3000
    });

    toast.present();
  }
}