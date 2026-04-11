'use client'

import { useState, useCallback, useMemo } from 'react'
import { generateQuiz, calculateResult, getSuitableRace, getRaceRecommendations, getTypeMeta } from '@/lib/quiz'
import { Question, Answer } from '@/lib/types'

type Screen = 'start' | 'quiz' | 'result'

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
  const [verdict, setVerdict] = useState('')
  const [emoji, setEmoji] = useState('')
  const [profile, setProfile] = useState('')
  const [cpMatch, setCpMatch] = useState({ type: '', desc: '', score: 0 })
  const [worstCpMatch, setWorstCpMatch] = useState({ type: '', desc: '', score: 0 })
  const [dominantDim, setDominantDim] = useState('drive')
  const [nameInput, setNameInput] = useState('')
  const [toast, setToast] = useState('')

  // Toast 提示
  const showToast = useCallback((msg: string) => {
    setToast(msg)
    setTimeout(() => setToast(''), 2500)
  }, [])

  // 兼容微信浏览器的复制
  const copyText = useCallback(async (text: string) => {
    try {
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(text)
        showToast('文案已复制，去朋友圈/群粘贴吧！')
        return
      }
    } catch (_) { /* fallback */ }
    const ta = document.createElement('textarea')
    ta.value = text
    ta.style.cssText = 'position:fixed;opacity:0;left:-9999px'
    document.body.appendChild(ta)
    ta.select()
    try {
      document.execCommand('copy')
      showToast('文案已复制，去朋友圈/群粘贴吧！')
    } catch (_) {
      prompt('长按复制这段文案：', text)
    }
    document.body.removeChild(ta)
  }, [showToast])

  // 生成分享文案
  const getShareText = useCallback((style: number) => {
    const url = typeof window !== 'undefined' ? window.location.origin : ''
    if (isHiddenType) {
      return `仅有 3.7% 的人解锁了这个隐藏人格——【${runnerType}】。原来我不是懒，是稀有。👇\n${url}`
    }
    if (style === 1) {
      // 自嘲型
      return `测完了，我是【${runnerType}】，${tagline}。😅 有比我更离谱的吗？👇\n${url}`
    }
    // 对战型
    return `我是【${runnerType}】，最合不来的搭子是【${worstCpMatch.type}】。评论区看看谁跟我一样？👇\n${url}`
  }, [runnerType, tagline, worstCpMatch.type, isHiddenType])

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
      setEmoji(result.emoji || '')
      setProfile(result.profile || '')
      setVerdict(result.verdict || '')
      setCpMatch(result.cpMatch)
      setWorstCpMatch(result.worstCpMatch)
      setDominantDim(result.dominantDim || 'drive')
      setAnswers(newAnswers)
      setScreen('result')
    }
  }, [currentIndex, questions, answers])

  const goBack = useCallback(() => {
    if (currentIndex > 0) {
      const newAnswers = answers.slice(0, -1)
      setAnswers(newAnswers)
      setCurrentIndex(prev => prev - 1)
    }
  }, [currentIndex, answers])

  const currentQuestion = questions[currentIndex]
  const progress = questions.length > 0 ? ((currentIndex + 1) / questions.length) * 100 : 0
  const suitableRace = getSuitableRace(runnerType)

  // 趣味进度提示
  const progressLabel = useMemo(() => {
    if (questions.length === 0) return ''
    const pct = (currentIndex + 1) / questions.length
    if (pct <= 0.25) return '🏃 还在热身'
    if (pct <= 0.5) return '⚡ 进入巡航配速'
    if (pct <= 0.75) return '🧱 撞墙期快到了'
    return '🏁 最后冲刺'
  }, [currentIndex, questions.length])

  // 比赛推荐
  const raceRecommendations = useMemo(() => {
    if (!runnerType) return []
    return getRaceRecommendations(runnerType)
  }, [runnerType])

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
    setDominantDim('drive')
    setEmoji('')
    setProfile('')
    setVerdict('')
  }, [])

  // 比赛难度星星
  const renderStars = (score: number) => {
    return '★'.repeat(score) + '☆'.repeat(5 - score)
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
            110道题池 · 每次随机15题<br />
            测出你的跑步人格<br />
            拷问灵魂深处
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
            90秒测出你的跑步人格
          </button>
          <p className="start-note">约需 1-2 分钟</p>
        </div>
      )}

      {/* ==================== 答题页 ==================== */}
      {screen === 'quiz' && currentQuestion && (
        <div className="question-screen" key={currentQuestion.id}>
          <div className="question-header">
            <span className="question-progress">
              {currentIndex > 0 ? (
                <button className="back-btn" onClick={goBack}>← 上一题</button>
              ) : (
                <span>{currentIndex + 1} / {questions.length} · {progressLabel}</span>
              )}
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
                key={`${currentQuestion.id}-${opt.label}`}
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
        <div className={`result-screen ${isHiddenType ? 'hidden-mode' : ''} theme-${dominantDim}`}>
          {/* 悬浮复制按钮 */}
          <button className="sticky-share-btn" onClick={() => copyText(getShareText(Math.random() > 0.5 ? 1 : 2))}>
            📋 分享
          </button>

          <div className="result-badge">
            {isHiddenType ? '🎉 隐藏人格解锁' : '🏁 测试完成'}
          </div>
          {isHiddenType && (
            <div className="scarcity-badge">仅有 3.7% 的跑者解锁此人格</div>
          )}

          {/* 英雄区：角色大图 */}
          <div className="hero-section">
            {emoji && <div className="hero-emoji">{emoji}</div>}
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

          {/* 人格解读 */}
          {profile && (
            <div className="result-profile">
              <p>{profile}</p>
            </div>
          )}

          {/* 拷打 + 画饼 */}
          <div className="result-roast">
            <div className="roast-icon">💀</div>
            <p>{roast}</p>
          </div>

          {/* 判词（可追溯的判定依据） */}
          {verdict && (
            <div className="result-verdict">
              <div className="verdict-icon">🔍</div>
              <div className="verdict-tags">
                {verdict.split('；').filter(Boolean).map((tag, i) => (
                  <span key={i} className="verdict-tag">{tag}</span>
                ))}
              </div>
            </div>
          )}

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

          {/* CP匹配 */}
          <div className="cp-section">
            <div className="cp-match-card best">
              <div className="cp-match-label">🏅 最合拍搭子</div>
              <div className="cp-match-header">
                {getTypeMeta(cpMatch.type).img && (
                  <img src={`/characters/${getTypeMeta(cpMatch.type).img}.png`} alt={cpMatch.type} className="cp-avatar" />
                )}
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
                {getTypeMeta(worstCpMatch.type).img && (
                  <img src={`/characters/${getTypeMeta(worstCpMatch.type).img}.png`} alt={worstCpMatch.type} className="cp-avatar" />
                )}
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
            {!isHiddenType ? (
              <>
                <button className="result-btn-primary" onClick={() => copyText(getShareText(1))}>
                  复制自嘲版文案
                </button>
                <button className="result-btn-secondary" onClick={() => copyText(getShareText(2))}>
                  复制对战版文案
                </button>
              </>
            ) : (
              <button className="result-btn-primary" onClick={() => copyText(getShareText(0))}>
                复制隐藏人格文案
              </button>
            )}
            <button className="result-btn-secondary" onClick={resetQuiz}>
              重新测试
            </button>
          </div>
        </div>
      )}

      {/* Toast */}
      {toast && <div className="toast">{toast}</div>}
    </div>
  )
}
