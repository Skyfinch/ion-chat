import { Component } from '@angular/core';
import { Nav, ToastController } from 'ionic-angular';

import { AngularFireAuth } from 'angularfire2/auth';

@Component({
  selector: 'forgot-password',
  templateUrl: 'forgot-password.component.html',
})

export class ForgotPassword {

  email: string;
  message: string;

  constructor(private afAuth: AngularFireAuth, private nav: Nav, private toastCtrl: ToastController) {
    this.email = "";
    this.message = "";
  }

  resetPwd(){
    this.afAuth.auth
      .sendPasswordResetEmail(this.email)
      .then(() => {
        console.log("Successfully sent a reset email");
        this.presentToast();
        this.nav.pop();
      })
      .catch(error => {
        console.log("error trying to reset pwd : " + error);
        this.message = "No user found for this email"
      })
  }

  presentToast() {
    let toast = this.toastCtrl.create({
      message: 'Reset email sent. Check your emails !',
      position: 'bottom',
      duration: 10000
    });

    toast.present();
  }
}