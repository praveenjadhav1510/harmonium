'use client'

import { useEffect, useRef, useCallback } from 'react'
import KeyboardOctave from './KeyboardOctave'
import { useStore } from '../../lib/store'
import {
  initAudio,
  triggerNote,
  releaseNote,
  setMasterVolume,
  setSustain,
} from '../../lib/audio/engine'
import {
  ALL_KEY_SEMITONES,
  buildNoteId,
  semitonesToNote,
} from '../../lib/audio/noteMap'

// All renderable octaves — 5 total
const ALL_OCTAVES = [2, 3, 4, 5, 6]

export default function KeyboardShell() {
  const {
    octave,
    activeKeys,
    pressKey,
    releaseKey,
    rootIndex,
    scaleMap,
    strictMode,
    volume,
    sustainOn,
  } = useStore()

  const heldKeys = useRef<Set<string>>(new Set())
  const audioReady = useRef(false)

  // Scroll container + per-octave refs
  const scrollRef = useRef<HTMLDivElement>(null)
  const octaveRefs = useRef<Record<number, HTMLDivElement | null>>({})

  // ── Smooth-scroll active octave to center on octave change ──
  useEffect(() => {
    const container = scrollRef.current
    const target = octaveRefs.current[octave]
    if (!container || !target) return

    const containerWidth = container.offsetWidth
    const targetLeft = target.offsetLeft
    const targetWidth = target.offsetWidth
    const scrollTo = targetLeft - containerWidth / 2 + targetWidth / 2

    container.scrollTo({ left: scrollTo, behavior: 'smooth' })
  }, [octave])

  // Init audio on first gesture
  const ensureAudio = useCallback(async () => {
    if (!audioReady.current) {
      await initAudio()
      audioReady.current = true
    }
  }, [])

  // Sync volume
  useEffect(() => {
    if (audioReady.current) setMasterVolume(volume)
  }, [volume])

  // Sync sustain
  useEffect(() => {
    if (audioReady.current) setSustain(sustainOn)
  }, [sustainOn])

  const handlePress = useCallback(async (noteId: string, note: string) => {
    await ensureAudio()
    if (heldKeys.current.has(noteId)) return
    heldKeys.current.add(noteId)
    pressKey(noteId)
    triggerNote(note)
  }, [ensureAudio, pressKey])

  const handleRelease = useCallback((noteId: string, note: string) => {
    if (!heldKeys.current.has(noteId)) return
    heldKeys.current.delete(noteId)
    releaseKey(noteId)
    releaseNote(note)
  }, [releaseKey])

  // Computer keyboard handlers (always tied to current octave)
  useEffect(() => {
    const onKeyDown = async (e: KeyboardEvent) => {
      if (e.repeat || e.ctrlKey || e.metaKey || e.altKey) return
      const key = e.key.toLowerCase()
      if (!(key in ALL_KEY_SEMITONES)) return
      e.preventDefault()
      const semitone = ALL_KEY_SEMITONES[key]
      const actualOctave = semitone >= 12 ? octave + 1 : octave
      const actualSemitone = semitone >= 12 ? semitone - 12 : semitone
      const finalNoteId = buildNoteId(actualOctave, actualSemitone)
      const note = semitonesToNote(rootIndex, actualOctave, actualSemitone)
      await handlePress(finalNoteId, note)
    }

    const onKeyUp = (e: KeyboardEvent) => {
      const key = e.key.toLowerCase()
      if (!(key in ALL_KEY_SEMITONES)) return
      const semitone = ALL_KEY_SEMITONES[key]
      const actualOctave = semitone >= 12 ? octave + 1 : octave
      const actualSemitone = semitone >= 12 ? semitone - 12 : semitone
      const finalNoteId = buildNoteId(actualOctave, actualSemitone)
      const note = semitonesToNote(rootIndex, actualOctave, actualSemitone)
      handleRelease(finalNoteId, note)
    }

    window.addEventListener('keydown', onKeyDown)
    window.addEventListener('keyup', onKeyUp)
    return () => {
      window.removeEventListener('keydown', onKeyDown)
      window.removeEventListener('keyup', onKeyUp)
    }
  }, [octave, rootIndex, handlePress, handleRelease])

  return (
    <div
      role="application"
      aria-label="Harmonium keyboard"
      aria-description="Use A–K keys to play Sa through Sa. W, E, T, Y, U for sharp/flat notes."
      tabIndex={0}
      style={{
        width: '100%',
        height: '100%',
        position: 'relative',
        outline: 'none',
        touchAction: 'none',
      }}
    >
      {/* Scrollable keyboard track — scrollbar hidden */}
      <div
        ref={scrollRef}
        className="keyboard-halo keyboard-scroll"
        style={{
          display: 'flex',
          width: '100%',
          height: '100%',
          overflowX: 'auto',
          overflowY: 'hidden',
          padding: '0 8px 12px',
          gap: '2px',
          scrollbarWidth: 'none',
          msOverflowStyle: 'none',
        } as React.CSSProperties}
      >
        {ALL_OCTAVES.map((oct) => {
          const isActive = oct === octave
          return (
            <div
              key={oct}
              ref={(el) => { octaveRefs.current[oct] = el }}
              style={{
                /* 3 visible at a time — each is 1/3 of container width */
                minWidth: 'calc(33.333% - 2px)',
                flex: '0 0 calc(33.333% - 2px)',
                height: '100%',
                position: 'relative',
                transition: 'opacity 0.35s ease',
                opacity: isActive ? 1 : 0.48,
              }}
            >
              {/* Saffron glow strip at bottom of active octave */}
              <div style={{
                position: 'absolute',
                bottom: 12,
                left: 10,
                right: 10,
                height: 3,
                borderRadius: 2,
                background: isActive
                  ? 'linear-gradient(90deg, transparent, var(--accent-saffron), var(--accent-gold), var(--accent-saffron), transparent)'
                  : 'transparent',
                opacity: isActive ? 0.8 : 0,
                transition: 'opacity 0.35s ease',
                pointerEvents: 'none',
                zIndex: 20,
                boxShadow: isActive ? '0 0 10px rgba(232,130,26,0.7)' : 'none',
              }} />

              {/* OCT label */}
              <div style={{
                position: 'absolute',
                top: 6,
                left: '50%',
                transform: 'translateX(-50%)',
                fontSize: 9,
                fontFamily: 'var(--font-mono)',
                color: isActive ? '#c9973a' : 'rgba(138,122,106,0.35)',
                letterSpacing: '0.1em',
                zIndex: 15,
                pointerEvents: 'none',
                transition: 'color 0.35s ease',
                background: 'rgba(15,13,11,0.7)',
                padding: '1px 6px',
                borderRadius: 3,
              }}>
                OCT {oct}
              </div>

              <KeyboardOctave
                octave={oct}
                rootIndex={rootIndex}
                scaleMap={scaleMap}
                strictMode={strictMode}
                activeKeys={activeKeys}
                onPress={handlePress}
                onRelease={handleRelease}
              />
            </div>
          )
        })}
      </div>

      {/* Left fade edge */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: 56,
        height: '100%',
        background: 'linear-gradient(90deg, #120e0a 0%, transparent 100%)',
        pointerEvents: 'none',
        zIndex: 21,
      }} />
      {/* Right fade edge */}
      <div style={{
        position: 'absolute',
        top: 0,
        right: 0,
        width: 56,
        height: '100%',
        background: 'linear-gradient(270deg, #120e0a 0%, transparent 100%)',
        pointerEvents: 'none',
        zIndex: 21,
      }} />
    </div>
  )
}
