import { Component, EventEmitter, Output } from '@angular/core';
import { Subject } from 'rxjs/Subject';

import * as firebase from 'firebase/app';

import { UserService } from '../user.service';

import { User } from '../user';

@Component({
  selector: 'search-user',
  templateUrl: 'search-user.component.html'
})
export class SearchUser {

  @Output() clickOnUser: EventEmitter<any> = new EventEmitter();

  sub;

  users;
  startAt = new Subject()
  endAt = new Subject()

  constructor(private userService: UserService) { }

  ngOnInit() {
    this.sub = this.userService.getUsers(this.startAt, this.endAt)
        .subscribe(users =>
                    { 
                        this.users = users.filter(
                          (user) => {
                            if(user.$key !== firebase.auth().currentUser.uid)
                               return true;
                          });
                    });
  }

  ngOnDestroy(){
    this.sub.unsubscribe();
  }

  search($event) {
      let q = $event.target.value;
      if(!!q) {
          this.startAt.next(q);
          this.endAt.next(q+"\uf8ff");
      }
  }

  onUserClicked(userUid : string) {
     this.clickOnUser.emit(userUid);
  }

}