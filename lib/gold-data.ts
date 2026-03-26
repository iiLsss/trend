/**
 * Gold trend data from FRED (St. Louis Fed).
 * Series: GOLDPMGBD228NLBM — London 3:00 PM Gold Price, USD per Troy Ounce.
 * https://fred.stlouisfed.org/series/GOLDPMGBD228NLBM
 *
 * No mock or synthetic prices: on missing key or API failure, callers get success: false.
 */

import Parser from "rss-parser";
import type { NewsItem } from "@/lib/data";

export const FRED_GOLD_SERIES_ID = "GOLDPMGBD228NLBM" as const;

export interface GoldObservation {
  date: string;
  value: number;
}

export interface GoldIndicators {
  /** Latest observed USD per troy ounce */
  latestPriceUsd: number;
  latestDate: string;
  /** % change vs observation ~30 trading days earlier (by index), null if insufficient history */
  change30ObsPct: number | null;
  /** % change vs observation ~90 trading days earlier */
  change90ObsPct: number | null;
  /** Sample std dev of daily simple returns (last 60 returns if available), as decimal e.g. 0.012 = 1.2% */
  dailyReturnVolatility: number | null;
  seriesId: string;
  lastUpdated: string;
}

export interface GoldSeriesResult {
  success: boolean;
  error?: string;
  observations: GoldObservation[];
  indicators: GoldIndicators | null;
}

const parser = new Parser({ timeout: 10000 });

async function fetchWithTimeout<T>(
  promise: Promise<T>,
  timeoutMs: number = 15000
): Promise<T> {
  const timeoutPromise = new Promise<never>((_, reject) =>
    setTimeout(() => reject(new Error("Request timeout")), timeoutMs)
  );
  return Promise.race([promise, timeoutPromise]);
}

function parseObservations(
  raw: Array<{ date: string; value: string }>
): GoldObservation[] {
  const out: GoldObservation[] = [];
  for (const row of raw) {
    if (!row.value || row.value === ".") continue;
    const n = Number.parseFloat(row.value);
    if (!Number.isFinite(n)) continue;
    out.push({ date: row.date, value: n });
  }
  return out;
}

function computeIndicators(
  observations: GoldObservation[],
  seriesId: string
): GoldIndicators | null {
  if (observations.length === 0) return null;

  const last = observations[observations.length - 1];
  const latestPriceUsd = last.value;
  const latestDate = last.date;

  const idx30 = observations.length - 1 - 30;
  const idx90 = observations.length - 1 - 90;

  let change30ObsPct: number | null = null;
  let change90ObsPct: number | null = null;

  if (idx30 >= 0 && observations[idx30].value > 0) {
    change30ObsPct =
      ((latestPriceUsd - observations[idx30].value) /
        observations[idx30].value) *
      100;
  }
  if (idx90 >= 0 && observations[idx90].value > 0) {
    change90ObsPct =
      ((latestPriceUsd - observations[idx90].value) /
        observations[idx90].value) *
      100;
  }

  const returns: number[] = [];
  for (let i = 1; i < observations.length; i++) {
    const prev = observations[i - 1].value;
    const curr = observations[i].value;
    if (prev > 0) returns.push((curr - prev) / prev);
  }

  let dailyReturnVolatility: number | null = null;
  if (returns.length >= 2) {
    const window = returns.slice(-60);
    const mean = window.reduce((a, b) => a + b, 0) / window.length;
    const variance =
      window.reduce((sum, r) => sum + (r - mean) ** 2, 0) / (window.length - 1);
    dailyReturnVolatility = Math.sqrt(variance);
  }

  return {
    latestPriceUsd,
    latestDate,
    change30ObsPct,
    change90ObsPct,
    dailyReturnVolatility,
    seriesId,
    lastUpdated: new Date().toISOString(),
  };
}

/**
 * Fetch daily gold observations from FRED. Requires FRED_API_KEY in server environment.
 */
export async function fetchGoldSeriesFromFred(): Promise<GoldSeriesResult> {
  const apiKey = process.env.FRED_API_KEY?.trim();
  if (!apiKey) {
    return {
      success: false,
      error: "missing_key",
      observations: [],
      indicators: null,
    };
  }

  const start = new Date();
  start.setFullYear(start.getFullYear() - 2);
  const observationStart = start.toISOString().slice(0, 10);

  const url = new URL("https://api.stlouisfed.org/fred/series/observations");
  url.searchParams.set("series_id", FRED_GOLD_SERIES_ID);
  url.searchParams.set("api_key", apiKey);
  url.searchParams.set("file_type", "json");
  url.searchParams.set("sort_order", "asc");
  url.searchParams.set("observation_start", observationStart);

  try {
    const res = await fetchWithTimeout(fetch(url.toString()), 20000);
    if (!res.ok) {
      const text = await res.text().catch(() => "");
      console.error("FRED API error:", res.status, text.slice(0, 200));
      return {
        success: false,
        error: "fred_http",
        observations: [],
        indicators: null,
      };
    }
    const json = (await res.json()) as {
      observations?: Array<{ date: string; value: string }>;
      error_code?: number;
      error_message?: string;
    };
    if (json.error_message) {
      console.error("FRED API:", json.error_message);
      return {
        success: false,
        error: "fred_api",
        observations: [],
        indicators: null,
      };
    }
    const observations = parseObservations(json.observations ?? []);
    const indicators = computeIndicators(observations, FRED_GOLD_SERIES_ID);

    return {
      success: observations.length > 0,
      error: observations.length > 0 ? undefined : "no_data",
      observations,
      indicators,
    };
  } catch (e) {
    console.error("fetchGoldSeriesFromFred:", e);
    return {
      success: false,
      error: "network",
      observations: [],
      indicators: null,
    };
  }
}

/** Last ~400 calendar days of observations for chart (trimmed from full series). */
export function observationsForChart(
  observations: GoldObservation[],
  maxPoints = 400
): GoldObservation[] {
  if (observations.length <= maxPoints) return observations;
  return observations.slice(-maxPoints);
}

const GOLD_RSS_KEYWORDS = [
  "gold",
  "xau",
  "bullion",
  "precious metal",
  "联邦储备",
  "美联储",
  "fed ",
  "interest rate",
  "美元",
  "dollar",
  "inflation",
  "黄金",
  "金价",
];

/**
 * RSS context for gold/macro; failures return []. Does not affect price data.
 */
export async function fetchGoldContextNews(): Promise<NewsItem[]> {
  const feeds = [
    { url: "https://www.aljazeera.com/xml/rss/all.xml", source: "Al Jazeera" },
    { url: "https://feeds.bbci.co.uk/news/business/rss.xml", source: "BBC" },
  ];

  const allNews: NewsItem[] = [];

  const feedPromises = feeds.map(async ({ url, source }) => {
    try {
      const feed = await fetchWithTimeout(parser.parseURL(url), 10000);
      const items = feed.items
        .filter((item) => {
          const title = item.title?.toLowerCase() || "";
          const content = item.contentSnippet?.toLowerCase() || "";
          return GOLD_RSS_KEYWORDS.some(
            (k) =>
              title.includes(k.toLowerCase()) ||
              content.includes(k.toLowerCase())
          );
        })
        .slice(0, 12)
        .map((item) => ({
          title: item.title || "无标题",
          link: item.link || "",
          pubDate: item.pubDate || new Date().toISOString(),
          source,
          content: item.contentSnippet || "",
        }));
      return items;
    } catch (e) {
      console.error(`Gold RSS ${source}:`, e);
      return [];
    }
  });

  const results = await Promise.all(feedPromises);
  results.forEach((items) => allNews.push(...items));

  return allNews
    .sort(
      (a, b) =>
        new Date(b.pubDate).getTime() - new Date(a.pubDate).getTime()
    )
    .slice(0, 20);
}
