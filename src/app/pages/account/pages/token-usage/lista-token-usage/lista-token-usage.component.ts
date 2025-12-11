// src/app/account/token-usage/lista-token-usage.component.ts

import { CommonModule } from "@angular/common";
import { Component, OnInit } from "@angular/core";
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from "@angular/forms";
import { finalize, forkJoin } from "rxjs";
import { FormsModule } from "@angular/forms";

import { TokenUsageService } from "../token-usage.service";
import {
  TokenUsageItem,
  TokenUsageRangeResponse,
  MonthlySummaryResponse,
} from "../token-usage.model";

@Component({
  selector: "app-lista-token-usage",
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
  templateUrl: "./lista-token-usage.component.html",
})
export class ListaTokenUsageComponent implements OnInit {
  // ─────────────────────────────
  //  RANGO (tabla principal)
  // ─────────────────────────────
  rangeForm!: FormGroup;
  loadingRange = false;
  rangeData: TokenUsageRangeResponse | null = null;
  items: TokenUsageItem[] = [];

  // ─────────────────────────────
  //  RESUMEN HOY
  // ─────────────────────────────
  todaySummary: TokenUsageRangeResponse | null = null;
  loadingToday = false;
  todayLabel = "—";

  // ─────────────────────────────
  //  RESUMEN ÚLTIMOS 7 DÍAS
  // ─────────────────────────────
  last7Label = "—";
  last7Tokens = 0;
  last7Cost = 0;

  // ─────────────────────────────
  //  RESUMEN MENSUAL / ANUAL
  // ─────────────────────────────
  currentYear = new Date().getFullYear();
  currentMonth = new Date().getMonth() + 1; // 1-12

  monthlySummaries: MonthlySummaryResponse[] = [];
  loadingMonthly = false;

  constructor(
    private fb: FormBuilder,
    private tokenUsageService: TokenUsageService
  ) {}

  // ==========================
  //  CICLO DE VIDA
  // ==========================
  ngOnInit(): void {
    this.buildRangeForm();

    // etiqueta “hoy”
    const today = new Date();
    this.todayLabel = today.toLocaleDateString("es-VE", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });

    // cargas iniciales
    this.loadTodaySummary(); // reporte actual (día de hoy)
    this.loadLast7Days(); // reporte últimos 7 días
    this.loadYearSummary(this.currentYear); // resumen de los 12 meses del año
  }

  // ==========================
  //  FORM RANGO
  // ==========================
  private buildRangeForm(): void {
    const today = this.formatDate(new Date());

    this.rangeForm = this.fb.group({
      fromDate: [today, Validators.required],
      toDate: [today, Validators.required],
      fromTime: ["00:00"],
      toTime: ["23:59"],
    });
  }

  private formatDate(d: Date): string {
    // YYYY-MM-DD
    return d.toISOString().slice(0, 10);
  }

  // ==========================
  //  GETTERS RANGO
  // ==========================
  get rangeLabel(): string {
    if (!this.rangeData) return "—";
    const from = new Date(this.rangeData.from);
    const to = new Date(this.rangeData.to);
    return `${from.toLocaleString("es-VE")}  –  ${to.toLocaleString("es-VE")}`;
  }

  get totalTokens(): number {
    return this.rangeData?.totalTokens ?? 0;
  }

  get totalInputTokens(): number {
    return this.rangeData?.totalInputTokens ?? 0;
  }

  get totalOutputTokens(): number {
    return this.rangeData?.totalOutputTokens ?? 0;
  }

  get totalCostUsd(): string {
    return this.rangeData?.totalCostUsd ?? "0.000000";
  }

  trackById(_index: number, item: TokenUsageItem): number {
    return item.id;
  }

  // ==========================
  //  RESUMEN HOY
  // ==========================
  get todayTokens(): number {
    return this.todaySummary?.totalTokens ?? 0;
  }

  get todayCost(): string {
    return this.todaySummary?.totalCostUsd ?? "0.000000";
  }

  get todayCalls(): number {
    return this.todaySummary?.items.length ?? 0;
  }

  /** 🔹 Se llama automáticamente al iniciar */
  private loadTodaySummary(): void {
    const today = this.formatDate(new Date());

    this.loadingToday = true;
    this.tokenUsageService
      .getRange({
        from: today,
        to: today,
        fromTime: "00:00",
        toTime: "23:59",
      })
      .pipe(finalize(() => (this.loadingToday = false)))
      .subscribe({
        next: (res) => {
          this.todaySummary = res;
        },
        error: (err) => {
          console.error("Error cargando resumen diario", err);
        },
      });
  }

  // ==========================
  //  RANGO / ÚLTIMOS 7 DÍAS
  // ==========================

  /** 🔁 Botón “Últimos 7 días” */
  loadLast7Days(): void {
    this.loadingRange = true;
    this.tokenUsageService
      .getLast7Days()
      .pipe(finalize(() => (this.loadingRange = false)))
      .subscribe({
        next: (res) => {
          this.rangeData = res;
          this.items = res.items ?? [];

          // Etiqueta del rango actual
          const from = new Date(res.from);
          const to = new Date(res.to);
          this.last7Label = `${from.toLocaleDateString(
            "es-VE"
          )} – ${to.toLocaleDateString("es-VE")}`;

          // Totales últimos 7 días
          this.last7Tokens = res.totalTokens;
          this.last7Cost = Number(res.totalCostUsd || 0);
        },
        error: (err) => {
          console.error("Error cargando últimos 7 días", err);
        },
      });
  }

  /** ✅ Botón “Aplicar filtro” (reporte por rango) */
  applyRangeFilter(): void {
    if (this.rangeForm.invalid) {
      this.rangeForm.markAllAsTouched();
      return;
    }

    const { fromDate, toDate, fromTime, toTime } = this.rangeForm.value;

    this.loadingRange = true;
    this.tokenUsageService
      .getRange({
        from: fromDate,
        to: toDate,
        fromTime: fromTime || "00:00",
        toTime: toTime || "23:59",
      })
      .pipe(finalize(() => (this.loadingRange = false)))
      .subscribe({
        next: (res) => {
          this.rangeData = res;
          this.items = res.items ?? [];
        },
        error: (err) => {
          console.error("Error cargando rango personalizado", err);
        },
      });
  }

  // ==========================
  //  RESUMEN MENSUAL / ANUAL
  // ==========================

  getMonthName(m: number): string {
    const names = [
      "Enero",
      "Febrero",
      "Marzo",
      "Abril",
      "Mayo",
      "Junio",
      "Julio",
      "Agosto",
      "Septiembre",
      "Octubre",
      "Noviembre",
      "Diciembre",
    ];
    return names[m - 1] ?? String(m);
  }

  /** 👉 Etiqueta “Mes actual” */
  get currentMonthLabel(): string {
    return `${this.getMonthName(this.currentMonth)} ${this.currentYear}`;
  }

  /** 👉 Totales del mes actual */
  get monthTokens(): number {
    const list = this.monthlySummaries || [];
    const m = list.find((x) => x.month === this.currentMonth);
    return m?.totalTokens ?? 0;
  }

  get monthCost(): number {
    const list = this.monthlySummaries || [];
    const m = list.find((x) => x.month === this.currentMonth);
    return m?.totalCostUsd ?? 0;
  }

  /** 👉 Totales del año (suma de los 12 meses) */
  get yearTokens(): number {
    const list = this.monthlySummaries || [];
    return list.reduce((acc, m) => acc + (m.totalTokens || 0), 0);
  }

  get yearCost(): number {
    const list = this.monthlySummaries || [];
    return list.reduce((acc, m) => acc + (m.totalCostUsd || 0), 0);
  }

  /** 🔁 Botón “Actualizar resumen” o cambio de año */
  loadYearSummary(year: number): void {
    this.currentYear = year;
    this.loadingMonthly = true;

    const requests = Array.from({ length: 12 }, (_, i) =>
      this.tokenUsageService.getMonthlySummary(year, i + 1)
    );

    forkJoin(requests)
      .pipe(finalize(() => (this.loadingMonthly = false)))
      .subscribe({
        next: (resArr) => {
          // Agregamos el campo month (1..12) para mostrarlo en la tabla
          this.monthlySummaries = resArr.map((r, idx) => ({
            ...r,
            month: idx + 1,
          })) as any;
        },
        error: (err) => {
          console.error("Error cargando resumen mensual", err);
        },
      });
  }

  onYearChange(event: Event): void {
    const input = event.target as HTMLInputElement | null;
    const value = input?.value ?? this.currentYear;
    const year = Number(value);

    if (!Number.isNaN(year) && year >= 2024 && year <= 2100) {
      this.loadYearSummary(year);
    }
  }
}
