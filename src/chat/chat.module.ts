import { NgModule } from '@angular/core';
import { IonicModule } from 'ionic-angular';

import { NewChat } from './new-chat/new-chat.component';
import { ChatDetail } from './chat-detail/chat-detail.component';
import { ChatList } from './chat-list/chat-list.component';
import { ChatListItem } from './chat-list/chat-list-item.component';
import { SearchPublicChat } from './search-public-chat/search-public-chat.component';
import { UserModule } from '../user/user.module';

import { ChatService } from './chat.service';

@NgModule({
    declarations: [
        ChatDetail,
        ChatList,
        ChatListItem,
        NewChat,
        SearchPublicChat
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
        NewChat
    ],
    providers:[
        ChatService
    ]
})
export class ChatModule {}