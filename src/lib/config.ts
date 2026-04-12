import Taro from '@tarojs/taro'

// 云环境 ID
const CLOUD_ENV_ID = 'cloudbase-0gee31xf07dc885a'

// 云存储 fileId 前缀（页面 <Image> 可直接使用 cloud://）
const CLOUD_STORAGE_FILEID_BASE = `cloud://${CLOUD_ENV_ID}.636c-${CLOUD_ENV_ID}-1403757455`

// 云存储 HTTPS 下载域名（分享图、海报、外部链接等必须用 https://）
const CLOUD_STORAGE_HTTPS_BASE = `https://636c-${CLOUD_ENV_ID}-1403757455.tcb.qcloud.la`

/**
 * 获取云存储 fileId（适用于小程序 <Image src="cloud://..." />）
 * @param path 相对于根目录的路径，例如 'characters/lone_wolf.png'
 */
export function cloudFileId(path: string): string {
  return `${CLOUD_STORAGE_FILEID_BASE}/${path}`
}

/**
 * 获取云存储 HTTPS 下载链接（适用于分享、海报、外部平台）
 * @param path 相对于根目录的路径，例如 'characters/lone_wolf.png'
 */
export function cloudHttpsUrl(path: string): string {
  return `${CLOUD_STORAGE_HTTPS_BASE}/${path}`
}

// 统一使用 HTTPS URL，避免 cloud:// 在 DevTools 本地调试时无法解析
export function characterImg(id: string): string {
  return cloudFileId(`characters/${id}.png`)
}

// 分享图/海报等必须用 https
export function characterImgHttps(id: string): string {
  return cloudHttpsUrl(`characters/${id}.png`)
}

// ── 云存储 URL 解析缓存 ──
const resolvedCache = new Map<string, string>()

/**
 * 批量将 cloud:// fileId 解析为带鉴权的临时 HTTPS URL
 * tcb.qcloud.la 裸 HTTPS 会 403，必须通过 getTempFileURL 获取带 token 的链接
 */
export async function resolveCloudFileIds(paths: string[]): Promise<Record<string, string>> {
  const result: Record<string, string> = {}
  const toResolve: { path: string; fileId: string }[] = []

  for (const path of paths) {
    const fileId = cloudFileId(path)
    if (resolvedCache.has(fileId)) {
      result[path] = resolvedCache.get(fileId)!
    } else {
      toResolve.push({ path, fileId })
    }
  }

  if (toResolve.length === 0) return result

  // 通过云函数获取临时 URL（云函数有管理员权限，不受存储安全规则限制）
  try {
    const res = await Taro.cloud.callFunction({
      name: 'getImageUrls',
      data: { fileIds: toResolve.map(item => item.fileId) },
    })
    const data = res.result as { success: boolean; urls: Record<string, string> }
    if (data.success && data.urls) {
      for (const entry of toResolve) {
        const tempUrl = data.urls[entry.fileId]
        if (tempUrl) {
          resolvedCache.set(entry.fileId, tempUrl)
          result[entry.path] = tempUrl
        }
      }
    }
  } catch (e) {
    console.warn('[cloud] getImageUrls cloud function failed:', e)
  }

  return result
}

export const APP_CONFIG = {
  questionPoolSize: 151,
  totalQuestions: 15,
  dimensions: 9,
  questionCacheKey: 'cached_questions',
  questionCacheTTL: 30 * 60 * 1000,
}
