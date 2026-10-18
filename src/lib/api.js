/**
 * DSE 判分助手 · HKDSE Marking Scheme Tutor
 * Powered by Stephen Kwan · © 2026
 * All rights reserved.
 *
 * 前端只认识 /api/ask，不知道背后接的是哪家 API、用哪个模型。
 * 要换供应商或模型，改 .env 就好。
 */

export function extractJSON(text) {
  let t = text.trim();
  t = t.replace(/^```(?:json)?/i, "").replace(/```$/, "").trim();
  const a = t.indexOf("{");
  const b = t.lastIndexOf("}");
  if (a === -1 || b === -1) throw new Error("no object");
  return JSON.parse(t.slice(a, b + 1));
}

export async function askClaude(system, user, image) {
  const res = await fetch("/api/ask", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      system,
      user,
      image: image ? { mime: image.mime, data: image.data } : null,
    }),
  });

  const data = await res.json();
  if (!res.ok) throw new Error(data.error || `HTTP ${res.status}`);
  return data.text;
}
