'use client'

import { useStore } from '../../lib/store'
import { motion, AnimatePresence } from 'framer-motion'
import { startRecording as engineStart, stopRecording as engineStop } from '../../lib/audio/engine'
import { initAudio } from '../../lib/audio/engine'

export default function RecordButton() {
  const { isRecording, startRecording, stopRecording } = useStore()

  const handleClick = async () => {
    await initAudio()
    if (!isRecording) {
      await engineStart()
      startRecording()
    } else {
      const blob = await engineStop()
      stopRecording(blob)
    }
  }

  return (
    <button
      onClick={handleClick}
      aria-pressed={isRecording}
      aria-label={isRecording ? 'Stop recording' : 'Start recording'}
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: 8,
        padding: '6px 14px',
        borderRadius: 8,
        border: `1px solid ${isRecording ? '#e05050' : 'rgba(150,100,50,0.4)'}`,
        background: isRecording ? 'rgba(224,80,80,0.15)' : 'var(--bg-elevated)',
        cursor: 'pointer',
        color: isRecording ? '#e05050' : 'var(--text-muted)',
        fontFamily: 'var(--font-mono)',
        fontSize: 12,
        transition: 'all 0.2s',
        boxShadow: isRecording ? '0 0 16px rgba(224,80,80,0.3)' : 'none',
      }}
    >
      {/* Pulsing dot */}
      <motion.div
        animate={isRecording ? { scale: [1, 1.3, 1], opacity: [1, 0.6, 1] } : { scale: 1, opacity: 1 }}
        transition={{ duration: 1, repeat: isRecording ? Infinity : 0, ease: 'easeInOut' }}
        style={{
          width: 10,
          height: 10,
          borderRadius: '50%',
          background: isRecording ? '#e05050' : 'rgba(224,80,80,0.4)',
        }}
      />
      {isRecording ? 'STOP' : 'REC'}
    </button>
  )
}
