export type PortalSection = "trends" | "guides";

export type PortalStatus = "live" | "daily" | "guide";

export interface PortalItem {
  id: string;
  title: string;
  description: string;
  href: string;
  category: string;
  section: PortalSection;
  status: PortalStatus;
  updatedAt: string;
  author: string;
}

export interface GuideStep {
  id: string;
  title: string;
  description: string;
  content: string;
}

export interface GuideFaq {
  question: string;
  answer: string;
  tone: "red" | "amber" | "blue";
}

export const portalItems: PortalItem[] = [
  {
    id: "gold",
    title: "黄金趋势",
    description:
      "基于 FRED 金价相关序列，展示中长期价格水平、涨跌与波动，并聚合宏观与金价相关资讯。",
    href: "/trends/gold",
    category: "大宗商品",
    section: "trends",
    status: "daily",
    updatedAt: "日更",
    author: "编辑部",
  },
  {
    id: "ai-tools",
    title: "AI 工具趋势",
    description:
      "自动追踪全球 AI 新物种，过滤 AI Washing，拆解核心功能原子，发现碎片化工具的重构整合机会。",
    href: "/trends/ai-tools",
    category: "AI 产品",
    section: "trends",
    status: "daily",
    updatedAt: "日更",
    author: "AI 分析引擎",
  },
  {
    id: "workbuddy-deepseek",
    title: "WorkBuddy x DeepSeek 配置教程",
    description:
      "面向小白的桌面助手模型配置指南：获取 API Key、填写图形界面、检查 JSON、验证本地任务能力。",
    href: "/guides/workbuddy-deepseek",
    category: "AI 办公",
    section: "guides",
    status: "guide",
    updatedAt: "配置指南",
    author: "教程编辑部",
  },
];

export const trendItems = portalItems.filter((item) => item.section === "trends");
export const guideItems = portalItems.filter((item) => item.section === "guides");
