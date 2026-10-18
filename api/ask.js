/**
 * DSE 判分助手 · HKDSE Marking Scheme Tutor
 * Powered by Stephen Kwan · © 2026
 * All rights reserved.
 */
import { readConfig, relay } from "../server/relay.js";

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).json({ error: "Use POST." });
  try {
    const text = await relay(req.body, readConfig(process.env));
    return res.status(200).json({ text });
  } catch (err) {
    return res.status(502).json({ error: err.message });
  }
}
