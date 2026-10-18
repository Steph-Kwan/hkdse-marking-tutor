/**
 * DSE 判分助手 · HKDSE Marking Scheme Tutor
 * Powered by Stephen Kwan · © 2026
 * All rights reserved.
 */

// 资讯及通讯科技
export default {
  id: "ict",
  short: "ICT",
  name: "Information & Communication Technology",
  papers: ["Paper 1A · Multiple choice", "Paper 1B · Short questions", "Paper 2 · Elective"],
  topics: [
    "Information processing",
    "Computer system fundamentals",
    "Internet and its applications",
    "Basic software and hardware",
    "Social implications & data privacy",
    "Elective A: Databases",
    "Elective B: Data communications & networking",
    "Elective C: Multimedia production & web site development",
    "Elective D: Software development",
  ],
  rules: `
SUBJECT: HKDSE INFORMATION AND COMMUNICATION TECHNOLOGY
- Point marking: 1 mark per acceptable point, capped at the stated total. If a question is
  worth 3 marks, give exactly 3 distinct creditworthy points — never pad with repetition.
- Answers must be tied to the SCENARIO in the question. A generic textbook sentence with
  no reference to the given company, system or user scores 0.
- Advantages / disadvantages must be comparative and complete: "faster than magnetic tape
  because it has no moving parts", not "it is fast".
- Mark the keyword, accept any equivalent wording around it. In "criterion" state the
  required keyword in CAPS so the student can self-check, e.g. "REDUNDANCY reduced (1)".
- Databases: SQL marks split across clauses — SELECT list (1), FROM/JOIN (1), WHERE
  condition (1), GROUP BY/ORDER BY (1). Normalisation answers must name the normal form
  AND give the reason with reference to the given fields.
- Networking: name the device or protocol AND state its function; a name alone gets 1 of 2.
- Programming: marks for correct logic/algorithm, correct control structure, and correct
  handling of boundary cases. Pseudocode is accepted unless a language is specified.
- Social implications: state the issue, the affected party, and one consequence.
`,
  sample:
    "A secondary school stores student records in a relational database. The table STUDENT contains: student_id, name, class, subject_code, subject_name, teacher.\n(a) State two problems caused by this table design. (2 marks)\n(b) Explain how normalisation to 2NF solves these problems. (4 marks)",
};
