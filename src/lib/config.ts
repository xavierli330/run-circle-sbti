// 图片 CDN 基础路径（jsDelivr 引用 GitHub 仓库文件，国内可访问）
export const IMG_BASE = 'https://cdn.jsdelivr.net/gh/xavierli330/run-circle-sbti@main/code/public/characters'

export function characterImg(id: string): string {
  return `${IMG_BASE}/${id}.png`
}

export const APP_CONFIG = {
  questionPoolSize: 151,
  totalQuestions: 15,
  dimensions: 9,
  questionCacheKey: 'cached_questions',
  questionCacheTTL: 30 * 60 * 1000,
}
