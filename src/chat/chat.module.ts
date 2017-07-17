import { NgModule } from '@angular/core';
import { IonicModule } from 'ionic-angular';

import { CreateChat } from './create-chat/create-chat.component';
import { ChatDetail } from './chat-detail/chat-detail.component';
import { ChatsList } from './chats-list/chats-list.component';
import { UserModule } from '../user/user.module';

import { ChatService } from './chat.service';

@NgModule({
    declarations: [
        ChatDetail,
        ChatsList,
        CreateChat
    ],
    imports: [
        IonicModule,
        UserModule
    ],
    exports: [
        ChatsList
    ],
    entryComponents: [
        ChatDetail,
        ChatsList,
        CreateChat,
    ],
    providers:[
        ChatService
    ]
})
export class ChatModule {}