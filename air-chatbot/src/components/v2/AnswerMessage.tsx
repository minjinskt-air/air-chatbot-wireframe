import { useState } from 'react'
import { colors, font, radius } from './tokens'

interface Props { answer: string; time?: string }

const PREVIEW = 160

function nowTime() {
  return new Date().toLocaleTimeString('ko-KR', { hour: '2-digit', minute: '2-digit', hour12: false })
}

function formatLines(text: string) {
  return text.split('\n').map((line, i) => {
    const t = line.trim()
    if (!t) return <br key={i} />
    if (/^[①②③④⑤⑥]/.test(t) || /^\d+[.)]\s/.test(t))
      return <div key={i} style={{ display: 'flex', gap: 5, marginTop: 3 }}><span style={{ color: colors.primary, fontWeight: 700, flexShrink: 0 }}>{t.match(/^[①-⑩\d]+[.)]?\s?/)?.[0]}</span><span>{t.replace(/^[①-⑩\d]+[.)]?\s?/, '')}</span></div>
    if (t.startsWith('※') || t.startsWith('*'))
      return <div key={i} style={{ color: '#999', fontSize: font.xs, marginTop: 3 }}>{t}</div>
    if (t.startsWith('■'))
      return <div key={i} style={{ fontWeight: 700, marginTop: 5 }}>{t}</div>
    if (t.startsWith('-') || t.startsWith('·'))
      return <div key={i} style={{ paddingLeft: 8, marginTop: 2 }}>{t}</div>
    return <div key={i} style={{ marginTop: i === 0 ? 0 : 2 }}>{t}</div>
  })
}

export default function AnswerMessage({ answer, time }: Props) {
  const [expanded, setExpanded] = useState(false)
  const needsExpand = answer.length > PREVIEW
  const display = expanded || !needsExpand ? answer : answer.slice(0, PREVIEW) + '...'

  return (
    <div style={{ display: 'flex', alignItems: 'flex-start', gap: 8, marginBottom: 12 }}>
      <div style={{
        width: 32, height: 32, borderRadius: '50%', flexShrink: 0,
        background: 'linear-gradient(135deg, #00ACC1, #00BFA5)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        color: '#fff', fontWeight: 700, fontSize: font.sm,
      }}>A</div>

      <div style={{ flex: 1 }}>
        <div style={{ fontSize: font.xs, color: colors.textSub, marginBottom: 4 }}>air 채팅 상담사</div>
        <div style={{ display: 'flex', alignItems: 'flex-end', gap: 6 }}>
          <div style={{
            background: colors.botBg,
            borderRadius: `0 ${radius.bubble}px ${radius.bubble}px ${radius.bubble}px`,
            padding: '12px 14px',
            fontSize: font.base, lineHeight: 1.8, color: colors.text,
            boxShadow: '0 1px 4px rgba(0,0,0,0.07)',
            maxWidth: '80%',
          }}>
            {formatLines(display)}
            {needsExpand && (
              <button
                onClick={() => setExpanded(v => !v)}
                style={{
                  marginTop: 10, width: '100%',
                  background: 'none', border: 'none',
                  color: '#AAA', fontSize: font.xs, cursor: 'pointer',
                  display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 3,
                }}
              >{expanded ? '접기 ∧' : '더보기 ∨'}</button>
            )}
          </div>
          <span style={{ fontSize: font.xs, color: colors.textSub, flexShrink: 0 }}>
            {time ?? nowTime()}
          </span>
        </div>
      </div>
    </div>
  )
}
