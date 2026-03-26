import Parser from "rss-parser";

export interface NewsItem {
  title: string;
  link: string;
  pubDate: string;
  source: string;
  content?: string;
}

export interface ConflictIndicators {
  escalationLevel: {
    level: number; // 1-5 scale
    status: "升级中" | "稳定" | "降级中";
    trend: "up" | "down" | "stable";
  };
  diplomaticProgress: {
    status: "进展中" | "停滞" | "恶化";
    recentEvents: number;
    trend: "up" | "down" | "stable";
  };
  ceasefireLikelihood: {
    probability: number; // 0-100%
    trend: "up" | "down" | "stable";
  };
  regionalImpact: {
    affectedCountries: number;
    severity: "高" | "中" | "低";
    trend: "up" | "down" | "stable";
  };
  lastUpdated: string;
}

export interface FactionData {
  name: string;
  side: "left" | "right";
  description: string;
  objectives: string[];
  keyFigures: string[];
  status: string;
}

const parser = new Parser({
  customFields: {
    item: [
      ["media:content", "media"],
      ["content:encoded", "contentEncoded"],
    ],
  },
  timeout: 10000, // 10 second timeout
});

/**
 * Fetch with timeout wrapper
 */
async function fetchWithTimeout<T>(
  promise: Promise<T>,
  timeoutMs: number = 10000
): Promise<T> {
  const timeoutPromise = new Promise<never>((_, reject) =>
    setTimeout(() => reject(new Error("Request timeout")), timeoutMs)
  );
  return Promise.race([promise, timeoutPromise]);
}

/**
 * Fetch live news updates from RSS feeds
 */
export async function fetchLiveUpdates(): Promise<NewsItem[]> {
  try {
    const feeds = [
      {
        url: "https://www.aljazeera.com/xml/rss/all.xml",
        source: "Al Jazeera",
      },
      {
        url: "https://feeds.reuters.com/reuters/topNews",
        source: "Reuters",
      },
    ];

    const allNews: NewsItem[] = [];

    // Fetch feeds in parallel with timeout
    const feedPromises = feeds.map(async ({ url, source }) => {
      try {
        const feed = await fetchWithTimeout(parser.parseURL(url), 10000);
        const items = feed.items
          .filter((item) => {
            const title = item.title?.toLowerCase() || "";
            const content = item.contentSnippet?.toLowerCase() || "";
            const keywords = [
              "israel",
              "palestine",
              "gaza",
              "hamas",
              "hezbollah",
              "iran",
              "middle east",
              "conflict",
            ];
            return keywords.some(
              (keyword) => title.includes(keyword) || content.includes(keyword)
            );
          })
          .slice(0, 10)
          .map((item) => ({
            title: item.title || "Untitled",
            link: item.link || "",
            pubDate: item.pubDate || new Date().toISOString(),
            source,
            content: item.contentSnippet || "",
          }));

        return items;
      } catch (feedError) {
        console.error(`Error fetching feed from ${source}:`, feedError);
        return [];
      }
    });

    const results = await Promise.all(feedPromises);
    results.forEach((items) => allNews.push(...items));

    // If no news fetched, return some mock data
    if (allNews.length === 0) {
      console.warn("No RSS feeds available, returning mock data");
      return getMockNewsItems();
    }

    return allNews
      .sort(
        (a, b) =>
          new Date(b.pubDate).getTime() - new Date(a.pubDate).getTime()
      )
      .slice(0, 20);
  } catch (error) {
    console.error("Error fetching live updates:", error);
    return getMockNewsItems();
  }
}

/**
 * Get mock news items as fallback
 */
function getMockNewsItems(): NewsItem[] {
  return [
    {
      title: "中东外交会谈持续进行",
      link: "#",
      pubDate: new Date().toISOString(),
      source: "模拟数据",
      content: "该地区正在进行外交努力...",
    },
    {
      title: "冲突局势地区更新",
      link: "#",
      pubDate: new Date(Date.now() - 3600000).toISOString(),
      source: "模拟数据",
      content: "来自该地区的最新消息...",
    },
    {
      title: "国际社会回应",
      link: "#",
      pubDate: new Date(Date.now() - 7200000).toISOString(),
      source: "模拟数据",
      content: "世界各国领导人讨论局势...",
    },
  ];
}

/**
 * Fetch conflict indicators data
 * Returns macro-level trend indicators focusing on the overall conflict direction
 */
export async function fetchConflictIndicators(): Promise<ConflictIndicators> {
  try {
    // In production, this would aggregate data from multiple sources
    // For now, we return realistic mock data showing the macro trends
    return {
      escalationLevel: {
        level: 4, // 1-5 scale, 4 = high escalation
        status: "升级中",
        trend: "up",
      },
      diplomaticProgress: {
        status: "停滞",
        recentEvents: 3,
        trend: "stable",
      },
      ceasefireLikelihood: {
        probability: 25, // 25% likelihood
        trend: "down",
      },
      regionalImpact: {
        affectedCountries: 6,
        severity: "高",
        trend: "up",
      },
      lastUpdated: new Date().toISOString(),
    };
  } catch (error) {
    console.error("Error fetching conflict indicators:", error);
    throw error;
  }
}

/**
 * Fetch faction comparison data
 */
export async function fetchFactionData(): Promise<FactionData[]> {
  try {
    return [
      {
        name: "以色列",
        side: "left",
        description:
          "以色列国及其国防军（IDF）参与冲突应对行动",
        objectives: [
          "消除哈马斯军事能力",
          "确保边境地区安全",
          "解救人质",
          "防止未来袭击",
        ],
        keyFigures: [
          "本雅明·内塔尼亚胡（总理）",
          "约阿夫·加兰特（国防部长）",
        ],
        status: "进行积极军事行动",
      },
      {
        name: "哈马斯/真主党/伊朗轴心",
        side: "right",
        description:
          "抵抗组织联盟及其地区支持者",
        objectives: [
          "抵抗以色列行动",
          "地区团结",
          "支持巴勒斯坦事业",
          "对抗以色列影响力",
        ],
        keyFigures: [
          "叶海亚·辛瓦尔（哈马斯领导人）",
          "哈桑·纳斯鲁拉（真主党领导人）",
        ],
        status: "积极抵抗",
      },
    ];
  } catch (error) {
    console.error("Error fetching faction data:", error);
    throw error;
  }
}

/**
 * Fetch timeline data for visualizations
 */
export interface TimelineDataPoint {
  date: string;
  casualties: number;
  diplomaticEvents: number;
  militaryActions: number;
}

export async function fetchTimelineData(): Promise<TimelineDataPoint[]> {
  try {
    const today = new Date();
    const data: TimelineDataPoint[] = [];

    for (let i = 29; i >= 0; i--) {
      const date = new Date(today);
      date.setDate(date.getDate() - i);

      data.push({
        date: date.toISOString().split("T")[0],
        casualties: Math.floor(Math.random() * 100) + 50,
        diplomaticEvents: Math.floor(Math.random() * 5),
        militaryActions: Math.floor(Math.random() * 20) + 10,
      });
    }

    return data;
  } catch (error) {
    console.error("Error fetching timeline data:", error);
    throw error;
  }
}
