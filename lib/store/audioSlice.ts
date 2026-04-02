import type { RagaPreset } from '../ragas'

export interface AudioSlice {
  volume: number
  sustainOn: boolean
  droneOn: boolean
  droneVolume: number
  setVolume: (v: number) => void
  toggleSustain: () => void
  toggleDrone: () => void
  setDroneVolume: (v: number) => void
}

export const createAudioSlice = (set: (fn: (state: AudioSlice) => Partial<AudioSlice>) => void): AudioSlice => ({
  volume: 75,
  sustainOn: false,
  droneOn: false,
  droneVolume: 40,
  setVolume: (v) => set(() => ({ volume: v })),
  toggleSustain: () => set((s) => ({ sustainOn: !s.sustainOn })),
  toggleDrone: () => set((s) => ({ droneOn: !s.droneOn })),
  setDroneVolume: (v) => set(() => ({ droneVolume: v })),
})
