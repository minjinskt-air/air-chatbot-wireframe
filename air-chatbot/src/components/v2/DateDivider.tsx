import { colors, font } from './tokens'

interface Props { date?: string }

export default function DateDivider({ date }: Props) {
  const label = date ?? new Date().toLocaleDateString('ko-KR', { year: 'numeric', month: '2-digit', day: '2-digit' }).replace(/\. /g, '-').replace('.', '')
  return (
    <div style={{
      display: 'flex', alignItems: 'center', gap: 10,
      margin: '14px 0 10px',
    }}>
      <div style={{ flex: 1, height: 1, background: colors.border }} />
      <span style={{ fontSize: font.xs, color: colors.textSub, whiteSpace: 'nowrap' }}>{label}</span>
      <div style={{ flex: 1, height: 1, background: colors.border }} />
    </div>
  )
}
