export interface RecorderSlice {
  isRecording: boolean
  hasRecording: boolean
  recordingBlob: Blob | null
  isPlaying: boolean
  startRecording: () => void
  stopRecording: (blob: Blob) => void
  togglePlayback: () => void
  setIsPlaying: (v: boolean) => void
  exportRecording: () => void
}

export const createRecorderSlice = (set: (fn: (state: RecorderSlice) => Partial<RecorderSlice>) => void, get: () => RecorderSlice): RecorderSlice => ({
  isRecording: false,
  hasRecording: false,
  recordingBlob: null,
  isPlaying: false,
  startRecording: () => set(() => ({ isRecording: true })),
  stopRecording: (blob) => set(() => ({
    isRecording: false,
    hasRecording: true,
    recordingBlob: blob,
  })),
  togglePlayback: () => set((s) => ({ isPlaying: !s.isPlaying })),
  setIsPlaying: (v) => set(() => ({ isPlaying: v })),
  exportRecording: () => {
    const { recordingBlob } = get()
    if (!recordingBlob) return
    const url = URL.createObjectURL(recordingBlob)
    const a = document.createElement('a')
    a.href = url
    a.download = `harmonium-recording-${Date.now()}.webm`
    a.click()
    setTimeout(() => URL.revokeObjectURL(url), 5000)
  },
})
