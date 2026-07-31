import { searchApps } from "../../src/lib/appstore-api";

async function handler(event) {
  const q = new URLSearchParams(event.rawQuery || "").get("q");
  if (!q || q.length < 2) {
    return {
      statusCode: 200,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ results: [] }),
    };
  }
  try {
    const results = await searchApps(q);
    return {
      statusCode: 200,
      headers: { "Content-Type": "application/json", "Cache-Control": "public, max-age=3600" },
      body: JSON.stringify({ results }),
    };
  } catch (err) {
    console.error("API error:", err);
    return {
      statusCode: 500,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ error: "Failed to search apps." }),
    };
  }
}

export { handler };
export default handler;
