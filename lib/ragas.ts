export type RagaTime = 'Morning' | 'Afternoon' | 'Evening' | 'Night' | 'Any'
export type RagaMood = 'Romantic' | 'Devotional' | 'Serious' | 'Melancholic' | 'Serene' | 'Bright' | 'Longing'

export interface RagaPreset {
  id: string
  nameDevanagari: string
  nameEnglish: string
  thaat: string
  scaleDegrees: number[]  // 0=Sa, 1=KoRe, 2=Re, ..., 11=KoNi
  time: RagaTime
  mood: RagaMood
}

export const RAGAS: RagaPreset[] = [
  {
    id: 'yaman',
    nameDevanagari: 'यमन',
    nameEnglish: 'Yaman',
    thaat: 'Kalyan',
    scaleDegrees: [0, 2, 4, 6, 7, 9, 11],
    time: 'Evening',
    mood: 'Romantic',
  },
  {
    id: 'bhairavi',
    nameDevanagari: 'भैरवी',
    nameEnglish: 'Bhairavi',
    thaat: 'Bhairavi',
    scaleDegrees: [0, 1, 3, 5, 7, 8, 10],
    time: 'Morning',
    mood: 'Devotional',
  },
  {
    id: 'bhairav',
    nameDevanagari: 'भैरव',
    nameEnglish: 'Bhairav',
    thaat: 'Bhairav',
    scaleDegrees: [0, 1, 4, 5, 7, 8, 11],
    time: 'Morning',
    mood: 'Serious',
  },
  {
    id: 'kafi',
    nameDevanagari: 'काफी',
    nameEnglish: 'Kafi',
    thaat: 'Kafi',
    scaleDegrees: [0, 2, 3, 5, 7, 9, 10],
    time: 'Night',
    mood: 'Melancholic',
  },
  {
    id: 'bilawal',
    nameDevanagari: 'बिलावल',
    nameEnglish: 'Bilawal',
    thaat: 'Bilawal',
    scaleDegrees: [0, 2, 4, 5, 7, 9, 11],
    time: 'Morning',
    mood: 'Serene',
  },
  {
    id: 'khamaj',
    nameDevanagari: 'खमाज',
    nameEnglish: 'Khamaj',
    thaat: 'Khamaj',
    scaleDegrees: [0, 2, 4, 5, 7, 9, 10],
    time: 'Evening',
    mood: 'Romantic',
  },
  {
    id: 'asavari',
    nameDevanagari: 'आसावरी',
    nameEnglish: 'Asavari',
    thaat: 'Asavari',
    scaleDegrees: [0, 2, 3, 5, 7, 8, 10],
    time: 'Afternoon',
    mood: 'Serious',
  },
  {
    id: 'durga',
    nameDevanagari: 'दुर्गा',
    nameEnglish: 'Durga',
    thaat: 'Bilawal',
    scaleDegrees: [0, 2, 5, 7, 9],
    time: 'Evening',
    mood: 'Bright',
  },
  {
    id: 'desh',
    nameDevanagari: 'देश',
    nameEnglish: 'Desh',
    thaat: 'Khamaj',
    scaleDegrees: [0, 2, 4, 5, 7, 9, 10],
    time: 'Night',
    mood: 'Longing',
  },
]

// Swara names in Devanagari for display
export const SWARA_NAMES_DEVANAGARI = ['सा', 'कोरे', 'रे', 'कोग', 'ग', 'म', 'ति म', 'प', 'कोध', 'ध', 'कोनि', 'नि']
export const SWARA_NAMES_SHORT = ['Sa', 'Ko Re', 'Re', 'Ko Ga', 'Ga', 'Ma', 'Ti Ma', 'Pa', 'Ko Dha', 'Dha', 'Ko Ni', 'Ni']
export const CHROMATIC_NOTES = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B']
