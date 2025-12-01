import { Component, signal } from '@angular/core';
import { LoginComponent } from '../auth/login/login.component';
import { ChatComponent } from '../chat/chat.component';

@Component({
  selector: 'app-root',
  imports: [LoginComponent, ChatComponent],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = signal('tsj-assistant-frontend');
}
