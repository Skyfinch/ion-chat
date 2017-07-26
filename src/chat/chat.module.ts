import { NgModule } from '@angular/core';
import { IonicModule } from 'ionic-angular';

import { CreateChat } from './create-chat/create-chat.component';
import { ChatDetail } from './chat-detail/chat-detail.component';
import { ChatList } from './chat-list/chat-list.component';
import { UserModule } from '../user/user.module';

import { ChatService } from './chat.service';

@NgModule({
    declarations: [
        ChatDetail,
        ChatList,
        CreateChat
    ],
    imports: [
        IonicModule,
        UserModule
    ],
    exports: [
        ChatList
    ],
    entryComponents: [
        ChatDetail,
        ChatList,
        CreateChat,
    ],
    providers:[
        ChatService
    ]
})
export class ChatModule {}