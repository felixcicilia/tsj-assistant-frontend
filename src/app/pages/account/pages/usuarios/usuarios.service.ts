import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from './usuarios.model';
import { AuthService } from '../../auth/auth.service';

interface UsersResponse {
  data: User[];
  total: number;
  page: number;
  limit: number;
}

@Injectable({ providedIn: 'root' })
export class UsuariosService {
  private baseUrl = 'http://localhost:3000/users';

  constructor(
    private http: HttpClient,
    private auth: AuthService // 👈 inyectamos AuthService
  ) {}

  getUsers(page = 1, limit = 50): Observable<UsersResponse> {
    const params = new HttpParams().set('page', page.toString()).set('limit', limit.toString());

    const headers = this.auth.getAuthHeaders(); // 👈 lleva el Bearer token

    return this.http.get<UsersResponse>(this.baseUrl, { params, headers });
  }

  getUser(id: number): Observable<User> {
    const headers = this.auth.getAuthHeaders();
    return this.http.get<User>(`${this.baseUrl}/${id}`, { headers });
  }

  createUser(data: any): Observable<User> {
    const headers = this.auth.getAuthHeadersJson();
    return this.http.post<User>(this.baseUrl, data, { headers });
  }

  updateUser(id: number, data: Partial<User>): Observable<User> {
    const headers = this.auth.getAuthHeadersJson();
    return this.http.patch<User>(`${this.baseUrl}/${id}`, data, { headers });
  }

  deleteUser(id: number): Observable<void> {
    const headers = this.auth.getAuthHeaders();
    return this.http.delete<void>(`${this.baseUrl}/${id}`, { headers });
  }
}
