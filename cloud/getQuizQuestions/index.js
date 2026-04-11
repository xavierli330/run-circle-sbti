const cloud = require('wx-server-sdk')
cloud.init({ env: cloud.DYNAMIC_CURRENT_ENV })
const db = cloud.database()

exports.main = async (event) => {
  try {
    // 云DB单次最多100条，需要分页获取
    let allQuestions = []
    let batch = 0
    const MAX_BATCH = 5

    while (batch < MAX_BATCH) {
      const { data } = await db.collection('questions')
        .where({ isActive: true })
        .skip(batch * 100)
        .limit(100)
        .get()

      allQuestions = allQuestions.concat(data)
      if (data.length < 100) break
      batch++
    }

    const byDimension = {}
    for (const q of allQuestions) {
      if (!byDimension[q.dimension]) byDimension[q.dimension] = []
      byDimension[q.dimension].push(q)
    }

    return {
      success: true,
      questions: allQuestions,
      byDimension,
      totalCount: allQuestions.length,
      dimensionCounts: Object.fromEntries(
        Object.entries(byDimension).map(([k, v]) => [k, v.length])
      ),
    }
  } catch (err) {
    return { success: false, error: err.message, questions: [] }
  }
}
