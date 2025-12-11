// src/app/account/chat/chat.component.ts
import { Component, OnInit, ViewChild, TemplateRef } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";

import {
  SimplebarAngularComponent,
  SimplebarAngularModule,
} from "simplebar-angular";

import {
  NgbDropdownModule,
  NgbOffcanvas,
  NgbOffcanvasModule,
  NgbOffcanvasRef,
} from "@ng-bootstrap/ng-bootstrap";

import {
  ChatService,
  ChatSessionSummary,
  ChatMessage,
  AskAssistantResponse,
  SessionMessagesResponse as ChatSessionDetail,
} from "../../../chat/chat.service";
import { AuthService } from "../../../../auth/auth.service";

@Component({
  selector: "account-chat-list",
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    SimplebarAngularModule,
    NgbDropdownModule,
    NgbOffcanvasModule,
  ],
  templateUrl: "./chat-list.component.html",
  styleUrls: ["./chat-list.component.scss"],
})
export class ChatListComponent implements OnInit {
  // =======================
  // Estado de negocio (TSJ)
  // =======================

  sessions: ChatSessionSummary[] = [];
  filteredSessions: ChatSessionSummary[] = [];

  selectedSession: ChatSessionSummary | null = null;
  messages: ChatMessage[] = [];

  loadingSessions = false;
  loadingMessages = false;
  sending = false;

  newQuestion = "";

  // =======================
  // Estado de UI (template Around)
  // =======================


  term: string = "";
  activeTab: number | null = null;

  username: string = "Asistente jurídico TSJ";
  avatar: string | null = null;
  avatar2: string = "TSJ";

  @ViewChild("scrollRef", { static: false })
  scrollRef?: SimplebarAngularComponent;

  // 🔹 template del sidebar mobile
  @ViewChild("contactsOffcanvasTpl", { static: false })
  contactsOffcanvasTpl?: TemplateRef<any>;

  // 🔹 referencia al offcanvas abierto
  private offcanvasRef?: NgbOffcanvasRef;

  constructor(
    private readonly chat: ChatService,
    private readonly auth: AuthService,
    private readonly offcanvas: NgbOffcanvas,
  ) {}

  // =======================
  // Ciclo de vida
  // =======================

  ngOnInit(): void {
    this.loadSessions();
  }

  // =======================
  // Sesiones
  // =======================

  trackBySessionId(index: number, s: ChatSessionSummary): number {
    return s.id;
  }

  trackByMsgId(index: number, m: ChatMessage): number {
    return m.id;
  }

  loadSessions(): void {
    this.loadingSessions = true;

    this.chat.getSessions().subscribe({
      next: (sessions) => {
        this.sessions = sessions;
        this.filteredSessions = sessions;
        this.loadingSessions = false;

        if (!this.selectedSession && this.sessions.length > 0) {
          this.selectSession(this.sessions[0], 0);
        }
      },
      error: (err) => {
        console.error("Error cargando sesiones", err);
        this.loadingSessions = false;
      },
    });
  }

  selectSession(
    session: ChatSessionSummary,
    index: number | null = null
  ): void {
    this.selectedSession = session;
    this.activeTab = index;
    this.username = session.title || "Asistente jurídico TSJ";
    this.loadMessages(session.id);
  }

  startNewSession(): void {
    this.selectedSession = null;
    this.messages = [];
    this.newQuestion = "";
    this.activeTab = null;
    this.username = "Asistente jurídico TSJ";
  }

  // =======================
  // Mensajes
  // =======================

  loadMessages(sessionId: number): void {
    this.loadingMessages = true;

    this.chat.getSessionMessages(sessionId).subscribe({
      next: (detail: ChatSessionDetail) => {
        this.selectedSession = detail.session;
        this.messages = detail.messages;
        this.loadingMessages = false;
        this.scrollToBottom();
      },
      error: (err) => {
        console.error("Error cargando mensajes de la sesión", err);
        this.loadingMessages = false;
      },
    });
  }

  isUser(msg: ChatMessage): boolean {
    return msg.role === "user";
  }

  isAssistant(msg: ChatMessage): boolean {
    return msg.role === "assistant";
  }

  // =======================
  // Enviar nueva pregunta
  // =======================

  sendMessage(): void {
    const text = this.newQuestion.trim();
    if (!text || this.sending) return;

    const currentSessionId = this.selectedSession?.id;

    this.sending = true;

    // mensaje optimista user
    const nowIso = new Date().toISOString();
    const userMsg: ChatMessage = {
      id: Date.now(),
      role: "user",
      model: null,
      tokensIn: null,
      tokensOut: null,
      content: text,
      createdAt: nowIso,
    };
    this.messages = [...this.messages, userMsg];
    this.newQuestion = "";
    this.scrollToBottom();

    this.chat.askAssistant(text, currentSessionId ?? undefined).subscribe({
      next: (res: AskAssistantResponse) => {
        const now = new Date().toISOString();

        if (!currentSessionId) {
          // nueva sesión creada por el backend
          const newSession: ChatSessionSummary = {
            id: res.sessionId,
            title: text.slice(0, 120),
            channel: "web",
            createdAt: now,
            updatedAt: now,
          };

          this.sessions = [newSession, ...this.sessions];
          this.filteredSessions = this.sessions;
          this.selectSession(newSession, 0);
        } else {
          // actualizar updatedAt en memoria
          this.sessions = this.sessions.map((s) =>
            s.id === currentSessionId ? { ...s, updatedAt: now } : s
          );
        }

        const assistantMsg: ChatMessage = {
          id: Date.now() + 1,
          role: "assistant",
          model: res.model,
          tokensIn: null,
          tokensOut: null,
          content: res.answer,
          createdAt: now,
        };
        this.messages = [...this.messages, assistantMsg];
        this.scrollToBottom();
      },
      error: (err) => {
        console.error("Error enviando mensaje", err);
        // aquí podrías mostrar toast y/o revertir el mensaje optimista
      },
      complete: () => {
        this.sending = false;
      },
    });
  }

  // =======================
  // UI helpers
  // =======================

  scrollToBottom(): void {
    if (!this.scrollRef) return;

    setTimeout(() => {
      try {
        const el = this.scrollRef!.SimpleBar.getScrollElement();
        el.scrollTop = el.scrollHeight;
      } catch (e) {
        console.warn("No se pudo hacer scroll", e);
      }
    }, 50);
  }

  filterChat(): void {
    const term = (this.term || "").toLowerCase().trim();

    if (!term) {
      this.filteredSessions = this.sessions;
      return;
    }

    this.filteredSessions = this.sessions.filter((s) => {
      const title = (s.title || "").toLowerCase();
      const channel = (s.channel || "").toLowerCase();
      return title.includes(term) || channel.includes(term);
    });
  }

  // abrir
  openEnd(content: TemplateRef<any>): void {
    this.offcanvasRef = this.offcanvas.open(content, {
      backdrop: false,
      panelClass: "rounded-5",
    });
  }

  // cerrar
  closeOffcanvas(reason: string = "close-button"): void {
    this.offcanvasRef?.close(reason);
  }
}
