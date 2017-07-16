import { NgModule } from '@angular/core';
import { IonicModule } from 'ionic-angular';

import { Chat } from '../chat/chat.component';
import { ChatsList } from '../chat/chats-list.component';
import { CreateChat } from '../chat/create-chat.component';

import { ChatService } from '../services/chat.service';

@NgModule({
    declarations: [
        Chat,
        ChatsList,
        CreateChat
    ],
    imports: [
        IonicModule.forRoot(ChatsList),
    ],
    exports: [
        Chat,
        ChatsList,
        CreateChat
    ],
    entryComponents: [
        Chat,
        ChatsList,
        CreateChat
    ],
    providers:[
        ChatService
    ]
})
export class ChatModule {}