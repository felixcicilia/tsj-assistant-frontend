// src/app/pages/account/token-usage/token-usage.model.ts

export interface TokenUsage {
  id: number;
  tokensUsed: number;
  costUsd: number;
  usedAt: string;      // ISO string
  model?: string | null;
  channel?: 'web' | 'telegram' | 'whatsapp' | null;
  createdAt: string;
}

export interface TokenUsageWeeklyStat {
  date: string;        // YYYY-MM-DD
  tokensUsed: number;
  costUsd: number;
}

export interface TokenUsageItem {
  id: number;
  tokensUsed: number;
  inputTokens: number | null;
  outputTokens: number | null;
  costUsd: string;      // viene como string del backend
  usedAt: string;       // ISO string
  durationMs?: number | null;
  model?: string | null;
  channel?: 'web' | 'telegram' | 'whatsapp' | null;
  createdAt: string;
}

export interface TokenUsageRangeResponse {
  from: string;
  to: string;
  items: TokenUsageItem[];
  totalTokens: number;
  totalInputTokens: number;
  totalOutputTokens: number;
  totalCostUsd: string;
}

export interface MonthlySummaryResponse {
  year: number;
  month: number;
  totalTokens: number;
  totalInputTokens: number;
  totalOutputTokens: number;
  totalCostUsd: number;
}