'use client'

import { useRef, useEffect, useCallback } from 'react'
import { useStore } from '../../lib/store'

export default function Playback() {
  const { hasRecording, recordingBlob, isPlaying, togglePlayback, setIsPlaying } = useStore()
  const audioRef = useRef<HTMLAudioElement | null>(null)
  const objectUrlRef = useRef<string | null>(null)

  // Create/update object URL when blob changes
  useEffect(() => {
    if (!recordingBlob) return
    if (objectUrlRef.current) URL.revokeObjectURL(objectUrlRef.current)
    const url = URL.createObjectURL(recordingBlob)
    objectUrlRef.current = url
    if (audioRef.current) {
      audioRef.current.src = url
    }
    return () => {
      if (objectUrlRef.current) URL.revokeObjectURL(objectUrlRef.current)
    }
  }, [recordingBlob])

  // Sync play/pause
  useEffect(() => {
    if (!audioRef.current) return
    if (isPlaying) {
      audioRef.current.play().catch(() => {})
    } else {
      audioRef.current.pause()
      audioRef.current.currentTime = 0
    }
  }, [isPlaying])

  if (!hasRecording) return null

  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
      <audio
        ref={audioRef}
        onEnded={() => setIsPlaying(false)}
        style={{ display: 'none' }}
      />
      <button
        onClick={togglePlayback}
        aria-label={isPlaying ? 'Stop playback' : 'Play recording'}
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 6,
          padding: '6px 14px',
          borderRadius: 8,
          border: `1px solid ${isPlaying ? 'var(--accent-teal)' : 'rgba(150,100,50,0.4)'}`,
          background: isPlaying ? 'rgba(42,122,110,0.15)' : 'var(--bg-elevated)',
          cursor: 'pointer',
          color: isPlaying ? 'var(--accent-teal)' : 'var(--text-muted)',
          fontFamily: 'var(--font-mono)',
          fontSize: 12,
          transition: 'all 0.2s',
        }}
      >
        {isPlaying ? '■ STOP' : '▶ PLAY'}
      </button>
      {/* Waveform bars (decorative / animated) */}
      <div style={{
        display: 'flex',
        gap: 2,
        alignItems: 'center',
        height: 24,
        opacity: hasRecording ? 1 : 0.3,
      }}>
        {Array.from({ length: 16 }, (_, i) => (
          <div
            key={i}
            style={{
              width: 3,
              borderRadius: 2,
              background: isPlaying ? 'var(--accent-teal)' : 'rgba(150,100,50,0.4)',
              height: isPlaying
                ? `${20 + Math.sin((i + Date.now() / 200) * 1.5) * 10}px`
                : `${6 + Math.abs(Math.sin(i * 0.7)) * 14}px`,
              transition: 'height 0.1s, background 0.2s',
            }}
          />
        ))}
      </div>
    </div>
  )
}
