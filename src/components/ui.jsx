/**
 * DSE 判分助手 · HKDSE Marking Scheme Tutor
 * Powered by Stephen Kwan · © 2026
 * All rights reserved.
 */

export function Eyebrow({ children, className = "" }) {
  return (
    <div className={`font-mono text-[10px] uppercase tracking-widest text-slate-500 ${className}`}>
      {children}
    </div>
  );
}

export function MarkCode({ children }) {
  if (!children) return null;
  return <span className="font-mono text-[13px] font-bold text-red-600">{children}</span>;
}

export function Panel({ title, children, tone = "plain" }) {
  const tones = {
    plain: "border-slate-300 bg-white",
    warn: "border-amber-300 bg-amber-50",
    good: "border-emerald-300 bg-emerald-50",
  };
  return (
    <div className={`border ${tones[tone]} p-4`}>
      <Eyebrow className="mb-2">{title}</Eyebrow>
      {children}
    </div>
  );
}
