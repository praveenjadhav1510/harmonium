'use client'

import { useEffect } from 'react'
import { useStore } from '../../lib/store'
import { startDrone, stopDrone, setDroneMasterVolume, isAudioReady } from '../../lib/audio/engine'
import { motion } from 'framer-motion'

export default function DroneToggle() {
  const { droneOn, droneVolume, toggleDrone, setDroneVolume, rootNote, octave } = useStore()

  const handleToggle = () => {
    toggleDrone()
    if (!droneOn) {
      startDrone(rootNote, octave)
    } else {
      stopDrone()
    }
  }

  // Sync drone volume
  useEffect(() => {
    if (isAudioReady()) setDroneMasterVolume(droneVolume)
  }, [droneVolume])

  // Re-trigger drone if root changes while drone is on
  useEffect(() => {
    if (droneOn && isAudioReady()) {
      stopDrone()
      setTimeout(() => startDrone(rootNote, octave), 100)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [rootNote])

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 10 }}>
      {/* Bass Panel Housing */}
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: '8px 12px',
        background: 'rgba(0,0,0,0.3)',
        borderRadius: 8,
        boxShadow: 'inset 0 2px 4px rgba(0,0,0,0.8), 0 1px 0 rgba(255,255,255,0.05)',
        border: '1px solid rgba(201,151,58,0.15)',
        gap: 8,
      }}>
        {/* Switch Row */}
        <div 
          onClick={handleToggle}
          style={{
            width: 48,
            height: 24,
            borderRadius: 12,
            background: 'rgba(15,13,11,0.6)',
            boxShadow: 'inset 0 1px 3px rgba(0,0,0,0.8)',
            padding: 2,
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            position: 'relative',
          }}
        >
          <motion.div
            animate={{ x: droneOn ? 24 : 0 }}
            transition={{ type: 'spring', stiffness: 500, damping: 30 }}
            style={{
              width: 20,
              height: 20,
              borderRadius: '50%',
              background: 'radial-gradient(circle at 35% 35%, #fff 0%, #e0d0c0 70%, #a69686 100%)',
              boxShadow: '0 2px 4px rgba(0,0,0,0.8), inset 0 1px 1px rgba(255,255,255,0.8)',
              zIndex: 2,
            }}
          />
          {/* LED Indicator */}
          <div style={{
            position: 'absolute',
            right: -10,
            top: '50%',
            transform: 'translateY(-50%)',
            width: 4,
            height: 4,
            borderRadius: '50%',
            backgroundColor: droneOn ? 'var(--accent-teal)' : '#1a2a26',
            boxShadow: droneOn ? '0 0 8px var(--accent-teal)' : 'none',
            transition: 'background 0.3s, box-shadow 0.3s',
          }} />
        </div>

        {/* Mini Range Slider */}
        <input
          type="range"
          min={0}
          max={100}
          value={droneVolume}
          onChange={(e) => setDroneVolume(Number(e.target.value))}
          aria-label="Drone volume"
          style={{
            width: 50,
            height: 4,
            appearance: 'none',
            background: 'rgba(0,0,0,0.5)',
            borderRadius: 2,
            accentColor: 'var(--accent-teal)',
            opacity: droneOn ? 1 : 0.3,
            cursor: droneOn ? 'pointer' : 'default',
            outline: 'none',
          } as React.CSSProperties}
        />
      </div>

      {/* Label section */}
      <span style={{
        fontSize: 10,
        color: droneOn ? 'var(--accent-teal)' : 'var(--accent-gold)',
        fontFamily: 'var(--font-mono)',
        fontWeight: 700,
        letterSpacing: '0.2em',
        textShadow: '0 1px 1px rgba(0,0,0,0.8)',
        opacity: droneOn ? 1 : 0.6,
        transition: 'color 0.3s, opacity 0.3s',
      }}>
        DRONE
      </span>
    </div>
  )
}
