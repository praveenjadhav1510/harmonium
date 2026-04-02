'use client'

import * as Tone from 'tone'

let initialized = false

// Main synth chain
let synth: Tone.PolySynth | null = null
let chorus: Tone.Chorus | null = null
let reverb: Tone.Reverb | null = null
let limiter: Tone.Limiter | null = null

// Drone
let droneSynth: Tone.PolySynth | null = null
let droneGain: Tone.Gain | null = null
let droneNotes: string[] = []

// Recorder + analyser
let recorder: Tone.Recorder | null = null
let analyser: Tone.Analyser | null = null

export async function initAudio(): Promise<void> {
  if (initialized) return
  initialized = true

  await Tone.start()

  // --- Main synth ---
  synth = new Tone.PolySynth(Tone.Synth, {
    oscillator: { type: 'sawtooth' },
    envelope: { attack: 0.02, decay: 0.1, sustain: 0.9, release: 1.2 },
    volume: -6,
  })

  chorus = new Tone.Chorus({ frequency: 2, depth: 0.4, wet: 0.2 })
  reverb = new Tone.Reverb({ decay: 2.5, wet: 0.3 })
  limiter = new Tone.Limiter(-3)

  await reverb.generate()
  synth.chain(chorus, reverb, limiter, Tone.Destination)

  // --- Drone synth ---
  droneSynth = new Tone.PolySynth(Tone.Synth, {
    oscillator: { type: 'sine' },
    envelope: { attack: 2, decay: 0, sustain: 1, release: 3 },
    volume: -18,
  })
  droneGain = new Tone.Gain(0)
  droneSynth.connect(droneGain)
  droneGain.connect(Tone.Destination)

  // --- Recorder + analyser ---
  analyser = new Tone.Analyser('waveform', 256)
  recorder = new Tone.Recorder()
  Tone.Destination.connect(analyser)
  Tone.Destination.connect(recorder)
}

export function triggerNote(note: string): void {
  if (!synth) return
  try {
    synth.triggerAttack(note, Tone.now())
  } catch {
    // ignore duplicate note errors
  }
}

export function releaseNote(note: string): void {
  if (!synth) return
  try {
    synth.triggerRelease(note, Tone.now())
  } catch {
    // ignore
  }
}

export function setMasterVolume(pct: number): void {
  // pct: 0-100
  const db = pct === 0 ? -Infinity : -40 + (pct / 100) * 40
  Tone.Destination.volume.rampTo(db, 0.05)
}

export function setSustain(on: boolean): void {
  if (!synth) return
  synth.set({ envelope: { release: on ? 4.0 : 1.2 } })
}

export function startDrone(rootNote: string, octave: number): void {
  if (!droneSynth || !droneGain) return
  // Sa (root) and Pa (perfect fifth = 7 semitones up)
  const CHROMATIC = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B']
  const rootIdx = CHROMATIC.indexOf(rootNote)
  const paIdx = (rootIdx + 7) % 12
  const paOctave = rootIdx + 7 >= 12 ? octave + 1 : octave
  const saNoteStr = `${CHROMATIC[rootIdx]}${octave - 1}`
  const paNoteStr = `${CHROMATIC[paIdx]}${paOctave - 1}`
  droneNotes = [saNoteStr, paNoteStr]

  droneSynth.triggerAttack(droneNotes, Tone.now())
  droneGain.gain.cancelScheduledValues(Tone.now())
  droneGain.gain.rampTo(1, 2)
}

export function stopDrone(): void {
  if (!droneSynth || !droneGain) return
  droneGain.gain.cancelScheduledValues(Tone.now())
  droneGain.gain.rampTo(0, 2)
  const notesToRelease = [...droneNotes]
  setTimeout(() => {
    try { droneSynth?.triggerRelease(notesToRelease) } catch { /* ignore */ }
  }, 2200)
  droneNotes = []
}

export function setDroneMasterVolume(pct: number): void {
  if (!droneSynth) return
  const db = pct === 0 ? -Infinity : -30 + (pct / 100) * 20
  droneSynth.volume.rampTo(db, 0.1)
}

export async function startRecording(): Promise<void> {
  if (!recorder) return
  await recorder.start()
}

export async function stopRecording(): Promise<Blob> {
  if (!recorder) throw new Error('No recorder')
  return await recorder.stop()
}

export function getAnalyserData(): Float32Array | null {
  if (!analyser) return null
  return analyser.getValue() as Float32Array
}

export function isAudioReady(): boolean {
  return initialized
}
