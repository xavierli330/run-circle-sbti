import { useState, useMemo, useEffect } from 'react'
import { View, Text, Image, Button } from '@tarojs/components'
import Taro from '@tarojs/taro'
import { getTypeMeta, getRaceRecommendations, DIMENSION_LABELS } from '@/lib/quiz'
import { characterImgHttps, resolveCloudFileIds } from '@/lib/config'
import './index.scss'

const DIMENSION_COLORS: Record<string, string> = {
  A1: '#E63946', A2: '#F4A261', A3: '#2A9D8F',
  A4: '#7B2CBF', A5: '#457B9D',
  B1: '#6A994E', B2: '#BC4749', B3: '#E9C46A', B4: '#264653',
}

export default function Result() {
  const [result] = useState(() => Taro.getStorageSync('quizResult'))
  const [imgUrls, setImgUrls] = useState<Record<string, string>>({})

  // 提前取值，hooks 不受 early return 影响
  const runnerImg = result?.runnerImg || ''
  const cpMatch = result?.cpMatch
  const worstCpMatch = result?.worstCpMatch

  // 通过 getTempFileURL 批量获取带鉴权的临时 HTTPS URL
  useEffect(() => {
    if (!runnerImg) return
    const cpImg = cpMatch ? getTypeMeta(cpMatch.type).img : ''
    const worstImg = worstCpMatch ? getTypeMeta(worstCpMatch.type).img : ''
    const paths = [runnerImg, cpImg, worstImg]
      .filter(Boolean)
      .map(id => `characters/${id}.png`)

    resolveCloudFileIds(paths).then(setImgUrls)
  }, [runnerImg, cpMatch, worstCpMatch])

  if (!result) return <View />

  const {
    userName, runnerType, runnerTypeEn, tagline,
    eggSymbols, isHiddenType, dimensionScores,
    roast, hype, action, verdict, profile, emoji, dominantDim,
  } = result

  // 解析完成后才有值，避免 cloud:// 307 或裸 HTTPS 403
  const getImgUrl = (id: string) => imgUrls[`characters/${id}.png`] || ''

  const donutSegments = useMemo(() => {
    const entries = Object.entries(dimensionScores || {}).filter(([_, s]: [string, number]) => s > 0)
    if (entries.length === 0) return []
    const total = entries.reduce((sum: number, [_, s]: [string, number]) => sum + s, 0)
    let cumulative = 0
    return entries
      .sort((a: [string, number], b: [string, number]) => b[1] - a[1])
      .map(([dim, score]: [string, number]) => {
        const pct = total > 0 ? (score / total) * 100 : 0
        const seg = { dim, score, pct, start: cumulative, color: DIMENSION_COLORS[dim] || '#94A3B8' }
        cumulative += pct
        return seg
      })
  }, [dimensionScores])

  const raceRecommendations = useMemo(() => {
    if (!runnerType) return []
    return getRaceRecommendations(runnerType)
  }, [runnerType])

  const resetQuiz = () => {
    Taro.removeStorageSync('quizState')
    Taro.removeStorageSync('quizResult')
    Taro.reLaunch({ url: '/pages/index/index' })
  }

  // @ts-ignore - used by WeChat share button
  const _onShareAppMessage = () => ({
    title: `我是${runnerType}！测测你是哪种跑者`,
    path: '/pages/index/index',
    imageUrl: runnerImg ? characterImgHttps(runnerImg) : '',
  })

  const copyShareText = () => {
    const text = `我是${runnerType}！「${tagline}」\n${roast}\n测测你是哪种跑者 → 跑圈SBTI`
    Taro.setClipboardData({ data: text })
  }

  const renderStars = (score: number) => '★'.repeat(score) + '☆'.repeat(5 - score)

  return (
    <View className={`result-screen ${isHiddenType ? 'hidden-mode' : ''} theme-${dominantDim || 'drive'}`}>
      {/* badge */}
      <View className='result-badge'>
        <Text>{isHiddenType ? '🎉 隐藏人格解锁' : '🏁 测试完成'}</Text>
      </View>

      {/* 英雄区 */}
      <View className='hero-section'>
        {emoji && <Text className='hero-emoji'>{emoji}</Text>}
        {getImgUrl(runnerImg)
          ? <Image className='hero-avatar' src={getImgUrl(runnerImg)} mode='aspectFill' />
          : <View className='hero-avatar hero-avatar-loading' />
        }
        {userName && <Text className='result-name'>{userName}</Text>}
        <Text className='hero-type'>{runnerType}</Text>
        {runnerTypeEn && <Text className='hero-type-en'>{runnerTypeEn}</Text>}
        {tagline && <Text className='hero-tagline'>"{tagline}"</Text>}
        {eggSymbols && eggSymbols.length > 0 && (
          <Text className='hero-eggs'>{eggSymbols.join('')}</Text>
        )}
      </View>

      {/* 人格解读 */}
      {profile && (
        <View className='result-profile'>
          <Text className='profile-label'>人格解读</Text>
          <Text className='profile-text'>{profile}</Text>
        </View>
      )}

      {/* 拷打 */}
      <View className='result-roast'>
        <Text className='roast-icon'>💀</Text>
        <Text className='roast-text'>{roast}</Text>
      </View>

      {/* 判词 */}
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

      {/* 画饼 */}
      {hype && (
        <View className='result-hype'>
          <Text className='hype-icon'>🎯</Text>
          <Text className='hype-text'>{hype}</Text>
        </View>
      )}

      {/* 行动指引 */}
      {action && (
        <View className='result-action'>
          <Text className='action-label'>下一步：</Text>
          <Text className='action-text'>{action}</Text>
        </View>
      )}

      {/* 维度条形图 */}
      <View className='dimension-section'>
        <Text className='dimension-title'>跑步人格构成</Text>
        <View className='donut-wrap'>
          <View className='donut-chart'>
            {donutSegments.map((seg) => (
              <View key={seg.dim} className='dim-bar-row'>
                <Text className='dim-label'>{DIMENSION_LABELS[seg.dim] || seg.dim}</Text>
                <View className='dim-bar-bg'>
                  <View className='dim-bar-fill' style={{ width: `${Math.round(seg.pct)}%`, backgroundColor: seg.color }} />
                </View>
                <Text className='dim-pct'>{Math.round(seg.pct)}%</Text>
              </View>
            ))}
          </View>
        </View>
        <Text className='dimension-hint'>
          标签由{donutSegments.length}个维度共同塑造
        </Text>
      </View>

      {/* CP匹配 */}
      <View className='cp-section'>
        <View className='cp-match-card best'>
          <Text className='cp-match-label'>🏅 最合拍搭子</Text>
          <View className='cp-match-header'>
            {(() => {
              const m = getTypeMeta(cpMatch.type)
              const url = m.img ? getImgUrl(m.img) : ''
              return url
                ? <Image className='cp-avatar' src={url} mode='aspectFill' />
                : <View className='cp-avatar cp-avatar-loading' />
            })()}
            <View className='cp-match-info'>
              <Text className='cp-match-type best-text'>{cpMatch.type}</Text>
              <Text className='cp-match-en'>{getTypeMeta(cpMatch.type).en}</Text>
            </View>
          </View>
          <Text className='cp-match-desc'>{cpMatch.desc}</Text>
          <Text className='cp-match-score best-score'>契合度 {cpMatch.score}%</Text>
        </View>

        <View className='cp-match-card worst'>
          <Text className='cp-match-label worst-label'>💀 最合不来搭子</Text>
          <View className='cp-match-header'>
            {(() => {
              const m = getTypeMeta(worstCpMatch.type)
              const url = m.img ? getImgUrl(m.img) : ''
              return url
                ? <Image className='cp-avatar' src={url} mode='aspectFill' />
                : <View className='cp-avatar cp-avatar-loading' />
            })()}
            <View className='cp-match-info'>
              <Text className='cp-match-type worst-text'>{worstCpMatch.type}</Text>
              <Text className='cp-match-en'>{getTypeMeta(worstCpMatch.type).en}</Text>
            </View>
          </View>
          <Text className='cp-match-desc'>{worstCpMatch.desc}</Text>
          <Text className='cp-match-score worst-score'>冲突值 {worstCpMatch.score}%</Text>
        </View>
      </View>

      {/* 比赛推荐 */}
      {raceRecommendations.length > 0 && (
        <View className='race-section'>
          <Text className='race-section-title'>📍 推荐比赛</Text>
          {raceRecommendations.map((race, idx) => (
            <View key={idx} className='race-card'>
              <View className='race-card-header'>
                <Text className='race-name'>{race.name}</Text>
                <Text className='race-distance'>{race.distance}</Text>
              </View>
              <View className='race-tags'>
                {race.tags.map((tag, i) => (
                  <Text key={i} className='race-tag'>{tag}</Text>
                ))}
              </View>
              <View className='race-scores'>
                <Text className='race-score-item'>难度 {renderStars(race.difficulty)}</Text>
                <Text className='race-score-item'>风景 {renderStars(race.scenery)}</Text>
                <Text className='race-score-item'>补给 {renderStars(race.supplies)}</Text>
                <Text className='race-score-item'>文化 {renderStars(race.culture)}</Text>
              </View>
            </View>
          ))}
        </View>
      )}

      {/* 操作按钮 */}
      <View className='result-actions'>
        <Button className='result-btn-copy' onClick={copyShareText}>
          复制文案
        </Button>
        <Button className='result-btn-primary' openType='share'>
          📤 分享给跑友
        </Button>
        <Button className='result-btn-secondary' onClick={resetQuiz}>
          重新测试
        </Button>
      </View>
    </View>
  )
}
