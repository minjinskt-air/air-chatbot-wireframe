import type { CardScript, QuestionRow } from '../lib/sheet'
import { useChatStore } from '../store/chatStore'

interface Props { card: CardScript }

export default function QuestionList({ card }: Props) {
  const selectQuestion = useChatStore(s => s.selectQuestion)

  return (
    <div style={{
      background: '#fff',
      borderRadius: 14,
      overflow: 'hidden',
      marginBottom: 4,
      boxShadow: '0 1px 6px rgba(0,0,0,0.07)',
    }}>
      {/* 카드 헤더 */}
      <div style={{
        padding: '12px 14px 10px',
        borderBottom: '1px solid #F0F0F0',
        display: 'flex', alignItems: 'center', gap: 8,
      }}>
        <div style={{
          width: 26, height: 26, borderRadius: 6,
          background: 'linear-gradient(135deg, #00ACC1, #00BFA5)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: 13, color: '#fff',
        }}>?</div>
        <span style={{ fontSize: 13, fontWeight: 700, color: '#222' }}>
          {card.label}
        </span>
      </div>

      {/* 질문 목록 */}
      <div>
        {card.questions.map((q: QuestionRow, idx: number) => (
          <button
            key={q.q_order}
            onClick={() => selectQuestion(card, q)}
            style={{
              width: '100%',
              background: 'none',
              border: 'none',
              borderBottom: idx < card.questions.length - 1 ? '1px solid #F5F5F5' : 'none',
              padding: '11px 14px',
              textAlign: 'left',
              cursor: 'pointer',
              fontSize: 13,
              color: '#333',
              lineHeight: 1.5,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              transition: 'background 0.1s',
            }}
            onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = '#F8F8FF' }}
            onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = 'none' }}
          >
            <span>{q.question}</span>
            <span style={{ color: '#CCC', fontSize: 12, marginLeft: 8, flexShrink: 0 }}>›</span>
          </button>
        ))}
      </div>
    </div>
  )
}
