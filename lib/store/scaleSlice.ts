import type { RagaPreset } from '../ragas'

export interface ScaleSlice {
  rootNote: string
  rootIndex: number
  activeRaga: RagaPreset | null
  scaleMap: number[]
  strictMode: boolean
  setRoot: (note: string, index: number) => void
  setRaga: (raga: RagaPreset | null) => void
  toggleStrict: () => void
}

// Chromatic = all 12 degrees
const CHROMATIC_ALL = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11]

export const createScaleSlice = (set: (fn: (state: ScaleSlice) => Partial<ScaleSlice>) => void): ScaleSlice => ({
  rootNote: 'C',
  rootIndex: 0,
  activeRaga: null,
  scaleMap: CHROMATIC_ALL,
  strictMode: false,
  setRoot: (note, index) => set((s) => ({
    rootNote: note,
    rootIndex: index,
    // Keep same raga but re-apply on new root
    scaleMap: s.activeRaga ? s.activeRaga.scaleDegrees : CHROMATIC_ALL,
  })),
  setRaga: (raga) => set(() => ({
    activeRaga: raga,
    scaleMap: raga ? raga.scaleDegrees : CHROMATIC_ALL,
  })),
  toggleStrict: () => set((s) => ({ strictMode: !s.strictMode })),
})
