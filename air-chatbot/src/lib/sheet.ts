const SHEET_ID = '1mKAlacC-TeRAE3Q5aGEwf-ZQqQtgX0XQ5JzXzCGYlVw'

const GID = {
  cards: '0',
  questions: '1855911821',
}

function parseCsvRows(csv: string): string[][] {
  const rows: string[][] = []
  let row: string[] = []
  let field = ''
  let inQuote = false

  for (let i = 0; i < csv.length; i++) {
    const ch = csv[i]
    if (inQuote) {
      if (ch === '"') {
        if (csv[i + 1] === '"') { field += '"'; i++ }  // escaped quote
        else { inQuote = false }
      } else {
        field += ch  // newline 포함 그대로 유지
      }
    } else {
      if (ch === '"') {
        inQuote = true
      } else if (ch === ',') {
        row.push(field.trim()); field = ''
      } else if (ch === '\n') {
        row.push(field.trim()); field = ''
        rows.push(row); row = []
      } else if (ch !== '\r') {
        field += ch
      }
    }
  }
  row.push(field.trim())
  if (row.some(f => f !== '')) rows.push(row)
  return rows
}

function csvToObjects(csv: string): Record<string, string>[] {
  const rows = parseCsvRows(csv)
  if (rows.length < 2) return []
  const headers = rows[0].map((h, i) => {
    const clean = h.replace(/^"|"$/g, '').trim()
    // 첫 번째 헤더에 BOM(U+FEFF)이 앞에 붙어있으면 제거
    return i === 0 && clean.charCodeAt(0) === 0xFEFF ? clean.slice(1) : clean
  })
  return rows.slice(1).map(row =>
    Object.fromEntries(headers.map((h, i) => [h, row[i] ?? '']))
  )
}

async function fetchSheet(gid: string): Promise<Record<string, string>[]> {
  const url = `https://docs.google.com/spreadsheets/d/${SHEET_ID}/export?format=csv&gid=${gid}`
  const res = await fetch(url)
  if (!res.ok) throw new Error(`Sheet fetch failed: ${res.status}`)
  const raw = await res.text()
  // Google Sheets CSV 내보내기가 UTF-8 BOM(U+FEFF)을 앞에 붙임 — charCode로 검사해서 제거
  const csv = raw.charCodeAt(0) === 0xFEFF ? raw.slice(1) : raw
  return csvToObjects(csv)
}

export interface CardRow {
  card_id: string
  card_order: number
  card_type: 'banner' | 'faq'
  label: string
  sub_text: string
}

export interface QuestionRow {
  card_id: string
  q_order: number
  question: string
  answer: string
}

export interface CardScript extends CardRow {
  questions: QuestionRow[]
}

let cache: CardScript[] | null = null

export async function loadChatScript(): Promise<CardScript[]> {
  if (cache) return cache

  const [cardRows, questionRows] = await Promise.all([
    fetchSheet(GID.cards),
    fetchSheet(GID.questions),
  ])

  const questions: QuestionRow[] = questionRows.map(r => ({
    card_id: r.card_id || r.ard_id || '',  // BOM으로 첫 글자 'c' 가 날아가는 경우 대응
    q_order: Number(r.q_order),
    question: r.question,
    answer: r.answer,
  }))

  cache = cardRows
    .map(r => ({
      card_id: r.card_id,
      card_order: Number(r.card_order),
      card_type: r.card_type as 'banner' | 'faq',
      label: r.label,
      sub_text: r.sub_text ?? '',
      questions: questions
        .filter(q => q.card_id === r.card_id)
        .sort((a, b) => a.q_order - b.q_order),
    }))
    .sort((a, b) => a.card_order - b.card_order)

  return cache
}
