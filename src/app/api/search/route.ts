import { searchApps } from "@/lib/appstore-api";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  try {
    const q = request.nextUrl.searchParams.get("q");

    if (!q || typeof q !== "string" || q.length < 2) {
      return NextResponse.json({ results: [] });
    }

    const results = await searchApps(q);
    return NextResponse.json({ results }, {
      headers: { "Cache-Control": "public, max-age=3600" }
    });
  } catch (error) {
    console.error("API error:", error);
    return NextResponse.json(
      { error: "Failed to search apps." },
      { status: 500 }
    );
  }
}
