# DSE 判分助手 · HKDSE Marking Scheme Tutor

**贴上一条 DSE 试题，拿回一份照 HKEAA 惯例排版的评分参考——每一行运算旁边标着它值几分。**

也可以贴上自己的作答，让 AI 按评分参考逐分批改，告诉你哪个 1M 拿到了、哪个 1A 丢了、为什么。

科目：数学必修部分、M1、M2、物理、ICT。

Powered by Stephen Kwan · © 2026

<!-- 截图放这里：
![](docs/screenshot.png)
-->

---

## 为什么做这个

DSE 考生最常见的困境不是「不会做」，而是**「我明明算对了，为什么只拿一半分」**。

答案藏在 HKEAA 的评分参考里，但那份文件每年只出一次、只有过去的题目，而且学生拿到的是一张写满 `1M`、`1A`、`pp-1`、`e.c.f.` 的表格，没人教他们怎么读。

一般的 AI 能解题，但它给的是「答案」，不是「分数」。它不知道：

- 数学里**方法分（1M）和准确分（1A）是分开给的**——算式列对了、算错了，那个 M 还是你的
- 物理一条三分计算题拆成**公式分、代入分、答案分**，而答案没写单位就扣掉一分
- ICT 是**关键字给分**，而且答案没扣住题目给的情境，写得再漂亮也是零分
- M2 的数学归纳法，漏掉最后那句结语，就是少一个 A

这个项目把这些规则写成提示词，让 AI 用**判卷员的眼睛**看答案，而不是用解题者的眼睛。

---

## 核心：五份判分提示词

程式码只是外壳，真正花心思的是 `src/subjects/` 里每科一份的判分规则。举两段实际内容：

**物理**
```
- Calculation questions are marked: 1M for the correct formula or relationship,
  1M for correct substitution of values, 1A for the correct answer WITH the correct unit.
- Units are compulsory on every numerical answer; wrong or missing unit costs 1 mark,
  deducted once per question.
- e.c.f. is allowed: a wrong value carried correctly into a later part still earns
  the later marks.
- Explanation questions need TWO components for full marks: name the physics principle
  or law, then apply it to the specific situation. Naming alone scores 1.
```

**ICT**
```
- Point marking: 1 mark per acceptable point, capped at the stated total.
  If a question is worth 3 marks, give exactly 3 distinct creditworthy points.
- Answers must be tied to the SCENARIO in the question. A generic textbook sentence
  with no reference to the given company, system or user scores 0.
- Databases: SQL marks split across clauses — SELECT list (1), FROM/JOIN (1),
  WHERE condition (1), GROUP BY/ORDER BY (1).
```

共用的判分惯例（`1M` / `1A` 的定义、`pp-1` / `u-1` 扣分、`f.t.` `c.a.o.` `o.a.` 这些批注）写在 `src/prompts/build.js`，三科共享。

输出强制为 JSON，每一行解答带着自己的分数代码，再由前端排版成评分参考的样子。

---

## 介面设计

版面刻意模仿真正的 HKEAA 评分参考：**左边解答，右边一条窄栏放红色分数代码，底部方格是总分**。

```
┌──────────────────────────────────┬────────┐
│ Solution                         │  Marks │
├──────────────────────────────────┼────────┤
│ Sₙ = 2n² + 3n                    │        │
│ S₁ = 2(1)² + 3(1) = 5            │   1M   │
│ ∴ first term a = 5               │   1A   │
│ S₂ = 2(2)² + 3(2) = 14           │        │
│ ∴ d = 14 − 5 − 5 = 4             │   1A   │
├──────────────────────────────────┼────────┤
│ Total                            │   (3)  │
└──────────────────────────────────┴────────┘
```

批改模式下，同一条分数栏会变成 ✓ / ✗ 和实得分数——跟学生拿回自己的卷子时看到的东西一样。

字体分三种角色：模仿试卷的部分用 Times，分数代码用等宽字，操作介面用系统无衬线体。

---

## 三种模式

| 模式 | 做什么 |
|---|---|
| **Model answer** | 完整解答，每一行标着它赚到的分 |
| **Mark my answer** | 贴上你的作答，逐分批改，附「下次改这个」 |
| **Concept drill** | 讲解课题，并说明这个课题在卷上怎么考 |

另外支援拍照上传题目（含图表），以及按试卷、课题、分数筛选。

---

## 跑起来

需要 Node 18 以上。

```bash
npm install
cp .env.example .env     # 填好网址、密钥、模型
npm run test:api         # 测通不通，顺便列出可用模型
npm run dev
```

打开 http://localhost:5173

### 支援哪些 API

官方 Anthropic API，或任何 OpenAI / Anthropic 相容的中转站。换供应商只改 `.env`，程式码一行不用动：

| 设定 | 说明 |
|---|---|
| `API_BASE_URL` | 网址，结尾不加斜线，不带 `/v1` |
| `API_KEY` | 密钥 |
| `API_FORMAT` | `openai` 或 `anthropic`，跑 `npm run test:api` 会告诉你 |
| `API_MODEL` | 模型名称 |
| `API_MAX_TOKENS` | 回覆长度上限，建议 2000 以上 |
| `PORT` | 本机端口，预设 5173 |

两种格式的翻译在 `server/relay.js`，本机开发与线上部署共用同一份。

---

## 架构

密钥只存在于伺服器端，浏览器永远看不到：

```
浏览器                        伺服器
src/lib/api.js  ──POST──►  server/relay.js
                           ├─ 读 .env 拿密钥
                           ├─ 照 API_FORMAT 翻译请求
                ◄──text──  └─ 转发给上游 API
```

```
src/
├── subjects/            ← 每科一个档案：判分规则、课题清单、范例题
│   ├── math.js  m1.js  m2.js  physics.js  ict.js
│   └── index.js         ← 加新科目在这里挂进去
├── prompts/build.js     ← 共用判分惯例、JSON 格式、三个模式的追加指令
├── components/
│   ├── ScriptRail.jsx   ← 左解答右分数那个排版
│   ├── ResultView.jsx  QuestionForm.jsx  ControlPanel.jsx
├── lib/api.js  modes.js  type.js
└── App.jsx

server/relay.js          ← API 格式翻译，开发与部署共用
scripts/test-api.js      ← npm run test:api，诊断上游
api/ask.js               ← Vercel serverless function
```

### 想改什么动哪里

| 想做什么 | 改哪里 |
|---|---|
| 调整某科判分松紧 | `src/subjects/该科.js` 的 `rules` |
| 加课题选项 / 换范例题 | 同上的 `topics` / `sample` |
| 让 AI 用中文回答 | `src/prompts/build.js` 底部的 `LANGUAGE`，把注解拿掉 |
| 换模型 / 换 API 供应商 | `.env`，程式码不用动 |
| 加新科目 | 复制一份科目档案改内容，挂进 `src/subjects/index.js` |

---

## 部署

推上 GitHub 后，到 [vercel.com](https://vercel.com) Import 这个 repo，在 Environment Variables 里加上 `.env` 那几条（`PORT` 不用），Deploy。

`api/ask.js` 会自动成为后端，密钥留在伺服器上。

> 上线后任何人拿到网址都能用，API 额度算你的。建议在 Vercel 的 Settings → Deployment Protection 开 Password Protection 挡一下。

---

## 技术栈

React 18 · Vite 6 · Tailwind CSS 4 · Vercel Serverless Functions

无状态、无资料库、无使用者系统——刻意保持最小，把复杂度留给提示词。

---

## 还没做的

- [ ] **卷二 MC 模式**：选择题的给分逻辑跟 `1M/1A` 完全不同，重点是四个选项各自错在哪
- [ ] 错题本：累积失分点，看自己最常在哪类掉分
- [ ] 判分纪录持久化（现在重整就没了）
- [ ] 数学公式排版（KaTeX），目前是纯 Unicode
- [ ] 串接历届试题，对照真正的评分参考验证准确度

---

## 授权

Copyright © 2026 Stephen Kwan · All rights reserved. 详见 [LICENSE](LICENSE)。

可下载研读、个人温习使用。未经书面同意，请勿重新散布、转售，或将本项目（含五份判分提示词）当作自己的作品发表。

> 判分由 AI 生成，不是 HKEAA 发出的，不具官方效力。本项目与香港考试及评核局无任何隶属或授权关系。重要的地方请对照官方历届试题评分参考。
