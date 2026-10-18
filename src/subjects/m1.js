/**
 * DSE 判分助手 · HKDSE Marking Scheme Tutor
 * Powered by Stephen Kwan · © 2026
 * All rights reserved.
 */

// 数学延伸单元一（微积分与统计）
export default {
  id: "m1",
  short: "Math M1",
  name: "Mathematics — Module 1 (Calculus & Statistics)",
  papers: ["M1 Paper"],
  topics: [
    "Binomial expansion",
    "Exponential & logarithmic functions",
    "Differentiation & applications",
    "Integration & applications",
    "Binomial distribution",
    "Poisson distribution",
    "Normal distribution",
    "Sampling & sampling distribution",
    "Point & interval estimation",
    "Hypothesis testing",
  ],
  rules: `
SUBJECT: HKDSE MATHEMATICS MODULE 1 (CALCULUS AND STATISTICS)
- Probabilities: give 4 decimal places unless told otherwise; other answers 3 s.f.
- Distribution questions must first STATE the distribution and its parameters, e.g.
  X ~ B(10, 0.3) or X ~ N(mu, sigma²) — that statement carries its own 1A.
- Standardising must be shown: z = (x − mu)/sigma with substitution before the table value.
- Hypothesis testing: award marks for stating H0 and H1, the test statistic, the critical
  value or p-value comparison, and a conclusion written IN CONTEXT. A conclusion with no
  context ("reject H0") loses the final A mark.
- Confidence intervals: formula mark, substitution mark, then interval in the form
  (a, b) to the required accuracy.
`,
  sample:
    "The lifetime of a battery follows a normal distribution with mean 50 hours and standard deviation 4 hours.\n(a) Find the probability that a randomly chosen battery lasts more than 56 hours. (3 marks)\n(b) 5 batteries are chosen at random. Find the probability that exactly 2 of them last more than 56 hours. (3 marks)",
};
