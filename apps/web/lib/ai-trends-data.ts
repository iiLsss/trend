import { getSupabaseClient } from "./supabase";
import type { Database } from "@trend/db-schema";

type AIProduct = Database["public"]["Tables"]["ai_products"]["Row"];
type Cluster = Database["public"]["Tables"]["clusters"]["Row"];
type ReBundlingOpportunity =
  Database["public"]["Tables"]["re_bundling_opportunities"]["Row"];
type Briefing = Database["public"]["Tables"]["briefings"]["Row"];

export interface AITrendsData {
  success: boolean;
  products: AIProduct[];
  opportunities: (ReBundlingOpportunity & { cluster_label?: string })[];
  latestBriefing: Briefing | null;
  error?: string;
}

export async function fetchAITrendsData(): Promise<AITrendsData> {
  const supabase = getSupabaseClient();

  if (!supabase) {
    return {
      success: false,
      products: [],
      opportunities: [],
      latestBriefing: null,
      error: "Supabase is not configured. Set NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY.",
    };
  }

  try {
    const [productsRes, opportunitiesRes, briefingRes] = await Promise.all([
      supabase
        .from("ai_products")
        .select("*")
        .eq("is_ai_native", true)
        .order("discovered_at", { ascending: false })
        .limit(20),
      supabase
        .from("re_bundling_opportunities")
        .select("*, clusters(label)")
        .order("moat_score", { ascending: false })
        .limit(10),
      supabase
        .from("briefings")
        .select("*")
        .order("date", { ascending: false })
        .limit(1)
        .single(),
    ]);

    if (productsRes.error) throw productsRes.error;
    if (opportunitiesRes.error) throw opportunitiesRes.error;

    const opportunities = (opportunitiesRes.data ?? []).map((o: any) => ({
      ...o,
      cluster_label: o.clusters?.label ?? null,
    }));

    return {
      success: true,
      products: productsRes.data ?? [],
      opportunities,
      latestBriefing: briefingRes.data ?? null,
    };
  } catch (err: any) {
    return {
      success: false,
      products: [],
      opportunities: [],
      latestBriefing: null,
      error: err.message ?? "Failed to fetch AI trends data.",
    };
  }
}

export async function submitFeedback(
  feedbackText: string,
  briefingId?: string | null
): Promise<{ success: boolean; error?: string }> {
  const supabase = getSupabaseClient();

  if (!supabase) {
    return { success: false, error: "Supabase is not configured." };
  }

  try {
    const { error } = await supabase.from("user_feedback").insert({
      feedback_text: feedbackText,
      briefing_id: briefingId ?? null,
    });

    if (error) throw error;
    return { success: true };
  } catch (err: any) {
    return { success: false, error: err.message ?? "Failed to submit feedback." };
  }
}
