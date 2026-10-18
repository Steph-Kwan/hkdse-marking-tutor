/**
 * DSE 判分助手 · HKDSE Marking Scheme Tutor
 * Powered by Stephen Kwan · © 2026
 * All rights reserved.
 *
 * 中转层：前端只送 { system, user, image } 过来，
 * 这里按 .env 设定的格式翻译成上游 API 认得的形状，再把纯文字挖出来回传。
 * 换 API 供应商只要改 .env，前端一行都不用动。
 */

export function readConfig(env) {
  return {
    baseUrl: (env.API_BASE_URL || "https://api.anthropic.com").replace(/\/+$/, ""),
    key: env.API_KEY || env.ANTHROPIC_API_KEY || "",
    format: (env.API_FORMAT || "anthropic").toLowerCase(),
    model: env.API_MODEL || "claude-sonnet-5",
    maxTokens: Number(env.API_MAX_TOKENS || 2000),
  };
}

export function buildRequest({ system, user, image }, cfg) {
  if (cfg.format === "openai") {
    // OpenAI 格式：system 是一则独立讯息，图片用 image_url + data URI
    const userContent = image
      ? [
          { type: "image_url", image_url: { url: `data:${image.mime};base64,${image.data}` } },
          { type: "text", text: user },
        ]
      : user;

    return {
      url: `${cfg.baseUrl}/v1/chat/completions`,
      headers: {
        "content-type": "application/json",
        authorization: `Bearer ${cfg.key}`,
      },
      body: {
        model: cfg.model,
        max_tokens: cfg.maxTokens,
        messages: [
          { role: "system", content: system },
          { role: "user", content: userContent },
        ],
      },
    };
  }

  // Anthropic 格式：system 是独立栏位，图片用 base64 source
  const content = [];
  if (image) {
    content.push({
      type: "image",
      source: { type: "base64", media_type: image.mime, data: image.data },
    });
  }
  content.push({ type: "text", text: user });

  return {
    url: `${cfg.baseUrl}/v1/messages`,
    headers: {
      "content-type": "application/json",
      "x-api-key": cfg.key,
      authorization: `Bearer ${cfg.key}`, // 部分中转站认这个，两个都带着无妨
      "anthropic-version": "2023-06-01",
    },
    body: {
      model: cfg.model,
      max_tokens: cfg.maxTokens,
      system,
      messages: [{ role: "user", content }],
    },
  };
}

export function extractText(data, format) {
  if (format === "openai") {
    return data?.choices?.[0]?.message?.content?.trim() || "";
  }
  return (data?.content || [])
    .map((c) => (c.type === "text" ? c.text : ""))
    .join("")
    .trim();
}

/** 把上游各种形状的错误讯息统一成一句人看得懂的话 */
export function readError(data, status) {
  const m =
    data?.error?.message ||
    (typeof data?.error === "string" ? data.error : null) ||
    data?.message;
  if (m) return m;
  if (status === 401 || status === 403) return "密钥被拒绝（401/403）。检查 API_KEY 有没有贴错或已失效。";
  if (status === 404) return "找不到端点（404）。多半是 API_FORMAT 设错了，换另一种试试。";
  if (status === 429) return "被限流（429）。等一下再试，或检查站台额度。";
  return `上游回应 HTTP ${status}`;
}

/** 共用的一次呼叫，dev 代理和 Vercel function 都用它 */
export async function relay(payload, cfg) {
  if (!cfg.key) {
    throw new Error("找不到 API_KEY。把 .env.example 复制成 .env 填好，再重开 npm run dev。");
  }
  const req = buildRequest(payload, cfg);
  const r = await fetch(req.url, {
    method: "POST",
    headers: req.headers,
    body: JSON.stringify(req.body),
  });

  const raw = await r.text();
  let data;
  try {
    data = JSON.parse(raw);
  } catch {
    throw new Error(`上游回传的不是 JSON（HTTP ${r.status}）：${raw.slice(0, 200)}`);
  }
  if (!r.ok) throw new Error(readError(data, r.status));

  const text = extractText(data, cfg.format);
  if (!text) throw new Error("上游回了空白内容。可能是模型名称不对，或该模型不支援图片。");
  return text;
}
