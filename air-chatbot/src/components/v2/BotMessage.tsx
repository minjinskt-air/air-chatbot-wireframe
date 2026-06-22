import { colors, font, radius } from './tokens'

interface Props {
  text: string
  time?: string
}

function nowTime() {
  return new Date().toLocaleTimeString('ko-KR', { hour: '2-digit', minute: '2-digit', hour12: false })
}

export default function BotMessage({ text, time }: Props) {
  return (
    <div style={{ display: 'flex', alignItems: 'flex-start', gap: 8, marginBottom: 6 }}>
      <div style={{
        width: 32, height: 32, borderRadius: '50%', flexShrink: 0,
        background: 'linear-gradient(135deg, #00ACC1, #00BFA5)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        color: '#fff', fontWeight: 700, fontSize: font.sm,
      }}>A</div>

      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ fontSize: font.xs, color: colors.textSub, marginBottom: 4 }}>air 채팅 상담사</div>
        <div style={{ display: 'flex', alignItems: 'flex-end', gap: 6 }}>
          <div style={{
            background: colors.botBg,
            borderRadius: `0 ${radius.bubble}px ${radius.bubble}px ${radius.bubble}px`,
            padding: '10px 13px',
            fontSize: font.base, lineHeight: 1.6, color: colors.text,
            boxShadow: '0 1px 4px rgba(0,0,0,0.07)',
            maxWidth: '78%',
            whiteSpace: 'pre-wrap',
          }}>{text}</div>
          <span style={{ fontSize: font.xs, color: colors.textSub, flexShrink: 0 }}>
            {time ?? nowTime()}
          </span>
        </div>
      </div>
    </div>
  )
}
