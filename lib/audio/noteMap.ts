import { CHROMATIC_NOTES } from '../ragas'

export const COMPUTER_WHITE_KEYS = ['a', 's', 'd', 'f', 'g', 'h', 'j', 'k'] as const
export const COMPUTER_BLACK_KEYS = ['w', 'e', 't', 'y', 'u'] as const

// White key positions in an octave (C D E F G A B = semitone indices 0 2 4 5 7 9 11)
export const WHITE_KEY_SEMITONES = [0, 2, 4, 5, 7, 9, 11]
// Black key positions (C# D# F# G# A# = semitone indices 1 3 6 8 10)
export const BLACK_KEY_SEMITONES = [1, 3, 6, 8, 10]

// Computer keyboard → octave-relative semitone index
// A=Sa(0) S=Re(2) D=Ga(4) F=Ma(5) G=Pa(7) H=Dha(9) J=Ni(11) K=Sa'(12)
export const WHITE_KEY_TO_SEMITONE: Record<string, number> = {
  a: 0, s: 2, d: 4, f: 5, g: 7, h: 9, j: 11, k: 12,
}
// W=Ko Re(1) E=Ko Ga(3) T=Ti Ma(6) Y=Ko Dha(8) U=Ko Ni(10)
export const BLACK_KEY_TO_SEMITONE: Record<string, number> = {
  w: 1, e: 3, t: 6, y: 8, u: 10,
}

export const ALL_KEY_SEMITONES: Record<string, number> = {
  ...WHITE_KEY_TO_SEMITONE,
  ...BLACK_KEY_TO_SEMITONE,
}

/**
 * Given a root note index (0=C … 11=B), octave, and semitone offset,
 * returns a Tone.js note string like "D4" or "F#3".
 */
export function semitonesToNote(rootIndex: number, octave: number, semitoneOffset: number): string {
  const totalSemitone = rootIndex + semitoneOffset
  const noteIndex = totalSemitone % 12
  const octaveShift = Math.floor(totalSemitone / 12)
  return `${CHROMATIC_NOTES[noteIndex]}${octave + octaveShift}`
}

/**
 * Build a complete note ID for a key.
 * Format: `${octave}-${semitone}` e.g. "4-0" for Sa in octave 4
 */
export function buildNoteId(octave: number, semitone: number): string {
  return `${octave}-${semitone}`
}

/**
 * Determine if a semitone is "available" given a scaleMap and rootIndex.
 * scaleMap contains degree indices relative to the root; rootIndex shifts them chromatically.
 */
export function isSemitoneInScale(semitone: number, rootIndex: number, scaleMap: number[]): boolean {
  // Normalize the semitone relative to the root
  const relative = ((semitone - rootIndex) % 12 + 12) % 12
  return scaleMap.includes(relative)
}

export interface KeyDef {
  noteId: string
  note: string        // Tone.js note string e.g. "D4"
  isWhite: boolean
  semitone: number    // 0-11 within octave (relative to C)
  swaraDegree: number // relative to root
  octave: number
  whiteIndex?: number // position among white keys (0-6)
  blackIndex?: number // visual position (0-4)
}

/**
 * Generate all key definitions for a given octave, root, and scale
 */
export function buildOctaveKeys(octave: number, rootIndex: number, scaleMap: number[]): KeyDef[] {
  const keys: KeyDef[] = []

  // White keys
  WHITE_KEY_SEMITONES.forEach((semitone, whiteIndex) => {
    const note = semitonesToNote(rootIndex, octave, semitone)
    const swaraDegree = ((semitone - rootIndex) % 12 + 12) % 12  // not used here but helpful
    keys.push({
      noteId: buildNoteId(octave, semitone),
      note,
      isWhite: true,
      semitone,
      swaraDegree: ((semitone) % 12),
      octave,
      whiteIndex,
    })
  })

  // Black keys
  BLACK_KEY_SEMITONES.forEach((semitone, blackIndex) => {
    const note = semitonesToNote(rootIndex, octave, semitone)
    keys.push({
      noteId: buildNoteId(octave, semitone),
      note,
      isWhite: false,
      semitone,
      swaraDegree: ((semitone) % 12),
      octave,
      blackIndex,
    })
  })

  return keys
}
