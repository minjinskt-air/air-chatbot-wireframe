import type { CardScript } from '../lib/sheet'
import { useChatStore } from '../store/chatStore'

interface Props { cards: CardScript[] }

export default function CardGrid({ cards }: Props) {
  const selectCard = useChatStore(s => s.selectCard)

  return (
    <div style={{ marginBottom: 12 }}>
      {/* 배너 카드 */}
      {cards.filter(c => c.card_type === 'banner').map(card => (
        <div key={card.card_id} style={{
          background: 'linear-gradient(135deg, #6C63FF 0%, #3ECFCF 100%)',
          borderRadius: 14, padding: '16px 20px', marginBottom: 10, color: '#fff',
        }}>
          <div style={{ fontSize: 11, opacity: 0.85, marginBottom: 4 }}>{card.label}</div>
          <div style={{ fontSize: 15, fontWeight: 700 }}>{card.sub_text}</div>
        </div>
      ))}

      {/* FAQ 카드 그리드 */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
        {cards.filter(c => c.card_type === 'faq').map(card => (
          <button
            key={card.card_id}
            onClick={() => selectCard(card)}
            style={{
              background: '#fff', border: '1.5px solid #E8E8F0',
              borderRadius: 12, padding: '14px 12px',
              textAlign: 'left', cursor: 'pointer',
              fontSize: 13, fontWeight: 600, color: '#333',
              lineHeight: 1.4,
              transition: 'border-color 0.15s, box-shadow 0.15s',
            }}
            onMouseEnter={e => {
              (e.currentTarget as HTMLButtonElement).style.borderColor = '#6C63FF'
              ;(e.currentTarget as HTMLButtonElement).style.boxShadow = '0 2px 8px rgba(108,99,255,0.15)'
            }}
            onMouseLeave={e => {
              (e.currentTarget as HTMLButtonElement).style.borderColor = '#E8E8F0'
              ;(e.currentTarget as HTMLButtonElement).style.boxShadow = 'none'
            }}
          >
            <div style={{ fontSize: 20, marginBottom: 6 }}>
              {categoryEmoji(card.card_id)}
            </div>
            {card.label}
          </button>
        ))}
      </div>
    </div>
  )
}

function categoryEmoji(card_id: string): string {
  const map: Record<string, string> = {
    promo_bonus: '🎁',
    signup: '📱',
    point: '💰',
    air_join: '✈️',
    payment: '💳',
    esim_usim: '🔌',
  }
  return map[card_id] ?? '💬'
}
