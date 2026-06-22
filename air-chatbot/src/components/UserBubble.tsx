interface Props { text: string }

export default function UserBubble({ text }: Props) {
  return (
    <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: 8 }}>
      <div style={{
        background: '#006B6B',
        color: '#fff',
        borderRadius: '16px 0 16px 16px',
        padding: '9px 16px',
        fontSize: 13,
        maxWidth: '78%',
        lineHeight: 1.5,
      }}>{text}</div>
    </div>
  )
}
