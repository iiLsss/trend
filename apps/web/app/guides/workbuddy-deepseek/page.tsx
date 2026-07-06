import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { guideFaqs, guideSteps } from "./guide-data";
import { WorkBuddyGuide } from "./workbuddy-guide";

export const metadata: Metadata = {
  title: "WorkBuddy x DeepSeek 配置教程 | 灵感档案",
  description:
    "参考 WorkBuddy 官方安装与模型配置文档，整理面向小白的 WorkBuddy 接入 DeepSeek API 教程。",
};

export default function WorkBuddyDeepSeekPage() {
  return (
    <div className="py-6">
      <div className="mb-6">
        <Link
          href="/guides"
          className="inline-flex items-center text-sm font-bold uppercase tracking-wider text-gray-500 transition-colors hover:text-gray-900"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          返回教程指南
        </Link>
      </div>

      <header className="mb-12 border-heavy-bottom pb-8">
        <div className="max-w-4xl">
          <div className="mb-4 flex flex-wrap items-center gap-3">
            <span className="border-b border-gray-900 pb-1 text-xs font-bold uppercase tracking-widest text-gray-900">
              AI 办公
            </span>
            <span className="text-xs font-bold uppercase tracking-widest text-blue-800">
              小白教程
            </span>
          </div>
          <h1 className="serif mb-5 text-4xl font-black leading-[1.1] text-gray-900 md:text-6xl">
            WorkBuddy x DeepSeek 配置教程
          </h1>
          <p className="font-serif text-xl leading-relaxed text-gray-600">
            参考 WorkBuddy 官方安装与模型配置文档，把安装登录、DeepSeek API Key、设置页模型配置和任务验证整理成小白也能照着做的五步。
          </p>
        </div>
        <div className="mt-8 rounded-lg border border-amber-200 bg-amber-50 p-4 text-sm leading-relaxed text-amber-900">
          本文是基于官方教程的精简实操版。WorkBuddy 界面、DeepSeek 模型名称、服务地址和价格可能变化，最终请以 WorkBuddy 与 DeepSeek 官方页面为准。
        </div>
      </header>

      <WorkBuddyGuide steps={guideSteps} faqs={guideFaqs} />
    </div>
  );
}
