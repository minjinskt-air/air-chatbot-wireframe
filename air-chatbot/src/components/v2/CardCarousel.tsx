import { useEffect, useRef, useState } from 'react'
import type { CardScript, QuestionRow } from '../../lib/sheet'
import { colors, font, radius } from './tokens'

interface Props {
  cards: CardScript[]
  onSelectQuestion: (card: CardScript, q: QuestionRow) => void
}

function BannerSlide({ card }: { card: CardScript }) {
  return (
    <div style={{
      background: colors.bannerBg,
      borderRadius: radius.card,
      padding: '18px 16px 16px',
      minHeight: 200,
      position: 'relative', overflow: 'hidden',
      display: 'flex', flexDirection: 'column', justifyContent: 'space-between',
    }}>
      {/* 칩 */}
      <div style={{
        display: 'inline-flex', alignItems: 'center',
        border: `1px solid ${colors.bannerChip}`,
        borderRadius: 20, padding: '2px 10px',
        fontSize: font.xs, color: colors.bannerChip,
        width: 'fit-content', marginBottom: 10,
      }}>{card.label}</div>

      {/* 타이틀 */}
      <div style={{ fontSize: 18, fontWeight: 800, color: '#1A1A1A', lineHeight: 1.4, flex: 1 }}>
        {card.sub_text}
      </div>

      {/* 날짜 */}
      <div style={{ fontSize: font.xs, color: '#888', margin: '8px 0 12px' }}>
        2026. 4. 1 – 2026. 4. 30
      </div>

      {/* 일러스트 자리 */}
      <div style={{
        position: 'absolute', right: -10, bottom: 30,
        width: 100, height: 100,
        fontSize: 60, opacity: 0.15, userSelect: 'none',
      }}>👥</div>

      {/* CTA 버튼 */}
      <button style={{
        background: '#1A1A1A', color: '#fff',
        border: 'none', borderRadius: 10,
        padding: '11px 0', width: '100%',
        fontSize: font.base, fontWeight: 600, cursor: 'pointer',
      }}>이벤트 참여하기 →</button>
    </div>
  )
}

function FAQSlide({ card, onSelect }: { card: CardScript; onSelect: (q: QuestionRow) => void }) {
  return (
    <div style={{
      background: colors.cardBg,
      borderRadius: radius.card,
      overflow: 'hidden',
      boxShadow: '0 2px 10px rgba(0,0,0,0.07)',
    }}>
      {/* 카드 헤더 */}
      <div style={{
        padding: '13px 14px 11px',
        borderBottom: `1px solid ${colors.border}`,
        display: 'flex', alignItems: 'center', gap: 8,
      }}>
        <div style={{
          width: 26, height: 26, borderRadius: '50%',
          background: colors.faqIcon,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          color: '#fff', fontSize: font.sm, fontWeight: 700, flexShrink: 0,
        }}>!</div>
        <span style={{ fontSize: font.base, fontWeight: 700, color: colors.text }}>
          {card.label}
        </span>
      </div>

      {/* 질문 목록 */}
      {card.questions.slice(0, 4).map((q, idx) => (
        <button
          key={q.q_order}
          onClick={() => onSelect(q)}
          style={{
            width: '100%', border: 'none',
            borderBottom: idx < Math.min(card.questions.length, 4) - 1 ? `1px solid ${colors.border}` : 'none',
            background: 'none', padding: '11px 14px',
            textAlign: 'left', cursor: 'pointer',
            fontSize: font.base, color: '#333', lineHeight: 1.5,
            display: 'flex', justifyContent: 'space-between', alignItems: 'center',
          }}
          onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = '#F9F9F9' }}
          onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = 'none' }}
        >
          <span>{q.question}</span>
          <span style={{ color: '#CCC', fontSize: font.sm, marginLeft: 6, flexShrink: 0 }}>›</span>
        </button>
      ))}
    </div>
  )
}

export default function CardCarousel({ cards, onSelectQuestion }: Props) {
  const containerRef = useRef<HTMLDivElement>(null)
  const scrollRef = useRef<HTMLDivElement>(null)
  const [active, setActive] = useState(0)
  const [slideW, setSlideW] = useState(260)

  useEffect(() => {
    if (containerRef.current) {
      setSlideW(containerRef.current.clientWidth - 28)
    }
  }, [])

  const banners = cards.filter(c => c.card_type === 'banner')
  const faqs = cards.filter(c => c.card_type === 'faq')
  const slides = [...banners, ...faqs]

  function handleScroll() {
    const el = scrollRef.current
    if (!el) return
    const idx = Math.round(el.scrollLeft / (el.clientWidth - 24))
    setActive(Math.max(0, Math.min(idx, slides.length - 1)))
  }

  return (
    <div ref={containerRef} style={{ marginBottom: 12 }}>
      {/* 슬라이드 영역 */}
      <div
        ref={scrollRef}
        onScroll={handleScroll}
        style={{
          display: 'flex', gap: 10,
          overflowX: 'auto', scrollSnapType: 'x mandatory',
          paddingRight: 20, paddingBottom: 4,
          scrollbarWidth: 'none',
          msOverflowStyle: 'none',
          WebkitOverflowScrolling: 'touch',
        } as React.CSSProperties}
      >
        {slides.map(card => (
          <div
            key={card.card_id}
            style={{
              scrollSnapAlign: 'start', flexShrink: 0,
              width: slideW,
            }}
          >
            {card.card_type === 'banner'
              ? <BannerSlide card={card} />
              : <FAQSlide card={card} onSelect={q => onSelectQuestion(card, q)} />
            }
          </div>
        ))}
      </div>

      {/* Dot indicator */}
      <div style={{ display: 'flex', justifyContent: 'center', gap: 5, marginTop: 10 }}>
        {slides.map((_, i) => (
          <div
            key={i}
            style={{
              width: active === i ? 16 : 6, height: 6,
              borderRadius: 3,
              background: active === i ? colors.primary : '#CCC',
              transition: 'all 0.2s',
            }}
          />
        ))}
      </div>
    </div>
  )
}
