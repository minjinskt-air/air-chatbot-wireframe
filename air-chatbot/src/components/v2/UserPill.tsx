import { colors, font, radius } from './tokens'

interface Props { text: string; time?: string }

function nowTime() {
  return new Date().toLocaleTimeString('ko-KR', { hour: '2-digit', minute: '2-digit', hour12: false })
}

export default function UserPill({ text, time }: Props) {
  return (
    <div style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'flex-end', gap: 6, marginBottom: 10 }}>
      <span style={{ fontSize: font.xs, color: colors.textSub, flexShrink: 0 }}>
        {time ?? nowTime()}
      </span>
      <div style={{
        background: colors.userPill, color: '#fff',
        borderRadius: `${radius.pill}px ${radius.pill}px 0 ${radius.pill}px`,
        padding: '9px 15px',
        fontSize: font.base, lineHeight: 1.5, maxWidth: '75%',
      }}>{text}</div>
    </div>
  )
}
