/**
 * DSE 判分助手 · HKDSE Marking Scheme Tutor
 * Powered by Stephen Kwan · © 2026
 * All rights reserved.
 */

import { Trash2, ChevronRight } from "lucide-react";
import { SUBJECT_LIST, SUBJECTS } from "../subjects/index.js";
import { MODES } from "../lib/modes.js";
import { Eyebrow } from "./ui.jsx";

export default function ControlPanel({
  subject, onSubject, mode, onMode,
  paper, onPaper, topic, onTopic,
  history, onRestore, onClearHistory,
}) {
  const s = SUBJECTS[subject];

  return (
    <aside className="w-full shrink-0 space-y-4 lg:w-64">
      <div>
        <Eyebrow className="mb-2">Subject</Eyebrow>
        <div className="grid grid-cols-2 gap-1.5 lg:grid-cols-1">
          {SUBJECT_LIST.map((sub) => (
            <button
              key={sub.id}
              onClick={() => onSubject(sub.id)}
              className={`border px-3 py-2 text-left text-sm transition ${
                subject === sub.id
                  ? "border-slate-900 bg-slate-900 text-white"
                  : "border-slate-300 bg-white text-slate-700 hover:border-slate-500"
              }`}
            >
              <span className="font-mono text-[11px] uppercase tracking-wider">{sub.short}</span>
            </button>
          ))}
        </div>
      </div>

      <div>
        <Eyebrow className="mb-2">What do you need</Eyebrow>
        <div className="space-y-1.5">
          {MODES.map((m) => {
            const I = m.icon;
            const on = mode === m.id;
            return (
              <button
                key={m.id}
                onClick={() => onMode(m.id)}
                className={`flex w-full items-start gap-2 border px-3 py-2 text-left transition ${
                  on ? "border-red-600 bg-red-50" : "border-slate-300 bg-white hover:border-slate-500"
                }`}
              >
                <I className={`mt-0.5 h-4 w-4 shrink-0 ${on ? "text-red-600" : "text-slate-400"}`} />
                <span>
                  <span className="block text-sm font-semibold">{m.label}</span>
                  <span className="block text-[11px] leading-snug text-slate-500">{m.blurb}</span>
                </span>
              </button>
            );
          })}
        </div>
      </div>

      <div className="space-y-2">
        <div>
          <Eyebrow className="mb-1">Paper</Eyebrow>
          <select
            value={paper}
            onChange={(e) => onPaper(e.target.value)}
            className="w-full border border-slate-300 bg-white px-2 py-1.5 text-sm"
          >
            <option value="">Any</option>
            {s.papers.map((p) => (
              <option key={p} value={p}>{p}</option>
            ))}
          </select>
        </div>
        <div>
          <Eyebrow className="mb-1">Topic</Eyebrow>
          <select
            value={topic}
            onChange={(e) => onTopic(e.target.value)}
            className="w-full border border-slate-300 bg-white px-2 py-1.5 text-sm"
          >
            <option value="">Let the marker decide</option>
            {s.topics.map((t) => (
              <option key={t} value={t}>{t}</option>
            ))}
          </select>
        </div>
      </div>

      {history.length > 0 && (
        <div>
          <div className="mb-2 flex items-center justify-between">
            <Eyebrow>Marked earlier</Eyebrow>
            <button onClick={onClearHistory} className="text-slate-400 hover:text-red-600" title="Clear the list">
              <Trash2 className="h-3.5 w-3.5" />
            </button>
          </div>
          <div className="space-y-1">
            {history.map((h) => (
              <button
                key={h.id}
                onClick={() => onRestore(h)}
                className="flex w-full items-center gap-1 border border-slate-200 bg-white px-2 py-1.5 text-left text-xs text-slate-600 hover:border-slate-400"
              >
                <ChevronRight className="h-3 w-3 shrink-0 text-slate-400" />
                <span className="truncate">{h.title}</span>
              </button>
            ))}
          </div>
        </div>
      )}
    </aside>
  );
}
