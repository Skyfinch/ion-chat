import { Component } from '@angular/core';

import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';

import { UserService } from '../services/user.service';


@Component({
  templateUrl: 'user-profile.component.html'
})
export class UserProfile {

  public userProfile : {};

  constructor(private afAuth: AngularFireAuth, private userService: UserService) {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
          this.userService.getUser(firebase.auth().currentUser.uid).then((snapshot) => {
            this.userProfile = snapshot.val();
            console.log(this.userProfile);
          });
      }
    });
  }

  logout() {
    this.afAuth.auth.signOut();
  }

}
