'use client'

import { useRef, useCallback, useState } from 'react'
import { useStore } from '../../lib/store'

export default function VolumeKnob() {
  const { volume, setVolume } = useStore()
  const knobRef = useRef<HTMLDivElement>(null)
  const dragStartY = useRef<number | null>(null)
  const dragStartVol = useRef<number>(volume)
  const [isHovered, setIsHovered] = useState(false)
  const [isDragging, setIsDragging] = useState(false)

  // Map volume (0-100) to rotation angle (-135deg to +135deg)
  const angle = -135 + (volume / 100) * 270

  const onPointerDown = useCallback((e: React.PointerEvent) => {
    e.preventDefault()
    knobRef.current?.setPointerCapture(e.pointerId)
    dragStartY.current = e.clientY
    dragStartVol.current = volume
    setIsDragging(true)
  }, [volume])

  const onPointerMove = useCallback((e: React.PointerEvent) => {
    if (dragStartY.current === null) return
    const delta = dragStartY.current - e.clientY  // drag up = increase
    const newVol = Math.max(0, Math.min(100, dragStartVol.current + delta * 0.8))
    setVolume(Math.round(newVol))
  }, [setVolume])

  const onPointerUp = useCallback(() => {
    dragStartY.current = null
    setIsDragging(false)
  }, [])

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 10 }}>
      {/* Knob Well / Shadow ring */}
      <div
        onPointerEnter={() => setIsHovered(true)}
        onPointerLeave={() => setIsHovered(false)}
        style={{
          width: 60,
          height: 60,
          borderRadius: '50%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'rgba(0,0,0,0.3)',
          boxShadow: 'inset 0 2px 4px rgba(0,0,0,0.8), 0 1px 1px rgba(255,255,255,0.05)',
          position: 'relative',
        }}
      >
        <div
          ref={knobRef}
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={onPointerUp}
          style={{
            width: 46,
            height: 46,
            borderRadius: '50%',
            background: isDragging
              ? 'radial-gradient(circle at 35% 35%, #d4a444 0%, #8a6020 70%, #5c3e12 100%)'
              : isHovered
              ? 'radial-gradient(circle at 35% 35%, #e8ba4a 0%, #a67a2d 65%, #6a4818 100%)'
              : 'radial-gradient(circle at 35% 35%, #c9973a 0%, #8a6020 65%, #4a3414 100%)',
            boxShadow: `
              0 4px 10px rgba(0,0,0,0.9),
              ${isDragging ? '0 0 16px rgba(201,151,58,0.5),' : ''}
              inset 0 1px 1px rgba(255,255,255,0.2),
              inset 0 -2px 4px rgba(0,0,0,0.4)
            `,
            cursor: 'ns-resize',
            position: 'relative',
            transition: 'box-shadow 0.2s, background 0.2s',
            touchAction: 'none',
            userSelect: 'none',
            transform: `rotate(${angle}deg)`,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          {/* Inner brass rim */}
          <div style={{
            position: 'absolute',
            inset: 3,
            borderRadius: '50%',
            border: '1px solid rgba(255,255,255,0.1)',
            background: 'rgba(0,0,0,0.05)',
          }} />
          
          {/* Saffron indicator dot (etched) */}
          <div style={{
            position: 'absolute',
            top: 6,
            width: 6,
            height: 6,
            borderRadius: '50%',
            backgroundColor: '#e8821a',
            boxShadow: '0 0 4px rgba(232,130,26,0.6), inset 0 1px 1px rgba(0,0,0,0.4)',
          }} />

          {/* Grips/Texture lines (subtle) */}
          <div style={{
            position: 'absolute',
            inset: 0,
            borderRadius: '50%',
            opacity: 0.1,
            background: 'repeating-conic-gradient(from 0deg, transparent 0deg 10deg, #000 10deg 20deg)',
          }} />
        </div>
      </div>

      {/* Label section */}
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <span style={{
          fontSize: 10,
          color: 'var(--accent-gold)',
          fontFamily: 'var(--font-mono)',
          fontWeight: 700,
          letterSpacing: '0.2em',
          textShadow: '0 1px 1px rgba(0,0,0,0.8)',
          opacity: 0.8,
        }}>
          VOLUME
        </span>
        <span style={{
          fontSize: 12,
          color: 'var(--text-primary)',
          fontFamily: 'var(--font-mono)',
          marginTop: 2,
          opacity: 0.9,
        }}>
          {volume}
        </span>
      </div>
    </div>
  )
}
