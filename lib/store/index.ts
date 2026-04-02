'use client'

import { create } from 'zustand'
import { createAudioSlice, type AudioSlice } from './audioSlice'
import { createKeyboardSlice, type KeyboardSlice } from './keyboardSlice'
import { createScaleSlice, type ScaleSlice } from './scaleSlice'
import { createRecorderSlice, type RecorderSlice } from './recorderSlice'

export type StudioStore = AudioSlice & KeyboardSlice & ScaleSlice & RecorderSlice

export const useStore = create<StudioStore>()((set, get) => ({
  ...createAudioSlice(set as (fn: (state: AudioSlice) => Partial<AudioSlice>) => void),
  ...createKeyboardSlice(set as (fn: (state: KeyboardSlice) => Partial<KeyboardSlice>) => void),
  ...createScaleSlice(set as (fn: (state: ScaleSlice) => Partial<ScaleSlice>) => void),
  ...createRecorderSlice(
    set as (fn: (state: RecorderSlice) => Partial<RecorderSlice>) => void,
    get as () => RecorderSlice
  ),
}))
