// src/app/app.ts
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { AuthService } from './auth/auth.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,   // 👈 importante para <router-outlet> y routerLink
    LoginComponent,
  ],
  templateUrl: './app.html',
})
export class App {
  constructor(public auth: AuthService) {}

  onLogout() {
    this.auth.logout();
  }
}