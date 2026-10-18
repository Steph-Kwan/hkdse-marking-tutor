/**
 * DSE 判分助手 · HKDSE Marking Scheme Tutor
 * Powered by Stephen Kwan · © 2026
 * All rights reserved.
 */

import { FileText, ClipboardCheck, Lightbulb } from "lucide-react";

export const MODES = [
  { id: "model", label: "Model answer", blurb: "Full solution with the mark codes shown", icon: FileText },
  { id: "mark", label: "Mark my answer", blurb: "Grade your attempt against the scheme", icon: ClipboardCheck },
  { id: "concept", label: "Concept drill", blurb: "Explain a topic and how it is examined", icon: Lightbulb },
];

export const modeOf = (id) => MODES.find((m) => m.id === id);
