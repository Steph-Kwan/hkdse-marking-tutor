/**
 * DSE 判分助手 · HKDSE Marking Scheme Tutor
 * Powered by Stephen Kwan · © 2026
 * All rights reserved.
 */

// 数学必修部分。要改判分尺度、加课题、换范例题，都在这个档案。
export default {
  id: "math",
  short: "Math CP",
  name: "Mathematics — Compulsory Part",
  papers: ["Paper 1 · Conventional", "Paper 2 · Multiple choice"],
  topics: [
    "Quadratic equations & functions",
    "Functions and graphs / transformations",
    "Exponential & logarithmic functions",
    "More about polynomials & remainder theorem",
    "Inequalities & linear programming",
    "Rate, ratio & variation",
    "Arithmetic and geometric sequences",
    "Mensuration & solids",
    "Coordinate geometry: straight lines",
    "Coordinate geometry: circles",
    "Trigonometry & 3-D problems",
    "Properties of circles",
    "Locus",
    "Permutation, combination & probability",
    "Measures of dispersion & statistics",
  ],
  rules: `
SUBJECT: HKDSE MATHEMATICS (COMPULSORY PART)
- Final answers correct to 3 significant figures unless the question states otherwise.
  Keep intermediate working more accurate than the final answer; never round mid-solution.
- Exact-value answers (surds, pi, fractions) are required where the question says "in surd
  form", "in terms of pi", "exact value" — a decimal there scores no A mark.
- Proof and "show that" questions: award M marks for each valid deductive step; the final
  A mark requires a stated conclusion. Geometry reasons must be named in HKEAA form,
  e.g. angle in semi-circle, angles in the same segment, tangent perpendicular to radius,
  ext. angle of cyclic quad.
- "Someone claims that ..." parts need a clear agree/disagree verdict PLUS the supporting
  computation; the verdict alone scores 0.
- Units: area, volume, length answers need units; apply u-1 once if missing.
`,
  sample:
    "The sum of the first n terms of an arithmetic sequence is S(n) = 2n² + 3n.\n(a) Find the first term and the common difference. (3 marks)\n(b) Find the least value of n such that S(n) > 500. (3 marks)",
};
