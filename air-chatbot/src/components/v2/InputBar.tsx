import { colors, font } from './tokens'

export default function InputBar() {
  return (
    <div style={{
      background: '#fff',
      borderTop: `1px solid ${colors.border}`,
      padding: '10px 12px',
      display: 'flex', alignItems: 'center', gap: 8,
      flexShrink: 0,
    }}>
      <button style={{
        width: 32, height: 32, borderRadius: '50%',
        background: colors.primary, border: 'none',
        color: '#fff', fontSize: 18, cursor: 'pointer',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        flexShrink: 0, fontWeight: 300, lineHeight: 1,
      }}>+</button>

      <input
        disabled
        placeholder="상담사 연결 후 메시지 입력 가능"
        style={{
          flex: 1, padding: '9px 13px',
          border: 'none', borderRadius: 20,
          background: colors.inputBg,
          fontSize: font.sm, color: '#AAA',
          outline: 'none',
        }}
      />

      <button style={{
        width: 34, height: 34, borderRadius: 8,
        background: '#CCC', border: 'none',
        color: '#fff', fontSize: 14, cursor: 'pointer',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        flexShrink: 0,
      }}>▶</button>
    </div>
  )
}
