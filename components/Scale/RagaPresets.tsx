'use client'

import { useStore } from '../../lib/store'
import { RAGAS, type RagaPreset } from '../../lib/ragas'

const MOOD_COLORS: Record<string, string> = {
  Romantic: '#c9973a',
  Devotional: '#2a7a6e',
  Serious: '#7a5a9a',
  Melancholic: '#6a8aaa',
  Serene: '#5aaa7a',
  Bright: '#e8821a',
  Longing: '#aa7a6a',
}

const TIME_ICONS: Record<string, string> = {
  Morning: '🌅',
  Afternoon: '☀️',
  Evening: '🌆',
  Night: '🌙',
  Any: '✨',
}

export default function RagaPresets() {
  const { activeRaga, setRaga, strictMode, toggleStrict } = useStore()

  return (
    <div>
      <div style={{
        fontSize: 10,
        color: 'var(--text-muted)',
        fontFamily: 'var(--font-mono)',
        letterSpacing: '0.1em',
        marginBottom: 8,
        textTransform: 'uppercase',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
      }}>
        <span>Raga Presets</span>
        {activeRaga && (
          <button
            onClick={toggleStrict}
            aria-pressed={strictMode}
            title={strictMode ? 'Strict mode ON (disable to hear all notes)' : 'Enable strict mode'}
            style={{
              background: 'none',
              border: `1px solid ${strictMode ? 'var(--accent-saffron)' : 'rgba(150,100,50,0.4)'}`,
              borderRadius: 4,
              color: strictMode ? 'var(--accent-saffron)' : 'var(--text-muted)',
              fontSize: 10,
              padding: '2px 6px',
              cursor: 'pointer',
              fontFamily: 'var(--font-mono)',
            }}
          >
            {strictMode ? '🔒 STRICT' : '🔓 LOOSE'}
          </button>
        )}
      </div>
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(3, 1fr)',
        gap: 6,
      }}>
        {RAGAS.map((raga) => {
          const isActive = activeRaga?.id === raga.id
          const moodColor = MOOD_COLORS[raga.mood] ?? 'var(--accent-gold)'
          return (
            <button
              key={raga.id}
              onClick={() => setRaga(isActive ? null : raga)}
              aria-pressed={isActive}
              aria-label={`${raga.nameEnglish} raga`}
              style={{
                background: isActive
                  ? `linear-gradient(135deg, ${moodColor}22, ${moodColor}11)`
                  : 'var(--bg-elevated)',
                border: `1px solid ${isActive ? moodColor : 'rgba(150,100,50,0.25)'}`,
                borderRadius: 8,
                padding: '8px 6px',
                cursor: 'pointer',
                textAlign: 'left',
                transition: 'all 0.2s',
                boxShadow: isActive ? `0 0 12px ${moodColor}33` : 'none',
              }}
            >
              {/* Devanagari name */}
              <div style={{
                fontFamily: 'var(--font-display)',
                fontSize: 14,
                color: isActive ? moodColor : 'var(--text-primary)',
                lineHeight: 1.1,
                marginBottom: 2,
              }}>
                {raga.nameDevanagari}
              </div>
              {/* English name */}
              <div style={{
                fontSize: 9,
                color: 'var(--text-muted)',
                fontFamily: 'var(--font-mono)',
                marginBottom: 4,
              }}>
                {raga.nameEnglish} · {raga.thaat}
              </div>
              {/* Scale dots */}
              <div style={{
                display: 'flex',
                gap: 2,
                margin: '4px 0',
              }}>
                {Array.from({ length: 12 }, (_, i) => (
                  <div
                    key={i}
                    style={{
                      width: 5,
                      height: 5,
                      borderRadius: '50%',
                      background: raga.scaleDegrees.includes(i) ? moodColor : 'rgba(150,100,50,0.2)',
                      flex: 1,
                      transition: 'background 0.2s',
                    }}
                  />
                ))}
              </div>
              {/* Tags */}
              <div style={{ display: 'flex', gap: 3, flexWrap: 'wrap', marginTop: 2 }}>
                <span style={{
                  fontSize: 8,
                  padding: '1px 4px',
                  borderRadius: 3,
                  background: `${moodColor}22`,
                  color: moodColor,
                  fontFamily: 'var(--font-mono)',
                }}>
                  {raga.mood}
                </span>
                <span style={{
                  fontSize: 8,
                  padding: '1px 4px',
                  borderRadius: 3,
                  background: 'rgba(150,100,50,0.15)',
                  color: 'var(--text-muted)',
                  fontFamily: 'var(--font-mono)',
                }}>
                  {TIME_ICONS[raga.time]} {raga.time}
                </span>
              </div>
            </button>
          )
        })}
        {/* Clear raga button */}
        <button
          onClick={() => setRaga(null)}
          style={{
            background: activeRaga === null ? 'rgba(201,151,58,0.1)' : 'var(--bg-elevated)',
            border: `1px solid ${activeRaga === null ? 'var(--accent-gold)' : 'rgba(150,100,50,0.25)'}`,
            borderRadius: 8,
            padding: '8px 6px',
            cursor: 'pointer',
            color: activeRaga === null ? 'var(--accent-gold)' : 'var(--text-muted)',
            fontSize: 10,
            fontFamily: 'var(--font-mono)',
            transition: 'all 0.2s',
          }}
        >
          Free / All Notes
        </button>
      </div>
    </div>
  )
}
