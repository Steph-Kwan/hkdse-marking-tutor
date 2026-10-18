/**
 * DSE 判分助手 · HKDSE Marking Scheme Tutor
 * Powered by Stephen Kwan · © 2026
 * All rights reserved.
 */

import { useState } from "react";
import { Copy, Check } from "lucide-react";
import { PAPER } from "../lib/type.js";
import { Eyebrow, Panel } from "./ui.jsx";
import ScriptRail from "./ScriptRail.jsx";

function toPlainText(result) {
  const lines = [result.title || ""];
  if (result.totalMarks != null) lines.push(`Total: ${result.totalMarks} marks`);
  lines.push("");
  (result.solution || []).forEach((r) =>
    lines.push(`${r.step}${r.marks ? "   [" + r.marks + "]" : ""}`)
  );
  if (result.finalAnswer) lines.push("", `Answer: ${result.finalAnswer}`);
  if (result.markingScheme?.length) {
    lines.push("", "MARKING SCHEME");
    result.markingScheme.forEach((m) => lines.push(`${m.code}  ${m.criterion}  (${m.marks})`));
  }
  return lines.join("\n");
}

export default function ResultView({ result }) {
  const [copied, setCopied] = useState(false);

  function copy() {
    navigator.clipboard?.writeText(toPlainText(result)).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 1600);
    });
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
        <h2 style={PAPER} className="text-xl font-bold">{result.title}</h2>
        {result.totalMarks != null && (
          <span className="font-mono text-xs text-slate-500">{result.totalMarks} marks</span>
        )}
        <button
          onClick={copy}
          className="ml-auto flex items-center gap-1.5 border border-slate-300 bg-white px-2.5 py-1 text-xs text-slate-600 hover:border-slate-500"
        >
          {copied ? <Check className="h-3.5 w-3.5 text-emerald-600" /> : <Copy className="h-3.5 w-3.5" />}
          {copied ? "Copied" : "Copy to notes"}
        </button>
      </div>

      {result.marking && (
        <div className="flex items-stretch border border-slate-300 bg-white">
          <div className="flex w-28 shrink-0 flex-col items-center justify-center border-r-2 border-red-600 bg-red-50 py-3">
            <span style={PAPER} className="text-3xl font-bold text-red-700">{result.marking.awarded}</span>
            <span className="font-mono text-[10px] uppercase tracking-wider text-red-600">
              of {result.marking.outOf}
            </span>
          </div>
          <div className="flex-1 p-3">
            <p style={PAPER} className="text-[15px] leading-relaxed text-slate-800">
              {result.marking.verdict}
            </p>
          </div>
        </div>
      )}

      {result.solution?.length > 0 && (
        <ScriptRail rows={result.solution} total={result.totalMarks} marking={result.marking} />
      )}

      {result.finalAnswer && (
        <div className="border-l-4 border-red-600 bg-white p-4">
          <Eyebrow className="mb-1">
            {result.totalMarks == null ? "Must know by heart" : "Answer"}
          </Eyebrow>
          <div style={PAPER} className="whitespace-pre-wrap text-[17px] font-bold leading-relaxed">
            {result.finalAnswer}
          </div>
        </div>
      )}

      {result.marking?.items?.length > 0 && (
        <Panel title="Mark by mark">
          <ul className="space-y-2">
            {result.marking.items.map((it, i) => (
              <li key={i} className="flex items-start gap-2 text-sm">
                <span className={`mt-0.5 font-mono text-[13px] font-bold ${it.awarded ? "text-emerald-600" : "text-red-600"}`}>
                  {it.awarded ? "✓" : "✗"}
                </span>
                <span className="font-mono text-[12px] font-bold text-slate-500">{it.code}</span>
                <span className="flex-1 text-slate-700">{it.comment}</span>
              </li>
            ))}
          </ul>
        </Panel>
      )}

      {result.marking?.improve?.length > 0 && (
        <Panel title="Do this next time" tone="good">
          <ul className="space-y-1.5">
            {result.marking.improve.map((t, i) => (
              <li key={i} className="text-sm text-emerald-900">→ {t}</li>
            ))}
          </ul>
        </Panel>
      )}

      {result.markingScheme?.length > 0 && (
        <Panel title="Marking scheme">
          <table className="w-full text-sm">
            <tbody>
              {result.markingScheme.map((m, i) => (
                <tr key={i} className="border-b border-slate-100 last:border-0">
                  <td className="w-16 py-1.5 align-top font-mono text-[13px] font-bold text-red-600">{m.code}</td>
                  <td className="py-1.5 pr-3 align-top text-slate-700">{m.criterion}</td>
                  <td className="w-10 py-1.5 text-right align-top font-mono text-[13px] text-slate-500">{m.marks}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </Panel>
      )}

      <div className="grid gap-4 md:grid-cols-2">
        {result.examinerNotes?.length > 0 && (
          <Panel title="Examiner's note">
            <ul className="space-y-1.5">
              {result.examinerNotes.map((n, i) => (
                <li key={i} className="text-sm leading-relaxed text-slate-700">{n}</li>
              ))}
            </ul>
          </Panel>
        )}
        {result.commonErrors?.length > 0 && (
          <Panel title="Where marks get lost" tone="warn">
            <ul className="space-y-1.5">
              {result.commonErrors.map((n, i) => (
                <li key={i} className="text-sm leading-relaxed text-amber-900">{n}</li>
              ))}
            </ul>
          </Panel>
        )}
      </div>

      {result.syllabus?.length > 0 && (
        <div className="flex flex-wrap items-center gap-2">
          <Eyebrow>Syllabus</Eyebrow>
          {result.syllabus.map((t, i) => (
            <span key={i} className="border border-slate-300 bg-white px-2 py-0.5 font-mono text-[11px] text-slate-600">
              {t}
            </span>
          ))}
        </div>
      )}
    </div>
  );
}
