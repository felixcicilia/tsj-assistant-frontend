// src/app/account/token-usage/token-usage.service.ts

import { Injectable } from "@angular/core";
import { HttpClient, HttpParams, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";

import {
  TokenUsageRangeResponse,
  MonthlySummaryResponse,
} from "./token-usage.model";

import { AuthService } from "../../auth/auth.service";

@Injectable({
  providedIn: "root",
})
export class TokenUsageService {
  private readonly apiUrl = "http://localhost:3000";

  constructor(
    private http: HttpClient,
    private auth: AuthService // 👈 necesario para obtener el token
  ) {}

  // ================================
  // 📌 GENERADOR DE HEADERS
  // ================================
  private authHeaders(): HttpHeaders {
    const token = this.auth.token;

    let headers = new HttpHeaders({
      "Content-Type": "application/json",
    });

    if (token) {
      headers = headers.set("Authorization", `Bearer ${token}`);
    }

    return headers;
  }

  // ================================
  // 🔹 Últimos 7 días
  // ================================
  getLast7Days(): Observable<TokenUsageRangeResponse> {
    return this.http.get<TokenUsageRangeResponse>(
      `${this.apiUrl}/token-usage/last-7-days`,
      { headers: this.authHeaders() }
    );
  }

  // ================================
  // 🔹 Rango personalizado con fecha y hora
  // ================================
  getRange(options: {
    from: string;
    to: string;
    fromTime?: string;
    toTime?: string;
  }): Observable<TokenUsageRangeResponse> {
    let params = new HttpParams()
      .set("from", options.from)
      .set("to", options.to);

    if (options.fromTime) params = params.set("fromTime", options.fromTime);
    if (options.toTime) params = params.set("toTime", options.toTime);

    return this.http.get<TokenUsageRangeResponse>(
      `${this.apiUrl}/token-usage/range`,
      { headers: this.authHeaders(), params }
    );
  }

  // ================================
  // 🔹 Resumen mensual
  // ================================
  getMonthlySummary(year: number, month: number) {
    const params = new HttpParams()
      .set("year", String(year))
      .set("month", String(month));

    return this.http.get<MonthlySummaryResponse>(
      `${this.apiUrl}/token-usage/monthly`,
      { params, headers: this.authHeaders() }
    );
  }
}
