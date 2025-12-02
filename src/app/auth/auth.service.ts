// src/auth/auth.service.ts
import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable, tap } from 'rxjs';

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

  // 👇 pon aquí tu backend (para prod luego lo sacamos a environment)
  private readonly apiUrl = 'http://localhost:3000';

  login(dto: LoginDto): Observable<LoginResponse> {
    // El backend espera username/password en x-www-form-urlencoded
    const body = new HttpParams().set('username', dto.email).set('password', dto.password);

    const headers = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded',
    });

    return this.http
      .post<LoginResponse>(`${this.apiUrl}/auth/login`, body.toString(), { headers })
      .pipe(
        tap((res) => {
          // guardamos token y usuario en localStorage
          localStorage.setItem('tsj_token', res.access_token);
          localStorage.setItem('tsj_user', JSON.stringify(res.user));
        })
      );
  }

  logout(): void {
    localStorage.removeItem('tsj_token');
    localStorage.removeItem('tsj_user');
  }

  get token(): string | null {
    return localStorage.getItem('tsj_token');
  }

  get currentUser(): AuthUser | null {
    const raw = localStorage.getItem('tsj_user');
    if (!raw) return null;
    try {
      return JSON.parse(raw) as AuthUser;
    } catch {
      return null;
    }
  }

  isLoggedIn(): boolean {
    return !!this.token;
  }
}
