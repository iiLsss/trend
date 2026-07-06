/**
 * Gold trend data from FRED (St. Louis Fed).
 * Series: IQ12260 — Export Price Index: Nonmonetary Gold (Monthly, Index Dec 2024=100)
 * Note: The original daily series GOLDPMGBD228NLBM (London PM Gold Fixing) has been discontinued by FRED.
 * https://fred.stlouisfed.org/series/IQ12260
 *
 * No mock or synthetic prices: on missing key or API failure, callers get success: false.
 */

import Parser from "rss-parser";
import type { NewsItem } from "@/lib/news";

export const FRED_GOLD_SERIES_ID = "NASDAQQGLDI" as const;
export const FRED_GOLD_VOLATILITY_SERIES_ID = "GVZCLS" as const;

export interface GoldObservation {
  date: string;
  value: number;
}

export type TrendDirection = "强势上行" | "弱势下行" | "震荡/转折";
export type RiskLevel = "低风险 (平稳)" | "中等风险 (活跃)" | "高风险 (剧烈波动)";

export interface GoldIndicators {
  /** Latest observed index value */
  latestPriceUsd: number;
  latestDate: string;
  /** % change vs observation ~30 obs earlier, null if insufficient history */
  change30ObsPct: number | null;
  /** % change vs observation ~90 obs earlier */
  change90ObsPct: number | null;
  /** Sample std dev of returns (last 60 if available), as decimal e.g. 0.012 = 1.2% */
  dailyReturnVolatility: number | null;
  
  // New indicators for revamp
  sma20: number | null;
  sma60: number | null;
  trendDirection: TrendDirection;
  latestVolatilityIndex: number | null;
  riskLevel: RiskLevel;
  
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
  timeoutMs: number = 30000
): Promise<T> {
  const timeoutPromise = new Promise<never>((_, reject) =>
    setTimeout(() => reject(new Error("Request timeout")), timeoutMs)
  );
  return Promise.race([promise, timeoutPromise]);
}

import { exec } from "child_process";
import { promisify } from "util";

const execAsync = promisify(exec);

/**
 * Fetch URL using system curl (workaround for Node.js fetch timeout issues)
 */
async function fetchUrl(url: string, timeoutMs: number = 30000): Promise<Response> {
  try {
    const { stdout, stderr } = await execAsync(
      `curl -s -m ${Math.floor(timeoutMs / 1000)} "${url}"`,
      { maxBuffer: 10 * 1024 * 1024 }
    );
    
    if (stderr) {
      console.warn('[FRED] curl stderr:', stderr);
    }
    
    const data = JSON.parse(stdout);
    
    // Create a Response-like object
    return {
      ok: !data.error_code,
      status: data.error_code ? 400 : 200,
      json: async () => data,
      text: async () => stdout,
    } as Response;
  } catch (error) {
    throw new Error(`Request failed: ${(error as Error).message}`);
  }
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
  seriesId: string,
  volatilityObservations?: GoldObservation[]
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

  // Calculate SMAs
  let sma20: number | null = null;
  if (observations.length >= 20) {
    const window20 = observations.slice(-20);
    sma20 = window20.reduce((sum, obs) => sum + obs.value, 0) / 20;
  }

  let sma60: number | null = null;
  if (observations.length >= 60) {
    const window60 = observations.slice(-60);
    sma60 = window60.reduce((sum, obs) => sum + obs.value, 0) / 60;
  }

  // Determine Trend
  let trendDirection: TrendDirection = "震荡/转折";
  if (sma20 !== null && sma60 !== null) {
    if (latestPriceUsd > sma20 && sma20 > sma60) {
      trendDirection = "强势上行";
    } else if (latestPriceUsd < sma20 && sma20 < sma60) {
      trendDirection = "弱势下行";
    }
  }

  // Determine Risk Level from Volatility Series
  let latestVolatilityIndex: number | null = null;
  let riskLevel: RiskLevel = "低风险 (平稳)";
  
  if (volatilityObservations && volatilityObservations.length > 0) {
    latestVolatilityIndex = volatilityObservations[volatilityObservations.length - 1].value;
    if (latestVolatilityIndex >= 25) {
      riskLevel = "高风险 (剧烈波动)";
    } else if (latestVolatilityIndex >= 15) {
      riskLevel = "中等风险 (活跃)";
    }
  }

  return {
    latestPriceUsd,
    latestDate,
    change30ObsPct,
    change90ObsPct,
    dailyReturnVolatility,
    sma20,
    sma60,
    trendDirection,
    latestVolatilityIndex,
    riskLevel,
    seriesId,
    lastUpdated: new Date().toISOString(),
  };
}

/**
 * Fetch daily gold observations and volatility from FRED. Requires FRED_API_KEY in server environment.
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

  const priceUrl = new URL("https://api.stlouisfed.org/fred/series/observations");
  priceUrl.searchParams.set("series_id", FRED_GOLD_SERIES_ID);
  priceUrl.searchParams.set("api_key", apiKey);
  priceUrl.searchParams.set("file_type", "json");
  priceUrl.searchParams.set("sort_order", "asc");
  priceUrl.searchParams.set("observation_start", observationStart);

  const volUrl = new URL("https://api.stlouisfed.org/fred/series/observations");
  volUrl.searchParams.set("series_id", FRED_GOLD_VOLATILITY_SERIES_ID);
  volUrl.searchParams.set("api_key", apiKey);
  volUrl.searchParams.set("file_type", "json");
  volUrl.searchParams.set("sort_order", "asc");
  volUrl.searchParams.set("observation_start", observationStart);

  const startTime = Date.now();
  try {
    console.log(`[FRED] Requesting Price: ${priceUrl.origin}${priceUrl.pathname}`);
    console.log(`[FRED] Requesting Volatility: ${volUrl.origin}${volUrl.pathname}`);
    
    // Fetch both in parallel
    const [priceRes, volRes] = await Promise.all([
      fetchUrl(priceUrl.toString(), 30000),
      fetchUrl(volUrl.toString(), 30000)
    ]);
    
    const elapsed = Date.now() - startTime;
    console.log(`[FRED] Responses received in ${elapsed}ms, status: Price=${priceRes.status}, Vol=${volRes.status}`);
    
    if (!priceRes.ok) {
      const text = await priceRes.text().catch(() => "");
      console.error("FRED API error (Price):", priceRes.status, text.slice(0, 200));
      return {
        success: false,
        error: `fred_http_${priceRes.status}`,
        observations: [],
        indicators: null,
      };
    }
    
    const priceJson = (await priceRes.json()) as {
      observations?: Array<{ date: string; value: string }>;
      error_code?: number;
      error_message?: string;
    };
    
    if (priceJson.error_message) {
      console.error("FRED API (Price):", priceJson.error_message);
      return {
        success: false,
        error: "fred_api",
        observations: [],
        indicators: null,
      };
    }

    let volObservations: GoldObservation[] = [];
    if (volRes.ok) {
      const volJson = (await volRes.json()) as {
        observations?: Array<{ date: string; value: string }>;
      };
      volObservations = parseObservations(volJson.observations ?? []);
    } else {
      console.warn("FRED API error (Volatility):", volRes.status);
      // We continue even if volatility fails, just won't have risk metrics
    }

    const observations = parseObservations(priceJson.observations ?? []);
    const indicators = computeIndicators(observations, FRED_GOLD_SERIES_ID, volObservations);

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
