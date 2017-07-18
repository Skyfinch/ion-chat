import { NgModule } from '@angular/core';
import { IonicModule } from 'ionic-angular';

import { CreateChat } from './create-chat/create-chat.component';
import { ChatDetail } from './chat-detail/chat-detail.component';
import { ChatList } from './chat-list/chat-list.component';
import { ChatListItem } from './chat-list/chat-list-item.component';
import { ChatTitle } from './chat-title/chat-title.component';
import { UserModule } from '../user/user.module';

import { ChatService } from './chat.service';

@NgModule({
    declarations: [
        ChatDetail,
        ChatList,
        ChatListItem,
        CreateChat,
        ChatTitle
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