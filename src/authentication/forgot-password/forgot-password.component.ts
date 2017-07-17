import { Component } from '@angular/core';
import { Nav } from 'ionic-angular';

import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';

@Component({
  selector: 'forgot-password',
  templateUrl: 'forgot-password.component.html',
})

export class ForgotPassword {

  email: string;
  message: string;

  constructor(private afAuth: AngularFireAuth, private nav: Nav) {
    this.email = "";
    this.message = "";
  }
}