// src/chat/chat.service.ts
import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from '../auth/auth.service';

export interface ChatSessionSummary {
  id: number;
  title: string;
  channel: string;
  createdAt: string | Date;
  updatedAt: string | Date;
}

export interface ChatMessage {
  id: number;
  role: 'user' | 'assistant';
  model: string | null;
  tokensIn: number | null;
  tokensOut: number | null;
  content: string;
  createdAt: string | Date;
}

export interface SessionMessagesResponse {
  session: ChatSessionSummary;
  messages: ChatMessage[];
}

export type ChatSessionDetail = SessionMessagesResponse;

export interface AskAssistantResponse {
  sessionId: number;
  answer: string;
  model: string;
  usage: unknown;
  user?: unknown;
  question?: string;
  context?: string | null;
}

@Injectable({ providedIn: 'root' })
export class ChatService {
  private http = inject(HttpClient);
  private auth = inject(AuthService);

  // 👇 luego lo sacamos a environment
  private readonly apiUrl = 'http://localhost:3000';

  private authHeaders(): HttpHeaders {
    const token = this.auth.token;
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });

    if (token) {
      headers = headers.set('Authorization', `Bearer ${token}`);
    }

    return headers;
  }

  /** 🔹 GET /assistant/sessions */
  getSessions(): Observable<ChatSessionSummary[]> {
    return this.http.get<ChatSessionSummary[]>(`${this.apiUrl}/assistant/sessions`, {
      headers: this.authHeaders(),
    });
  }

  /** 🔹 GET /assistant/sessions/:id/messages */
  getSessionMessages(sessionId: number): Observable<SessionMessagesResponse> {
    return this.http.get<SessionMessagesResponse>(
      `${this.apiUrl}/assistant/sessions/${sessionId}/messages`,
      { headers: this.authHeaders() }
    );
  }

  /** 🔹 POST /assistant/ask  (crea nueva sesión y devuelve sessionId) */
  askAssistant(
    question: string,
    sessionId?: number,
    context?: string
  ): Observable<AskAssistantResponse> {
    const body: any = { question };

    if (context) {
      body.context = context;
    }

    // 👇 clave: si hay sesión seleccionada, la mandamos
    if (sessionId) {
      body.sessionId = sessionId;
    }

    return this.http.post<AskAssistantResponse>(`${this.apiUrl}/assistant/ask`, body, {
      headers: this.authHeaders(),
    });
  }
}
