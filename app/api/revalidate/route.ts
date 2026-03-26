import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";

export async function POST() {
  try {
    revalidatePath("/trends/middle-east-conflict");

    return NextResponse.json({
      success: true,
      message: "Page revalidated successfully",
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error("Revalidate error:", error);
    return NextResponse.json(
      { error: "Failed to revalidate" },
      { status: 500 }
    );
  }
}
