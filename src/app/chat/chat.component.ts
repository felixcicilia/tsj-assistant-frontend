// src/chat/chat.component.ts
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import {
  ChatService,
  ChatSessionSummary,
  ChatMessage,
  SessionMessagesResponse as ChatSessionDetail,
  AskAssistantResponse,
} from './chat.service';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-chat',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss'],
})
export class ChatComponent implements OnInit {
  // 🧾 Lista de sesiones
  sessions: ChatSessionSummary[] = [];

  // Sesión seleccionada actualmente
  selectedSession: ChatSessionSummary | null = null;

  // Mensajes de la sesión seleccionada
  messages: ChatMessage[] = [];

  // Estado UI
  loadingSessions = false;
  loadingMessages = false;
  sending = false;

  // Pregunta que escribe el usuario
  newQuestion = '';

  // Contenedor de mensajes para auto-scroll
  @ViewChild('messagesContainer')
  messagesContainer?: ElementRef<HTMLDivElement>;

  constructor(
    private readonly chat: ChatService,
    private readonly auth: AuthService // (por si luego lo usamos)
  ) {}

  // 🚀 Al iniciar, cargamos las sesiones del usuario
  ngOnInit(): void {
    this.loadSessions();
  }

  // =========================
  //  trackBy helpers
  // =========================

  trackBySessionId(index: number, session: ChatSessionSummary): number {
    return session.id;
  }

  trackByMsgId(index: number, msg: ChatMessage): number {
    return msg.id;
  }

  // =========================
  //  Sesiones
  // =========================

  loadSessions(): void {
    this.loadingSessions = true;

    this.chat.getSessions().subscribe({
      next: (sessions) => {
        this.sessions = sessions;
        this.loadingSessions = false;

        // Si no hay sesión seleccionada y hay sesiones, escogemos la primera
        if (!this.selectedSession && this.sessions.length > 0) {
          this.selectSession(this.sessions[0]);
        }
      },
      error: (err) => {
        console.error('Error cargando sesiones', err);
        this.loadingSessions = false;
      },
    });
  }

  selectSession(session: ChatSessionSummary): void {
    this.selectedSession = session;
    this.loadMessages(session.id);
  }

  // Botón "+ Nueva" → limpia estado para iniciar un nuevo hilo
  startNewSession(): void {
    this.selectedSession = null;
    this.messages = [];
    this.newQuestion = '';
  }

  // =========================
  //  Mensajes
  // =========================

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
        console.error('Error cargando mensajes de la sesión', err);
        this.loadingMessages = false;
      },
    });
  }

  isUser(msg: ChatMessage): boolean {
    return msg.role === 'user';
  }

  isAssistant(msg: ChatMessage): boolean {
    return msg.role === 'assistant';
  }

  // =========================
  //  Enviar nueva pregunta
  // =========================

  sendMessage(): void {
    const text = this.newQuestion.trim();
    if (!text || this.sending) return;

    // Puede existir o no una sesión seleccionada.
    const currentSessionId = this.selectedSession?.id;

    this.sending = true;

    // 1) Añadir mensaje del usuario al hilo (optimista)
    const userMsg: ChatMessage = {
      id: Date.now(), // temporal solo en el front
      role: 'user',
      model: null,
      tokensIn: null,
      tokensOut: null,
      content: text,
      createdAt: new Date().toISOString(),
    };
    this.messages = [...this.messages, userMsg];

    // 2) Limpiar textarea
    this.newQuestion = '';

    // 3) Llamar al backend:
    //    - Si hay currentSessionId → se usa para seguir el hilo
    //    - Si NO hay → el backend crea una nueva sesión
    this.chat.askAssistant(text, currentSessionId ?? undefined).subscribe({
      next: (res: AskAssistantResponse) => {
        // 4) Si NO había sesión seleccionada, creamos una en el front
        if (!currentSessionId) {
          const nowIso = new Date().toISOString();

          const newSession: ChatSessionSummary = {
            id: res.sessionId,
            title: text.slice(0, 120),
            channel: 'web',
            createdAt: nowIso,
            updatedAt: nowIso,
          };

          // La metemos al inicio de la lista y la seleccionamos
          this.sessions = [newSession, ...this.sessions];
          this.selectedSession = newSession;
        } else {
          // Si ya existía sesión, actualizamos su updatedAt en memoria
          const nowIso = new Date().toISOString();
          this.sessions = this.sessions.map((s) =>
            s.id === currentSessionId ? { ...s, updatedAt: nowIso } : s
          );
        }

        // 5) Añadir respuesta del asistente al hilo
        const assistantMsg: ChatMessage = {
          id: Date.now() + 1,
          role: 'assistant',
          model: res.model,
          tokensIn: null,
          tokensOut: null,
          content: res.answer,
          createdAt: new Date().toISOString(),
        };

        this.messages = [...this.messages, assistantMsg];

        // 6) Scroll al final
        this.scrollToBottom();
      },
      error: (err: unknown) => {
        console.error('Error enviando mensaje', err);
        // (Opcional) aquí podrías quitar el mensaje optimista o mostrar un toast
      },
      complete: () => {
        this.sending = false;
      },
    });
  }

  // =========================
  //  Utilidades UI
  // =========================

  private scrollToBottom(): void {
    if (!this.messagesContainer) return;

    setTimeout(() => {
      const el = this.messagesContainer?.nativeElement;
      if (!el) return;

      el.scrollTo({
        top: el.scrollHeight,
        behavior: 'smooth',
      });
    }, 0);
  }

  // =========================
  //  Auto-ajuste del textarea
  // =========================

  autoResizeTextArea(event: Event): void {
    const textarea = event.target as HTMLTextAreaElement;
    if (!textarea) return;

    // Resetea primero para que calcule bien el scrollHeight
    textarea.style.height = 'auto';

    const MAX_HEIGHT = 220; // 🔹 límite similar al de ChatGPT (ajusta si quieres)
    const newHeight = Math.min(textarea.scrollHeight, MAX_HEIGHT);

    textarea.style.height = `${newHeight}px`;
    textarea.style.overflowY = textarea.scrollHeight > MAX_HEIGHT ? 'auto' : 'hidden';
  }
}
