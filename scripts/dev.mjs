import { spawn } from "node:child_process";

const api = spawn("node", ["scripts/dev-api.mjs"], { stdio: "inherit" });
const next = spawn("next", ["dev"], { stdio: "inherit", shell: true });

let shuttingDown = false;
function shutdown() {
  if (shuttingDown) return;
  shuttingDown = true;
  api.kill("SIGTERM");
  next.kill("SIGTERM");
}

process.on("SIGINT", shutdown);
process.on("SIGTERM", shutdown);
next.on("exit", (code) => {
  api.kill("SIGTERM");
  process.exit(code ?? 0);
});
api.on("exit", () => {});
