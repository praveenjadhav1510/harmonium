'use client'

import { useStore } from '../../lib/store'
import { motion } from 'framer-motion'

export default function OctaveShifter() {
  const { octave, shiftOctave } = useStore()

  const Button = ({ label, action, disabled }: { label: string, action: () => void, disabled: boolean }) => (
    <motion.button
      whileTap={disabled ? {} : { y: 2, boxShadow: 'inset 0 2px 4px rgba(0,0,0,0.6)' }}
      onClick={action}
      disabled={disabled}
      style={{
        width: 32,
        height: 32,
        borderRadius: 4,
        background: disabled 
          ? 'linear-gradient(180deg, #2a2420, #1a1612)' 
          : 'linear-gradient(180deg, #a67a2d, #6a4818)',
        border: '1px solid rgba(0,0,0,0.4)',
        boxShadow: disabled
          ? 'none'
          : '0 2px 0 #4a3414, 0 3px 6px rgba(0,0,0,0.4)',
        color: disabled ? 'rgba(201,151,58,0.2)' : '#f0e6d3',
        fontSize: 18,
        fontWeight: 'bold',
        cursor: disabled ? 'default' : 'pointer',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        transition: 'background 0.2s, color 0.2s',
        position: 'relative',
        top: 0,
      }}
    >
      {label}
    </motion.button>
  )

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 10 }}>
      {/* Control Plate */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: 6,
        padding: '6px 8px',
        background: 'rgba(0,0,0,0.2)',
        borderRadius: 8,
        boxShadow: 'inset 0 1px 3px rgba(0,0,0,0.5), 0 1px 0 rgba(255,255,255,0.05)',
      }}>
        <Button label="−" action={() => shiftOctave(-1)} disabled={octave <= 2} />
        
        <div style={{
          width: 36,
          height: 32,
          background: 'rgba(15,13,11,0.6)',
          borderRadius: 4,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontFamily: 'var(--font-mono)',
          fontSize: 16,
          color: 'var(--accent-gold)',
          fontWeight: 800,
          boxShadow: 'inset 0 2px 4px rgba(0,0,0,0.8)',
          border: '1px solid rgba(201,151,58,0.1)',
        }}>
          {octave}
        </div>

        <Button label="+" action={() => shiftOctave(1)} disabled={octave >= 6} />
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
          OCTAVE
        </span>
      </div>
    </div>
  )
}
