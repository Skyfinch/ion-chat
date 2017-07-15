import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { Chat } from '../chat/chat.component';

@Component({
  templateUrl: 'home.component.html'
})
export class Home {

  tab1Root = Chat;

  constructor() {

  }
}
