// src/auth/auth.service.ts
import { inject, Injectable } from '@angular/core';
import {
  HttpClient,
  HttpHeaders,
  HttpParams,
} from '@angular/common/http';
import {
  BehaviorSubject,
  Observable,
  tap,
} from 'rxjs';

// 👤 Tipo de usuario que viene del backend
export interface AuthUser {
  id: number;
  name: string;
  email: string;
  role: string;
}

// 🔐 Respuesta del backend /auth/login
export interface LoginResponse {
  access_token: string;
  token_type: string;
  user: AuthUser;
}

// DTO que usamos en el front
export interface LoginDto {
  email: string;
  password: string;
}

@Injectable({ providedIn: 'root' })
export class AuthService {
  private http = inject(HttpClient);

  // TODO: luego mover esto a environment
  private readonly apiUrl = 'http://localhost:3000';

  private readonly TOKEN_KEY = 'tsj_token';
  private readonly USER_KEY = 'tsj_user';

  // 📡 Estado reactivo (por si mañana quieres escuchar cambios)
  private readonly _user$ = new BehaviorSubject<AuthUser | null>(
    this.loadUserFromStorage(),
  );
  private readonly _isLoggedIn$ = new BehaviorSubject<boolean>(
    !!this.loadTokenFromStorage(),
  );

  // Expuestos como solo lectura
  readonly user$ = this._user$.asObservable();
  readonly isLoggedIn$ = this._isLoggedIn$.asObservable();

  // ---------------------------------------------------------------------------
  // 🔐 Login
  // ---------------------------------------------------------------------------
  login(dto: LoginDto): Observable<LoginResponse> {
    const body = new HttpParams()
      .set('username', dto.email)
      .set('password', dto.password);

    const headers = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded',
    });

    return this.http
      .post<LoginResponse>(`${this.apiUrl}/auth/login`, body.toString(), {
        headers,
      })
      .pipe(
        tap((res) => {
          // guardamos token y usuario en localStorage
          localStorage.setItem(this.TOKEN_KEY, res.access_token);
          localStorage.setItem(this.USER_KEY, JSON.stringify(res.user));

          // actualizamos estado en memoria
          this._user$.next(res.user);
          this._isLoggedIn$.next(true);
        }),
      );
  }

  // ---------------------------------------------------------------------------
  // 🚪 Logout
  // ---------------------------------------------------------------------------
  logout(): void {
    localStorage.removeItem(this.TOKEN_KEY);
    localStorage.removeItem(this.USER_KEY);

    this._user$.next(null);
    this._isLoggedIn$.next(false);
  }

  // ---------------------------------------------------------------------------
  // 📦 Getters “clásicos” (para usar en templates y servicios)
  // ---------------------------------------------------------------------------
  get token(): string | null {
    return this.loadTokenFromStorage();
  }

  get currentUser(): AuthUser | null {
    return this._user$.value;
  }

  isLoggedIn(): boolean {
    return this._isLoggedIn$.value;
  }

  // ---------------------------------------------------------------------------
  // 🧰 Helpers para otros servicios HTTP
  // ---------------------------------------------------------------------------
  /** Headers con Bearer token para JSON */
  getAuthHeadersJson(): HttpHeaders {
    const t = this.token;
    let headers = new HttpHeaders().set(
      'Content-Type',
      'application/json',
    );

    if (t) {
      headers = headers.set('Authorization', `Bearer ${t}`);
    }
    return headers;
  }

  /** Headers con Bearer token sin forzar Content-Type */
  getAuthHeaders(): HttpHeaders {
    const t = this.token;
    let headers = new HttpHeaders();
    if (t) {
      headers = headers.set('Authorization', `Bearer ${t}`);
    }
    return headers;
  }

  // ---------------------------------------------------------------------------
  // 🔎 Carga desde localStorage
  // ---------------------------------------------------------------------------
  private loadTokenFromStorage(): string | null {
    return localStorage.getItem(this.TOKEN_KEY);
  }

  private loadUserFromStorage(): AuthUser | null {
    const raw = localStorage.getItem(this.USER_KEY);
    if (!raw) return null;
    try {
      return JSON.parse(raw) as AuthUser;
    } catch {
      // si está corrupto, lo limpiamos
      localStorage.removeItem(this.USER_KEY);
      return null;
    }
  }
}