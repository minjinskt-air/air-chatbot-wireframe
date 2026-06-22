interface Props { text: string }

export default function BotBubble({ text }: Props) {
  return (
    <div style={{ display: 'flex', alignItems: 'flex-start', gap: 8, marginBottom: 10 }}>
      <div style={{
        width: 28, height: 28, borderRadius: '50%',
        background: 'linear-gradient(135deg, #00ACC1, #00BFA5)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        fontSize: 13, color: '#fff', flexShrink: 0, fontWeight: 700,
      }}>A</div>
      <div style={{
        background: '#fff',
        borderRadius: '0 12px 12px 12px',
        padding: '10px 14px',
        maxWidth: '78%',
        boxShadow: '0 1px 4px rgba(0,0,0,0.07)',
        fontSize: 13, lineHeight: 1.6, color: '#333',
      }}>{text}</div>
    </div>
  )
}
