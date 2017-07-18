import { Component } from '@angular/core';

import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';

import "rxjs/add/operator/take";

import { UserService } from '../user.service';


@Component({
  templateUrl: 'user-profile.component.html'
})
export class UserProfile {

  public userProfile : {};

  constructor(private afAuth: AngularFireAuth, private userService: UserService) {
  }

  ngOnInit(){
     firebase.auth().onAuthStateChanged((user) => {
      if (user) {
          this.userService.getUser(firebase.auth().currentUser.uid).take(1).subscribe((snapshot) => {
            this.userProfile = snapshot;
            console.log(this.userProfile);
          });
      }
    });
  }

  logout() {
    this.afAuth.auth.signOut();
  }

}
