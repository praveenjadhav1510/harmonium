'use client'

import KeyboardShell from '../Keyboard/KeyboardShell'
import VolumeKnob from '../Controls/VolumeKnob'
import OctaveShifter from '../Controls/OctaveShifter'
import SustainToggle from '../Controls/SustainToggle'
import DroneToggle from '../Controls/DroneToggle'
import SaSelector from '../Scale/SaSelector'
import RagaPresets from '../Scale/RagaPresets'
import ScaleVisualizer from '../Scale/ScaleVisualizer'
import NoteDisplay from '../Display/NoteDisplay'
import OctaveIndicator from '../Display/OctaveIndicator'
import RecordButton from '../Recorder/RecordButton'
import Playback from '../Recorder/Playback'
import ExportButton from '../Recorder/ExportButton'

export default function StudioLayout() {
  return (
    <div
      className="studio-bg"
      style={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: '#0f0d0b',
        color: '#f0e6d3',
        overflow: 'hidden',
      }}
    >
      {/* ── Header ── */}
      <header style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '10px 24px',
        borderBottom: '1px solid rgba(201,151,58,0.2)',
        background: 'linear-gradient(180deg, #1a1612 0%, #0f0d0b 100%)',
        position: 'relative',
        zIndex: 10,
        flexShrink: 0,
        boxShadow: '0 4px 12px rgba(0,0,0,0.5)',
      }}>
        {/* Logo & Title */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <div style={{
            width: 32,
            height: 32,
            borderRadius: 6,
            background: 'linear-gradient(135deg, var(--accent-saffron), var(--accent-gold))',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: 16,
            boxShadow: '0 0 12px rgba(232,130,26,0.5)',
            color: '#1a1612',
            fontWeight: 'bold',
          }}>
            ॐ
          </div>
          <div>
            <h1 style={{
              fontFamily: 'var(--font-display)',
              fontSize: 18,
              letterSpacing: '0.12em',
              color: 'var(--text-primary)',
              lineHeight: 1,
              fontWeight: 700,
            }}>
              HARMONIUM STUDIO
            </h1>
            <p style={{
              fontSize: 9,
              color: 'var(--accent-gold)',
              fontFamily: 'var(--font-mono)',
              letterSpacing: '0.2em',
              marginTop: 2,
              opacity: 0.6,
              textTransform: 'uppercase',
            }}>
              Professional Indian Classical Instrument
            </p>
          </div>
        </div>
        {/* Right side: octave indicator */}
        <OctaveIndicator />
      </header>

      {/* ── Top Panels ── */}
      <div style={{
        display: 'flex',
        gap: 0,
        borderBottom: '1px solid rgba(201,151,58,0.15)',
        flexShrink: 0,
        backgroundColor: '#0f0d0b',
        height: 'calc(100vh - 380px)',
        minHeight: 240,
        maxHeight: 320,
      }}>
        {/* Left: Scale & Raga */}
        <div style={{
          width: '58%',
          padding: '16px 24px',
          borderRight: '1px solid rgba(201,151,58,0.15)',
          backgroundColor: '#161310',
          display: 'flex',
          flexDirection: 'column',
          gap: 20,
          overflowY: 'auto',
          boxShadow: 'inset -8px 0 16px rgba(0,0,0,0.3)',
        }}>
          <SaSelector />
          <RagaPresets />
        </div>

        {/* Right: Note Display + Scale Ring */}
        <div style={{
          flex: 1,
          display: 'flex',
          backgroundColor: '#0f0d0b',
          overflow: 'hidden',
        }}>
          <div style={{ flex: 1, borderRight: '1px solid rgba(201,151,58,0.1)' }}>
            <NoteDisplay />
          </div>
          <div style={{
            padding: '16px 20px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: '#0f0d0b',
          }}>
            <ScaleVisualizer />
          </div>
        </div>
      </div>

      {/* ── Brass Rail Spacer ── */}
      <div style={{
        height: 4,
        background: 'linear-gradient(180deg, #c9973a 0%, #8a6020 50%, #4a3414 100%)',
        boxShadow: '0 2px 4px rgba(0,0,0,0.5)',
        zIndex: 5,
        opacity: 0.8,
      }} />

      {/* ── Controls Bar ── */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 48,
        padding: '16px 32px',
        background: 'linear-gradient(180deg, #1e1a14 0%, #120e0a 100%)',
        borderBottom: '1px solid rgba(0,0,0,0.5)',
        flexShrink: 0,
        flexWrap: 'wrap',
        position: 'relative',
        zIndex: 4,
      }}>
        <VolumeKnob />
        <div style={{ width: 2, height: 44, background: 'linear-gradient(180deg, transparent, rgba(201,151,58,0.2), transparent)' }} />
        <OctaveShifter />
        <div style={{ width: 2, height: 44, background: 'linear-gradient(180deg, transparent, rgba(201,151,58,0.2), transparent)' }} />
        <SustainToggle />
        <div style={{ width: 2, height: 44, background: 'linear-gradient(180deg, transparent, rgba(201,151,58,0.2), transparent)' }} />
        <DroneToggle />
      </div>

      {/* ── Keyboard Section ── */}
      <div style={{
        flex: 1,
        position: 'relative',
        background: 'linear-gradient(180deg, #1a1612 0%, #0f0d0b 100%)',
        overflow: 'hidden',
        boxShadow: 'inset 0 12px 24px rgba(0,0,0,0.4)',
      }}>
        {/* Brass rail top of keyboard */}
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: 6,
          background: 'linear-gradient(180deg, #8a6020 0%, #4a3414 100%)',
          zIndex: 2,
          opacity: 0.6,
        }} />
        <div style={{ position: 'absolute', inset: 0, paddingTop: 10, zIndex: 1 }}>
          <KeyboardShell />
        </div>
      </div>

      {/* ── Recorder Bar ── */}
      <footer style={{
        display: 'flex',
        alignItems: 'center',
        gap: 16,
        padding: '12px 24px',
        backgroundColor: '#161310',
        borderTop: '1px solid rgba(201,151,58,0.2)',
        flexShrink: 0,
        boxShadow: '0 -4px 12px rgba(0,0,0,0.5)',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <RecordButton />
          <Playback />
        </div>
        <div style={{ flex: 1 }} />
        <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
          <span style={{
            fontSize: 9,
            color: 'rgba(201,151,58,0.4)',
            fontFamily: 'var(--font-mono)',
            letterSpacing: '0.15em',
            textTransform: 'uppercase',
          }}>
            Input Shortcuts: A–K / W E T Y U
          </span>
          <ExportButton />
        </div>
      </footer>
    </div>
  )
}
