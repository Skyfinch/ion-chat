import { NgModule } from '@angular/core';
import { IonicModule } from 'ionic-angular';

import { SearchUser } from './search-user/search-user.component';
import { UserProfile } from './user-profile/user-profile.component';

import { UserService } from './user.service';

@NgModule({
    declarations: [
        UserProfile,
        SearchUser
    ],
    exports: [
        UserProfile,
        SearchUser
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