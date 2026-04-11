export interface Option {
  label: string
  text: string
}

export interface Question {
  id: string
  dimension: string
  isSoul: boolean
  text: string
  options: Option[]
}

export interface Answer {
  questionId: string
  optionLabel: string
  dimension: string
}

export interface QuizState {
  questions: Question[]
  answers: Answer[]
  currentIndex: number
  isComplete: boolean
}

export interface TagResult {
  runnerType: string
  runnerTypeEn?: string
  runnerImg?: string
  tagline?: string
  eggSymbols: string[]
  hiddenEgg: string | null
  isHiddenType: boolean
  dimensionScores?: Record<string, number>
  roast?: string
  hype?: string
  action?: string
  cpMatch?: { type: string; desc: string; score: number }
  worstCpMatch?: { type: string; desc: string; score: number }
  macroScores?: MacroScore
  verdict?: string
  dominantDim?: string
}

export interface EggTrigger {
  type: 'label' | 'hidden' | 'combo' | 'contrast'
  threshold: number
  category: 'A' | 'B'
  options: string[]
}

export interface ShareImageData {
  tag: string
  fullTag: string
  description: string
  suitableRace: string
  isHidden: boolean
  eggSymbol?: string
}

export interface MacroScore {
  drive: number      // 斗志: 卷 ↔ 躺
  social: number     // 社交: 约跑 ↔ 独行
  obsession: number  // 执念: 装备控 ↔ 随性
  wildness: number   // 野性: 越野 ↔ 路跑
}

export interface RaceRecommendation {
  name: string
  distance: string
  difficulty: number
  scenery: number
  supplies: number
  culture: number
  tags: string[]
}
