import { NgModule } from '@angular/core';
import { IonicModule } from 'ionic-angular';

import { UserProfile } from './user-profile/user-profile.component';

import { UserService } from './user.service';

@NgModule({
    declarations: [
        UserProfile
    ],
    exports: [
        UserProfile
    ],
    entryComponents: [
        UserProfile
    ],
    imports : [
        IonicModule
    ],
    providers:[
        UserService
    ]
})
export class UserModule {}