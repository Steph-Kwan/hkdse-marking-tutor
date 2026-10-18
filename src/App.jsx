/**
 * DSE 判分助手 · HKDSE Marking Scheme Tutor
 * Powered by Stephen Kwan · © 2026
 * All rights reserved.
 */

import { useState } from "react";
import { TriangleAlert } from "lucide-react";
import { PAPER, UI } from "./lib/type.js";
import { askClaude, extractJSON } from "./lib/api.js";
import { buildSystem, buildUser } from "./prompts/build.js";
import ControlPanel from "./components/ControlPanel.jsx";
import QuestionForm from "./components/QuestionForm.jsx";
import ResultView from "./components/ResultView.jsx";
import { Panel } from "./components/ui.jsx";

export default function App() {
  const [subject, setSubject] = useState("math");
  const [mode, setMode] = useState("model");
  const [topic, setTopic] = useState("");
  const [paper, setPaper] = useState("");
  const [marks, setMarks] = useState("");
  const [question, setQuestion] = useState("");
  const [studentAnswer, setStudentAnswer] = useState("");
  const [image, setImage] = useState(null);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const [result, setResult] = useState(null);
  const [raw, setRaw] = useState("");
  const [history, setHistory] = useState([]);

  function pickSubject(id) {
    setSubject(id);
    setTopic("");
    setPaper("");
  }

  async function run() {
    if (!question.trim() && !image) {
      setError(
        mode === "concept"
          ? "Name a topic first — for example, projectile motion."
          : "Paste a question, or attach a photo of one."
      );
      return;
    }
    setBusy(true);
    setError("");
    setResult(null);
    setRaw("");

    try {
      const system = buildSystem(subject, mode);
      const user = buildUser({
        mode,
        question: question.trim() || "See the attached image.",
        studentAnswer,
        marks,
        topic,
        paper,
      });
      const text = await askClaude(system, user, image);

      let parsed = null;
      try {
        parsed = extractJSON(text);
      } catch {
        setRaw(text);
      }

      if (parsed) {
        setResult(parsed);
        setHistory((h) =>
          [
            {
              id: Date.now(),
              title: parsed.title || question.slice(0, 48),
              payload: { result: parsed, question, studentAnswer, subject, mode, marks, topic, paper },
            },
            ...h,
          ].slice(0, 12)
        );
      }
    } catch (err) {
      setError(err.message || "Something broke on the way back. Try again.");
    } finally {
      setBusy(false);
    }
  }

  function restore(h) {
    const p = h.payload;
    setSubject(p.subject);
    setMode(p.mode);
    setQuestion(p.question);
    setStudentAnswer(p.studentAnswer);
    setMarks(p.marks);
    setTopic(p.topic);
    setPaper(p.paper);
    setResult(p.result);
    setRaw("");
    setError("");
  }

  return (
    <div style={UI} className="min-h-screen bg-slate-100 text-slate-900">
      <header className="border-b-2 border-slate-900 bg-white">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center gap-x-4 gap-y-2 px-5 py-3">
          <div className="flex items-baseline gap-2">
            <span style={PAPER} className="text-2xl font-bold tracking-tight text-slate-900">DSE</span>
            <span className="font-mono text-[11px] uppercase tracking-widest text-red-600">
              marking scheme tutor
            </span>
          </div>
          <div className="ml-auto flex items-center gap-2 border border-slate-300 px-2 py-1">
            <TriangleAlert className="h-3.5 w-3.5 text-amber-600" />
            <span className="font-mono text-[10px] uppercase tracking-wider text-slate-600">
              Unofficial · check against real past-paper schemes
            </span>
          </div>
        </div>
      </header>

      <div className="mx-auto flex max-w-6xl flex-col gap-5 px-5 py-5 lg:flex-row">
        <ControlPanel
          subject={subject}
          onSubject={pickSubject}
          mode={mode}
          onMode={setMode}
          paper={paper}
          onPaper={setPaper}
          topic={topic}
          onTopic={setTopic}
          history={history}
          onRestore={restore}
          onClearHistory={() => setHistory([])}
        />

        <main className="min-w-0 flex-1 space-y-4">
          <QuestionForm
            subject={subject}
            mode={mode}
            busy={busy}
            question={question}
            onQuestion={setQuestion}
            studentAnswer={studentAnswer}
            onStudentAnswer={setStudentAnswer}
            marks={marks}
            onMarks={setMarks}
            image={image}
            onImage={setImage}
            onRun={run}
            onError={setError}
          />

          {error && (
            <div className="flex items-start gap-2 border border-red-300 bg-red-50 p-3 text-sm text-red-800">
              <TriangleAlert className="mt-0.5 h-4 w-4 shrink-0" />
              {error}
            </div>
          )}

          {raw && !result && (
            <Panel title="Returned without structure">
              <pre style={PAPER} className="whitespace-pre-wrap text-[15px] leading-relaxed">{raw}</pre>
            </Panel>
          )}

          {result && <ResultView result={result} />}

          {!result && !raw && !busy && (
            <div className="border border-dashed border-slate-300 bg-white p-8 text-center">
              <p style={PAPER} className="text-lg text-slate-700">
                Paste a question. Get it back as a marking scheme.
              </p>
              <p className="mx-auto mt-2 max-w-md text-sm leading-relaxed text-slate-500">
                Every line of working comes with the mark it earns, so you can see exactly
                where the marks in your own script went.
              </p>
            </div>
          )}
        </main>
      </div>

      <footer className="mx-auto max-w-6xl px-5 pb-8 pt-2">
        <p className="text-[11px] leading-relaxed text-slate-500">
          Marks shown here follow HKEAA conventions but are generated by an AI, not issued by
          the HKEAA. Treat them as practice feedback and confirm anything that matters against
          the published past-paper marking schemes.
        </p>
        <div className="mt-3 flex flex-wrap items-center gap-x-2 gap-y-1 border-t border-slate-300 pt-3">
          <span className="font-mono text-[10px] uppercase tracking-widest text-slate-500">
            Powered by
          </span>
          <span style={PAPER} className="text-[13px] font-bold text-slate-800">
            Stephen Kwan
          </span>
          <span className="font-mono text-[10px] text-slate-400">© 2026</span>
          <span className="font-mono text-[10px] text-slate-400">
            All rights reserved
          </span>
        </div>
      </footer>
    </div>
  );
}
