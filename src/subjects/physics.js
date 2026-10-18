/**
 * DSE 判分助手 · HKDSE Marking Scheme Tutor
 * Powered by Stephen Kwan · © 2026
 * All rights reserved.
 */

// 物理
export default {
  id: "phy",
  short: "Physics",
  name: "Physics",
  papers: ["Paper 1A · Multiple choice", "Paper 1B · Structured", "Paper 2 · Elective"],
  topics: [
    "Heat and gases",
    "Force and motion",
    "Wave motion",
    "Electricity and magnetism",
    "Radioactivity and nuclear energy",
    "Elective: Astronomy and space science",
    "Elective: Atomic world",
    "Elective: Energy and use of energy",
    "Elective: Medical physics",
  ],
  rules: `
SUBJECT: HKDSE PHYSICS
- Calculation questions are marked: 1M for the correct formula or relationship, 1M for
  correct substitution of values, 1A for the correct answer WITH the correct unit.
  A two-mark calculation is normally 1M (formula + substitution) + 1A (answer + unit).
- Units are compulsory on every numerical answer; wrong or missing unit costs 1 mark,
  deducted once per question. Give answers to 2 or 3 significant figures.
- e.c.f. is allowed: a wrong value carried correctly into a later part still earns the
  later marks.
- Explanation questions need TWO components for full marks: name the physics principle or
  law, then apply it to the specific situation in the question. Naming alone scores 1.
- Command words: "State" = one line, no reason. "Explain" = principle + application.
  "Describe" = what happens, in sequence. "Deduce"/"Show that" = quantitative working
  ending at the stated result. "Estimate" = state your assumption, then calculate.
- Graph marks: labelled axes with units (1), suitable scale using over half the grid (1),
  correctly plotted points (1), best-fit line or smooth curve (1), gradient worked from a
  large triangle with coordinates shown (1M+1A).
- Vector answers need magnitude AND direction. Free-body diagrams need labelled arrows
  with correct relative lengths and no invented forces.
`,
  sample:
    "A 0.5 kg ball is dropped from rest at a height of 20 m above the ground. Air resistance is negligible.\n(a) Find the speed of the ball just before it hits the ground. (3 marks)\n(b) The ball rebounds to a height of 12 m. Find the loss of kinetic energy during the impact. (3 marks)",
};
