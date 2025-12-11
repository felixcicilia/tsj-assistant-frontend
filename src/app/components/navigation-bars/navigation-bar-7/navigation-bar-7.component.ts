// src/app/layout/navigation-bar-7/navigation-bar-7.component.ts
import { Component, ElementRef, HostListener, inject } from '@angular/core';
import { RouterModule, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { NgbCollapseModule } from '@ng-bootstrap/ng-bootstrap';

import { LogoBoxComponent } from '@components/logo-box/logo-box.component';
import { HorizontalAppMenu } from '@components/app-menu/horizontal-app-menu/horizontal-app-menu.component';
import { VerticalMenuButtonComponent } from '@components/app-menu/vertical-menu-button.component';
import { ThemeSwitcherComponent } from '../components/theme-switcher/theme-switcher.component';

import { AuthService, AuthUser } from '../../../pages/account/auth/auth.service';

@Component({
  selector: 'component-navigation-bar-7',
  standalone: true,
  imports: [
    CommonModule,              // 👈 IMPORTANTE para *ngIf / ng-template
    LogoBoxComponent,
    HorizontalAppMenu,
    NgbCollapseModule,
    VerticalMenuButtonComponent,
    ThemeSwitcherComponent,
    RouterModule,
  ],
  templateUrl: './navigation-bar-7.component.html',
})
export class NavigationBar7Component {
  private elementRef = inject(ElementRef);
  private auth = inject(AuthService);
  private router = inject(Router);

  isMenuCollapsed = true;

  // Usuario actual
  get user(): AuthUser | null {
    return this.auth.currentUser;
  }

  get isLoggedIn(): boolean {
    return this.auth.isLoggedIn();
  }

  // Nombre corto para mostrar en el menú
  get userShortName(): string {
    return this.user?.name || this.user?.email || 'Invitado';
  }

  // Inicial del usuario (como te gustó 👇)
  get userInitial(): string {
    return (
      this.user?.name?.charAt(0).toUpperCase() ||
      this.user?.email?.charAt(0).toUpperCase() ||
      'U'
    );
  }

  // Cerrar sesión → te llevo al home "/"
  onLogout(): void {
    this.auth.logout();
    this.router.navigate(['/']);
  }

  // Sticky navbar
  @HostListener('window:scroll')
  onWindowScroll() {
    this.checkScroll();
  }

  checkScroll() {
    const scrollTop =
      window.scrollY || document.documentElement.scrollTop || 0;

    const navbarEl = this.elementRef.nativeElement.querySelector('.navbar');
    if (!navbarEl) return;

    if (scrollTop > 20) {
      navbarEl.classList.add('navbar-stuck');
    } else {
      navbarEl.classList.remove('navbar-stuck');
    }
  }
}