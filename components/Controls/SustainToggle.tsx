'use client'

import { useStore } from '../../lib/store'
import { setSustain } from '../../lib/audio/engine'
import { motion } from 'framer-motion'

export default function SustainToggle() {
  const { sustainOn, toggleSustain } = useStore()

  const handleToggle = () => {
    toggleSustain()
    setSustain(!sustainOn)
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 10 }}>
      {/* Switch Housing */}
      <div
        onClick={handleToggle}
        style={{
          width: 56,
          height: 32,
          borderRadius: 16,
          background: 'rgba(0,0,0,0.4)',
          boxShadow: 'inset 0 2px 4px rgba(0,0,0,0.8), 0 1px 0 rgba(255,255,255,0.05)',
          padding: 3,
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          position: 'relative',
          border: '1px solid rgba(201,151,58,0.15)',
        }}
      >
        {/* Track */}
        <div style={{
          position: 'absolute',
          inset: 6,
          borderRadius: 10,
          background: sustainOn 
            ? 'linear-gradient(90deg, rgba(232,130,26,0.1), rgba(201,151,58,0.05))' 
            : 'rgba(15,13,11,0.4)',
          border: '1px solid rgba(0,0,0,0.2)',
        }} />

        {/* Polished Ivory-style Knob */}
        <motion.div
          animate={{ x: sustainOn ? 24 : 0 }}
          transition={{ type: 'spring', stiffness: 500, damping: 30 }}
          style={{
            width: 24,
            height: 24,
            borderRadius: '50%',
            background: 'radial-gradient(circle at 35% 35%, #fff 0%, #e0d0c0 70%, #b8a898 100%)',
            boxShadow: '0 2px 8px rgba(0,0,0,0.8), inset 0 1px 1px rgba(255,255,255,0.8)',
            zIndex: 2,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          {/* Knob center detail */}
          <div style={{ width: 4, height: 4, borderRadius: '50%', background: 'rgba(0,0,0,0.1)' }} />
        </motion.div>

        {/* LED Indicator */}
        <div style={{
          position: 'absolute',
          right: -14,
          top: '50%',
          transform: 'translateY(-50%)',
          width: 4,
          height: 4,
          borderRadius: '50%',
          backgroundColor: sustainOn ? '#e8821a' : '#2a211a',
          boxShadow: sustainOn ? '0 0 8px #e8821a' : 'none',
          transition: 'background 0.3s, box-shadow 0.3s',
        }} />
      </div>

      {/* Label section */}
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <span style={{
          fontSize: 10,
          color: sustainOn ? 'var(--accent-saffron)' : 'var(--accent-gold)',
          fontFamily: 'var(--font-mono)',
          fontWeight: 700,
          letterSpacing: '0.2em',
          textShadow: '0 1px 1px rgba(0,0,0,0.8)',
          opacity: sustainOn ? 1 : 0.6,
          transition: 'color 0.3s, opacity 0.3s',
        }}>
          SUSTAIN
        </span>
      </div>
    </div>
  )
}
