// src/app/layout/account-layout.component.ts
import {
  Component,
  OnDestroy,
  OnInit,
  TemplateRef,
  inject,
} from "@angular/core";

import { CommonModule } from "@angular/common";
import { Router, RouterModule } from "@angular/router";
import { NgbOffcanvas, NgbOffcanvasModule } from "@ng-bootstrap/ng-bootstrap";

import { NavigationBar7Component } from "@components/navigation-bars/navigation-bar-7/navigation-bar-7.component";
import { FooterComponent } from "./component/footer/footer.component";
import { toggleDocumentAttribute } from "src/app/utils/layout";

import { AuthService, AuthUser } from "../pages/account/auth/auth.service";

@Component({
  selector: "layout-account",
  standalone: true,
  imports: [
    NavigationBar7Component,
    RouterModule,
    CommonModule,
    NgbOffcanvasModule,
    FooterComponent,
  ],
  templateUrl: "./account-layout.component.html",
})
export class AccountLayoutComponent implements OnInit, OnDestroy {
  private offcanvasService = inject(NgbOffcanvas);
  private auth = inject(AuthService);
  private router = inject(Router);

  // 🔹 Menú lateral del dashboard (en español)
  menu = [
    {
      label: "Cuenta",
      items: [
        { label: "Mi perfil", icon: "ai-user", link: "/account/settings" },
      ],
    },
    {
      label: "Dashboard",
      items: [
        { label: "Usuarios", icon: "ai-user", link: "/account/users" },
        { label: "Chat", icon: "ai-messages", link: "/account/chat" },
        { label: "Tokens", icon: "ai-pie-chart", link: "/account/token-usage" },
      ],
    },
  ];

  // Usuario
  get user(): AuthUser | null {
    return this.auth.currentUser;
  }

  get userName(): string {
    return this.user?.name || "TSJ";
  }

  get userLastName(): string {
    return this.user?.lastName || "Assistant";
  }

  get roleName(): string {
    return this.user?.role || "Usuario";
  }

  get userEmail(): string {
    return this.user?.email || "";
  }

  get userInitial(): string {
    return this.user?.name?.charAt(0).toUpperCase() || "U";
  }

  // Cerrar sesión → redirige a "/"
  onLogout(): void {
    this.auth.logout();
    this.router.navigate(["/"]);
  }

  // -----------------------------
  // Layout
  // -----------------------------
  ngOnInit(): void {
    toggleDocumentAttribute("class", "bg-secondary", "body", false);
  }

  ngOnDestroy(): void {
    toggleDocumentAttribute("class", "bg-secondary", "body", true);
  }

  openOffcanvas(content: TemplateRef<any>): void {
    this.offcanvasService.open(content, { position: "start" });
  }
}
