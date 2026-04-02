'use client'

import { useStore } from '../../lib/store'
import { SWARA_NAMES_SHORT } from '../../lib/ragas'

export default function ScaleVisualizer() {
  const { scaleMap, rootIndex, activeRaga } = useStore()
  const radius = 50
  const cx = 64
  const cy = 64

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6 }}>
      <div style={{
        fontSize: 10,
        color: 'var(--text-muted)',
        fontFamily: 'var(--font-mono)',
        letterSpacing: '0.1em',
        textTransform: 'uppercase',
        textAlign: 'center',
        marginBottom: 2,
      }}>
        Scale Ring
      </div>
      <svg width={128} height={128} viewBox="0 0 128 128">
        {/* Outer ring */}
        <circle cx={cx} cy={cy} r={radius + 8} fill="none" stroke="rgba(150,100,50,0.15)" strokeWidth={1} />
        {/* Scale degree dots */}
        {Array.from({ length: 12 }, (_, i) => {
          const angle = (i / 12) * 2 * Math.PI - Math.PI / 2
          const x = Number((cx + radius * Math.cos(angle)).toFixed(2))
          const y = Number((cy + radius * Math.sin(angle)).toFixed(2))
          // Degree relative to root
          const relDegree = ((i - rootIndex % 12) + 12) % 12
          const inScale = scaleMap.includes(relDegree)
          const isRoot = relDegree === 0
          return (
            <g key={i}>
              <circle
                cx={x}
                cy={y}
                r={isRoot ? 7 : 5}
                fill={
                  isRoot
                    ? 'var(--accent-saffron)'
                    : inScale
                    ? 'var(--accent-gold)'
                    : 'rgba(150,100,50,0.2)'
                }
                style={{ transition: 'fill 0.3s' }}
              />
              {inScale && (
                <text
                  x={x}
                  y={y + 1}
                  textAnchor="middle"
                  dominantBaseline="middle"
                  fontSize={5}
                  fill={isRoot ? '#0f0d0b' : '#0f0d0b'}
                  fontFamily="var(--font-mono)"
                >
                  {isRoot ? 'Sa' : SWARA_NAMES_SHORT[relDegree]?.split(' ')[0]}
                </text>
              )}
            </g>
          )
        })}
        {/* Center label */}
        {activeRaga && (
          <text
            x={cx}
            y={cy}
            textAnchor="middle"
            dominantBaseline="middle"
            fontSize={9}
            fill="var(--text-muted)"
            fontFamily="var(--font-display)"
            fontStyle="italic"
          >
            {activeRaga.nameEnglish}
          </text>
        )}
      </svg>
    </div>
  )
}
