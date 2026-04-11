#!/usr/bin/env node

/**
 * 题库 CSV <-> JSON 转换工具
 *
 * 用法：
 *   node scripts/csv-tools.mjs json2csv input.json output.csv
 *   node scripts/csv-tools.mjs csv2json input.csv output.json
 *
 * CSV格式：id,dimension,category,text,optionA,optionB,optionC,optionD,isSoul,isActive
 */

import { readFileSync, writeFileSync } from 'fs'

const CSV_HEADERS = ['id', 'dimension', 'category', 'text', 'optionA', 'optionB', 'optionC', 'optionD', 'isSoul', 'isActive']

const VALID_DIMENSIONS = new Set(['A1', 'A2', 'A3', 'A4', 'A5', 'B1', 'B2', 'B3', 'B4'])

function parseCsv(text) {
  const lines = text.trim().split('\n')
  if (lines.length < 2) return []
  const headers = lines[0].split(',').map(h => h.trim())
  return lines.slice(1).map(line => {
    const values = []
    let current = ''
    let inQuotes = false
    for (const ch of line) {
      if (ch === '"') { inQuotes = !inQuotes; continue }
      if (ch === ',' && !inQuotes) { values.push(current.trim()); current = ''; continue }
      current += ch
    }
    values.push(current.trim())
    const obj = {}
    headers.forEach((h, i) => { obj[h] = values[i] || '' })
    return obj
  })
}

function toCsvRow(obj) {
  const values = CSV_HEADERS.map(h => {
    const v = obj[h] ?? ''
    const s = String(v)
    return s.includes(',') || s.includes('"') || s.includes('\n') ? `"${s.replace(/"/g, '""')}"` : s
  })
  return values.join(',')
}

// JSON -> CSV
function json2csv(inputPath, outputPath) {
  const raw = JSON.parse(readFileSync(inputPath, 'utf-8'))
  const questions = Array.isArray(raw) ? raw : raw.questions || []

  const rows = questions.map(q => ({
    id: q._id || q.id,
    dimension: q.dimension,
    category: q.category || 'general',
    text: q.text,
    optionA: q.options?.[0]?.text || q.optionA || '',
    optionB: q.options?.[1]?.text || q.optionB || '',
    optionC: q.options?.[2]?.text || q.optionC || '',
    optionD: q.options?.[3]?.text || q.optionD || '',
    isSoul: q.isSoul ? 'true' : 'false',
    isActive: q.isActive !== false ? 'true' : 'false',
  }))

  const csv = [CSV_HEADERS.join(','), ...rows.map(toCsvRow)].join('\n')
  writeFileSync(outputPath, csv)
  console.log(`Converted ${rows.length} questions to CSV: ${outputPath}`)
}

// CSV -> JSON (cloud DB import format)
function csv2json(inputPath, outputPath) {
  const raw = readFileSync(inputPath, 'utf-8')
  const rows = parseCsv(raw)

  const questions = rows.map(row => ({
    _id: row.id,
    dimension: row.dimension,
    category: row.category || 'general',
    text: row.text,
    options: [
      { label: 'A', text: row.optionA },
      { label: 'B', text: row.optionB },
      { label: 'C', text: row.optionC },
      { label: 'D', text: row.optionD },
    ],
    isSoul: row.isSoul === 'true',
    isActive: row.isActive !== 'false',
    version: 1,
    stats: { shownCount: 0, distribution: { A: 0, B: 0, C: 0, D: 0 } },
  }))

  const errors = []
  for (const q of questions) {
    if (!VALID_DIMENSIONS.has(q.dimension)) errors.push(`  X ${q._id}: invalid dimension "${q.dimension}"`)
    if (q.options.some(o => !o.text)) errors.push(`  X ${q._id}: missing option text`)
  }

  if (errors.length) {
    console.error('Validation errors:')
    errors.forEach(e => console.error(e))
    process.exit(1)
  }

  writeFileSync(outputPath, JSON.stringify(questions, null, 2))
  console.log(`Converted ${questions.length} questions to JSON: ${outputPath}`)
}

const [command, ...args] = process.argv.slice(2)
switch (command) {
  case 'json2csv': json2csv(args[0], args[1]); break
  case 'csv2json': csv2json(args[0], args[1]); break
  default:
    console.log('Usage:')
    console.log('  node scripts/csv-tools.mjs json2csv <input.json> <output.csv>')
    console.log('  node scripts/csv-tools.mjs csv2json <input.csv> <output.json>')
}
