'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface KeyboardKeyProps {
  noteId: string
  note: string
  isWhite: boolean
  isActive: boolean
  isDisabled: boolean
  swara: string
  western: string
  keyboardShortcut?: string
  whiteIndex?: number
  blackIndex?: number
  onPress: (noteId: string, note: string) => void
  onRelease: (noteId: string, note: string) => void
}

// Black key left-offset positions as % of white key width
const BLACK_KEY_POSITIONS = [0.65, 1.65, 3.65, 4.65, 5.65]

export default function KeyboardKey({
  noteId,
  note,
  isWhite,
  isActive,
  isDisabled,
  swara,
  western,
  keyboardShortcut,
  whiteIndex,
  blackIndex,
  onPress,
  onRelease,
}: KeyboardKeyProps) {
  const [isHovered, setIsHovered] = useState(false)

  const handlePointerDown = (e: React.PointerEvent) => {
    e.preventDefault()
    e.currentTarget.setPointerCapture(e.pointerId)
    if (!isDisabled) onPress(noteId, note)
  }
  const handlePointerUp = (e: React.PointerEvent) => {
    e.preventDefault()
    onRelease(noteId, note)
  }
  const handlePointerLeave = (e: React.PointerEvent) => {
    setIsHovered(false)
    if (e.buttons > 0) onRelease(noteId, note)
  }

  const tooltipElement = (
    <AnimatePresence>
      {isHovered && !isDisabled && (
        <motion.div
          initial={{ opacity: 0, y: 10, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 5, scale: 0.95 }}
          style={{
            position: 'absolute',
            bottom: isWhite ? '105%' : '115%',
            left: '50%',
            transform: 'translateX(-50%)',
            padding: '8px 12px',
            backgroundColor: 'rgba(26, 22, 18, 0.98)',
            border: '1px solid var(--accent-gold)',
            borderRadius: 8,
            color: 'var(--text-primary)',
            zIndex: 100,
            whiteSpace: 'nowrap',
            pointerEvents: 'none',
            boxShadow: '0 8px 24px rgba(0,0,0,0.6)',
            textAlign: 'center',
            minWidth: 80,
          }}
        >
          <div style={{ fontFamily: 'var(--font-display)', fontSize: 18, color: 'var(--accent-saffron)', lineHeight: 1.2 }}>
            {swara}
          </div>
          <div style={{ fontSize: 11, fontFamily: 'var(--font-mono)', opacity: 0.9, marginTop: 4 }}>
            {western} {keyboardShortcut && `[${keyboardShortcut.toUpperCase()}]`}
          </div>
          {/* Arrow */}
          <div style={{
            position: 'absolute',
            top: '100%',
            left: '50%',
            transform: 'translateX(-50%)',
            width: 0,
            height: 0,
            borderLeft: '6px solid transparent',
            borderRight: '6px solid transparent',
            borderTop: '6px solid var(--accent-gold)',
          }} />
        </motion.div>
      )}
    </AnimatePresence>
  )

  if (isWhite) {
    return (
      <div style={{ position: 'relative', width: '100%', height: '100%' }}>
        {tooltipElement}
        <motion.button
          data-note-id={noteId}
          data-note={note}
          aria-label={`${swara} ${western}`}
          aria-pressed={isActive}
          whileTap={isDisabled ? {} : { scaleY: 0.96 }}
          transition={{ type: 'spring', stiffness: 600, damping: 30 }}
          onPointerDown={handlePointerDown}
          onPointerUp={handlePointerUp}
          onPointerEnter={() => setIsHovered(true)}
          onPointerLeave={handlePointerLeave}
          style={{
            originY: 0,
            width: '100%',
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'flex-end',
            alignItems: 'center',
            paddingBottom: 12,
            cursor: isDisabled ? 'default' : 'pointer',
            userSelect: 'none',
            backgroundColor: isActive
              ? '#e8d5a0'
              : isDisabled
              ? '#b8a898'
              : 'var(--white-key)',
            borderRadius: '0 0 6px 6px',
            border: '1px solid #b8a090',
            boxShadow: isActive
              ? '0 8px 24px var(--active-glow), inset 0 -2px 8px rgba(200,100,0,0.3)'
              : '0 4px 8px rgba(0,0,0,0.4), inset 0 -3px 6px rgba(0,0,0,0.15)',
            willChange: 'transform',
            opacity: isDisabled ? 0.5 : 1,
            zIndex: 1,
            position: 'relative',
          } as React.CSSProperties}
        >
          <span style={{
            fontSize: '12px',
            fontWeight: '800',
            color: isActive ? '#8a4010' : '#5a4a3a',
            fontFamily: 'var(--font-mono)',
            lineHeight: 1,
            marginBottom: 4,
          }}>
            {keyboardShortcut?.toUpperCase()}
          </span>
          <span style={{
            fontSize: '11px',
            fontWeight: '600',
            color: isActive ? '#6a3008' : '#7a6050',
            fontFamily: 'var(--font-display)',
            fontStyle: 'italic',
          }}>
            {swara}
          </span>
        </motion.button>
      </div>
    )
  }

  // Black key
  const leftPercent = blackIndex !== undefined
    ? `calc(${BLACK_KEY_POSITIONS[blackIndex]} * (100% / 7) + 2px)`
    : '0'

  return (
    <div style={{ position: 'absolute', top: 0, left: leftPercent, width: 'calc(100% / 7 * 0.6)', height: '62%', zIndex: 10 }}>
      {tooltipElement}
      <motion.button
        data-note-id={noteId}
        data-note={note}
        aria-label={`${swara} ${western}`}
        aria-pressed={isActive}
        whileTap={isDisabled ? {} : { scaleY: 0.94 }}
        transition={{ type: 'spring', stiffness: 700, damping: 35 }}
        onPointerDown={handlePointerDown}
        onPointerUp={handlePointerUp}
        onPointerEnter={() => setIsHovered(true)}
        onPointerLeave={handlePointerLeave}
        style={{
          originY: 0,
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'flex-end',
          alignItems: 'center',
          paddingBottom: 8,
          cursor: isDisabled ? 'default' : 'pointer',
          userSelect: 'none',
          backgroundColor: isActive
            ? '#3a2e20'
            : isDisabled
            ? '#2a2420'
            : 'var(--black-key)',
          borderRadius: '0 0 4px 4px',
          border: '1px solid #0a0806',
          boxShadow: isActive
            ? `0 6px 16px var(--active-glow), inset 0 -2px 6px rgba(200,100,0,0.4)`
            : '0 4px 6px rgba(0,0,0,0.8), inset 0 -2px 4px rgba(0,0,0,0.5)',
          willChange: 'transform',
          opacity: isDisabled ? 0.4 : 1,
        } as React.CSSProperties}
      >
        {keyboardShortcut && (
          <span style={{
            fontSize: '10px',
            fontWeight: '800',
            color: isActive ? '#c8821a' : '#8a7a6a',
            fontFamily: 'var(--font-mono)',
          }}>
            {keyboardShortcut.toUpperCase()}
          </span>
        )}
      </motion.button>
    </div>
  )
}
