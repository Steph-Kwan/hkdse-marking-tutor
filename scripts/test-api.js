/**
 * DSE 判分助手 · HKDSE Marking Scheme Tutor
 * Powered by Stephen Kwan · © 2026
 * All rights reserved.
 *
 * 跑 npm run test:api
 * 它会：1) 列出这个站台开放哪些模型  2) 两种格式各试一次，告诉你该怎么填 .env
 */
import { readFileSync } from "node:fs";
import { readConfig, buildRequest, extractText, readError } from "../server/relay.js";

// 简易 .env 读取，不想为了这支脚本多装套件
function loadEnv() {
  const env = { ...process.env };
  try {
    for (const line of readFileSync(".env", "utf8").split("\n")) {
      const m = line.match(/^\s*([A-Z_][A-Z0-9_]*)\s*=\s*(.*)\s*$/i);
      if (m) env[m[1]] = m[2].replace(/^["']|["']$/g, "");
    }
  } catch {
    console.error("✗ 找不到 .env。先跑：cp .env.example .env，填好再回来。\n");
    process.exit(1);
  }
  return env;
}

const env = loadEnv();
const cfg = readConfig(env);

console.log(`\n站台   ${cfg.baseUrl}`);
console.log(`密钥   ${cfg.key ? cfg.key.slice(0, 8) + "…" + cfg.key.slice(-4) : "（空的）"}`);
console.log(`模型   ${cfg.model}\n`);

if (!cfg.key || cfg.key.includes("在这里")) {
  console.error("✗ API_KEY 还没填。\n");
  process.exit(1);
}

// 一、列出可用模型
console.log("─ 可用模型 ─────────────────────────");
try {
  const r = await fetch(`${cfg.baseUrl}/v1/models`, {
    headers: { authorization: `Bearer ${cfg.key}`, "x-api-key": cfg.key },
  });
  const d = await r.json();
  const ids = (d.data || []).map((m) => m.id);
  if (ids.length) {
    const claude = ids.filter((i) => /claude/i.test(i));
    if (claude.length) {
      console.log("Claude 系列：");
      claude.forEach((i) => console.log("  " + i));
      console.log(`（另有 ${ids.length - claude.length} 个其他模型）`);
    } else {
      ids.slice(0, 30).forEach((i) => console.log("  " + i));
      if (ids.length > 30) console.log(`  …共 ${ids.length} 个`);
      console.log("\n注意：这个站台好像没有 Claude 模型。判分品质会明显下降。");
    }
  } else {
    console.log("（这个站台不给列模型，跳过。模型名称要问管理者。）");
  }
} catch (e) {
  console.log("（查不到模型清单：" + e.message + "）");
}

// 二、两种格式各打一次
console.log("\n─ 格式测试 ─────────────────────────");
const probe = {
  system: "Reply with exactly one word: OK",
  user: "ping",
  image: null,
};

let winner = null;
for (const format of ["openai", "anthropic"]) {
  const req = buildRequest(probe, { ...cfg, format, maxTokens: 20 });
  process.stdout.write(`${format.padEnd(10)} ${req.url.replace(cfg.baseUrl, "")}  `);
  try {
    const r = await fetch(req.url, {
      method: "POST",
      headers: req.headers,
      body: JSON.stringify(req.body),
    });
    const raw = await r.text();
    let d;
    try {
      d = JSON.parse(raw);
    } catch {
      console.log(`✗ 回传不是 JSON (HTTP ${r.status})`);
      continue;
    }
    if (!r.ok) {
      console.log("✗ " + readError(d, r.status));
      continue;
    }
    const text = extractText(d, format);
    if (text) {
      console.log(`✓ 通了 → 「${text.slice(0, 40)}」`);
      if (!winner) winner = format;
    } else {
      console.log("✗ 回了空白（模型名称可能不对）");
    }
  } catch (e) {
    console.log("✗ " + e.message);
  }
}

console.log("\n─ 结论 ─────────────────────────────");
if (winner) {
  console.log(`把 .env 里的这行设成：\n\n    API_FORMAT=${winner}\n`);
  if (winner !== cfg.format) console.log(`（你现在填的是 ${cfg.format}，要改。）\n`);
  else console.log("（跟你现在填的一样，不用改。）\n");
} else {
  console.log("两种都不通。可能原因：\n");
  console.log("  · 密钥失效或额度用完 → 去站台后台看");
  console.log("  · API_MODEL 这个站台没有 → 照上面模型清单挑一个");
  console.log("  · API_BASE_URL 打错 → 结尾不要加斜线，也不要带 /v1\n");
}
