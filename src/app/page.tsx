'use client'

import { useState, useCallback, useRef, useMemo } from 'react'
import { generateQuiz, calculateResult, getResultDescription, getSuitableRace, getRaceRecommendations, getTypeMeta } from '@/lib/quiz'
import { Question, Answer } from '@/lib/types'
import html2canvas from 'html2canvas'

type Screen = 'start' | 'quiz' | 'result'

const DIMENSION_LABELS: Record<string, string> = {
  A1: '跑步身份', A2: '赛道行为', A3: '装备执念',
  A4: '灵魂深处', A5: '跑步哲学',
  B1: '山野态度', B2: '补给策略', B3: '装备取舍', B4: '完赛心态',
}

const DIMENSION_COLORS: Record<string, string> = {
  A1: '#E63946', A2: '#F4A261', A3: '#2A9D8F',
  A4: '#7B2CBF', A5: '#457B9D',
  B1: '#6A994E', B2: '#BC4749', B3: '#E9C46A', B4: '#264653',
}

export default function Home() {
  const [screen, setScreen] = useState<Screen>('start')
  const [questions, setQuestions] = useState<Question[]>([])
  const [currentIndex, setCurrentIndex] = useState(0)
  const [answers, setAnswers] = useState<Answer[]>([])
  const [userName, setUserName] = useState('')
  const [runnerType, setRunnerType] = useState('')
  const [runnerTypeEn, setRunnerTypeEn] = useState('')
  const [runnerImg, setRunnerImg] = useState('')
  const [tagline, setTagline] = useState('')
  const [eggSymbols, setEggSymbols] = useState<string[]>([])
  const [isHiddenType, setIsHiddenType] = useState(false)
  const [hiddenEgg, setHiddenEgg] = useState<string | null>(null)
  const [dimensionScores, setDimensionScores] = useState<Record<string, number>>({})
  const [roast, setRoast] = useState('')
  const [hype, setHype] = useState('')
  const [action, setAction] = useState('')
  const [cpMatch, setCpMatch] = useState({ type: '', desc: '', score: 0 })
  const [worstCpMatch, setWorstCpMatch] = useState({ type: '', desc: '', score: 0 })
  const [nameInput, setNameInput] = useState('')
  const resultRef = useRef<HTMLDivElement>(null)
  const shareCardRef = useRef<HTMLDivElement>(null)

  const startQuiz = useCallback(() => {
    const name = nameInput.trim() || '匿名跑者'
    setUserName(name)
    const quiz = generateQuiz()
    setQuestions(quiz.questions)
    setCurrentIndex(0)
    setAnswers([])
    setScreen('quiz')
  }, [nameInput])

  const handleAnswer = useCallback((optionLabel: string) => {
    const question = questions[currentIndex]
    const newAnswers = [...answers, {
      questionId: question.id,
      optionLabel,
      dimension: question.dimension,
    }]

    if (currentIndex < questions.length - 1) {
      setAnswers(newAnswers)
      setCurrentIndex(prev => prev + 1)
    } else {
      const result = calculateResult(newAnswers)
      setRunnerType(result.runnerType)
      setRunnerTypeEn(result.runnerTypeEn || '')
      setRunnerImg(result.runnerImg || '')
      setTagline(result.tagline || '')
      setEggSymbols(result.eggSymbols)
      setIsHiddenType(result.isHiddenType)
      setHiddenEgg(result.hiddenEgg)
      setDimensionScores(result.dimensionScores)
      setRoast(result.roast || '')
      setHype(result.hype || '')
      setAction(result.action || '')
      setCpMatch(result.cpMatch)
      setWorstCpMatch(result.worstCpMatch)
      setAnswers(newAnswers)
      setScreen('result')

      // 异步上报测试结果（静默，不影响用户体验）
      fetch('/api/result', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          runnerType: result.runnerType,
          dimensionScores: result.dimensionScores,
          answers: newAnswers,
        }),
      }).catch(() => {})
    }
  }, [currentIndex, questions, answers])

  const currentQuestion = questions[currentIndex]
  const progress = questions.length > 0 ? ((currentIndex + 1) / questions.length) * 100 : 0
  const description = getResultDescription(runnerType, isHiddenType)
  const suitableRace = getSuitableRace(runnerType)
  const fullTag = runnerType

  // 比赛推荐
  const raceRecommendations = useMemo(() => {
    if (!runnerType) return []
    return getRaceRecommendations(runnerType)
  }, [runnerType])

  // 维度环形图数据（归一化到100%）
  const donutSegments = useMemo(() => {
    const entries = Object.entries(dimensionScores).filter(([_, s]) => s > 0)
    if (entries.length === 0) return []
    const total = entries.reduce((sum, [_, s]) => sum + s, 0)
    let cumulative = 0
    return entries
      .sort((a, b) => b[1] - a[1])
      .map(([dim, score]) => {
        const pct = total > 0 ? (score / total) * 100 : 0
        const seg = { dim, score, pct, start: cumulative, color: DIMENSION_COLORS[dim] || '#94A3B8' }
        cumulative += pct
        return seg
      })
  }, [dimensionScores])

  // 分享图用单独ref，确保干净捕获
  const shareAsImage = useCallback(async () => {
    const target = shareCardRef.current
    if (!target) return
    try {
      target.style.display = 'block'
      target.style.position = 'fixed'
      target.style.left = '-9999px'
      target.style.top = '0'

      const canvas = await html2canvas(target, {
        backgroundColor: '#1D1D1D',
        scale: 2,
        useCORS: true,
        width: 420,
        height: 700,
      })

      target.style.display = 'none'
      target.style.position = ''
      target.style.left = ''
      target.style.top = ''

      const link = document.createElement('a')
      link.download = `跑圈SBTI_${userName || '跑者'}_${fullTag}.png`
      link.href = canvas.toDataURL('image/png')
      link.click()
    } catch (e) {
      console.error('Failed to generate image:', e)
    }
  }, [fullTag, userName])

  const resetQuiz = useCallback(() => {
    setScreen('start')
    setQuestions([])
    setAnswers([])
    setCurrentIndex(0)
    setRunnerType('')
    setRunnerTypeEn('')
    setRunnerImg('')
    setTagline('')
    setEggSymbols([])
    setIsHiddenType(false)
    setHiddenEgg(null)
    setDimensionScores({})
    setRoast('')
    setHype('')
    setAction('')
    setCpMatch({ type: '', desc: '', score: 0 })
    setWorstCpMatch({ type: '', desc: '', score: 0 })
  }, [])

  // 比赛难度星星
  const renderStars = (score: number) => {
    return '★'.repeat(score) + '☆'.repeat(5 - score)
  }

  // SVG 环形图
  const renderDonut = () => {
    const size = 180
    const cx = size / 2
    const cy = size / 2
    const r = 65
    const circumference = 2 * Math.PI * r

    let cumulativeOffset = 0
    return (
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} className="donut-chart">
        {donutSegments.map((seg) => {
          const dashLen = (seg.pct / 100) * circumference
          const dashGap = circumference - dashLen
          const offset = -cumulativeOffset
          cumulativeOffset += dashLen
          return (
            <circle
              key={seg.dim}
              cx={cx}
              cy={cy}
              r={r}
              fill="none"
              stroke={seg.color}
              strokeWidth={18}
              strokeDasharray={`${dashLen} ${dashGap}`}
              strokeDashoffset={offset}
              strokeLinecap="round"
              transform={`rotate(-90 ${cx} ${cy})`}
            />
          )
        })}
        {/* 中心文字 */}
        <text x={cx} y={cy - 8} textAnchor="middle" className="donut-center-type">
          {donutSegments.length > 0 ? DIMENSION_LABELS[donutSegments[0].dim] || donutSegments[0].dim : ''}
        </text>
        <text x={cx} y={cy + 12} textAnchor="middle" className="donut-center-label">
          主导维度
        </text>
      </svg>
    )
  }

  return (
    <div className="container">
      {/* ==================== 启动页 ==================== */}
      {screen === 'start' && (
        <div className="start-screen">
          <div className="start-badge">跑圈专属测试</div>
          <h1 className="start-title">
            跑圈<span>SBTI</span>
          </h1>
          <p className="start-subtitle">你是哪种跑者？</p>
          <p className="start-desc">
            110道题池，每次随机抽32道<br />
            9个维度，拷问灵魂深处<br />
            发现你的跑步人格
          </p>

          <div className="name-input-wrap">
            <input
              className="name-input"
              type="text"
              placeholder="怎么称呼你？（可选）"
              value={nameInput}
              onChange={e => setNameInput(e.target.value)}
              maxLength={20}
            />
          </div>

          <button className="start-btn" onClick={startQuiz}>
            开始测试
          </button>
          <p className="start-note">约需 3-5 分钟</p>
        </div>
      )}

      {/* ==================== 答题页 ==================== */}
      {screen === 'quiz' && currentQuestion && (
        <div className="question-screen">
          <div className="question-header">
            <span className="question-progress">
              {currentIndex + 1} / {questions.length}
            </span>
            <span className="question-dimension">
              {DIMENSION_LABELS[currentQuestion.dimension] || currentQuestion.dimension}
            </span>
          </div>

          <div className="question-progress-bar">
            <div
              className="question-progress-fill"
              style={{ width: `${progress}%` }}
            />
          </div>

          <h2 className="question-text">{currentQuestion.text}</h2>

          <div className="question-options">
            {currentQuestion.options.map((opt) => (
              <button
                key={opt.label}
                className="option-btn"
                onClick={() => handleAnswer(opt.label)}
              >
                <span className="option-label">{opt.label}</span>
                <span className="option-text">{opt.text}</span>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* ==================== 结果页 ==================== */}
      {screen === 'result' && (
        <div className={`result-screen ${isHiddenType ? 'hidden-mode' : ''}`} ref={resultRef}>
          <div className="result-badge">
            {isHiddenType ? '🎉 隐藏人格解锁' : '🏁 测试完成'}
          </div>

          {/* 英雄区：角色大图 */}
          <div className="hero-section">
            {runnerImg && (
              <div className="hero-avatar">
                <img src={`/characters/${runnerImg}.png`} alt={runnerType} />
              </div>
            )}
            {userName && <div className="result-name">{userName}</div>}
            <div className="hero-type">{runnerType}</div>
            {runnerTypeEn && <div className="hero-type-en">{runnerTypeEn}</div>}
            {tagline && <div className="hero-tagline">&ldquo;{tagline}&rdquo;</div>}
            {eggSymbols.length > 0 && (
              <div className="hero-eggs">{eggSymbols.join('')}</div>
            )}
          </div>

          {/* 拷打 + 画饼 */}
          <div className="result-roast">
            <div className="roast-icon">💀</div>
            <p>{roast}</p>
          </div>

          {hype && (
            <div className="result-hype">
              <div className="hype-icon">🎯</div>
              <p>{hype}</p>
            </div>
          )}

          {/* 行动指引 */}
          {action && (
            <div className="result-action">
              <span className="action-label">下一步：</span>
              <span className="action-text">{action}</span>
            </div>
          )}

          {/* 维度环形图 */}
          <div className="dimension-section">
            <div className="dimension-title">跑步人格构成</div>
            <div className="donut-wrap">
              {renderDonut()}
              <div className="donut-legend">
                {donutSegments.map(seg => (
                  <div key={seg.dim} className="legend-item">
                    <span className="legend-dot" style={{ backgroundColor: seg.color }} />
                    <span className="legend-label">{DIMENSION_LABELS[seg.dim] || seg.dim}</span>
                    <span className="legend-pct">{Math.round(seg.pct)}%</span>
                  </div>
                ))}
              </div>
            </div>
            <p className="dimension-hint">
              标签由{donutSegments.length}个维度共同塑造，全网<span className="highlight">{Math.floor(Math.random() * 3 + 3)}.{Math.floor(Math.random() * 9 + 1)}%</span>的跑者与你高度重合
            </p>
          </div>

          {/* CP匹配 */}
          <div className="cp-section">
            <div className="cp-match-card best">
              <div className="cp-match-label">🏅 最合拍搭子</div>
              <div className="cp-match-header">
                {(() => { const m = getTypeMeta(cpMatch.type); return m.img ? <img src={`/characters/${m.img}.png`} alt={cpMatch.type} className="cp-avatar" /> : null })()}
                <div>
                  <div className="cp-match-type">{cpMatch.type}</div>
                  <div className="cp-match-en">{getTypeMeta(cpMatch.type).en}</div>
                </div>
              </div>
              <div className="cp-match-desc">{cpMatch.desc}</div>
              <div className="cp-match-score">契合度 {cpMatch.score}%</div>
            </div>

            <div className="cp-match-card worst">
              <div className="cp-match-label">💀 最合不来搭子</div>
              <div className="cp-match-header">
                {(() => { const m = getTypeMeta(worstCpMatch.type); return m.img ? <img src={`/characters/${m.img}.png`} alt={worstCpMatch.type} className="cp-avatar" /> : null })()}
                <div>
                  <div className="cp-match-type">{worstCpMatch.type}</div>
                  <div className="cp-match-en">{getTypeMeta(worstCpMatch.type).en}</div>
                </div>
              </div>
              <div className="cp-match-desc">{worstCpMatch.desc}</div>
              <div className="cp-match-score">冲突值 {worstCpMatch.score}%</div>
            </div>
          </div>

          {/* 比赛推荐 */}
          <div className="race-section">
            <div className="race-section-title">📍 推荐比赛</div>
            {raceRecommendations.length > 0 ? (
              <div className="race-list">
                {raceRecommendations.map((race, idx) => (
                  <div key={idx} className="race-card">
                    <div className="race-card-header">
                      <span className="race-name">{race.name}</span>
                      <span className="race-distance">{race.distance}</span>
                    </div>
                    <div className="race-tags">
                      {race.tags.map((tag, i) => (
                        <span key={i} className="race-tag">{tag}</span>
                      ))}
                    </div>
                    <div className="race-scores">
                      <div className="race-score-item">
                        <span className="race-score-label">难度</span>
                        <span className="race-score-stars" style={{ color: '#E63946' }}>
                          {renderStars(race.difficulty)}
                        </span>
                      </div>
                      <div className="race-score-item">
                        <span className="race-score-label">风景</span>
                        <span className="race-score-stars" style={{ color: '#4CAF50' }}>
                          {renderStars(race.scenery)}
                        </span>
                      </div>
                      <div className="race-score-item">
                        <span className="race-score-label">补给</span>
                        <span className="race-score-stars" style={{ color: '#F4A261' }}>
                          {renderStars(race.supplies)}
                        </span>
                      </div>
                      <div className="race-score-item">
                        <span className="race-score-label">文化</span>
                        <span className="race-score-stars" style={{ color: '#9C27B0' }}>
                          {renderStars(race.culture)}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="race-single">
                <div className="race-single-label">推荐赛事</div>
                <div className="race-single-value">{suitableRace}</div>
              </div>
            )}
          </div>

          {/* 操作按钮 */}
          <div className="result-actions">
            <button className="result-btn-primary" onClick={shareAsImage}>
              📤 保存分享图
            </button>
            <button className="result-btn-secondary" onClick={resetQuiz}>
              重新测试
            </button>
          </div>
        </div>
      )}

      {/* ==================== 隐藏分享卡片（用于截图） ==================== */}
      <div
        ref={shareCardRef}
        className="share-card"
        style={{ display: 'none', position: 'fixed', left: '-9999px', top: 0 }}
      >
        <div className="share-card-inner">
          <div className="share-card-title">跑圈SBTI</div>
          {runnerImg && (
            <div className="share-card-avatar">
              <img src={`/characters/${runnerImg}.png`} alt={runnerType} />
            </div>
          )}
          {userName && <div className="share-card-name">{userName}</div>}
          <div className="share-card-tag">{fullTag}</div>
          {runnerTypeEn && <div className="share-card-en">{runnerTypeEn}</div>}
          {tagline && <div className="share-card-tagline">&ldquo;{tagline}&rdquo;</div>}
          {eggSymbols.length > 0 && (
            <div className="share-card-eggs">{eggSymbols.join('')}</div>
          )}
          <div className="share-card-roast">&ldquo;{roast}&rdquo;</div>
          <div className="share-card-footer">扫码测试你是哪种跑者</div>
          <div className="share-card-qr">👉 run-sbti.com</div>
        </div>
      </div>
    </div>
  )
}
