"use server";

import { submitFeedback } from "@/lib/ai-trends-data";

export async function submitFeedbackAction(
  feedbackText: string,
  briefingId: string | null
): Promise<{ success: boolean; error?: string }> {
  if (!feedbackText.trim()) {
    return { success: false, error: "反馈内容不能为空。" };
  }

  return submitFeedback(feedbackText, briefingId);
}
