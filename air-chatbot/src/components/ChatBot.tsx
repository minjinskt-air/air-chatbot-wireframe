import { useEffect, useRef } from 'react'
import { loadChatScript } from '../lib/sheet'
import { useChatStore } from '../store/chatStore'
import BotBubble from './BotBubble'
import UserBubble from './UserBubble'
import CardGrid from './CardGrid'
import QuestionList from './QuestionList'
import AnswerCard from './AnswerBubble'

export default function ChatBot() {
  const { messages, setScript, reset, goBack, history } = useChatStore()
  const bottomRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    loadChatScript().then(setScript).catch(console.error)
  }, [setScript])

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  return (
    <div style={{
      display: 'flex', flexDirection: 'column',
      width: '100%', maxWidth: 400, height: '100dvh',
      margin: '0 auto', background: '#F2F4F6',
      fontFamily: "'Apple SD Gothic Neo', 'Noto Sans KR', system-ui, sans-serif",
    }}>

      {/* 헤더 */}
      <div style={{
        background: 'linear-gradient(135deg, #00ACC1 0%, #00BFA5 100%)',
        padding: '13px 16px',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        flexShrink: 0,
      }}>
        <div style={{ fontSize: 16, fontWeight: 700, color: '#fff' }}>air 고객센터 FAQ</div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <button
            onClick={reset}
            style={{
              background: 'rgba(255,255,255,0.25)', border: 'none',
              borderRadius: 14, padding: '5px 12px',
              fontSize: 12, color: '#fff', cursor: 'pointer',
            }}
          >처음으로</button>
          <button
            onClick={reset}
            style={{
              background: '#fff', border: 'none',
              borderRadius: 14, padding: '5px 12px',
              fontSize: 12, color: '#00ACC1', cursor: 'pointer', fontWeight: 700,
            }}
          >상담종료</button>
        </div>
      </div>

      {/* 메시지 영역 */}
      <div style={{
        flex: 1, overflowY: 'auto', padding: '14px 12px',
        display: 'flex', flexDirection: 'column',
      }}>
        {messages.length === 0 && (
          <div style={{ textAlign: 'center', color: '#bbb', fontSize: 13, marginTop: 40 }}>
            로딩 중...
          </div>
        )}
        {messages.map(msg => {
          const p = msg.payload
          switch (p.type) {
            case 'bot-text':
              return <BotBubble key={msg.id} text={p.text} />
            case 'user-text':
              return <UserBubble key={msg.id} text={p.text} />
            case 'card-grid':
              return <CardGrid key={msg.id} cards={p.cards} />
            case 'question-list':
              return <QuestionList key={msg.id} card={p.card} />
            case 'answer':
              return <AnswerCard key={msg.id} answer={p.answer} />
            default:
              return null
          }
        })}
        <div ref={bottomRef} />
      </div>

      {/* 이전/처음 버튼 */}
      <div style={{
        background: '#fff', padding: '8px 12px',
        borderTop: '1px solid #EBEBEB',
        display: 'flex', gap: 8, flexShrink: 0,
      }}>
        <button
          onClick={goBack}
          disabled={history.length === 0}
          style={{
            flex: 1, padding: '9px 0',
            background: '#fff',
            border: `1.5px solid ${history.length === 0 ? '#E8E8E8' : '#CCCCCC'}`,
            borderRadius: 8, fontSize: 13,
            color: history.length === 0 ? '#CCC' : '#555',
            cursor: history.length === 0 ? 'default' : 'pointer',
          }}
        >이전으로</button>
        <button
          onClick={reset}
          style={{
            flex: 1, padding: '9px 0',
            background: '#fff', border: '1.5px solid #CCCCCC',
            borderRadius: 8, fontSize: 13, color: '#555', cursor: 'pointer',
          }}
        >처음으로</button>
      </div>

      {/* 채팅상담사 연결 (고정 바) */}
      <button style={{
        background: '#1A2B3C', border: 'none',
        padding: '14px', textAlign: 'center',
        fontSize: 14, fontWeight: 600, color: '#fff',
        cursor: 'pointer', flexShrink: 0,
        letterSpacing: 0.3,
      }}>
        채팅 상담사 연결
      </button>

      {/* 입력창 */}
      <div style={{
        background: '#fff', padding: '10px 12px',
        display: 'flex', gap: 8, flexShrink: 0,
        borderTop: '1px solid #F0F0F0',
      }}>
        <input
          placeholder="궁금하신 점을 입력해 주세요."
          disabled
          style={{
            flex: 1, padding: '10px 14px',
            border: '1.5px solid #E8E8E8', borderRadius: 20,
            fontSize: 13, color: '#999', background: '#FAFAFA',
            outline: 'none',
          }}
        />
        <button style={{
          width: 38, height: 38, borderRadius: '50%',
          background: '#00BFA5', border: 'none',
          color: '#fff', fontSize: 16, cursor: 'pointer',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          flexShrink: 0,
        }}>↑</button>
      </div>
    </div>
  )
}
