import { Component } from '@angular/core'
import { ChatListComponent } from './component/chat-list/chat-list.component'

@Component({
  selector: 'account-chat',
  standalone: true,
  imports: [ChatListComponent],
  templateUrl: './chat.component.html',
  styles: ``,
})
export class ChatComponent {}
