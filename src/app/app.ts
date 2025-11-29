import { Component, signal } from '@angular/core';
import { LoginComponent } from '../auth/login/login.component';

@Component({
  selector: 'app-root',
  imports: [LoginComponent],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = signal('tsj-assistant-frontend');
}
