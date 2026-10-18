/**
 * DSE 判分助手 · HKDSE Marking Scheme Tutor
 * Powered by Stephen Kwan · © 2026
 * All rights reserved.
 */
import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import { readConfig, relay } from "./server/relay.js";

/**
 * 本机开发时 /api/ask 由这层处理，读 .env 帮你转发。
 * 部署到 Vercel 时改由 api/ask.js 处理，两边共用 server/relay.js。
 * 重点：密钥只存在于伺服器端，浏览器永远看不到。
 */
function apiDevProxy(env) {
  return {
    name: "api-dev-proxy",
    configureServer(server) {
      server.middlewares.use("/api/ask", async (req, res) => {
        res.setHeader("content-type", "application/json");
        if (req.method !== "POST") {
          res.statusCode = 405;
          return res.end(JSON.stringify({ error: "Use POST." }));
        }

        let body = "";
        for await (const chunk of req) body += chunk;

        try {
          const text = await relay(JSON.parse(body), readConfig(env));
          res.statusCode = 200;
          res.end(JSON.stringify({ text }));
        } catch (err) {
          res.statusCode = 502;
          res.end(JSON.stringify({ error: err.message }));
        }
      });
    },
  };
}

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");
  return {
    plugins: [react(), tailwindcss(), apiDevProxy(env)],
    server: {
      port: Number(env.PORT || 5173),
      strictPort: true,
      open: true,
    },
  };
});
