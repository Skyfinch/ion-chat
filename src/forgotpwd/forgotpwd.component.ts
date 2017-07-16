import { Component } from '@angular/core';
import { Nav } from 'ionic-angular';

import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';

@Component({
  selector: 'forgotpwd',
  templateUrl: 'forgotpwd.component.html',
})

export class ForgotPwd {

  email: string;
  message: string;

  constructor(private afAuth: AngularFireAuth, private nav: Nav) {
    this.email = "";
    this.message = "";
  }
}