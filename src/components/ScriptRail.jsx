/**
 * DSE 判分助手 · HKDSE Marking Scheme Tutor
 * Powered by Stephen Kwan · © 2026
 * All rights reserved.
 */

import { PAPER } from "../lib/type.js";
import { Eyebrow, MarkCode } from "./ui.jsx";

/**
 * 整个介面的招牌：左边解答，右边窄栏放红色分数代码，底部方格是总分。
 * 排版刻意模仿 HKEAA 的评分参考。
 */
export default function ScriptRail({ rows, total, marking }) {
  const graded = Boolean(marking);

  return (
    <div className="border border-slate-300 bg-white">
      <div className="flex items-stretch border-b border-slate-300 bg-slate-100">
        <div className="flex-1 px-4 py-2">
          <Eyebrow>Solution</Eyebrow>
        </div>
        <div className="w-20 shrink-0 border-l border-slate-300 px-3 py-2 text-right">
          <Eyebrow>Marks</Eyebrow>
        </div>
      </div>

      {rows.map((r, i) => (
        <div key={i} className="flex items-stretch border-b border-slate-200 last:border-b-0">
          <div className="flex-1 px-4 py-2.5">
            <div style={PAPER} className="whitespace-pre-wrap text-[16px] leading-relaxed text-slate-900">
              {r.step}
            </div>
            {r.why ? (
              <div className="mt-1 font-mono text-[11px] italic text-slate-500">{r.why}</div>
            ) : null}
          </div>
          <div className="flex w-20 shrink-0 items-start justify-end border-l border-slate-300 px-3 py-2.5">
            <MarkCode>{r.marks}</MarkCode>
          </div>
        </div>
      ))}

      {total != null && (
        <div className="flex items-stretch border-t-2 border-slate-800">
          <div className="flex-1 px-4 py-2">
            <Eyebrow>{graded ? "Awarded" : "Total"}</Eyebrow>
          </div>
          <div className="w-20 shrink-0 border-l border-slate-300 px-3 py-2 text-right">
            <span className="font-mono text-[15px] font-bold text-slate-900">
              {graded ? `${marking.awarded}/${marking.outOf}` : `(${total})`}
            </span>
          </div>
        </div>
      )}
    </div>
  );
}
