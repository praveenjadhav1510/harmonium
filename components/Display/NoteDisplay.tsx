'use client'

import { useStore } from '../../lib/store'
import { SWARA_NAMES_DEVANAGARI, SWARA_NAMES_SHORT, CHROMATIC_NOTES } from '../../lib/ragas'
import { WHITE_KEY_SEMITONES } from '../../lib/audio/noteMap'

export default function NoteDisplay() {
  const { activeKeys, rootIndex, octave } = useStore()

  // Parse active keys to get relative degrees
  const activeDegrees: number[] = []
  activeKeys.forEach((noteId) => {
    const parts = noteId.split('-')
    const semitone = parseInt(parts[1], 10)
    const relDegree = ((semitone - rootIndex % 12) + 12) % 12
    if (!activeDegrees.includes(relDegree)) activeDegrees.push(relDegree)
  })

  const hasNotes = activeDegrees.length > 0

  return (
    <div style={{
      flex: 1,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      padding: 16,
    }}>
      {/* Live region for screen readers */}
      <div
        role="status"
        aria-live="polite"
        aria-atomic="true"
        style={{ position: 'absolute', left: '-10000px' }}
      >
        {activeDegrees.map((d) => SWARA_NAMES_SHORT[d]).join(', ')}
      </div>

      {/* Devanagari display */}
      <div style={{
        minHeight: 64,
        display: 'flex',
        gap: 12,
        alignItems: 'center',
        justifyContent: 'center',
        flexWrap: 'wrap',
      }}>
        {hasNotes ? (
          activeDegrees.sort((a, b) => a - b).map((degree) => (
            <div key={degree} style={{ textAlign: 'center' }}>
              <div style={{
                fontFamily: 'var(--font-display)',
                fontSize: 32,
                color: degree === 0 ? 'var(--accent-saffron)' : 'var(--accent-gold)',
                lineHeight: 1,
                textShadow: `0 0 20px ${degree === 0 ? 'rgba(232,130,26,0.5)' : 'rgba(201,151,58,0.4)'}`,
                transition: 'all 0.1s',
              }}>
                {SWARA_NAMES_DEVANAGARI[degree]}
              </div>
              <div style={{
                fontSize: 11,
                color: 'var(--text-muted)',
                fontFamily: 'var(--font-mono)',
                marginTop: 2,
              }}>
                {SWARA_NAMES_SHORT[degree]}
              </div>
            </div>
          ))
        ) : (
          <div style={{
            fontFamily: 'var(--font-display)',
            fontSize: 18,
            color: 'rgba(138,122,106,0.4)',
            fontStyle: 'italic',
          }}>
            Play a note…
          </div>
        )}
      </div>

      {/* Western notation */}
      {hasNotes && (
        <div style={{
          marginTop: 12,
          display: 'flex',
          gap: 8,
          flexWrap: 'wrap',
          justifyContent: 'center',
        }}>
          {activeDegrees.sort((a, b) => a - b).map((degree) => {
            const noteIdx = (rootIndex + degree) % 12
            const noteName = CHROMATIC_NOTES[noteIdx]
            return (
              <span key={degree} style={{
                fontFamily: 'var(--font-mono)',
                fontSize: 12,
                color: 'var(--text-muted)',
                background: 'var(--bg-elevated)',
                padding: '2px 8px',
                borderRadius: 4,
                border: '1px solid rgba(150,100,50,0.2)',
              }}>
                {noteName}
              </span>
            )
          })}
        </div>
      )}
    </div>
  )
}
