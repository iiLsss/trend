export type Database = {
  public: {
    Tables: {
      raw_sources: {
        Row: {
          id: string;
          source: "producthunt" | "github" | "x" | "rss";
          title: string;
          description: string | null;
          url: string;
          scraped_at: string;
        };
        Insert: {
          id?: string;
          source: "producthunt" | "github" | "x" | "rss";
          title: string;
          description?: string | null;
          url: string;
          scraped_at?: string;
        };
        Update: {
          source?: "producthunt" | "github" | "x" | "rss";
          title?: string;
          description?: string | null;
          url?: string;
        };
        Relationships: [];
      };
      ai_products: {
        Row: {
          id: string;
          raw_source_id: string | null;
          name: string;
          description: string | null;
          url: string;
          source: string;
          is_ai_native: boolean;
          innovation_score: number;
          core_capability: string | null;
          reasoning: string | null;
          discovered_at: string;
        };
        Insert: {
          id?: string;
          raw_source_id?: string | null;
          name: string;
          description?: string | null;
          url: string;
          source: string;
          is_ai_native?: boolean;
          innovation_score: number;
          core_capability?: string | null;
          reasoning?: string | null;
          discovered_at?: string;
        };
        Update: {
          name?: string;
          description?: string | null;
          is_ai_native?: boolean;
          innovation_score?: number;
          core_capability?: string | null;
          reasoning?: string | null;
        };
        Relationships: [];
      };
      atomic_functions: {
        Row: {
          id: string;
          product_id: string;
          function_name: string;
          category: string | null;
          pain_point: string | null;
          disposable_score: number;
          created_at: string;
        };
        Insert: {
          id?: string;
          product_id: string;
          function_name: string;
          category?: string | null;
          pain_point?: string | null;
          disposable_score: number;
          created_at?: string;
        };
        Update: {
          function_name?: string;
          category?: string | null;
          pain_point?: string | null;
          disposable_score?: number;
        };
        Relationships: [];
      };
      clusters: {
        Row: {
          id: string;
          label: string;
          description: string | null;
          is_whitespace: boolean;
          opportunity_score: number | null;
          created_at: string;
        };
        Insert: {
          id?: string;
          label: string;
          description?: string | null;
          is_whitespace?: boolean;
          opportunity_score?: number | null;
          created_at?: string;
        };
        Update: {
          label?: string;
          description?: string | null;
          is_whitespace?: boolean;
          opportunity_score?: number | null;
        };
        Relationships: [];
      };
      re_bundling_opportunities: {
        Row: {
          id: string;
          cluster_id: string;
          title: string;
          value_proposition: string | null;
          target_industry: string | null;
          moat_score: number | null;
          has_proprietary_data: boolean;
          has_transaction_embed: boolean;
          has_network_effect: boolean;
          created_at: string;
        };
        Insert: {
          id?: string;
          cluster_id: string;
          title: string;
          value_proposition?: string | null;
          target_industry?: string | null;
          moat_score?: number | null;
          has_proprietary_data?: boolean;
          has_transaction_embed?: boolean;
          has_network_effect?: boolean;
          created_at?: string;
        };
        Update: {
          title?: string;
          value_proposition?: string | null;
          target_industry?: string | null;
          moat_score?: number | null;
          has_proprietary_data?: boolean;
          has_transaction_embed?: boolean;
          has_network_effect?: boolean;
        };
        Relationships: [];
      };
      briefings: {
        Row: {
          id: string;
          date: string;
          content_md: string;
          products_count: number;
          opportunities_count: number;
          created_at: string;
        };
        Insert: {
          id?: string;
          date: string;
          content_md: string;
          products_count?: number;
          opportunities_count?: number;
          created_at?: string;
        };
        Update: {
          content_md?: string;
          products_count?: number;
          opportunities_count?: number;
        };
        Relationships: [];
      };
      user_feedback: {
        Row: {
          id: string;
          briefing_id: string | null;
          feedback_text: string;
          applied: boolean;
          created_at: string;
        };
        Insert: {
          id?: string;
          briefing_id?: string | null;
          feedback_text: string;
          applied?: boolean;
          created_at?: string;
        };
        Update: {
          briefing_id?: string | null;
          feedback_text?: string;
          applied?: boolean;
        };
        Relationships: [];
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      [_ in never]: never;
    };
    Enums: {
      [_ in never]: never;
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
};
