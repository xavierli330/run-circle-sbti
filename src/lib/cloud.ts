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
}

/** 从云数据库获取所有活跃题目（带缓存） */
export async function fetchQuestions(): Promise<Question[]> {
  // 1. 检查本地缓存
  try {
    const cached = Taro.getStorageSync(APP_CONFIG.questionCacheKey)
    const cacheTime = Taro.getStorageSync(APP_CONFIG.questionCacheKey + '_time')
    if (cached && cached.length > 0 && cacheTime) {
      const age = Date.now() - cacheTime
      if (age < APP_CONFIG.questionCacheTTL) {
        console.log(`Using cached questions (${cached.length} questions, ${Math.round(age / 60000)}min old)`)
        return cached
      }
    }
  } catch (e) {
    // cache read failed, continue to fetch
  }

  // 2. 从云数据库获取
  try {
    const res = await Taro.cloud.callFunction({
      name: 'getQuizQuestions',
    })

    const data = res.result as { success: boolean; questions: CloudQuestion[]; error?: string }

    if (data.success && data.questions && data.questions.length > 0) {
      const questions: Question[] = data.questions.map(q => ({
        id: q._id,
        dimension: q.dimension,
        text: q.text,
        options: q.options,
        isSoul: q.isSoul,
      }))

      // 写入缓存
      try {
        Taro.setStorageSync(APP_CONFIG.questionCacheKey, questions)
        Taro.setStorageSync(APP_CONFIG.questionCacheKey + '_time', Date.now())
      } catch (e) {
        // cache write failed, non-critical
      }

      console.log(`Fetched ${questions.length} questions from cloud DB`)
      return questions
    }
    console.warn('Cloud fetch failed:', data.error)
  } catch (err) {
    console.warn('Cloud function error:', err)
  }

  // 3. 降级：尝试使用过期缓存
  try {
    const cached = Taro.getStorageSync(APP_CONFIG.questionCacheKey)
    if (cached && cached.length > 0) {
      console.log('Falling back to expired cache')
      return cached
    }
  } catch (e) {
    // give up
  }

  console.error('No questions available')
  return []
}

/** 清除题目缓存 */
export function clearQuestionCache() {
  try {
    Taro.removeStorageSync(APP_CONFIG.questionCacheKey)
    Taro.removeStorageSync(APP_CONFIG.questionCacheKey + '_time')
  } catch (e) {
    // ignore
  }
}
