import { Component } from '@angular/core';
import { Subject } from 'rxjs/Subject';

import { UserService } from '../user.service';

import { User } from '../user';

@Component({
  selector: 'search-user',
  templateUrl: 'search-user.component.html'
})
export class SearchUser {

  sub;

  users;
  startAt = new Subject()
  endAt = new Subject()

  constructor(private userService: UserService) { }

  ngOnInit() {
    this.sub = this.userService.getUsers(this.startAt, this.endAt)
                  .subscribe(users => { console.log(users); this.users = users; console.log(this.users) });
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
}