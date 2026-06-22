import { useState } from 'react'

interface Props { answer: string }

const PREVIEW_LENGTH = 150

function formatAnswer(text: string) {
  return text.split('\n').map((line, i) => {
    const trimmed = line.trim()
    if (!trimmed) return <br key={i} />
    // 번호 항목 (①②③ 또는 1) 2) 형식)
    if (/^[①②③④⑤⑥⑦⑧⑨⑩]/.test(trimmed) || /^\d+[.)]\s/.test(trimmed)) {
      return (
        <div key={i} style={{ display: 'flex', gap: 6, marginTop: 4 }}>
          <span style={{ color: '#00BFA5', fontWeight: 700, flexShrink: 0 }}>
            {trimmed.match(/^[①-⑩\d]+[.)]?\s?/)?.[0]}
          </span>
          <span>{trimmed.replace(/^[①-⑩\d]+[.)]?\s?/, '')}</span>
        </div>
      )
    }
    // ※ 주석
    if (trimmed.startsWith('※') || trimmed.startsWith('*')) {
      return <div key={i} style={{ color: '#888', fontSize: 12, marginTop: 4 }}>{trimmed}</div>
    }
    // 대시 목록
    if (trimmed.startsWith('-') || trimmed.startsWith('·')) {
      return <div key={i} style={{ paddingLeft: 10, marginTop: 2 }}>{trimmed}</div>
    }
    // ■ 소제목
    if (trimmed.startsWith('■')) {
      return <div key={i} style={{ fontWeight: 700, marginTop: 6 }}>{trimmed}</div>
    }
    return <div key={i} style={{ marginTop: i === 0 ? 0 : 2 }}>{trimmed}</div>
  })
}

export default function AnswerCard({ answer }: Props) {
  const [expanded, setExpanded] = useState(false)
  const needsExpand = answer.length > PREVIEW_LENGTH
  const displayText = expanded || !needsExpand ? answer : answer.slice(0, PREVIEW_LENGTH) + '...'

  return (
    <div style={{
      background: '#fff',
      borderRadius: 14,
      padding: '14px 14px 12px',
      marginBottom: 4,
      boxShadow: '0 1px 6px rgba(0,0,0,0.07)',
    }}>
      <div style={{ display: 'flex', gap: 10, alignItems: 'flex-start' }}>
        {/* 마젠타 화살표 아이콘 */}
        <div style={{
          width: 28, height: 28, borderRadius: '50%',
          background: '#F3E5F5',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: 14, flexShrink: 0, color: '#C2185B',
          fontWeight: 700,
        }}>↗</div>
        <div style={{ fontSize: 13, lineHeight: 1.8, color: '#333', flex: 1 }}>
          {formatAnswer(displayText)}
        </div>
      </div>
      {needsExpand && (
        <button
          onClick={() => setExpanded(v => !v)}
          style={{
            marginTop: 10, width: '100%',
            background: 'none', border: 'none',
            color: '#999', fontSize: 12, cursor: 'pointer',
            display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 4,
            padding: '4px 0',
          }}
        >
          {expanded ? '접기 ∧' : '더보기 ∨'}
        </button>
      )}
    </div>
  )
}
