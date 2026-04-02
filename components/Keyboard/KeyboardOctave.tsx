'use client'

import KeyboardKey from './KeyboardKey'
import {
  WHITE_KEY_SEMITONES,
  BLACK_KEY_SEMITONES,
  isSemitoneInScale,
  buildNoteId,
  semitonesToNote,
} from '../../lib/audio/noteMap'
import { SWARA_NAMES_SHORT, CHROMATIC_NOTES } from '../../lib/ragas'

// Computer key shortcuts per semitone (display only)
const SEMITONE_TO_SHORTCUT: Record<number, string> = {
  0: 'A', 2: 'S', 4: 'D', 5: 'F', 7: 'G', 9: 'H', 11: 'J',
  1: 'W', 3: 'E', 6: 'T', 8: 'Y', 10: 'U',
}

interface KeyboardOctaveProps {
  octave: number
  rootIndex: number
  scaleMap: number[]
  strictMode: boolean
  activeKeys: Set<string>
  onPress: (noteId: string, note: string) => void
  onRelease: (noteId: string, note: string) => void
  isLastOctave?: boolean
}

export default function KeyboardOctave({
  octave,
  rootIndex,
  scaleMap,
  strictMode,
  activeKeys,
  onPress,
  onRelease,
  isLastOctave,
}: KeyboardOctaveProps) {
  return (
    <div
      style={{
        position: 'relative',
        display: 'flex',
        flex: isLastOctave ? 'none' : '1',
        width: isLastOctave ? 'calc(100% / 7 / 3)' : undefined,
        height: '100%',
        borderLeft: octave > 2 ? '1px solid rgba(150,100,50,0.2)' : undefined,
        paddingLeft: octave > 2 ? '1px' : undefined,
      }}
    >
      {/* White keys */}
      {WHITE_KEY_SEMITONES.map((semitone, whiteIndex) => {
        const noteId = buildNoteId(octave, semitone)
        const note = semitonesToNote(rootIndex, octave, semitone)
        const relativeDegree = ((semitone - rootIndex % 12) % 12 + 12) % 12
        const inScale = isSemitoneInScale(semitone, rootIndex % 12, scaleMap)
        const isDisabled = strictMode && !inScale
        const isActive = activeKeys.has(noteId)
        const swara = SWARA_NAMES_SHORT[relativeDegree] ?? ''
        const western = CHROMATIC_NOTES[semitone % 12]
        return (
          <div key={noteId} style={{ flex: 1, height: '100%' }}>
            <KeyboardKey
              noteId={noteId}
              note={note}
              isWhite={true}
              isActive={isActive}
              isDisabled={isDisabled}
              swara={swara}
              western={western}
              keyboardShortcut={whiteIndex < 7 ? SEMITONE_TO_SHORTCUT[semitone] : ''}
              whiteIndex={whiteIndex}
              onPress={onPress}
              onRelease={onRelease}
            />
          </div>
        )
      })}

      {/* Black keys — absolutely positioned */}
      {BLACK_KEY_SEMITONES.map((semitone, blackIndex) => {
        const noteId = buildNoteId(octave, semitone)
        const note = semitonesToNote(rootIndex, octave, semitone)
        const relativeDegree = ((semitone - rootIndex % 12) % 12 + 12) % 12
        const inScale = isSemitoneInScale(semitone, rootIndex % 12, scaleMap)
        const isDisabled = strictMode && !inScale
        const isActive = activeKeys.has(noteId)
        const swara = SWARA_NAMES_SHORT[relativeDegree] ?? ''
        const western = CHROMATIC_NOTES[semitone % 12]
        return (
          <KeyboardKey
            key={noteId}
            noteId={noteId}
            note={note}
            isWhite={false}
            isActive={isActive}
            isDisabled={isDisabled}
            swara={swara}
            western={western}
            keyboardShortcut={SEMITONE_TO_SHORTCUT[semitone]}
            blackIndex={blackIndex}
            onPress={onPress}
            onRelease={onRelease}
          />
        )
      })}
    </div>
  )
}
