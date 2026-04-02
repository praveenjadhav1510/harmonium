'use client'

import { useStore } from '../../lib/store'

export default function OctaveIndicator() {
  const { octave } = useStore()
  const dots = [2, 3, 4, 5, 6]

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4 }}>
      <div style={{ display: 'flex', gap: 5, alignItems: 'center' }}>
        {dots.map((o) => (
          <div
            key={o}
            style={{
              width: o === octave ? 10 : 6,
              height: o === octave ? 10 : 6,
              borderRadius: '50%',
              background: o === octave ? 'var(--accent-saffron)' : 'rgba(150,100,50,0.3)',
              transition: 'all 0.2s',
              boxShadow: o === octave ? '0 0 8px rgba(232,130,26,0.6)' : 'none',
            }}
          />
        ))}
      </div>
      <span style={{
        fontSize: 9,
        color: 'var(--text-muted)',
        fontFamily: 'var(--font-mono)',
        letterSpacing: '0.05em',
      }}>
        OCT {octave}
      </span>
    </div>
  )
}
