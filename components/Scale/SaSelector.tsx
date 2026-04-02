'use client'

import { useStore } from '../../lib/store'
import { CHROMATIC_NOTES } from '../../lib/ragas'

export default function SaSelector() {
  const { rootNote, rootIndex, setRoot } = useStore()

  return (
    <div>
      <div style={{
        fontSize: 10,
        color: 'var(--text-muted)',
        fontFamily: 'var(--font-mono)',
        letterSpacing: '0.1em',
        marginBottom: 8,
        textTransform: 'uppercase',
      }}>
        Sa (Root Note)
      </div>
      <div style={{
        display: 'flex',
        flexWrap: 'wrap',
        gap: 6,
      }}>
        {CHROMATIC_NOTES.map((note, idx) => {
          const isActive = rootIndex === idx
          return (
            <button
              key={note}
              onClick={() => setRoot(note, idx)}
              aria-pressed={isActive}
              aria-label={`Set root note to ${note}`}
              style={{
                padding: '4px 10px',
                borderRadius: 6,
                border: `1px solid ${isActive ? 'var(--accent-gold)' : 'rgba(150,100,50,0.3)'}`,
                background: isActive
                  ? 'linear-gradient(135deg, var(--accent-gold), var(--accent-saffron))'
                  : 'var(--bg-elevated)',
                color: isActive ? '#0f0d0b' : 'var(--text-primary)',
                fontFamily: 'var(--font-mono)',
                fontSize: 12,
                fontWeight: isActive ? '700' : '400',
                cursor: 'pointer',
                transition: 'all 0.15s',
                boxShadow: isActive ? '0 0 10px rgba(201,151,58,0.4)' : 'none',
                minWidth: 36,
              }}
            >
              {note}
            </button>
          )
        })}
      </div>
    </div>
  )
}
