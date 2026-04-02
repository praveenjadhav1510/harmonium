'use client'

import { useStore } from '../../lib/store'

export default function ExportButton() {
  const { hasRecording, exportRecording } = useStore()

  return (
    <button
      onClick={exportRecording}
      disabled={!hasRecording}
      aria-label="Export recording"
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: 6,
        padding: '6px 14px',
        borderRadius: 8,
        border: `1px solid ${hasRecording ? 'var(--accent-gold)' : 'rgba(150,100,50,0.2)'}`,
        background: hasRecording ? 'rgba(201,151,58,0.1)' : 'transparent',
        cursor: hasRecording ? 'pointer' : 'not-allowed',
        color: hasRecording ? 'var(--accent-gold)' : 'rgba(138,122,106,0.4)',
        fontFamily: 'var(--font-mono)',
        fontSize: 12,
        transition: 'all 0.2s',
        opacity: hasRecording ? 1 : 0.5,
      }}
    >
      ⬇ EXPORT
    </button>
  )
}
