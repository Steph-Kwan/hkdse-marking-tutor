/**
 * DSE 判分助手 · HKDSE Marking Scheme Tutor
 * Powered by Stephen Kwan · © 2026
 * All rights reserved.
 */

import { useRef } from "react";
import { Send, Loader2, Image as ImageIcon, X } from "lucide-react";
import { PAPER } from "../lib/type.js";
import { SUBJECTS } from "../subjects/index.js";
import { modeOf } from "../lib/modes.js";
import { Eyebrow } from "./ui.jsx";

export default function QuestionForm({
  subject, mode, busy,
  question, onQuestion,
  studentAnswer, onStudentAnswer,
  marks, onMarks,
  image, onImage,
  onRun, onError,
}) {
  const fileRef = useRef(null);
  const s = SUBJECTS[subject];
  const m = modeOf(mode);
  const ModeIcon = m.icon;

  async function attach(e) {
    const f = e.target.files?.[0];
    if (!f) return;
    if (!/^image\/(png|jpeg|jpg|webp|gif)$/.test(f.type)) {
      onError("Attach a PNG, JPG, WEBP or GIF.");
      return;
    }
    const data = await new Promise((ok, no) => {
      const r = new FileReader();
      r.onload = () => ok(r.result.split(",")[1]);
      r.onerror = () => no(new Error("Could not read that file."));
      r.readAsDataURL(f);
    });
    onImage({ data, mime: f.type, name: f.name, url: URL.createObjectURL(f) });
    onError("");
  }

  return (
    <div className="border border-slate-300 bg-white">
      <div className="flex items-center gap-2 border-b border-slate-200 px-4 py-2">
        <ModeIcon className="h-4 w-4 text-red-600" />
        <span className="text-sm font-semibold">{s.name}</span>
        <span className="ml-auto font-mono text-[10px] uppercase tracking-wider text-slate-400">
          {m.label}
        </span>
      </div>

      <div className="p-4">
        <textarea
          value={question}
          onChange={(e) => onQuestion(e.target.value)}
          onKeyDown={(e) => {
            if ((e.metaKey || e.ctrlKey) && e.key === "Enter") onRun();
          }}
          rows={mode === "concept" ? 2 : 5}
          placeholder={
            mode === "concept"
              ? "Name a topic — projectile motion, normalisation to 3NF, properties of circles…"
              : "Paste the exam question here, part labels and all."
          }
          style={PAPER}
          className="w-full resize-y border border-slate-300 px-3 py-2 text-[16px] leading-relaxed outline-none focus:border-slate-900"
        />

        {mode === "mark" && (
          <div className="mt-3">
            <Eyebrow className="mb-1">Your attempt</Eyebrow>
            <textarea
              value={studentAnswer}
              onChange={(e) => onStudentAnswer(e.target.value)}
              rows={5}
              placeholder="Write out your working exactly as you put it on paper — the marker only sees what you wrote."
              style={PAPER}
              className="w-full resize-y border border-slate-300 px-3 py-2 text-[16px] leading-relaxed outline-none focus:border-slate-900"
            />
          </div>
        )}

        {image && (
          <div className="mt-3 flex items-center gap-2 border border-slate-300 bg-slate-50 p-2">
            <img src={image.url} alt="" className="h-12 w-12 border border-slate-300 object-cover" />
            <span className="truncate text-xs text-slate-600">{image.name}</span>
            <button onClick={() => onImage(null)} className="ml-auto text-slate-400 hover:text-red-600">
              <X className="h-4 w-4" />
            </button>
          </div>
        )}

        <div className="mt-3 flex flex-wrap items-center gap-2">
          <input ref={fileRef} type="file" accept="image/*" onChange={attach} className="hidden" />
          <button
            onClick={() => fileRef.current?.click()}
            className="flex items-center gap-1.5 border border-slate-300 px-3 py-2 text-xs text-slate-600 hover:border-slate-500"
          >
            <ImageIcon className="h-4 w-4" />
            Attach the question
          </button>

          <div className="flex items-center gap-1.5 border border-slate-300 px-2 py-1.5">
            <span className="font-mono text-[10px] uppercase tracking-wider text-slate-500">Marks</span>
            <input
              value={marks}
              onChange={(e) => onMarks(e.target.value)}
              placeholder="6"
              inputMode="numeric"
              className="w-10 text-center text-sm outline-none"
            />
          </div>

          <button
            onClick={() => {
              onQuestion(s.sample);
              onStudentAnswer("");
              onMarks("");
            }}
            className="border border-slate-300 px-3 py-2 text-xs text-slate-600 hover:border-slate-500"
          >
            Load a sample
          </button>

          <button
            onClick={onRun}
            disabled={busy}
            className="ml-auto flex items-center gap-2 bg-slate-900 px-5 py-2 text-sm font-semibold text-white hover:bg-red-700 disabled:opacity-50"
          >
            {busy ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
            {busy ? "Marking…" : mode === "mark" ? "Mark it" : mode === "concept" ? "Teach me" : "Work it out"}
          </button>
        </div>
        <div className="mt-2 font-mono text-[10px] text-slate-400">Ctrl / ⌘ + Enter also runs it</div>
      </div>
    </div>
  );
}
