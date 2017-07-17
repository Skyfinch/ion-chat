import { NgModule} from '@angular/core';
import { IonicModule } from 'ionic-angular';

import { Login } from './login/login.component';
import { SignUp } from './sign-up/sign-up.component';
import { ForgotPassword } from './forgot-password/forgot-password.component';

@NgModule({
  declarations: [
    Login,
    SignUp,
    ForgotPassword
  ],
  imports: [
    IonicModule
  ],
  entryComponents: [
    Login,
    SignUp,
    ForgotPassword
  ],
  exports: [
    Login
  ]
})
export class AuthenticationModule {}
