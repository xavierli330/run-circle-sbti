import { kv } from '@vercel/kv'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { runnerType, dimensionScores, answers } = body

    if (!runnerType) {
      return NextResponse.json({ error: 'Missing runnerType' }, { status: 400 })
    }

    const today = new Date().toISOString().slice(0, 10)

    // 并行写入
    await Promise.all([
      // 总测试次数（按日期）
      kv.incr(`stats:daily:${today}`),

      // 角色分布计数
      kv.incr(`stats:type:${runnerType}`),

      // 总计数
      kv.incr('stats:total'),
    ])

    // 存储最近一条完整记录（只保留最近100条）
    const record = {
      runnerType,
      dimensionScores,
      optionDistribution: countOptions(answers),
      ts: Date.now(),
    }
    await kv.lpush('records:recent', JSON.stringify(record))
    await kv.ltrim('records:recent', 0, 99)

    return NextResponse.json({ ok: true })
  } catch (e) {
    console.error('KV write error:', e)
    return NextResponse.json({ ok: true }) // 静默失败，不影响用户体验
  }
}

// GET: 简单统计 dashboard
export async function GET() {
  try {
    const [total, types, daily] = await Promise.all([
      kv.get<number>('stats:total'),
      kv.hgetall<Record<string, number>>('stats:type:*') || getAllTypeStats(),
      kv.get<number>(`stats:daily:${new Date().toISOString().slice(0, 10)}`),
    ])

    return NextResponse.json({
      total: total || 0,
      today: daily || 0,
      types: await getAllTypeStats(),
    })
  } catch (e) {
    console.error('KV read error:', e)
    return NextResponse.json({ total: 0, today: 0, types: {} })
  }
}

async function getAllTypeStats(): Promise<Record<string, number>> {
  const types = [
    '独行侠', '完赛怪', '拍照精', '撞墙王',
    '号码布收藏家', '补给站流浪者', 'Garmin信徒', 'Keep原住民',
    '跑团团长', '赛道天气预报员', '装备极简主义者', '装备焦虑者',
    '素人跑者', '赛博跑者', '精神完赛者', '回归初心型',
    '爬山遇难型', '自补给大师', '散步跑者', 'DNF重生者',
    '打工人跑者', '刷脂战士', '佛系跑者', '卷王',
  ]

  const result: Record<string, number> = {}
  const values = await kv.mget(...types.map(t => `stats:type:${t}`))
  types.forEach((t, i) => {
    result[t] = (values[i] as number) || 0
  })
  return result
}

function countOptions(answers: { optionLabel: string }[]): Record<string, number> {
  const counts: Record<string, number> = {}
  for (const a of answers) {
    counts[a.optionLabel] = (counts[a.optionLabel] || 0) + 1
  }
  return counts
}
