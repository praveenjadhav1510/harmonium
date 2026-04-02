export interface KeyboardSlice {
  octave: number
  activeKeys: Set<string>
  pressedKeys: Set<string>
  pressKey: (id: string) => void
  releaseKey: (id: string) => void
  shiftOctave: (dir: 1 | -1) => void
}

export const createKeyboardSlice = (set: (fn: (state: KeyboardSlice) => Partial<KeyboardSlice>) => void): KeyboardSlice => ({
  octave: 4,
  activeKeys: new Set<string>(),
  pressedKeys: new Set<string>(),
  pressKey: (id) => set((s) => ({
    activeKeys: new Set([...s.activeKeys, id]),
    pressedKeys: new Set([...s.pressedKeys, id]),
  })),
  releaseKey: (id) => set((s) => {
    const activeKeys = new Set(s.activeKeys)
    const pressedKeys = new Set(s.pressedKeys)
    activeKeys.delete(id)
    pressedKeys.delete(id)
    return { activeKeys, pressedKeys }
  }),
  shiftOctave: (dir) => set((s) => ({
    octave: Math.max(2, Math.min(6, s.octave + dir)),
  })),
})
