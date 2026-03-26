import Parser from "rss-parser";

export interface NewsItem {
  title: string;
  link: string;
  pubDate: string;
  source: string;
  content?: string;
}

export interface ConflictIndicators {
  casualties: {
    total: number;
    trend: "up" | "down" | "stable";
  };
  displacedPersons: {
    total: number;
    trend: "up" | "down" | "stable";
  };
  activeFronts: number;
  diplomaticEvents: number;
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
});

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

    for (const { url, source } of feeds) {
      try {
        const feed = await parser.parseURL(url);
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

        allNews.push(...items);
      } catch (feedError) {
        console.error(`Error fetching feed from ${source}:`, feedError);
      }
    }

    return allNews
      .sort(
        (a, b) =>
          new Date(b.pubDate).getTime() - new Date(a.pubDate).getTime()
      )
      .slice(0, 20);
  } catch (error) {
    console.error("Error fetching live updates:", error);
    return [];
  }
}

/**
 * Fetch conflict indicators data
 * In a real implementation, this would scrape or call APIs
 * For now, we return mock data with realistic values
 */
export async function fetchConflictIndicators(): Promise<ConflictIndicators> {
  try {
    return {
      casualties: {
        total: 45000,
        trend: "up",
      },
      displacedPersons: {
        total: 2100000,
        trend: "stable",
      },
      activeFronts: 3,
      diplomaticEvents: 7,
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
        name: "Israel",
        side: "left",
        description:
          "State of Israel and its defense forces (IDF) engaged in conflict response",
        objectives: [
          "Eliminate Hamas military capabilities",
          "Secure border regions",
          "Release hostages",
          "Prevent future attacks",
        ],
        keyFigures: [
          "Benjamin Netanyahu (Prime Minister)",
          "Yoav Gallant (Defense Minister)",
        ],
        status: "Active military operations",
      },
      {
        name: "Hamas / Hezbollah / Iran Axis",
        side: "right",
        description:
          "Coalition of resistance groups and their regional supporters",
        objectives: [
          "Resist Israeli operations",
          "Regional solidarity",
          "Support Palestinian cause",
          "Counter Israeli influence",
        ],
        keyFigures: [
          "Yahya Sinwar (Hamas Leader)",
          "Hassan Nasrallah (Hezbollah Leader)",
        ],
        status: "Active resistance",
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
