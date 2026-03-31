"use client";

import { useState } from "react";
import { Send } from "lucide-react";
import { submitFeedbackAction } from "@/app/trends/ai-tools/actions";

export function FeedbackForm({ briefingId }: { briefingId: string | null }) {
  const [text, setText] = useState("");
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">(
    "idle"
  );
  const [errorMsg, setErrorMsg] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!text.trim()) return;

    setStatus("sending");
    setErrorMsg("");

    const result = await submitFeedbackAction(text.trim(), briefingId);

    if (result.success) {
      setStatus("sent");
      setText("");
      setTimeout(() => setStatus("idle"), 3000);
    } else {
      setStatus("error");
      setErrorMsg(result.error ?? "提交失败");
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <p className="text-xs text-gray-500 font-sans mb-3 leading-relaxed">
        对今日简报的质量、抓取偏好或分析逻辑有任何建议？Agent
        将在下次运行时读取你的反馈并自动调整。
      </p>
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="例如：今天推送的套壳产品太多了，请提高过滤严格度..."
        className="w-full border border-gray-300 rounded-md p-3 text-sm font-sans placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-900 focus:border-gray-900 resize-none"
        rows={3}
        disabled={status === "sending"}
      />
      <div className="flex items-center justify-between mt-3">
        <div className="text-xs font-sans">
          {status === "sent" && (
            <span className="text-green-700 font-bold">已提交，感谢反馈</span>
          )}
          {status === "error" && (
            <span className="text-red-700">{errorMsg}</span>
          )}
        </div>
        <button
          type="submit"
          disabled={!text.trim() || status === "sending"}
          className="inline-flex items-center gap-1.5 border border-gray-900 text-gray-900 px-4 py-2 text-xs uppercase tracking-widest font-bold font-sans hover:bg-gray-900 hover:text-white transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
        >
          <Send className="w-3.5 h-3.5" />
          {status === "sending" ? "提交中..." : "提交反馈"}
        </button>
      </div>
    </form>
  );
}
