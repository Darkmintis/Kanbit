import { getDashboardData } from "@/lib/appstore-api";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  try {
    const appId = request.nextUrl.searchParams.get("appId");

    if (!appId || typeof appId !== "string") {
      return NextResponse.json(
        { error: "Missing or invalid appId parameter" },
        { status: 400 }
      );
    }

    const data = await getDashboardData(appId);

    if (!data) {
      return NextResponse.json(
        { error: "App not found or failed to fetch." },
        { status: 404 }
      );
    }

    return NextResponse.json(data, {
      headers: {
        "Cache-Control": "public, s-maxage=60, stale-while-revalidate=30",
      },
    });
  } catch (error) {
    console.error("API error:", error);
    return NextResponse.json(
      { error: "Failed to fetch app data. Please try again." },
      { status: 500 }
    );
  }
}
