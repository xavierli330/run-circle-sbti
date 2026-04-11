# 跑圈SBTI小程序同步与优化 Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** 将H5版的改进同步到小程序，题库迁入微信云数据库（CSV维护），并叠加优化方案的人格重命名和判词金句。

**Architecture:**
- **题库（高频变动）** → 微信云数据库 `questions` 集合，CSV导入导出维护
- **评分算法（低频变动）** → 留在 `quiz.ts` 代码里
- **角色定义（低频变动）** → 留在 `quiz.ts` 代码里的 `TYPE_META`
- 评分链路：题目.dimension → 维度得分(A=4,B=3,C=2,D=1) → 4个宏观维度 → 人格判定
- 只要题目的 `dimension` 字段正确，改题目不影响判定逻辑

**Tech Stack:** Taro 4 + React 18 + TypeScript + SCSS + 微信云开发

---

## File Structure

| File | Action | Responsibility |
|------|--------|----------------|
| `src/lib/types.ts` | Modify | 添加 MacroScore 接口，扩展 TagResult |
| `src/lib/quiz.ts` | Rewrite | 评分算法 + 24种人格定义 + 判词 + CP + 比赛（不含题库） |
| `src/lib/questions-general.ts` | Delete | 题库迁入云数据库后不再需要 |
| `src/lib/questions-trail.ts` | Delete | 题库迁入云数据库后不再需要 |
| `src/lib/config.ts` | Modify | 更新题池信息 + 云开发配置 |
| `src/lib/cloud.ts` | Create | 云数据库操作封装（获取题目、缓存） |
| `src/app.ts` | Modify | 初始化云开发 `wx.cloud.init()` |
| `project.config.json` | Modify | 添加 cloudfunctionRoot |
| `cloud/` | Create | 云函数目录 |
| `cloud/seedQuestions/` | Create | 种子数据导入函数（一次性） |
| `cloud/getQuizQuestions/` | Create | 获取活跃题目（小程序调用） |
| `scripts/csv-tools.mjs` | Create | CSV ↔ JSON 转换工具 |
| `docs/question-schema.csv` | Create | 题库CSV模板（带表头） |
| `src/pages/index/index.tsx` | Modify | 更新首页文案 |
| `src/pages/quiz/index.tsx` | Modify | 从云DB获取题目 + 阶段文案 + 灵魂题标记 |
| `src/pages/result/index.tsx` | Modify | 新增判词/人格解读/emoji/主题色/复制文案 |
| `src/pages/result/index.scss` | Modify | 新增样式 |
| `src/pages/quiz/index.scss` | Modify | 新增阶段文案样式 |

---

### Task 1: Update types.ts + Rewrite quiz.ts (core logic)

**Files:**
- Modify: `src/lib/types.ts`
- Rewrite: `src/lib/quiz.ts`

核心改动：将小程序旧的手工打分算法替换为H5的宏观维度+4位二进制表算法，并应用优化方案的9个人格重命名。同时将 `generateQuiz()` 改为接受题目参数（不再硬编码题目）。

- [ ] **Step 1: Update types.ts**

添加 `MacroScore` 接口，并在 `TagResult` 中新增字段。在 `ShareImageData` 之前添加：

```typescript
export interface MacroScore {
  drive: number      // 斗志: 卷 ↔ 躺
  social: number     // 社交: 约跑 ↔ 独行
  obsession: number  // 执念: 装备控 ↔ 随性
  wildness: number   // 野性: 越野 ↔ 路跑
}
```

在 `TagResult` 的 `worstCpMatch` 之后添加：

```typescript
  macroScores?: MacroScore
  verdict?: string
  dominantDim?: string
  profile?: string
  emoji?: string
```

- [ ] **Step 2: Rewrite quiz.ts**

将 `src/lib/quiz.ts` 全部替换为H5版的 `code/src/lib/quiz.ts` 内容，做以下修改：

**修改1：import 路径保持 `./types`**

**修改2：删除 import questions**
```typescript
// 删除这两行（题目将从云DB获取，不再从文件导入）
// import { generalQuestions } from './questions-general'
// import { trailQuestions } from './questions-trail'
```

**修改3：generateQuiz() 接受动态题目池**

```typescript
import { Question, Answer, TagResult, MacroScore } from './types'

// 维度 → 每维度抽取题数配置（总共15题）
export const DIMENSION_CONFIG: Record<string, number> = {
  A1: 2, A2: 2, A3: 2, A4: 2, A5: 2,
  B1: 1, B2: 1, B3: 2, B4: 1,
}

export const DIMENSION_LABELS: Record<string, string> = {
  A1: '动机与身份', A2: '赛道行为', A3: '装备与仪式',
  A4: '赛前与赛后', A5: '自我认知',
  B1: '吃苦与享乐', B2: '装备与强制', B3: '爬升与技术', B4: '风景与完赛',
}

// ... (TYPE_META, scoring algorithm, etc. - all from H5)

// 核心改动：generateQuiz 接受题目池参数
export function generateQuiz(allQuestions: Question[]) {
  const byDimension: Record<string, Question[]> = {}
  for (const q of allQuestions) {
    if (!byDimension[q.dimension]) byDimension[q.dimension] = []
    byDimension[q.dimension].push(q)
  }

  const selectedQuestions: Question[] = []
  const dimensionCounts: Record<string, number> = {}

  for (const [dim, count] of Object.entries(DIMENSION_CONFIG)) {
    const pool = byDimension[dim] || []
    const shuffled = [...pool].sort(() => Math.random() - 0.5)
    const picked = shuffled.slice(0, count)
    selectedQuestions.push(...picked)
    dimensionCounts[dim] = picked.length
  }

  // 整体随机排序
  for (let i = selectedQuestions.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[selectedQuestions[i], selectedQuestions[j]] = [selectedQuestions[j], selectedQuestions[i]]
  }

  return { questions: selectedQuestions, dimensionCounts }
}
```

**修改4：应用优化方案的9个人格重命名**

在 `RUNNER_TYPES` 数组和所有引用处，将以下名称替换：
```
'社恐跑者' → '移动隔离舱驾驶员'
'奖牌舔狗' → '仪式感套利者'
'朋友圈跑者' → '运动痕迹管理大师'
'30km废物' → '意志力通货膨胀者'
'报名鸽王' → '报名决策狂热者'
'补给站强盗' → '赛道美食评论家'
'数据奴隶' → '可穿戴设备依赖症患者'
'配速舔狗' → '数据型焦虑症晚期'
'佛系废物' → '自律表演艺术家'
```

同步更新以下位置中的名称引用：
- `MACRO_TYPE_TABLE`
- `checkSpecialOverrides`
- `TYPE_META` 的 key 和所有 cpTypes/worstTypes 数组
- `bestCpDescs` 的 key
- `worstDescs` 的 key
- `getSuitableRace` 的 key
- `getRaceRecommendations` 中 `typeTags` 的 key

**修改5：更新 taglines（来自优化方案）**

替换9个类型的 tagline：
```typescript
'移动隔离舱驾驶员': '耳机一戴，全世界都欠我五公里'
'仪式感套利者': '完赛不是为了跑，是为了拥有一个「完成」的符号'
'运动痕迹管理大师': '没拍等于没跑，修图等于训练'
'意志力通货膨胀者': '你每次都以为意志力够用，它每次都让你失望'
'报名决策狂热者': '押金的沉没速度，快过我的有氧基础'
'赛道美食评论家': '来都来了，不吃够本对不起报名费'
'可穿戴设备依赖症患者': '没有数据，你就不确定自己存在过'
'数据型焦虑症晚期': '配速就是尊严，尊严需要截图证明'
'自律表演艺术家': '不卷，但也不允许自己真的躺平'
```

**修改6：导出 DIMENSION_LABELS 供页面使用**

已包含在修改3中。

**修改7：getTypeMeta 返回 emoji**

```typescript
export function getTypeMeta(runnerType: string): { en: string; img: string; tagline: string; emoji: string } {
  const meta = TYPE_META[runnerType]
  return { en: meta?.en || '', img: meta?.img || '', tagline: meta?.tagline || '', emoji: meta?.emoji || '' }
}
```

- [ ] **Step 3: 删除旧的题库文件**

```bash
rm src/lib/questions-general.ts src/lib/questions-trail.ts
```

- [ ] **Step 4: Commit**

```bash
git add src/lib/types.ts src/lib/quiz.ts
git rm src/lib/questions-general.ts src/lib/questions-trail.ts
git commit -m "feat: rewrite scoring algorithm from H5, dynamic question pool, apply naming changes"
```

---

### Task 2: Setup WeChat Cloud Development

**Files:**
- Modify: `project.config.json`
- Modify: `src/app.ts`
- Modify: `src/lib/config.ts`

- [ ] **Step 1: Update project.config.json**

添加云函数根目录配置：

```json
{
  "cloudfunctionRoot": "cloud/",
  "miniprogramRoot": "dist/",
  ...existing config...
}
```

- [ ] **Step 2: Initialize cloud in app.ts**

```typescript
import { PropsWithChildren } from 'react'
import Taro from '@tarojs/taro'
import './app.scss'

function App({ children }: PropsWithChildren) {
  // 初始化云开发（仅在小程序环境）
  if (process.env.TARO_ENV === 'weapp') {
    Taro.cloud.init({
      env: 'YOUR_ENV_ID',  // 替换为实际的云环境ID
      traceUser: true,
    })
  }
  return children
}

export default App
```

> 注意：`YOUR_ENV_ID` 需要在微信开发者后台开通云开发后获取。

- [ ] **Step 3: Update config.ts**

```typescript
// CDN图片基础路径
const BASE = 'https://cdn.jsdelivr.net/gh/xavierli330/run-circle-sbti@main/code/public/characters'
export const characterImg = (id: string) => `${BASE}/${id}.png`

// 应用配置
export const APP_CONFIG = {
  questionPoolSize: 151,
  totalQuestions: 15,
  dimensions: 9,
  // 云开发环境ID（需要替换为实际值）
  cloudEnvId: 'YOUR_ENV_ID',
  // 题目缓存key和过期时间
  questionCacheKey: 'cached_questions',
  questionCacheTTL: 30 * 60 * 1000, // 30分钟
}
```

- [ ] **Step 4: Commit**

```bash
git add project.config.json src/app.ts src/lib/config.ts
git commit -m "feat: setup WeChat cloud development"
```

---

### Task 3: Cloud DB schema + seed function

**Files:**
- Create: `cloud/seedQuestions/index.js`
- Create: `cloud/seedQuestions/package.json`
- Create: `cloud/getQuizQuestions/index.js`
- Create: `cloud/getQuizQuestions/package.json`

**云数据库 `questions` 集合 schema：**

```json
{
  "_id": "A1",
  "dimension": "A1",
  "category": "general",
  "text": "题目文本",
  "options": [
    { "label": "A", "text": "选项A" },
    { "label": "B", "text": "选项B" },
    { "label": "C", "text": "选项C" },
    { "label": "D", "text": "选项D" }
  ],
  "isSoul": false,
  "isActive": true,
  "version": 1,
  "stats": {
    "shownCount": 0,
    "distribution": { "A": 0, "B": 0, "C": 0, "D": 0 }
  }
}
```

**关键约束：**
- `dimension` 必须是 A1-A5 或 B1-B4（直接参与评分计算）
- `options` 必须恰好4个，label 必须是 A/B/C/D（权重：A=4, B=3, C=2, D=1）
- `isActive` 控制是否出现在测试中
- `isSoul` 标记灵魂拷问题（UI层特殊展示）

- [ ] **Step 1: Create seed cloud function**

`cloud/seedQuestions/package.json`:
```json
{
  "name": "seedQuestions",
  "version": "1.0.0",
  "main": "index.js",
  "dependencies": {
    "wx-server-sdk": "~2.6.3"
  }
}
```

`cloud/seedQuestions/index.js`:
```javascript
const cloud = require('wx-server-sdk')
cloud.init({ env: cloud.DYNAMIC_CURRENT_ENV })
const db = cloud.database()

// 从H5题库转换而来的全部151道题
// 这里嵌入完整题目数据（从 code/src/lib/questions-general.ts + questions-trail.ts 转换）
const ALL_QUESTIONS = [
  // ... 完整的151道题数据（JSON数组）
  // 每条格式：{ _id, dimension, category, text, options, isSoul, isActive, version, stats }
]

exports.main = async (event) => {
  const results = { added: 0, updated: 0, errors: [] }

  for (const q of ALL_QUESTIONS) {
    try {
      // 使用 _id 作为文档ID，支持幂等导入
      await db.collection('questions')
        .doc(q._id)
        .set({ data: { ...q, stats: { shownCount: 0, distribution: { A: 0, B: 0, C: 0, D: 0 } } } })
      results.added++
    } catch (err) {
      results.errors.push({ id: q._id, error: err.message })
    }
  }

  return results
}
```

> 注意：`ALL_QUESTIONS` 数组需要从 H5 的 TypeScript 文件转换而来。见 Task 4 的 CSV 工具。

- [ ] **Step 2: Create getQuizQuestions cloud function**

`cloud/getQuizQuestions/package.json`:
```json
{
  "name": "getQuizQuestions",
  "version": "1.0.0",
  "main": "index.js",
  "dependencies": {
    "wx-server-sdk": "~2.6.3"
  }
}
```

`cloud/getQuizQuestions/index.js`:
```javascript
const cloud = require('wx-server-sdk')
cloud.init({ env: cloud.DYNAMIC_CURRENT_ENV })
const db = cloud.database()

exports.main = async (event) => {
  try {
    // 获取所有活跃题目
    const { data } = await db.collection('questions')
      .where({ isActive: true })
      .limit(200)  // 云DB单次最多100条，200足够
      .get()

    // 按维度分组返回
    const byDimension = {}
    for (const q of data) {
      if (!byDimension[q.dimension]) byDimension[q.dimension] = []
      byDimension[q.dimension].push(q)
    }

    return {
      success: true,
      questions: data,
      byDimension,
      totalCount: data.length,
      dimensionCounts: Object.fromEntries(
        Object.entries(byDimension).map(([k, v]) => [k, v.length])
      ),
    }
  } catch (err) {
    return { success: false, error: err.message, questions: [] }
  }
}
```

- [ ] **Step 3: Commit**

```bash
mkdir -p cloud/seedQuestions cloud/getQuizQuestions
git add cloud/ project.config.json
git commit -m "feat: add cloud functions for question seeding and fetching"
```

---

### Task 4: CSV tools for question management

**Files:**
- Create: `scripts/csv-tools.mjs`
- Create: `docs/question-schema.csv` (模板文件)

维护流程：
1. 从云控制台导出 → JSON文件
2. 运行 `node scripts/csv-tools.mjs json2csv` → 生成 CSV
3. 在 Excel 中编辑 CSV
4. 运行 `node scripts/csv-tools.mjs csv2json` → 生成 JSON
5. 从云控制台导入 JSON

CSV格式：

```csv
id,dimension,category,text,optionA,optionB,optionC,optionD,isSoul,isActive
A1,A1,general,"你为什么开始跑步？","因为想减肥","因为想变帅","因为别人都在跑","完全不记得了",false,true
```

- [ ] **Step 1: Create CSV tools script**

`scripts/csv-tools.mjs`:
```javascript
#!/usr/bin/env node

/**
 * 题库 CSV ↔ JSON 转换工具
 *
 * 用法：
 *   node scripts/csv-tools.mjs json2csv input.json output.csv
 *   node scripts/csv-tools.mjs csv2json input.csv output.json
 *   node scripts/csv-tools.mjs ts2csv ../code/src/lib/questions-general.ts ../code/src/lib/questions-trail.ts output.csv
 *
 * CSV格式：id,dimension,category,text,optionA,optionB,optionC,optionD,isSoul,isActive
 */

import { readFileSync, writeFileSync } from 'fs'
import { parse as csvParse, stringify as csvStringify } from 'csv-parse/sync'

const CSV_HEADERS = ['id', 'dimension', 'category', 'text', 'optionA', 'optionB', 'optionC', 'optionD', 'isSoul', 'isActive']

// JSON → CSV
function json2csv(inputPath, outputPath) {
  const raw = JSON.parse(readFileSync(inputPath, 'utf-8'))
  const questions = Array.isArray(raw) ? raw : raw.questions || []

  const rows = questions.map(q => ({
    id: q._id || q.id,
    dimension: q.dimension,
    category: q.category || 'general',
    text: q.text,
    optionA: q.options?.[0]?.text || q.optionA || '',
    optionB: q.options?.[1]?.text || q.optionB || '',
    optionC: q.options?.[2]?.text || q.optionC || '',
    optionD: q.options?.[3]?.text || q.optionD || '',
    isSoul: q.isSoul ? 'true' : 'false',
    isActive: q.isActive !== false ? 'true' : 'false',
  }))

  const csv = csvStringify(rows, { header: true, columns: CSV_HEADERS })
  writeFileSync(outputPath, csv)
  console.log(`✅ Converted ${rows.length} questions to CSV: ${outputPath}`)
}

// CSV → JSON (cloud DB import format)
function csv2json(inputPath, outputPath) {
  const raw = readFileSync(inputPath, 'utf-8')
  const rows = csvParse(raw, { columns: true, skip_empty_lines: true })

  const questions = rows.map(row => ({
    _id: row.id,
    dimension: row.dimension,
    category: row.category || 'general',
    text: row.text,
    options: [
      { label: 'A', text: row.optionA },
      { label: 'B', text: row.optionB },
      { label: 'C', text: row.optionC },
      { label: 'D', text: row.optionD },
    ],
    isSoul: row.isSoul === 'true',
    isActive: row.isActive !== 'false',
    version: 1,
    stats: { shownCount: 0, distribution: { A: 0, B: 0, C: 0, D: 0 } },
  }))

  // 验证
  const validDims = new Set(['A1','A2','A3','A4','A5','B1','B2','B3','B4'])
  const errors = []
  for (const q of questions) {
    if (!validDims.has(q.dimension)) errors.push(`  ❌ ${q._id}: invalid dimension "${q.dimension}"`)
    if (q.options.some(o => !o.text)) errors.push(`  ❌ ${q._id}: missing option text`)
  }

  if (errors.length) {
    console.error('Validation errors:')
    errors.forEach(e => console.error(e))
    process.exit(1)
  }

  writeFileSync(outputPath, JSON.stringify(questions, null, 2))
  console.log(`✅ Converted ${questions.length} questions to JSON: ${outputPath}`)
}

// TypeScript question files → CSV (one-time migration from H5)
function ts2csv(generalPath, trailPath, outputPath) {
  // 使用正则从TS文件提取题目数据
  // 因为TS文件导出的是数组，我们需要解析它们
  // 更简单的方式：直接用Node.js import ts文件（需要ts-node）

  console.log('ℹ️  For H5 TS → CSV conversion, run:')
  console.log(`   npx ts-node -e "`)
  console.log(`     const g = require('${generalPath}');`)
  console.log(`     const t = require('${trailPath}');`)
  console.log(`     console.log(JSON.stringify([...g.generalQuestions, ...t.trailQuestions]))`)
  console.log(`   " > /tmp/questions.json`)
  console.log(`   Then: node scripts/csv-tools.mjs json2csv /tmp/questions.json ${outputPath}`)
}

// CLI
const [command, ...args] = process.argv.slice(2)
switch (command) {
  case 'json2csv': json2csv(args[0], args[1]); break
  case 'csv2json': csv2json(args[0], args[1]); break
  case 'ts2csv': ts2csv(args[0], args[1], args[2]); break
  default:
    console.log('Usage:')
    console.log('  node scripts/csv-tools.mjs json2csv <input.json> <output.csv>')
    console.log('  node scripts/csv-tools.mjs csv2json <input.csv> <output.json>')
    console.log('  node scripts/csv-tools.mjs ts2csv <general.ts> <trail.ts> <output.csv>')
}
```

- [ ] **Step 2: Create CSV template**

`docs/question-schema.csv`:
```csv
id,dimension,category,text,optionA,optionB,optionC,optionD,isSoul,isActive
A1,A1,general,"题目示例：你为什么开始跑步？","因为想减肥","因为想变帅","因为别人都在跑","完全不记得了",false,true
B1,B1,trail,"题目示例：第一次越野跑你的感受？","还想再来","再也不来了","还好没死","什么是越野跑？",false,true
```

- [ ] **Step 3: Commit**

```bash
mkdir -p scripts docs
git add scripts/csv-tools.mjs docs/question-schema.csv
git commit -m "feat: add CSV tools for question management"
```

---

### Task 5: Cloud DB access layer (cloud.ts)

**Files:**
- Create: `src/lib/cloud.ts`

封装云数据库操作，供小程序调用。包含题目获取、本地缓存、降级策略。

- [ ] **Step 1: Create cloud.ts**

```typescript
import Taro from '@tarojs/taro'
import { Question } from './types'
import { APP_CONFIG } from './config'

interface CloudQuestion {
  _id: string
  dimension: string
  category: string
  text: string
  options: { label: string; text: string }[]
  isSoul: boolean
  isActive: boolean
  version?: number
  stats?: { shownCount: number; distribution: Record<string, number> }
}

/** 从云数据库获取所有活跃题目（带缓存） */
export async function fetchQuestions(): Promise<Question[]> {
  // 1. 检查本地缓存
  const cached = Taro.getStorageSync(APP_CONFIG.questionCacheKey)
  const cacheTime = Taro.getStorageSync(APP_CONFIG.questionCacheKey + '_time')

  if (cached && cacheTime) {
    const age = Date.now() - cacheTime
    if (age < APP_CONFIG.questionCacheTTL) {
      console.log(`Using cached questions (${cached.length} questions, ${Math.round(age / 60000)}min old)`)
      return cached
    }
  }

  // 2. 从云数据库获取
  try {
    const res = await Taro.cloud.callFunction({
      name: 'getQuizQuestions',
    })

    const data = res.result as { success: boolean; questions: CloudQuestion[]; error?: string }

    if (data.success && data.questions?.length > 0) {
      // 转换为 Question 格式
      const questions: Question[] = data.questions.map(q => ({
        id: q._id,
        dimension: q.dimension,
        text: q.text,
        options: q.options,
        isSoul: q.isSoul,
      }))

      // 写入缓存
      Taro.setStorageSync(APP_CONFIG.questionCacheKey, questions)
      Taro.setStorageSync(APP_CONFIG.questionCacheKey + '_time', Date.now())

      console.log(`Fetched ${questions.length} questions from cloud DB`)
      return questions
    } else {
      console.warn('Cloud fetch failed:', data.error)
    }
  } catch (err) {
    console.warn('Cloud function error:', err)
  }

  // 3. 降级：尝试使用过期缓存
  if (cached?.length > 0) {
    console.log('Falling back to expired cache')
    return cached
  }

  // 4. 无数据可用
  console.error('No questions available')
  return []
}

/** 清除题目缓存（管理用） */
export function clearQuestionCache() {
  Taro.removeStorageSync(APP_CONFIG.questionCacheKey)
  Taro.removeStorageSync(APP_CONFIG.questionCacheKey + '_time')
}
```

- [ ] **Step 2: Commit**

```bash
git add src/lib/cloud.ts
git commit -m "feat: add cloud DB access layer with caching and fallback"
```

---

### Task 6: Update quiz page for dynamic questions

**Files:**
- Modify: `src/pages/index/index.tsx`
- Modify: `src/pages/quiz/index.tsx`

- [ ] **Step 1: Update start page to pre-fetch questions**

在 `src/pages/index/index.tsx` 中，将 `startQuiz` 改为异步：

```typescript
import { useState } from 'react'
import { View, Text, Input, Button } from '@tarojs/components'
import Taro from '@tarojs/taro'
import { generateQuiz } from '@/lib/quiz'
import { fetchQuestions } from '@/lib/cloud'
import './index.scss'

export default function Index() {
  const [nameInput, setNameInput] = useState('')
  const [loading, setLoading] = useState(false)

  const startQuiz = async () => {
    setLoading(true)
    try {
      const name = nameInput.trim() || '匿名跑者'
      const allQuestions = await fetchQuestions()

      if (allQuestions.length === 0) {
        Taro.showToast({ title: '题目加载失败，请检查网络', icon: 'none' })
        return
      }

      const quiz = generateQuiz(allQuestions)
      Taro.setStorageSync('quizState', {
        userName: name,
        questions: quiz.questions,
      })
      Taro.navigateTo({ url: '/pages/quiz/index' })
    } finally {
      setLoading(false)
    }
  }

  return (
    <View className='start-screen'>
      <View className='start-badge'>跑圈专属测试</View>
      <Text className='start-title'>
        跑圈<Text className='highlight'>SBTI</Text>
      </Text>
      <Text className='start-subtitle'>你是哪种跑者？</Text>
      <Text className='start-desc'>
        每次随机15题{'\n'}
        4个宏观维度，拷问灵魂深处{'\n'}
        24种跑步人格等你解锁
      </Text>

      <View className='name-input-wrap'>
        <Input
          className='name-input'
          type='text'
          placeholder='怎么称呼你？（可选）'
          placeholderClass='name-input-placeholder'
          value={nameInput}
          onInput={e => setNameInput(e.detail.value)}
          maxlength={20}
        />
      </View>

      <Button className='start-btn' onClick={startQuiz} disabled={loading}>
        {loading ? '加载中...' : '90秒测出你的跑步人格'}
      </Button>
    </View>
  )
}
```

- [ ] **Step 2: Update quiz page - add phase labels + unified imports**

在 `src/pages/quiz/index.tsx` 中：

1. 删除文件顶部的 `DIMENSION_LABELS` 常量
2. 改为 `import { DIMENSION_LABELS } from '@/lib/quiz'`
3. 添加阶段文案：

```typescript
const getPhaseLabel = (current: number, total: number): string => {
  const ratio = current / total
  if (ratio <= 0.2) return '还在热身，心率还没上来'
  if (ratio <= 0.47) return '进入巡航配速，有点感觉了'
  if (ratio <= 0.73) return '撞墙期快到了，坚持住'
  return '最后冲刺，马上看到终点'
}
```

4. 在 `question-progress` 后添加：

```tsx
<Text className='question-phase'>{getPhaseLabel(currentIndex, questions.length)}</Text>
```

5. 为灵魂题添加视觉标记：

```tsx
<View className={`question-body ${currentQuestion.isSoul ? 'soul-question' : ''}`}>
  <Text className='question-text'>{currentQuestion.text}</Text>
  {currentQuestion.isSoul && <Text className='soul-badge'>灵魂拷问</Text>}
</View>
```

- [ ] **Step 3: Commit**

```bash
git add src/pages/index/index.tsx src/pages/quiz/index.tsx
git commit -m "feat: dynamic question loading from cloud DB, phase labels, soul question badge"
```

---

### Task 7: Update result page

**Files:**
- Modify: `src/pages/result/index.tsx`
- Modify: `src/pages/result/index.scss`

- [ ] **Step 1: Update imports and add theme colors**

```typescript
import { useState, useMemo } from 'react'
import { View, Text, Image, Button } from '@tarojs/components'
import Taro from '@tarojs/taro'
import { getTypeMeta, getRaceRecommendations, DIMENSION_LABELS } from '@/lib/quiz'
import { characterImg } from '@/lib/config'
import './index.scss'

const DOMINANT_COLORS: Record<string, string> = {
  drive: '#E63946',
  social: '#F4A261',
  obsession: '#7B2CBF',
  wildness: '#2A9D8F',
}

const DIMENSION_COLORS: Record<string, string> = {
  A1: '#E63946', A2: '#F4A261', A3: '#2A9D8F',
  A4: '#7B2CBF', A5: '#457B9D',
  B1: '#6A994E', B2: '#BC4749', B3: '#E9C46A', B4: '#264653',
}
```

- [ ] **Step 2: Update result destructuring**

```typescript
const {
  userName, runnerType, runnerTypeEn, runnerImg, tagline,
  eggSymbols, isHiddenType, dimensionScores,
  roast, hype, action, cpMatch, worstCpMatch,
  verdict, profile, emoji, dominantDim, macroScores,
} = result
```

- [ ] **Step 3: Add emoji, profile, verdict sections to JSX**

In the `hero-section`, after avatar:
```tsx
{emoji && <Text className='hero-emoji'>{emoji}</Text>}
```

After `hero-section`, before `result-roast`:
```tsx
{profile && (
  <View className='result-profile'>
    <Text className='profile-label'>人格解读</Text>
    <Text className='profile-text'>{profile}</Text>
  </View>
)}
```

After `result-roast`:
```tsx
{verdict && (
  <View className='result-verdict'>
    <Text className='verdict-label'>判定依据</Text>
    <View className='verdict-tags'>
      {verdict.split('；').map((clause: string, i: number) => (
        <Text key={i} className='verdict-tag'>{clause}</Text>
      ))}
    </View>
  </View>
)}
```

- [ ] **Step 4: Add theme class to root View**

```tsx
<View className={`result-screen ${isHiddenType ? 'hidden-mode' : ''} theme-${dominantDim || 'drive'}`}>
```

- [ ] **Step 5: Add copy text button**

```typescript
const copyShareText = () => {
  const text = `我是${runnerType}！「${tagline}」\n${roast}\n测测你是哪种跑者 → 跑圈SBTI`
  Taro.setClipboardData({ data: text })
}
```

In actions area, before share button:
```tsx
<Button className='result-btn-copy' onClick={copyShareText}>
  复制文案
</Button>
```

- [ ] **Step 6: Add styles in index.scss**

```scss
.hero-emoji { font-size: 48px; margin-bottom: 8px; }

.result-profile {
  margin: 24px; padding: 24px;
  background: #FFFFFF; border-radius: 16px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.06);
}
.profile-label { font-size: 24px; color: #64748B; margin-bottom: 12px; display: block; }
.profile-text { font-size: 28px; color: #1E293B; line-height: 1.6; }

.result-verdict {
  margin: 24px; padding: 24px;
  background: #F8FAFC; border-radius: 16px;
  border: 1px solid #E2E8F0;
}
.verdict-label { font-size: 24px; color: #64748B; margin-bottom: 12px; display: block; }
.verdict-tags { display: flex; flex-wrap: wrap; gap: 12px; }
.verdict-tag {
  font-size: 22px; color: #7B2CBF;
  background: rgba(123, 44, 191, 0.08);
  padding: 8px 16px; border-radius: 8px;
}

.theme-drive .hero-section { background: linear-gradient(135deg, #FEE2E2, #FFF); }
.theme-social .hero-section { background: linear-gradient(135deg, #FEF3C7, #FFF); }
.theme-obsession .hero-section { background: linear-gradient(135deg, #F3E8FF, #FFF); }
.theme-wildness .hero-section { background: linear-gradient(135deg, #CCFBF1, #FFF); }

.result-btn-copy {
  width: 100%; height: 88px; font-size: 30px;
  border-radius: 16px; background: #F1F5F9;
  color: #475569; border: none; margin-bottom: 16px;
}
```

- [ ] **Step 7: Commit**

```bash
git add src/pages/result/index.tsx src/pages/result/index.scss
git commit -m "feat: add verdict, profile, emoji, theme colors, copy button to result page"
```

---

### Task 8: Add quiz page styles

**Files:**
- Modify: `src/pages/quiz/index.scss`

- [ ] **Step 1: Add phase label and soul question styles**

```scss
.question-phase {
  font-size: 24px;
  color: #94A3B8;
  margin-top: 8px;
}

.soul-question {
  padding: 24px;
  margin: 20px 0;
  background: rgba(139, 92, 246, 0.05);
  border-left: 6px solid #8B5CF6;
  border-radius: 8px;
}

.soul-badge {
  display: inline-block;
  font-size: 20px;
  color: #8B5CF6;
  background: rgba(139, 92, 246, 0.1);
  padding: 4px 12px;
  border-radius: 4px;
  margin-top: 12px;
}
```

- [ ] **Step 2: Commit**

```bash
git add src/pages/quiz/index.scss
git commit -m "feat: add phase label and soul question styles"
```

---

### Task 9: Seed cloud database with H5 questions

**Files:** None (operational task)

- [ ] **Step 1: 将H5题库转换为种子数据**

在 `cloud/seedQuestions/index.js` 中的 `ALL_QUESTIONS` 数组需要包含完整的151道题。

转换方法：
1. 从 `code/src/lib/questions-general.ts` 和 `code/src/lib/questions-trail.ts` 中提取题目数据
2. 转换为 cloud DB 文档格式（添加 `_id`, `category`, `isActive`, `version`, `stats`）
3. 嵌入到 seed function 中

或者使用 CSV 工具：
```bash
# 先手动将TS题库转为JSON，然后转换为CSV，编辑后转为JSON
node scripts/csv-tools.mjs json2csv /tmp/questions.json docs/questions.csv
```

- [ ] **Step 2: 部署并运行seed函数**

在微信开发者工具中：
1. 右键 `cloud/seedQuestions` → "上传并部署"
2. 在云开发控制台 → 云函数 → 手动调用 `seedQuestions`
3. 验证 `questions` 集合中数据是否正确（应有151条）

- [ ] **Step 3: 验证 getQuizQuestions**

在云开发控制台 → 云函数 → 测试调用 `getQuizQuestions`，确认返回所有活跃题目。

---

### Task 10: Verify build and test

**Files:** None (verification only)

- [ ] **Step 1: 运行 Taro 构建**

```bash
npm run build:weapp
```

Expected: Build succeeds, `dist/` output is generated

- [ ] **Step 2: 在微信开发者工具中端到端测试**

验证清单：
1. [ ] 首页显示 "每次随机15题" + "90秒测出你的跑步人格"
2. [ ] 点击开始 → 从云DB加载题目（检查控制台日志）
3. [ ] 答题页显示阶段文案（"还在热身" → "进入巡航" → "撞墙期" → "最后冲刺"）
4. [ ] 灵魂题有紫色左边框 + "灵魂拷问" 标签
5. [ ] 结果页显示：emoji、人格名（新命名）、tagline、人格解读、roast、判词、主题色
6. [ ] CP匹配显示完整描述段落
7. [ ] 比赛推荐正常显示
8. [ ] 复制文案功能正常
9. [ ] 分享功能正常
10. [ ] 隐藏人格（8个D）仍然生效，显示暗色模式
11. [ ] 题目缓存生效（第二次开始无需重新加载）

- [ ] **Step 3: Final commit**

```bash
git add -A
git commit -m "feat: complete cloud DB + H5 sync + optimization plan v1 for miniprogram"
```

---

## Question Maintenance Workflow (操作手册)

### 日常维护

```
1. 导出题库
   → 微信云开发控制台 → 数据库 → questions 集合 → 导出 JSON

2. 转为CSV编辑
   → node scripts/csv-tools.mjs json2csv export.json questions.csv

3. 在Excel中编辑
   → 修改题目文本、选项、维度、灵魂题标记、启用状态
   → ⚠️ dimension 只能是 A1-A5, B1-B4（影响评分）
   → ⚠️ 必须保持4个选项 A/B/C/D

4. 转回JSON导入
   → node scripts/csv-tools.mjs csv2json questions.csv import.json
   → 微信云开发控制台 → 数据库 → 导入 JSON（覆盖模式）

5. 清除小程序缓存
   → 重新打开小程序即可（30分钟缓存过期）
```

### 评分影响说明

```
题目 → 选项权重(A=4,B=3,C=2,D=1) → 维度得分(0-100)
维度得分 → 宏观维度:
  drive = (A1 + A5) / 2        斗志
  social = A2                  社交
  obsession = (A3 + A4) / 2    执念
  wildness = (B1+B2+B3+B4) / 4 野性

宏观维度 → 人格判定:
  特殊覆盖(8种极端模式) + 4位二进制表(16种基础类型) = 24种人格
```

改题时的注意事项：
- **改选项文本**：不影响评分（安全）
- **改 isSoul**：只影响UI展示（安全）
- **改 dimension**：直接影响评分链路（需谨慎）
- **新增维度**：需要同步修改 `DIMENSION_CONFIG` 和 `calcMacroScores`（需发版）
- **禁用题目**：设置 `isActive: false`（安全，自动跳过）

---

## Post-Plan Notes

### 后续计划
1. **Canvas海报生成** - 带判词+二维码的分享海报
2. **答题数据收集** - `quiz_results` + `daily_stats` 云DB集合
3. **题目维度重构** - 优化方案的6维度(D1-D6)，需要重写评分算法
4. **剩余15种人格重命名** - 优化方案仅提供9种
5. **答题动画** - 选中反馈、震动、连续选A检测
