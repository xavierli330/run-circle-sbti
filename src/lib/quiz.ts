import { Question, Answer, TagResult } from './types'
import { generalQuestions } from './questions-general'
import { trailQuestions } from './questions-trail'

// 24种跑步人格：独立名字，类似MBTI风格
const RUNNER_TYPES = [
  '独行侠', '完赛怪', '拍照精', '撞墙王',           // 1-4
  '号码布收藏家', '补给站流浪者', 'Garmin信徒', 'Keep原住民',  // 5-8
  '跑团团长', '赛道天气预报员', '装备极简主义者', '装备焦虑者',  // 9-12
  '素人跑者', '赛博跑者', '精神完赛者', '回归初心型',  // 13-16
  '爬山遇难型', '自补给大师', '散步跑者', 'DNF重生者',  // 17-20
  '打工人跑者', '刷脂战士', '佛系跑者', '卷王',        // 21-24
]

// 类型元数据：关键词 + 英文名 + 图片ID + 适合的搭子类型
const TYPE_META: Record<string, { keywords: string[]; en: string; img: string; tagline: string; cpTypes: string[]; worstTypes: string[]; roast: string; hype: string; action: string }> = {
  '独行侠': {
    keywords: ['一个人跑', '自由', '晨跑'],
    en: 'Lone Wolf', img: 'lone_wolf',
    tagline: '一个人跑，才是真正的自由',
    cpTypes: ['跑团团长', '拍照精'],
    worstTypes: ['跑团团长', '补给站流浪者'],
    roast: '你一个人跑得很爽，但你的跑步故事只有你自己知道。',
    hype: '下一个目标是：完成一次让所有人闭嘴的成绩，然后继续一个人跑。',
    action: '下次约一个陌生人一起跑，体验一下社交跑'
  },
  '完赛怪': {
    keywords: ['完赛', '奖牌', '报名费'], en: 'Medal Freak', img: 'medal_freak',
    tagline: '不跑完不配叫报名',
    cpTypes: ['佛系跑者', '拍照精'],
    worstTypes: ['精神完赛者', '散步跑者'],
    roast: '你收集奖牌的速度，比你跑步进步的速度快多了。',
    hype: '下一块奖牌，应该是你用成绩换来的，不只是报名费。',
    action: '现在去报名下一场比赛，早鸟价倒计时XX天'
  },
  '拍照精': {
    keywords: ['构图', '朋友圈', '颜值'], en: 'Shot Hunter', img: 'shot_hunter',
    tagline: '没拍等于没跑',
    cpTypes: ['完赛怪', '跑团团长'],
    worstTypes: ['卷王', '独行侠'],
    roast: '你的跑步相册比你的跑步记录更丰富。',
    hype: '下一次，奖牌和照片一起拿，让成绩说话。',
    action: '这次跑完，发一条不带截图的成绩图'
  },
  '撞墙王': {
    keywords: ['撞墙', '步行', '咬牙'], en: 'Wall Hugger', img: 'wall_hugger',
    tagline: '30公里，一切才刚开始',
    cpTypes: ['自补给大师', 'DNF重生者'],
    worstTypes: ['卷王', '赛博跑者'],
    roast: '你在30公里就开始走路，但你在35公里还在坚持。',
    hype: '过了撞墙期，你会发现自己比想象中更强。',
    action: '下次比赛，到30公里时告诉自己：还没到极限'
  },
  '号码布收藏家': {
    keywords: ['押金', 'DNS', '抽屉奖牌'], en: 'Bib Hoarder', img: 'bib_hoarder',
    tagline: '报名的那一刻最快乐',
    cpTypes: ['完赛怪', '跑团团长'],
    worstTypes: ['DNF重生者', '卷王'],
    roast: '你抽屉里的号码布比你跑过的步还多。',
    hype: '下次去跑一场，把押金跑回来。',
    action: '翻开抽屉，找一块号码布去参赛'
  },
  '补给站流浪者': {
    keywords: ['吃的', '补给站', '研究'], en: 'Snack Nomad', img: 'snack_nomad',
    tagline: '补给站才是赛道精华',
    cpTypes: ['撞墙王', '散步跑者'],
    worstTypes: ['独行侠', '装备极简主义者'],
    roast: '你是来跑步的还是来吃流水席的？',
    hype: '补给站是途中的风景，终点才是目的地。',
    action: '下次进补给站前先跑够3公里再说'
  },
  'Garmin信徒': {
    keywords: ['手表', '数据', 'VO2max'], en: 'Data Cultist', img: 'data_cultist',
    tagline: '数据不会说谎，但身体会',
    cpTypes: ['赛博跑者', '卷王'],
    worstTypes: ['佛系跑者', '散步跑者'],
    roast: '你的手表比你更了解你的跑步。',
    hype: '有一天，你应该相信自己的感觉，而不只是看数据。',
    action: '今天跑步不带手表，用身体记住感觉'
  },
  'Keep原住民': {
    keywords: ['跟练', '室内', '云跑步'], en: 'Couch Runner', img: 'couch_runner',
    tagline: '精神跑完就是跑完',
    cpTypes: ['佛系跑者', '精神完赛者'],
    worstTypes: ['卷王', '打工人跑者'],
    roast: '你在Keep上跑过就算跑了，奖牌收到就算完了。',
    hype: '真正的赛道在外面，不在手机里。',
    action: '今天出门跑一次，哪怕只有1公里'
  },
  '跑团团长': {
    keywords: ['组织', '约跑', '操心'], en: 'Pack Leader', img: 'pack_leader',
    tagline: '一个人可以跑得快，一群人才能跑得远',
    cpTypes: ['独行侠', '拍照精'],
    worstTypes: ['独行侠', '装备极简主义者'],
    roast: '你每周组织约跑，但自己成绩反而下降了。',
    hype: '你领导了一群人跑步，但这群人也在领导你。',
    action: '这次约跑设定一个配速目标，不能光顾着聊天'
  },
  '赛道天气预报员': {
    keywords: ['预报', '焦虑', '装备'], en: 'Weather Nerd', img: 'weather_nerd',
    tagline: '看三天预报再决定出门',
    cpTypes: ['装备极简主义者', '爬山遇难型'],
    worstTypes: ['独行侠', '佛系跑者'],
    roast: '你每天看三次天气预报，但跑不跑还是看心情。',
    hype: '天气是你跑步的一部分，不是你跑步的借口。',
    action: '不管天气如何，今天穿好装备出门'
  },
  '装备极简主义者': {
    keywords: ['轻量化', '能不带', '精简'], en: 'Gear Monk', img: 'gear_monk',
    tagline: '能不带的坚决不带',
    cpTypes: ['自补给大师', '独行侠'],
    worstTypes: ['装备焦虑者', '赛道天气预报员'],
    roast: '你的越野包里只有水袋和手机，连防晒都不带——然后你晒伤了。',
    hype: '极简是能力，不是抠门。下次带上防晒。',
    action: '下次比赛前，检查一下强制装备'
  },
  '装备焦虑者': {
    keywords: ['换装', '买鞋', '背包'], en: 'Gear Panic', img: 'gear_panic',
    tagline: '装备买齐了，人没齐',
    cpTypes: ['Garmin信徒', '赛博跑者'],
    worstTypes: ['装备极简主义者', '佛系跑者'],
    roast: '比赛前一晚你换了三次装备，但成绩还是上不去。',
    hype: '装备重要，但更重要的是你的腿。',
    action: '这次比赛就用现有装备，不买了'
  },
  '素人跑者': {
    keywords: ['无故事', '跑量', '沉淀'], en: 'Ghost Runner', img: 'ghost_runner',
    tagline: '跑了五年，从不发朋友圈',
    cpTypes: ['回归初心型', '佛系跑者'],
    worstTypes: ['拍照精', '赛博跑者'],
    roast: '你跑了5年，没参加过任何比赛，但你还在跑。',
    hype: '有时候，没有故事就是最好的故事。',
    action: '去报一场比赛，体验一下赛道的兴奋感'
  },
  '赛博跑者': {
    keywords: ['数据', '分析', '排名'], en: 'Cyber Runner', img: 'cyber_runner',
    tagline: '先用Strava签到，再开跑',
    cpTypes: ['Garmin信徒', '卷王'],
    worstTypes: ['佛系跑者', '素人跑者'],
    roast: 'VO2max涨了2点，比突破PB还开心。',
    hype: '数据是参考，不是定义。你比你手表里的数字更有料。',
    action: '这次跑步结束后，不要看数据，直接发朋友圈'
  },
  '精神完赛者': {
    keywords: ['精神', '躺平', '云跑'], en: 'Soul Finisher', img: 'soul_finisher',
    tagline: '躺完也是完赛',
    cpTypes: ['Keep原住民', '佛系跑者'],
    worstTypes: ['卷王', '打工人跑者'],
    roast: '你躺在床上看直播，感觉自己也在赛道上。',
    hype: '有一天你会站在赛道上，而不是屏幕前。',
    action: '今天不躺着，出去跑一圈'
  },
  '回归初心型': {
    keywords: ['当年', '初心', '新人'], en: 'Day One', img: 'day_one',
    tagline: '还记得你第一次跑的感觉吗',
    cpTypes: ['素人跑者', '撞墙王'],
    worstTypes: ['赛博跑者', '卷王'],
    roast: '你总说现在比赛越来越没意思，但其实是你越来越挑剔了。',
    hype: '下一场比赛，找回第一次站在起点时的感觉。',
    action: '约一个新手一起跑'
  },
  '爬山遇难型': {
    keywords: ['坡', '下山', '崩溃'], en: 'Hill Victim', img: 'hill_victim',
    tagline: '上坡怀疑人生，下坡感谢活着',
    cpTypes: ['散步跑者', '补给站流浪者'],
    worstTypes: ['自补给大师', '卷王'],
    roast: '你遇到大坡就开始怀疑人生，下山就像渡劫。',
    hype: '爬坡是越野跑的必修课，过了就是升级。',
    action: '下次遇到爬坡路段，降低重心，小步快跑'
  },
  '自补给大师': {
    keywords: ['能量胶', '盐丸', '自给自足'], en: 'DIY Fuel', img: 'diy_fuel',
    tagline: '我的背包就是移动补给站',
    cpTypes: ['撞墙王', '完赛怪'],
    worstTypes: ['补给站流浪者', '散步跑者'],
    roast: '你背包里永远是能量胶和盐丸，但你进补给站的时候还是忍不住拿了西瓜。',
    hype: '自补给是你的超能力，但偶尔享受补给站的美食也是应得的。',
    action: '下次进补给站，试试当地特色补给'
  },
  '散步跑者': {
    keywords: ['健走', '休闲', '完赛'], en: 'Slow Mo', img: 'slow_mo',
    tagline: '完赛就行，配速随缘',
    cpTypes: ['撞墙王', '补给站流浪者'],
    worstTypes: ['卷王', '打工人跑者'],
    roast: '马拉松走了30公里，但完赛了——这也算是一种本事。',
    hype: '走也是一种前进，只要你还在路上。',
    action: '下次试着在30公里后保持跑步，不要走'
  },
  'DNF重生者': {
    keywords: ['退赛', '战略性', '下次'], en: 'DNF Phoenix', img: 'dnf_phoenix',
    tagline: '退赛不是终点，是序章',
    cpTypes: ['撞墙王', '完赛怪'],
    worstTypes: ['完赛怪', '号码布收藏家'],
    roast: '退赛不是失败，但你的朋友圈好像从来不提这个。',
    hype: '下一次，站在终点给DNF写个续集。',
    action: '报名一场之前退过的比赛'
  },
  '打工人跑者': {
    keywords: ['早起', '挤时间', '效率'], en: '5AM Warrior', img: '5am_warrior',
    tagline: '5点起床跑步，8点打卡上班',
    cpTypes: ['卷王', '赛博跑者'],
    worstTypes: ['精神完赛者', '佛系跑者'],
    roast: '每天5点起床跑步，8点已经到工位——然后你在工位上睡着了。',
    hype: '跑步让你更有精力，但不是让你少睡觉的理由。',
    action: '周末早起跑个长距离，你会发现周一更有精力'
  },
  '刷脂战士': {
    keywords: ['火锅', '跑完吃', '燃烧'], en: 'Buffet Warrior', img: 'buffet_warrior',
    tagline: '跑步是为了吃得心安理得',
    cpTypes: ['补给站流浪者', '散步跑者'],
    worstTypes: ['Garmin信徒', '自补给大师'],
    roast: '你跑步是为了吃更多火锅，跑完去吃，这就是你跑步的意义。',
    hype: '跑步和美食都是生活的一部分，不是手段和目的。',
    action: '这次跑完，等10分钟再吃，让身体先消化一下'
  },
  '佛系跑者': {
    keywords: ['看心情', '不卷', '享受'], en: 'Zen Runner', img: 'zen_runner',
    tagline: '跑不跑看心情，跑多远看缘分',
    cpTypes: ['独行侠', '散步跑者'],
    worstTypes: ['卷王', '打工人跑者'],
    roast: '你说跑步看心情，但你的心情好像很少想跑步。',
    hype: '偶尔认真跑一次，你会发现原来自己可以。',
    action: '今天不想跑？先穿上鞋出门，走也行'
  },
  '卷王': {
    keywords: ['配速', 'PB', '排名'], en: 'PB Tyrant', img: 'pb_tyrant',
    tagline: '配速就是尊严',
    cpTypes: ['佛系跑者', '散步跑者'],
    worstTypes: ['佛系跑者', '精神完赛者'],
    roast: '你在跟自己的配速较劲，但跑步的本质不是数字。',
    hype: '当你不再追求pb，pb反而会来找你。',
    action: '这次不查配速，只感受身体，结束后再看数据'
  },
}

// 获取角色元数据（英文名+图片ID+标语）
export function getTypeMeta(runnerType: string): { en: string; img: string; tagline: string } {
  const meta = TYPE_META[runnerType]
  return { en: meta?.en || '', img: meta?.img || '', tagline: meta?.tagline || '' }
}

// 维度 → 每维度抽取题数配置
const DIMENSION_CONFIG: Record<string, number> = {
  A1: 4, A2: 4, A3: 4, A4: 4, A5: 4,
  B1: 3, B2: 3, B3: 3, B4: 3,
}

const DIMENSION_LABELS: Record<string, string> = {
  A1: '跑步身份', A2: '赛道行为', A3: '装备执念',
  A4: '灵魂深处', A5: '跑步哲学',
  B1: '山野态度', B2: '补给策略', B3: '装备取舍', B4: '完赛心态',
}

// 随机打乱数组
function shuffle<T>(arr: T[]): T[] {
  const a = [...arr]
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[a[i], a[j]] = [a[j], a[i]]
  }
  return a
}

// 按维度分组题目
function groupByDimension(questions: Question[]) {
  const groups: Record<string, Question[]> = {}
  for (const q of questions) {
    if (!groups[q.dimension]) groups[q.dimension] = []
    groups[q.dimension].push(q)
  }
  return groups
}

// 核心：随机抽题算法（已修复重复问题）
export function generateQuiz() {
  const allQuestions = [...generalQuestions, ...trailQuestions]
  const byDimension = groupByDimension(allQuestions)
  const selectedIds = new Set<string>()
  const selectedQuestions: Question[] = []
  const dimensionCounts: Record<string, number> = {}

  const aDimensions = ['A1', 'A2', 'A3', 'A4', 'A5']
  const bDimensions = ['B1', 'B2', 'B3', 'B4']

  for (const dim of aDimensions) {
    const count = DIMENSION_CONFIG[dim] || 4
    const pool = byDimension[dim] || []
    const shuffled = shuffle(pool)
    let picked = 0
    for (const q of shuffled) {
      if (picked >= count) break
      if (!selectedIds.has(q.id)) {
        selectedQuestions.push(q)
        selectedIds.add(q.id)
        picked++
      }
    }
    dimensionCounts[dim] = picked
  }

  for (const dim of bDimensions) {
    const count = DIMENSION_CONFIG[dim] || 3
    const pool = byDimension[dim] || []
    const shuffled = shuffle(pool)
    let picked = 0
    for (const q of shuffled) {
      if (picked >= count) break
      if (!selectedIds.has(q.id)) {
        selectedQuestions.push(q)
        selectedIds.add(q.id)
        picked++
      }
    }
    dimensionCounts[dim] = picked
  }

  const finalShuffled = shuffle(selectedQuestions)

  return {
    questions: finalShuffled,
    dimensionCounts,
  }
}

// 计算维度得分（0-100）
function calcDimensionScore(answers: Answer[], dimension: string): number {
  const dimAns = answers.filter(a => a.dimension === dimension)
  if (dimAns.length === 0) return 0
  // A=4分, B=3分, C=2分, D=1分
  const scoreMap: Record<string, number> = { A: 4, B: 3, C: 2, D: 1 }
  const total = dimAns.reduce((sum, a) => sum + (scoreMap[a.optionLabel] || 2), 0)
  const max = dimAns.length * 4
  const base = Math.round((total / max) * 100)
  const jitter = Math.floor(Math.random() * 9) - 4
  return Math.min(100, Math.max(5, base + jitter))
}

// 行为画像：从答案中提取可追溯的行为特征
interface BehaviorProfile {
  aA: number; aB: number; aC: number; aD: number  // A类题各选项计数
  bA: number; bB: number; bC: number; bD: number  // B类题各选项计数
  totalD: number       // D选项总数（摆烂指数）
  topDim: string       // 最高维度
  bottomDim: string    // 最低维度
  dominant: 'A' | 'B' | 'C' | 'D'  // 最常选的选项
  patterns: string[]   // 识别到的行为模式标签
}

function buildProfile(answers: Answer[], dimensionScores: Record<string, number>): BehaviorProfile {
  const aAns = answers.filter(a => a.dimension[0] === 'A')
  const bAns = answers.filter(a => a.dimension[0] === 'B')

  const aA = aAns.filter(a => a.optionLabel === 'A').length
  const aB = aAns.filter(a => a.optionLabel === 'B').length
  const aC = aAns.filter(a => a.optionLabel === 'C').length
  const aD = aAns.filter(a => a.optionLabel === 'D').length
  const bA = bAns.filter(a => a.optionLabel === 'A').length
  const bB = bAns.filter(a => a.optionLabel === 'B').length
  const bC = bAns.filter(a => a.optionLabel === 'C').length
  const bD = bAns.filter(a => a.optionLabel === 'D').length
  const totalD = answers.filter(a => a.optionLabel === 'D').length

  // 找最高/最低维度
  const dimEntries = Object.entries(dimensionScores).filter(([_, s]) => s > 0)
  dimEntries.sort((a, b) => b[1] - a[1])
  const topDim = dimEntries[0]?.[0] || ''
  const bottomDim = dimEntries[dimEntries.length - 1]?.[0] || ''

  // 最常选的选项
  const counts = { A: aA + bA, B: aB + bB, C: aC + bC, D: totalD }
  const dominant = (Object.entries(counts).sort((a, b) => b[1] - a[1])[0]?.[0] || 'C') as 'A' | 'B' | 'C' | 'D'

  // 识别行为模式
  const patterns: string[] = []
  if (totalD >= 6) patterns.push('躺平型')
  if (aA >= 6) patterns.push('卷王型')
  if (aC >= 5) patterns.push('社交型')
  if (aA >= 4 && bB >= 2) patterns.push('嘴强王者')
  if (bD >= 4) patterns.push('退赛预备役')
  if (aA <= 2 && aB <= 2 && aC <= 2 && aD <= 2) patterns.push('端水大师')
  if (dimensionScores['B2'] >= 70 && dimensionScores['A3'] >= 60) patterns.push('装备控')
  if (totalD <= 2 && aA >= 5) patterns.push('铁人')
  if (bB >= 3) patterns.push('吃货')
  if (aD >= 3 && bD >= 3) patterns.push('佛系本系')

  return { aA, aB, aC, aD, bA, bB, bC, bD, totalD, topDim, bottomDim, dominant, patterns }
}

// 每种角色的"行为画像指纹"——匹配函数
type Matcher = (p: BehaviorProfile, ds: Record<string, number>) => number

const TYPE_MATCHERS: Record<string, Matcher> = {
  '独行侠': (p) => p.aA * 3 + (p.topDim === 'A1' ? 15 : 0) + (p.aC <= 3 ? 8 : 0),
  '完赛怪': (p) => p.aB * 3 + (p.topDim === 'A2' ? 15 : 0) + p.bA * 2,
  '拍照精': (p) => p.aC * 4 + (p.dominant === 'C' ? 10 : 0) + (p.aC >= 4 ? 10 : 0),
  '撞墙王': (p, ds) => (p.aA >= 3 ? 8 : 0) + (ds['B1'] < 50 ? 15 : 0) + (p.aB <= 2 ? 5 : 0),
  '号码布收藏家': (p) => (p.aA >= 3 ? 6 : 0) + p.bD * 4 + (p.bottomDim === 'B4' ? 12 : 0),
  '补给站流浪者': (p) => p.bB * 5 + (p.topDim === 'B2' ? 12 : 0) + (p.aC >= 3 ? 5 : 0),
  'Garmin信徒': (p, ds) => p.aB * 3 + (ds['A3'] > 60 ? 15 : 0) + (ds['A2'] > 60 ? 8 : 0),
  'Keep原住民': (p) => p.totalD * 5 + (p.dominant === 'D' ? 15 : 0) + (p.bottomDim === 'A4' ? 8 : 0),
  '跑团团长': (p) => p.bA * 4 + (p.aB >= 3 ? 8 : 0) + (p.topDim === 'A1' ? 8 : 0),
  '赛道天气预报员': (p, ds) => (ds['B3'] > 60 ? 12 : 0) + (p.bA >= 2 ? 6 : 0) + (ds['A3'] > 50 ? 8 : 0),
  '装备极简主义者': (p, ds) => (ds['B3'] < 45 ? 15 : 0) + (ds['A3'] < 40 ? 10 : 0) + (p.bC >= 2 ? 5 : 0),
  '装备焦虑者': (p, ds) => (ds['B3'] > 65 ? 12 : 0) + (ds['A3'] > 60 ? 8 : 0) + p.bD * 3,
  '素人跑者': (p) => {
    const max = Math.max(p.aA, p.aB, p.aC, p.aD)
    return (max <= 5 ? 15 : 0) + (p.patterns.includes('端水大师') ? 10 : 0)
  },
  '赛博跑者': (p, ds) => p.aB * 3 + (ds['A2'] > 65 ? 15 : 0) + (ds['A3'] > 55 ? 8 : 0),
  '精神完赛者': (p) => p.aD * 4 + (p.totalD >= 6 ? 10 : 0) + (p.bottomDim === 'A4' ? 10 : 0),
  '回归初心型': (p, ds) => (ds['A5'] > 65 ? 18 : 0) + (ds['A4'] > 50 ? 8 : 0) + p.aA * 1,
  '爬山遇难型': (p, ds) => (ds['B1'] < 45 ? 18 : 0) + (ds['B3'] < 45 ? 8 : 0) + p.bD * 3,
  '自补给大师': (p, ds) => (ds['B2'] > 60 ? 15 : 0) + p.bB * 3 + (p.bA >= 2 ? 5 : 0),
  '散步跑者': (p, ds) => (p.aC >= 4 ? 10 : 0) + p.bD * 3 + (ds['A2'] < 50 ? 10 : 0),
  'DNF重生者': (p, ds) => p.aD * 3 + (ds['B4'] < 50 ? 12 : 0) + (p.bC >= 2 ? 5 : 0),
  '打工人跑者': (p, ds) => (ds['A4'] > 65 ? 18 : 0) + (p.aA >= 4 ? 8 : 0) + (ds['A1'] > 55 ? 5 : 0),
  '刷脂战士': (p, ds) => (p.bB >= 2 ? 8 : 0) + (p.aB >= 3 ? 8 : 0) + (ds['B2'] > 55 ? 8 : 0),
  '佛系跑者': (p, ds) => p.aC * 3 + (ds['A5'] > 50 ? 8 : 0) + (p.aA <= 3 ? 8 : 0),
  '卷王': (p, ds) => (p.aA >= 5 ? 10 : 0) + (ds['A2'] > 65 ? 15 : 0) + (ds['A4'] > 60 ? 8 : 0),
}

// 判定角色类型（画像匹配 + 候选池加权随机）
function determineRunnerType(answers: Answer[], dimensionScores: Record<string, number>): string {
  const profile = buildProfile(answers, dimensionScores)

  // 第一步：每个角色算匹配分
  const scores: Array<{ type: string; score: number }> = []
  for (const type of RUNNER_TYPES) {
    const matcher = TYPE_MATCHERS[type]
    const score = matcher ? matcher(profile, dimensionScores) : 0
    scores.push({ type, score })
  }

  // 排序取 top 5 候选
  scores.sort((a, b) => b.score - a.score)
  const candidates = scores.slice(0, 5)

  // 第二步：加权随机（第一名概率最高，但不是100%）
  // 权重: [50, 25, 12, 8, 5]
  const weights = [50, 25, 12, 8, 5]
  const totalWeight = weights.reduce((s, w) => s + w, 0)
  let roll = Math.random() * totalWeight

  for (let i = 0; i < candidates.length; i++) {
    roll -= weights[i]
    if (roll <= 0) return candidates[i].type
  }

  return candidates[0].type
}

// 生成判词（基于实际答案的可追溯槽点）
function generateVerdict(answers: Answer[], runnerType: string, dimensionScores: Record<string, number>): string {
  const profile = buildProfile(answers, dimensionScores)
  const clues: string[] = []

  // 基于答案分布的线索
  if (profile.totalD >= 6) clues.push(`你选了${profile.totalD}次"摆烂/D"选项`)
  if (profile.aA >= 6) clues.push(`A类题你选了${profile.aA}次A，卷到不行`)
  if (profile.aC >= 5) clues.push(`${profile.aC}次选C，社交属性拉满`)
  if (profile.bD >= 4) clues.push(`越野题${profile.bD}次选D，山野劝退`)
  if (profile.bB >= 3) clues.push(`${profile.bB}次选和B补给相关，是真爱吃`)
  if (profile.aD >= 4) clues.push(`${profile.aD}次选D，躺平意愿明显`)
  if (profile.aB >= 5) clues.push(`${profile.aB}次选B，理性分析派`)

  // 基于维度
  if (profile.topDim) {
    clues.push(`主导维度: ${DIMENSION_LABELS[profile.topDim]}`)
  }

  // 如果没线索，用兜底
  if (clues.length === 0) {
    clues.push('你的答案分布非常均衡，是个谜一样的跑者')
  }

  return clues.join('；') + ` → 判定: ${runnerType}`
}

// 计算结果
export function calculateResult(answers: Answer[]): TagResult & {
  dimensionScores: Record<string, number>
  roast: string
  hype: string
  action: string
  cpMatch: { type: string; desc: string; score: number }
  worstCpMatch: { type: string; desc: string; score: number }
} {
  // 维度得分
  const dimensionScores: Record<string, number> = {}
  for (const dim of [...Object.keys(DIMENSION_CONFIG)]) {
    dimensionScores[dim] = calcDimensionScore(answers, dim)
  }

  // 云玩家检测
  const dCount = answers.filter(a => a.optionLabel === 'D').length
  const isHiddenType = dCount >= 8

  // 判定角色
  const runnerType = determineRunnerType(answers, dimensionScores)
  const meta = TYPE_META[runnerType]

  // 彩蛋标注
  const eggSymbols: string[] = []
  if (isHiddenType) {
    eggSymbols.push('💔')
  } else {
    if (dimensionScores['B1'] >= 70) eggSymbols.push('🏔️')
    if (dimensionScores['B2'] >= 75) eggSymbols.push('☀️')
    if (dimensionScores['B3'] >= 70) eggSymbols.push('🔥')
  }

  // CP匹配计算
  const cpMatch = buildCpMatch(runnerType)
  const worstCpMatch = buildWorstCpMatch(runnerType)

  return {
    runnerType,
    runnerTypeEn: meta?.en || '',
    runnerImg: meta?.img || '',
    tagline: meta?.tagline || '',
    eggSymbols,
    hiddenEgg: isHiddenType ? 'cloud-runner' : null,
    isHiddenType,
    dimensionScores,
    roast: meta?.roast || '跑步是你生活的一部分。',
    hype: meta?.hype || '下一场比赛，等你来战。',
    action: meta?.action || '去跑步吧。',
    cpMatch,
    worstCpMatch,
    verdict: generateVerdict(answers, runnerType, dimensionScores),
  }
}

// 构造最合拍搭子（基于 TYPE_META）
function buildCpMatch(runnerType: string) {
  const meta = TYPE_META[runnerType]
  if (!meta || !meta.cpTypes.length) {
    return { type: '完赛怪', desc: '随机匹配，看缘分。', score: 75 }
  }

  const chosen = meta.cpTypes[Math.floor(Math.random() * meta.cpTypes.length)]
  const cpMeta = TYPE_META[chosen]

  const descs: string[] = []
  if (cpMeta) {
    descs.push(...cpMeta.keywords.slice(0, 2).map(k => `${k}`))
  }

  return {
    type: chosen,
    desc: descs.join(' + ') || `一个向东一个向西，赛道也需要互补。`,
    score: 82 + Math.floor(Math.random() * 12),
  }
}

// 构造最合不来搭子（基于 worstTypes）
function buildWorstCpMatch(runnerType: string) {
  const meta = TYPE_META[runnerType]
  if (!meta || !meta.worstTypes || meta.worstTypes.length === 0) {
    const fallback = RUNNER_TYPES.filter(t => t !== runnerType)
    const chosen = fallback[Math.floor(Math.random() * fallback.length)]
    return { type: chosen, desc: '一个向东一个向西，赛道再宽也不够你们分。', score: 10 + Math.floor(Math.random() * 15) }
  }

  const chosen = meta.worstTypes[Math.floor(Math.random() * meta.worstTypes.length)]

  const worstDescs: Record<string, string> = {
    '独行侠': '他喜欢结伴，你喜欢独跑；你越跑越静，他越说越嗨。',
    '完赛怪': '他想完赛，你想散步；你走他就焦虑，你焦虑他就更push。',
    '拍照精': '他想冲成绩，你想构图；你停下来拍照，他就觉得你在浪费时间。',
    '撞墙王': '你想慢跑完赛，他想拉爆你；你的撞墙期是他的起点。',
    '号码布收藏家': '他每次都去，你每次都鸽；押金成了你们之间最大的矛盾。',
    '补给站流浪者': '他跑完就走，你吃完全程；终点线前你们已经走散。',
    'Garmin信徒': '他看数据跑，你凭感觉跑；你问他今天跑得怎么样，他说心率带歪了。',
    'Keep原住民': '他在室内跟练，你在户外真跑；你们是两个世界的跑者。',
    '跑团团长': '他想组队跑，你想一个人跑；他拉你进群，你悄悄退群。',
    '赛道天气预报员': '他看天跑步，你看心情跑步；他预报有雨，你选择睡觉。',
    '装备极简主义者': '他越背越多，你越跑越轻；他觉得你不专业，你觉得他在搬家。',
    '装备焦虑者': '他在换鞋，你在焦虑；他换了三双鞋还没出门，你已经跑完了。',
    '素人跑者': '他不追求成绩，你也不在乎；两个人佛到一起，赛道空空如也。',
    '赛博跑者': '他分析数据，你凭直觉；他觉得你太随意，你觉得他太累。',
    '精神完赛者': '他在家精神完赛，你真的跑不动；你们在线上相遇，在赛道错过。',
    '回归初心型': '他想找回初心，你已忘记为什么跑；你聊技术指标，他聊当年故事。',
    '爬山遇难型': '他想爬坡，你想下撤；他觉得你在找借口，你觉得他在冒险。',
    '自补给大师': '他自给自足，你靠补给站；他觉得你太依赖，你觉得他太抠门。',
    '散步跑者': '他想走完，你也想走；两个人走到一起，然后一起迷路。',
    'DNF重生者': '他想退赛，你想坚持；他下次不来了，你下次还来。',
    '打工人跑者': '你早起跑，他夜跑；你们的训练时间完美错开，从不见面。',
    '刷脂战士': '他跑完吃火锅，你跑完喝蛋白粉；他觉得你在消耗，你觉得他在进补。',
    '佛系跑者': '他想躺平，你想冲成绩；他觉得你太卷，你觉得他太懒。',
    '卷王': '他想pb，你想佛系；他觉得你太慢，你觉得他太焦虑。',
  }

  return {
    type: chosen,
    desc: worstDescs[chosen] || `一个向东一个向西，赛道再宽也不够你们分。`,
    score: 10 + Math.floor(Math.random() * 15),
  }
}

// 获取结果描述文案（复用 TYPE_META 中的 roast）
export function getResultDescription(runnerType: string, isHidden: boolean): string {
  if (isHidden) {
    return '你不是不喜欢跑步，你只是更喜欢"曾经跑过"的感觉。报名的那一刻最兴奋，赛前一天最紧张，比赛当天最想放弃，赛后最满足。'
  }

  const meta = TYPE_META[runnerType]
  if (meta) {
    return `${meta.roast} ${meta.hype}`
  }

  return `${runnerType}，这是你的跑步故事。`
}

// 获取适合的比赛
export function getSuitableRace(runnerType: string): string {
  const races: Record<string, string> = {
    '独行侠': 'UTMB（一个人跑完全程，才是真正的朝圣）',
    '完赛怪': '北京马拉松/上海马拉松（国马/上马，完赛证书最具仪式感）',
    '拍照精': '厦门马拉松/杭州马拉松（海滨+西湖，赛道就是你的影棚）',
    '撞墙王': '半马（缩短撞墙战线，体验一次全程不停脚的快感）',
    '号码布收藏家': '任何一场报名费低廉的赛事（押金不能白交）',
    '补给站流浪者': '成都马拉松/广州马拉松（补给天花板，美食赛道）',
    'Garmin信徒': '香港100（数据党的朝圣之路，CP点精确到秒）',
    'Keep原住民': '线上马拉松（足不出户，奖牌到家）',
    '跑团团长': '马拉松接力赛（团队作战，你负责组局）',
    '赛道天气预报员': '任何一场你已经查好天气预报的赛事',
    '装备极简主义者': '柴古唐斯（强制装备少，轻量化天堂）',
    '装备焦虑者': '半马（装备简单，不用纠结背包）',
    '素人跑者': '半马/全马（去体验一次赛道的肾上腺素）',
    '赛博跑者': 'Strava排名赛（数据战场，每秒都要卷）',
    '精神完赛者': '线上马拉松（精神能完赛，肉体也要跟上）',
    '回归初心型': '首马（重新找回站在起点的兴奋感）',
    '爬山遇难型': '半马/城市马拉松（先建立路跑信心）',
    '自补给大师': '林贾尼100/UTMB（自补给是你的主场）',
    '散步跑者': '徒步马拉松（能完赛就是胜利）',
    'DNF重生者': '之前退赛的同一场比赛（这次不退）',
    '打工人跑者': '周末城市马拉松（早起跑完，不耽误加班）',
    '刷脂战士': '成都马拉松（跑完吃火锅，热量双倍燃烧）',
    '佛系跑者': '风景优美的越野赛（享受过程，不追成绩）',
    '卷王': '波士顿马拉松（BQ是你的信仰）',
  }

  return races[runnerType] || '马拉松 / 越野跑 / 欢乐跑'
}

// 获取比赛推荐详情（含维度评分）
export function getRaceRecommendations(runnerType: string): Array<{
  name: string
  distance: string
  difficulty: number
  scenery: number
  supplies: number
  culture: number
  tags: string[]
}> {
  // 越野赛事库
  const trailRaces = [
    { name: 'UTMB', distance: '171km', difficulty: 5, scenery: 5, supplies: 4, culture: 5, tags: ['越野巅峰', '环勃朗峰'] },
    { name: '林贾尼100', distance: '100km', difficulty: 4, scenery: 5, supplies: 3, culture: 4, tags: ['火山地貌', '印尼风情'] },
    { name: '巨人之旅', distance: '330km', difficulty: 5, scenery: 5, supplies: 3, culture: 5, tags: ['意大利', '环线传奇'] },
    { name: 'HK100', distance: '100km', difficulty: 3, scenery: 4, supplies: 5, culture: 4, tags: ['麦理浩径', '亚洲最受欢迎'] },
    { name: '柴古唐斯', distance: '100km', difficulty: 4, scenery: 4, supplies: 4, culture: 4, tags: ['括苍山', '江浙沪越野'] },
    { name: '崇礼168', distance: '168km', difficulty: 4, scenery: 4, supplies: 4, culture: 3, tags: ['草原天路', '华北越野'] },
    { name: '四姑娘山', distance: '60km', difficulty: 3, scenery: 5, supplies: 3, culture: 4, tags: ['高原风光', '四川阿坝'] },
    { name: '秦岭168', distance: '168km', difficulty: 4, scenery: 4, supplies: 3, culture: 4, tags: ['秦岭古道', '西北越野'] },
    { name: '梅里100', distance: '100km', difficulty: 4, scenery: 5, supplies: 2, culture: 5, tags: ['梅里雪山', '转山'] },
    { name: '梅里之翼', distance: '56km', difficulty: 4, scenery: 5, supplies: 3, culture: 5, tags: ['梅里雪山', '日照金山'] },
    { name: '宁海越野', distance: '100km', difficulty: 3, scenery: 4, supplies: 4, culture: 3, tags: ['宁海', '华东经典'] },
    { name: '张家界天门山', distance: '70km', difficulty: 4, scenery: 5, supplies: 3, culture: 4, tags: ['天门山', '砂岩峰林'] },
    { name: '大理100', distance: '100km', difficulty: 3, scenery: 5, supplies: 3, culture: 4, tags: ['苍山洱海', '云南风情'] },
    { name: '武功山', distance: '56km', difficulty: 3, scenery: 5, supplies: 3, culture: 3, tags: ['高山草甸', '云海日出'] },
    { name: '贡嘎100', distance: '100km', difficulty: 5, scenery: 5, supplies: 2, culture: 4, tags: ['蜀山之王', '高海拔'] },
    { name: '黄山越野', distance: '50km', difficulty: 3, scenery: 5, supplies: 3, culture: 5, tags: ['黄山', '徽州文化'] },
    { name: '腾格里沙漠', distance: '100km', difficulty: 4, scenery: 4, supplies: 2, culture: 3, tags: ['沙漠', '内蒙古'] },
    { name: '玉龙雪山', distance: '50km', difficulty: 4, scenery: 5, supplies: 3, culture: 4, tags: ['玉龙雪山', '纳西族'] },
    { name: '大五朝台', distance: '70km', difficulty: 4, scenery: 4, supplies: 3, culture: 5, tags: ['五台山', '朝圣之路'] },
    { name: '莫干山', distance: '30km', difficulty: 2, scenery: 4, supplies: 4, culture: 3, tags: ['莫干山', '江浙沪入门'] },
    { name: '张掖百公里', distance: '100km', difficulty: 4, scenery: 5, supplies: 3, culture: 4, tags: ['丹霞地貌', '西北风光'] },
    { name: '三峡168', distance: '168km', difficulty: 4, scenery: 4, supplies: 3, culture: 4, tags: ['三峡', '长江风光'] },
    { name: '长白山', distance: '50km', difficulty: 3, scenery: 5, supplies: 3, culture: 3, tags: ['长白山', '天池'] },
    { name: '蜀道by UTMB', distance: '100km', difficulty: 4, scenery: 5, supplies: 4, culture: 5, tags: ['剑门关', '蜀道天险'] },
    { name: '大境门by UTMB', distance: '100km', difficulty: 3, scenery: 4, supplies: 4, culture: 4, tags: ['长城', '冬奥遗产'] },
    { name: '高黎贡超级山径', distance: '125km', difficulty: 5, scenery: 5, supplies: 3, culture: 4, tags: ['高黎贡山', '热带雨林'] },
    { name: '稻城亚丁', distance: '46km', difficulty: 5, scenery: 5, supplies: 2, culture: 5, tags: ['三神山', '天空之路'] },
    { name: '江南百英里', distance: '168km', difficulty: 2, scenery: 4, supplies: 4, culture: 3, tags: ['四明山', '首168推荐'] },
  ]

  // 路跑马拉松库
  const roadRaces = [
    { name: '北京马拉松', distance: '全马', difficulty: 3, scenery: 3, supplies: 4, culture: 5, tags: ['国马', '中轴线'] },
    { name: '上海马拉松', distance: '全马', difficulty: 3, scenery: 4, supplies: 5, culture: 4, tags: ['精英赛道', '上海腔调'] },
    { name: '厦门马拉松', distance: '全马', difficulty: 2, scenery: 5, supplies: 4, culture: 3, tags: ['海滨赛道', '高颜值'] },
    { name: '武汉马拉松', distance: '全马', difficulty: 3, scenery: 4, supplies: 4, culture: 4, tags: ['樱花季', '补给文化'] },
    { name: '成都马拉松', distance: '全马', difficulty: 3, scenery: 4, supplies: 5, culture: 4, tags: ['美食赛道', '火锅补给'] },
    { name: '西安马拉松', distance: '全马', difficulty: 2, scenery: 4, supplies: 4, culture: 5, tags: ['古城墙', '文化之旅'] },
    { name: '广州马拉松', distance: '全马', difficulty: 3, scenery: 3, supplies: 5, culture: 4, tags: ['粤语氛围', '广马补给'] },
    { name: '杭州马拉松', distance: '全马', difficulty: 2, scenery: 5, supplies: 4, culture: 4, tags: ['西湖景区', '江南韵味'] },
    { name: '深圳马拉松', distance: '全马', difficulty: 2, scenery: 4, supplies: 5, culture: 3, tags: ['年轻城市', '创新活力'] },
    { name: '重庆马拉松', distance: '全马', difficulty: 3, scenery: 3, supplies: 5, culture: 4, tags: ['火锅补给', '爬坡赛道'] },
    { name: '无锡马拉松', distance: '全马', difficulty: 2, scenery: 5, supplies: 4, culture: 3, tags: ['樱花赛道', 'PB圣地'] },
    { name: '兰州马拉松', distance: '全马', difficulty: 3, scenery: 4, supplies: 4, culture: 5, tags: ['黄河之畔', '牛肉面'] },
    { name: '南京马拉松', distance: '全马', difficulty: 2, scenery: 4, supplies: 4, culture: 5, tags: ['六朝古都', '中山陵'] },
    { name: '青岛马拉松', distance: '全马', difficulty: 2, scenery: 5, supplies: 4, culture: 3, tags: ['海滨赛道', '啤酒之城'] },
    { name: '大连马拉松', distance: '全马', difficulty: 2, scenery: 4, supplies: 4, culture: 4, tags: ['浪漫之都', '老牌赛事'] },
    { name: '千岛湖马拉松', distance: '全马', difficulty: 2, scenery: 5, supplies: 3, culture: 3, tags: ['千岛湖', '山水如画'] },
    { name: '苏州马拉松', distance: '全马', difficulty: 2, scenery: 4, supplies: 4, culture: 5, tags: ['园林之城', '江南水乡'] },
    { name: '长沙马拉松', distance: '全马', difficulty: 2, scenery: 4, supplies: 5, culture: 4, tags: ['橘子洲头', '臭豆腐补给'] },
    { name: '郑开马拉松', distance: '全马', difficulty: 1, scenery: 3, supplies: 3, culture: 4, tags: ['郑开大道', '最直赛道'] },
    { name: '海口马拉松', distance: '全马', difficulty: 2, scenery: 5, supplies: 3, culture: 3, tags: ['椰风海韵', '热带风情'] },
    { name: '珠海马拉松', distance: '全马', difficulty: 2, scenery: 4, supplies: 4, culture: 3, tags: ['情侣路', '滨海赛道'] },
    { name: '哈尔滨马拉松', distance: '全马', difficulty: 2, scenery: 3, supplies: 5, culture: 4, tags: ['最土豪补给', '俄式风情'] },
    { name: '大理马拉松', distance: '全马', difficulty: 2, scenery: 5, supplies: 3, culture: 5, tags: ['苍山洱海', '白族文化'] },
    { name: '丽江马拉松', distance: '全马', difficulty: 3, scenery: 5, supplies: 3, culture: 5, tags: ['玉龙雪山', '纳西古城'] },
    { name: '贵阳马拉松', distance: '全马', difficulty: 3, scenery: 4, supplies: 4, culture: 3, tags: ['避暑之都', '山城赛道'] },
  ]

  // 根据角色决定推荐哪些赛事
  const typeTags: Record<string, string[]> = {
    '独行侠': ['UTMB', '巨人之旅', '贡嘎100', '梅里100'],
    '完赛怪': ['北京马拉松', '上海马拉松', 'HK100', '崇礼168', '江南百英里'],
    '拍照精': ['厦门马拉松', '杭州马拉松', '四姑娘山', '武功山', '张家界天门山', '大理马拉松'],
    '撞墙王': ['千岛湖马拉松', '郑开马拉松', '莫干山', '江南百英里'],
    '号码布收藏家': ['海口马拉松', '莫干山', '珠海马拉松'],
    '补给站流浪者': ['成都马拉松', '广州马拉松', '武汉马拉松', '长沙马拉松', '重庆马拉松', '哈尔滨马拉松'],
    'Garmin信徒': ['HK100', '无锡马拉松', '上海马拉松'],
    'Keep原住民': ['千岛湖马拉松', '莫干山', '郑开马拉松'],
    '跑团团长': ['南京马拉松', '苏州马拉松', '深圳马拉松'],
    '赛道天气预报员': ['大连马拉松', '青岛马拉松', '崇礼168'],
    '装备极简主义者': ['柴古唐斯', 'HK100', '宁海越野', '莫干山'],
    '装备焦虑者': ['千岛湖马拉松', '郑开马拉松', '莫干山'],
    '素人跑者': ['厦门马拉松', '无锡马拉松', '莫干山'],
    '赛博跑者': ['无锡马拉松', '上海马拉松', 'HK100'],
    '精神完赛者': ['千岛湖马拉松', '海口马拉松', '莫干山'],
    '回归初心型': ['厦门马拉松', '南京马拉松', '莫干山', '丽江马拉松'],
    '爬山遇难型': ['郑开马拉松', '千岛湖马拉松', '无锡马拉松'],
    '自补给大师': ['林贾尼100', 'UTMB', '贡嘎100', '高黎贡超级山径'],
    '散步跑者': ['海口马拉松', '珠海马拉松', '千岛湖马拉松', '大理马拉松'],
    'DNF重生者': ['无锡马拉松', '宁海越野', '莫干山', '江南百英里'],
    '打工人跑者': ['深圳马拉松', '南京马拉松', '苏州马拉松'],
    '刷脂战士': ['成都马拉松', '长沙马拉松', '重庆马拉松', '哈尔滨马拉松'],
    '佛系跑者': ['杭州马拉松', '四姑娘山', '大理100', '武功山', '丽江马拉松'],
    '卷王': ['无锡马拉松', '上海马拉松', '北京马拉松', '蜀道by UTMB'],
  }

  const preferredTags = typeTags[runnerType] || []

  const allRaces = [...trailRaces, ...roadRaces]
  const recommended = allRaces.filter(r =>
    preferredTags.some(tag => r.name.includes(tag) || r.tags.some(t => t.includes(tag)))
  )

  // 如果没有匹配，随机返回3个
  if (recommended.length === 0) {
    const shuffled = [...allRaces].sort(() => Math.random() - 0.5)
    return shuffled.slice(0, 3).map(r => ({ ...r, tags: r.tags }))
  }

  return recommended.slice(0, 3).map(r => ({ ...r, tags: r.tags }))
}
