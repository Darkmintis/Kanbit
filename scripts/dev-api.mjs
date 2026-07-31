import http from "node:http";
import path from "node:path";
import fs from "node:fs";
import os from "node:os";
import { fileURLToPath } from "node:url";
import { createRequire } from "node:module";
import { build } from "esbuild";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const require = createRequire(import.meta.url);
const root = path.resolve(__dirname, "..");
const port = process.env.KANBIT_API_PORT || 3100;
const cacheDir = fs.mkdtempSync(path.join(os.tmpdir(), "kanbit-dev-api-"));

const functions = {
  "/api/apps": path.join(root, "netlify/functions/apps.mjs"),
  "/api/search": path.join(root, "netlify/functions/search.mjs"),
};

async function loadFunction(entry) {
  const outfile = path.join(cacheDir, path.basename(entry).replace(/\.m?js$/, ".cjs"));
  await build({
    entryPoints: [entry],
    bundle: true,
    platform: "node",
    format: "cjs",
    target: "node20",
    outfile,
    alias: { "@": path.join(root, "src") },
  });
  return require(outfile).handler ?? require(outfile).default;
}

async function start() {
  const handlers = {};
  for (const [route, entry] of Object.entries(functions)) {
    handlers[route] = await loadFunction(entry);
  }

  http
    .createServer(async (req, res) => {
      const url = new URL(req.url, `http://localhost:${port}`);
      const pathname = url.pathname.replace(/\/+$/, "") || "/";
      const handler = handlers[pathname];
      if (!handler) {
        res.writeHead(404, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ error: "Not found" }));
        return;
      }
      try {
        const event = {
          httpMethod: req.method,
          rawQuery: url.searchParams.toString(),
          headers: req.headers,
        };
        const result = await handler(event);
        res.writeHead(result.statusCode, result.headers || { "Content-Type": "application/json" });
        res.end(result.body);
      } catch (err) {
        console.error("dev-api error:", err);
        res.writeHead(500, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ error: "Internal server error" }));
      }
    })
    .listen(port, () => {
      console.log(`[dev-api] listening on http://localhost:${port}`);
    });
}

start();
