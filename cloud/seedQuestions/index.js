const cloud = require('wx-server-sdk')
cloud.init({ env: cloud.DYNAMIC_CURRENT_ENV })
const db = cloud.database()

// 题目种子数据 - 需要后续从H5题库转换填入
const ALL_QUESTIONS = [
  // 占位：将通过 CSV 工具转换 H5 题库后填入
  // 格式：{ _id, dimension, category, text, options: [{label,text}], isSoul, isActive, version, stats }
]

exports.main = async (event) => {
  if (ALL_QUESTIONS.length === 0) {
    return { error: 'No questions data. Populate ALL_QUESTIONS first.' }
  }

  const results = { added: 0, errors: [] }
  const cmd = db.command

  for (const q of ALL_QUESTIONS) {
    try {
      await db.collection('questions').doc(q._id).set({
        data: {
          dimension: q.dimension,
          category: q.category,
          text: q.text,
          options: q.options,
          isSoul: q.isSoul || false,
          isActive: q.isActive !== false,
          version: q.version || 1,
          stats: { shownCount: 0, distribution: { A: 0, B: 0, C: 0, D: 0 } },
        }
      })
      results.added++
    } catch (err) {
      results.errors.push({ id: q._id, error: err.message })
    }
  }

  return results
}
