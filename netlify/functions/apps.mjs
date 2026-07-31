import { getDashboardData } from "../../src/lib/appstore-api";

async function handler(event) {
  const params = new URLSearchParams(event.rawQuery || "");
  const appId = params.get("appId");

  if (!appId) {
    return {
      statusCode: 400,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ error: "Missing or invalid appId parameter" }),
    };
  }

  try {
    const data = await getDashboardData(appId);
    if (!data) {
      return {
        statusCode: 404,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ error: "App not found or failed to fetch." }),
      };
    }
    return {
      statusCode: 200,
      headers: {
        "Content-Type": "application/json",
        "Cache-Control": "public, s-maxage=60, stale-while-revalidate=30",
      },
      body: JSON.stringify(data),
    };
  } catch (err) {
    console.error("API error:", err);
    return {
      statusCode: 500,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ error: "Failed to fetch app data. Please try again." }),
    };
  }
}

export { handler };
export default handler;
