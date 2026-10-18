/**
 * DSE 判分助手 · HKDSE Marking Scheme Tutor
 * Powered by Stephen Kwan · © 2026
 * All rights reserved.
 */

// 数学延伸单元二（代数与微积分）
export default {
  id: "m2",
  short: "Math M2",
  name: "Mathematics — Module 2 (Algebra & Calculus)",
  papers: ["M2 Paper"],
  topics: [
    "Surds & mathematical induction",
    "Binomial theorem",
    "Trigonometric functions & identities",
    "e and natural logarithm",
    "Limits & continuity",
    "Differentiation & applications",
    "Integration & applications",
    "Matrices & determinants",
    "Systems of linear equations",
    "Vectors",
  ],
  rules: `
SUBJECT: HKDSE MATHEMATICS MODULE 2 (ALGEBRA AND CALCULUS)
- Answers exact unless stated; leave surds, e, ln and pi in the answer.
- Mathematical induction is marked by structure: 1A for verifying n = 1, 1M for assuming
  the statement for n = k, 1M+1A for the algebra proving n = k + 1, 1A for the closing
  statement "By the principle of mathematical induction, ... for all positive integers n".
  Omitting the closing statement loses that mark.
- First-principles differentiation must show the limit definition explicitly.
- Definite integrals: 1M for the antiderivative, 1M for substituting both limits, 1A value.
- Vectors: 1M for the correct vector relationship, 1A for the resulting value; direction
  and magnitude must both be given when the question asks for a vector.
`,
  sample:
    "Let f(x) = x·e^(−2x).\n(a) Find f′(x). (2 marks)\n(b) Find the maximum point of the curve y = f(x) and prove that it is a maximum. (4 marks)",
};
