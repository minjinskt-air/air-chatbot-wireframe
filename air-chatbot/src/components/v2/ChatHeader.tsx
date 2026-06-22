import { colors, font } from './tokens'

interface Props { onEnd: () => void }

export default function ChatHeader({ onEnd }: Props) {
  return (
    <div style={{
      background: '#fff',
      padding: '11px 14px',
      borderBottom: `1px solid ${colors.border}`,
      display: 'flex', alignItems: 'center', gap: 10,
      flexShrink: 0,
    }}>
      <div style={{
        width: 38, height: 38, borderRadius: '50%',
        background: 'linear-gradient(135deg, #00ACC1, #00BFA5)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        color: '#fff', fontWeight: 700, fontSize: font.md, flexShrink: 0,
      }}>A</div>

      <div style={{ flex: 1 }}>
        <div style={{ fontSize: font.md, fontWeight: 700, color: colors.text }}>air 채팅 상담</div>
        <div style={{ fontSize: font.xs, color: colors.online, marginTop: 1 }}>● Online</div>
      </div>

      <button onClick={onEnd} style={{
        background: '#fff', border: '1px solid #DDD',
        borderRadius: 6, padding: '5px 10px',
        fontSize: font.sm, color: '#555', cursor: 'pointer',
      }}>상담 종료</button>

      <button onClick={onEnd} style={{
        background: 'none', border: 'none',
        fontSize: 20, color: '#AAA', cursor: 'pointer', padding: '2px 4px', lineHeight: 1,
      }}>×</button>
    </div>
  )
}
