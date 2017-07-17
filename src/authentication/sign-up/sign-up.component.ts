import { Component } from '@angular/core';
import { LoadingController, ToastController } from 'ionic-angular';

import { AngularFireAuth } from 'angularfire2/auth';

@Component({
  selector: 'sign-up',
  templateUrl: 'sign-up.component.html',
})

export class SignUp {

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

    this.presentTipsToast();
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
          this.presentWelcomeToast();
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

  presentWelcomeToast() {
    let toast = this.toastCtrl.create({
      message: 'Welcome !',
      position: 'bottom',
      duration: 5000
    });

    toast.present();
  }

  presentTipsToast() {
    let toast = this.toastCtrl.create({
      message: 'Tips : You can also use google or facebook to sign up ! Just get back to login page and choose your favourite social network.',
      position: 'middle',
      showCloseButton: true,
      closeButtonText: 'Ok'
    });

    toast.onDidDismiss(() => {
      console.log('Dismissed toast');
    });

    toast.present();
  }
}