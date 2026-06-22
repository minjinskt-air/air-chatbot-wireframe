import { useEffect, useRef, useState } from 'react'
import { loadChatScript } from '../lib/sheet'
import type { CardScript, QuestionRow } from '../lib/sheet'
import ChatHeader from './v2/ChatHeader'
import DateDivider from './v2/DateDivider'
import BotMessage from './v2/BotMessage'
import UserPill from './v2/UserPill'
import CardCarousel from './v2/CardCarousel'
import AnswerMessage from './v2/AnswerMessage'
import InputBar from './v2/InputBar'
import { colors, font } from './v2/tokens'

interface ChatItem {
  id: string
  kind: 'user' | 'answer' | 'faq-again'
  text?: string
  answer?: string
  card?: CardScript
}

let _id = 0
const uid = () => String(++_id)


export default function ChatBotV2() {
  const [script, setScript] = useState<CardScript[]>([])
  const [items, setItems] = useState<ChatItem[]>([])
  const [ended, setEnded] = useState(false)
  const bottomRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    loadChatScript().then(setScript).catch(console.error)
  }, [])

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [items])

  function handleQuestion(card: CardScript, q: QuestionRow) {
    setItems(prev => [
      ...prev,
      { id: uid(), kind: 'user',     text: q.question },
      { id: uid(), kind: 'answer',   answer: q.answer },
      { id: uid(), kind: 'faq-again', card },
    ])
  }

  function handleEnd() { setEnded(true) }

  function handleRestart() { _id = 0; setItems([]); setEnded(false) }

  return (
    <div style={{
      display: 'flex', flexDirection: 'column',
      width: '100%', maxWidth: 400, height: '100dvh',
      margin: '0 auto', background: '#F2F4F6',
      fontFamily: "'Apple SD Gothic Neo', 'Noto Sans KR', system-ui, sans-serif",
      overflow: 'hidden',
    }}>
      <ChatHeader onEnd={handleEnd} />

      {ended ? (
        /* 상담 종료 화면 */
        <div style={{
          flex: 1, display: 'flex', flexDirection: 'column',
          alignItems: 'center', justifyContent: 'center',
          background: '#F2F4F6', padding: '0 24px',
        }}>
          <p style={{
            textAlign: 'center', fontSize: font.base, color: '#555',
            lineHeight: 1.8, marginBottom: 28,
          }}>
            고객님, 챗봇과의 상담이 종료되었습니다.<br />
            챗봇과 대화를 다시 시작하고 싶으시면,<br />
            아래 버튼을 눌러주세요.
          </p>
          <button onClick={handleRestart} style={{
            background: '#fff', border: '1.5px solid #222',
            borderRadius: 8, padding: '14px 40px',
            fontSize: font.md, fontWeight: 700, color: '#111',
            cursor: 'pointer', letterSpacing: '-0.3px',
          }}>챗봇 시작하기</button>
        </div>
      ) : (
        <>
          {/* 채팅 바디 */}
          <div style={{ flex: 1, overflowY: 'auto', overflowX: 'hidden', padding: '0 14px' }}>
            <DateDivider />

            <BotMessage text="안녕하세요. air 채팅 상담사입니다." time="16:40" />
            <BotMessage text="무엇이 궁금하신가요? 아래에서 선택해 주세요." time="16:40" />

            {/* 캐러셀 — 전체 너비 */}
            {script.length > 0 ? (
              <div style={{ marginBottom: 12, marginTop: 4 }}>
                <CardCarousel cards={script} onSelectQuestion={handleQuestion} />
              </div>
            ) : (
              <div style={{ textAlign: 'center', color: '#CCC', fontSize: font.sm, padding: '20px 0' }}>
                로딩 중...
              </div>
            )}

            {/* 질문 클릭 후 누적 */}
            {items.map(item => {
              if (item.kind === 'user')
                return <UserPill key={item.id} text={item.text!} />
              if (item.kind === 'answer')
                return <AnswerMessage key={item.id} answer={item.answer!} />
              if (item.kind === 'faq-again' && item.card)
                return (
                  <div key={item.id}>
                    <BotMessage text="다른 궁금한 점도 확인해보세요." />
                    <div style={{ marginTop: 4, marginBottom: 12 }}>
                      <InlineFAQCard card={item.card} onSelect={q => handleQuestion(item.card!, q)} />
                    </div>
                  </div>
                )
              return null
            })}

            <div ref={bottomRef} />
          </div>

          <InputBar />
        </>
      )}
    </div>
  )
}

/* 답변 후 재노출되는 소형 FAQ 카드 */
function InlineFAQCard({ card, onSelect }: { card: CardScript; onSelect: (q: QuestionRow) => void }) {
  return (
    <div style={{
      background: '#fff', borderRadius: 14,
      overflow: 'hidden', boxShadow: '0 1px 6px rgba(0,0,0,0.07)',
    }}>
      <div style={{
        padding: '10px 14px 9px', borderBottom: `1px solid ${colors.border}`,
        display: 'flex', alignItems: 'center', gap: 7,
      }}>
        <div style={{
          width: 22, height: 22, borderRadius: '50%',
          background: colors.faqIcon,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          color: '#fff', fontSize: 11, fontWeight: 700,
        }}>!</div>
        <span style={{ fontSize: font.base, fontWeight: 700 }}>{card.label}</span>
      </div>
      {card.questions.slice(0, 4).map((q, idx) => (
        <button key={q.q_order} onClick={() => onSelect(q)}
          style={{
            width: '100%', border: 'none',
            borderBottom: idx < Math.min(card.questions.length, 4) - 1 ? `1px solid ${colors.border}` : 'none',
            background: 'none', padding: '10px 14px',
            textAlign: 'left', cursor: 'pointer',
            fontSize: font.base, color: '#333', lineHeight: 1.5,
            display: 'flex', justifyContent: 'space-between', alignItems: 'center',
          }}
          onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = '#F9F9F9' }}
          onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = 'none' }}
        >
          <span>{q.question}</span>
          <span style={{ color: '#CCC', fontSize: 11, marginLeft: 6 }}>›</span>
        </button>
      ))}
    </div>
  )
}
