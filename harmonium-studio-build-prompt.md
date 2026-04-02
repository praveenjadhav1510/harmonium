# 🎵 Harmonium Studio — Complete Build Documentation

> *A browser-native Indian classical music instrument fusing the physicality of a traditional harmonium with the expressiveness of modern web technology.*

---

## Table of Contents

1. [Project Vision](#project-vision)
2. [Design Identity](#design-identity)
3. [Tech Stack](#tech-stack)
4. [Architecture](#architecture)
5. [Audio Engine](#audio-engine)
6. [State Management](#state-management)
7. [Keyboard Interaction](#keyboard-interaction)
8. [Visual Design System](#visual-design-system)
9. [Raga Presets](#raga-presets)
10. [Recording & Export](#recording--export)
11. [Performance Requirements](#performance-requirements)
12. [Accessibility](#accessibility)
13. [Delivery Checklist](#delivery-checklist)
14. [The North Star](#the-north-star)

---

## Project Vision

Harmonium Studio is not a toy or a demo. It must feel like a **real instrument** that a musician would practice on — with the aesthetic soul of a beautifully crafted physical object rendered digitally.

The goal is to create a **musical playground** where users can intuitively explore Indian classical music in the browser, with:

- Instant, low-latency audio response
- Multi-octave keyboard playable via keyboard, mouse, and touch
- Scale shifting (Sa reassignment) and Raga presets
- Drone (Sa-Pa) background, sustain effects, and recording/export
- A visual language rooted in craft, warmth, and elegance

---

## Design Identity

**Aesthetic DNA:** Dark, tactile, artisanal.

Think **aged rosewood + brushed brass + soft amber light**. The interface should feel like it was *built by a luthier who also codes*.

| Element | Direction |
|---|---|
| **Palette** | Warm blacks, deep teals, saffron/gold accents |
| **Materials** | Rosewood panels, ivory keys, brass knobs |
| **Typography** | Playfair Display (display) + JetBrains Mono (data labels) |
| **Motion** | Physics-based springs, tactile key press feedback |
| **Atmosphere** | Faint amber halo around keyboard, subtle grain texture |

---

## Tech Stack

| Layer | Technology | Purpose |
|---|---|---|
| Framework | **Next.js 14+** (App Router) | RSC, streaming, fast routing |
| Styling | **Tailwind CSS** + CSS Variables | Utility-first + theming |
| Animation | **Framer Motion 11+** | Physics-based spring animations |
| Audio | **Tone.js** (PolySynth + Reverb + Sustain) | Low-latency, harmonic richness |
| State | **Zustand** (slices pattern) | Minimal re-renders, modular |
| Fonts | **Playfair Display + JetBrains Mono** | Via Google Fonts |

---

## Architecture

### Component Tree

```
app/
├── layout.tsx               # Root shell, font loading, global providers
├── page.tsx                 # Studio root — composes all panels
│
components/
├── Keyboard/
│   ├── KeyboardOctave.tsx   # Single octave (7 white + 5 black keys)
│   ├── KeyboardKey.tsx      # Individual key — white/black, animated, accessible
│   └── KeyboardShell.tsx    # 2–3 octave full keyboard, scroll-aware layout
│
├── Controls/
│   ├── VolumeKnob.tsx       # Rotary SVG knob, drag-to-adjust
│   ├── OctaveShifter.tsx    # +/- octave with visual indicator
│   ├── SustainToggle.tsx    # Toggle sustain pedal effect
│   └── DroneToggle.tsx      # Sa-Pa drone on/off with volume
│
├── Scale/
│   ├── SaSelector.tsx       # Chromatic root note picker (C through B)
│   ├── RagaPresets.tsx      # Raga grid: Yaman, Bhairavi, Bhairav, Kafi, etc.
│   └── ScaleVisualizer.tsx  # Active scale dots on a circular chromatic ring
│
├── Recorder/
│   ├── RecordButton.tsx     # Armed/recording state with pulse animation
│   ├── Playback.tsx         # Waveform thumbnail + play/stop
│   └── ExportButton.tsx     # Export as WAV via Tone.js Recorder
│
├── Display/
│   ├── NoteDisplay.tsx      # Active swaras in Devanagari + Western notation
│   └── OctaveIndicator.tsx  # Visual octave position indicator
│
└── Studio/
    └── StudioLayout.tsx     # Master layout — keyboard bottom, controls top, side panels
```

### Layout Structure

```
┌─────────────────────────────────────────────────────┐
│  [Logo]    HARMONIUM STUDIO         [Settings]       │  ← Header
├──────────────────┬──────────────────────────────────┤
│                  │                                   │
│  Scale & Raga    │   Note Display + Octave Ring      │  ← Top Panels
│  Selector        │                                   │
│                  │                                   │
├──────────────────┴──────────────────────────────────┤
│         Volume · Octave · Sustain · Drone            │  ← Controls Bar
├─────────────────────────────────────────────────────┤
│                                                      │
│          ████ KEYBOARD (3 octaves) ████            │  ← Main Keyboard
│                                                      │
├─────────────────────────────────────────────────────┤
│  [● REC]  [▶ PLAY]  [⬇ EXPORT]   ~~waveform~~       │  ← Recorder Bar
└─────────────────────────────────────────────────────┘
```

---

## Audio Engine

### Initialization

> **Important:** Audio context must be created on first user interaction to comply with browser autoplay policies. Initialize inside a `useEffect` triggered by a user gesture.

### Harmonium Voice Setup

```js
// Warm, reedy harmonium timbre using sawtooth oscillator
const synth = new Tone.PolySynth(Tone.Synth, {
  oscillator: { type: "sawtooth" },
  envelope: {
    attack: 0.02,
    decay: 0.1,
    sustain: 0.9,
    release: 1.2
  },
  volume: -6
});

const reverb  = new Tone.Reverb({ decay: 2.5, wet: 0.3 });
const chorus  = new Tone.Chorus({ frequency: 2, depth: 0.4, wet: 0.2 }); // Warm detune
const limiter = new Tone.Limiter(-3);

synth.chain(chorus, reverb, limiter, Tone.Destination);
```

### Drone Engine

```js
// Sa (root) + Pa (perfect fifth) continuous drone
const droneSynth = new Tone.PolySynth(Tone.Synth, {
  oscillator: { type: "sine" },
  envelope: { attack: 2, sustain: 1, release: 3 },
  volume: -18
});

// On drone toggle: fade in over 2s using Tone.js ramp
// On toggle off: fade out over 2s, then stop
```

### Scale Shifting

- All 12 chromatic roots supported (C through B)
- When Sa changes, remap all keyboard note assignments
- Use a `noteMap` derived from `rootNoteIndex + scaleIntervals[]`
- Example: Sa = D means C key plays D, D key plays E, etc.

### Sustain Effect

- When sustain is ON: notes continue after key release using extended `release` envelope
- When OFF: default `release: 1.2s`
- Toggled via Zustand `sustainOn` state, applied dynamically to synth envelope

---

## State Management

### Zustand Slices Pattern

```ts
// audioSlice.ts
interface AudioState {
  volume: number;           // 0–100
  sustainOn: boolean;
  droneOn: boolean;
  droneVolume: number;      // 0–100
  setVolume: (v: number) => void;
  toggleSustain: () => void;
  toggleDrone: () => void;
}

// keyboardSlice.ts
interface KeyboardState {
  octave: number;           // 3 | 4 | 5
  activeKeys: Set<string>;  // Currently sounding note IDs
  pressedKeys: Set<string>; // Currently held key IDs (visual state)
  pressKey: (id: string) => void;
  releaseKey: (id: string) => void;
  shiftOctave: (dir: 1 | -1) => void;
}

// scaleSlice.ts
interface ScaleState {
  rootNote: string;         // "C" | "C#" | "D" ... "B"
  rootIndex: number;        // 0–11
  activeRaga: RagaPreset | null;
  scaleMap: number[];       // Active scale degree indices
  setRoot: (note: string) => void;
  setRaga: (raga: RagaPreset | null) => void;
}

// recorderSlice.ts
interface RecorderState {
  isRecording: boolean;
  hasRecording: boolean;
  recordingBlob: Blob | null;
  isPlaying: boolean;
  startRecording: () => void;
  stopRecording: () => void;
  togglePlayback: () => void;
  exportRecording: () => void;
}
```

---

## Keyboard Interaction

### Computer Keyboard Mapping

```
Swaras:  Sa    Re    Ga    Ma    Pa    Dha   Ni    Sa'
Keys:     A     S     D     F     G     H     J     K

Komal/Tivra (black keys):
          W     E     -     T     Y     U
       KoRe  KoGa       TiMa  KoDha  KoNi
```

### Touch Support

```js
// On keyboard container element:
touch-action: none;  // CSS — prevent scroll interference

// Event handlers:
onTouchStart={(e) => {
  e.preventDefault();
  Array.from(e.changedTouches).forEach(t => pressNote(t.target.dataset.note));
}}
onTouchEnd={(e) => {
  e.preventDefault();
  Array.from(e.changedTouches).forEach(t => releaseNote(t.target.dataset.note));
}}
// Supports up to 5 simultaneous touches for chords
```

### Mouse Interaction

- `mousedown` → note on
- `mouseup` / `mouseleave` → note off
- Click-drag across keys → glissando (continuous note triggering)

---

## Visual Design System

### CSS Variables

```css
:root {
  /* Backgrounds */
  --bg-primary:    #0f0d0b;   /* Near black, warm undertone */
  --bg-panel:      #1a1612;   /* Dark rosewood */
  --bg-elevated:   #2a211a;   /* Lifted surfaces */

  /* Accents */
  --accent-gold:    #c9973a;  /* Brass / gold */
  --accent-saffron: #e8821a;  /* Saffron highlight */
  --accent-teal:    #2a7a6e;  /* Deep teal */

  /* Keys */
  --white-key:  #f5ede0;      /* Warm ivory */
  --black-key:  #1c1410;      /* Dark ebony */
  --active-glow: #e8821a80;   /* Key press orange glow */

  /* Text */
  --text-primary: #f0e6d3;
  --text-muted:   #8a7a6a;

  /* Typography */
  --font-display: 'Playfair Display', serif;
  --font-mono:    'JetBrains Mono', monospace;
}
```

### Key Press Animation (Framer Motion)

```jsx
// White key
<motion.div
  whileTap={{ scaleY: 0.96, backgroundColor: "#e8d5b0" }}
  style={{ originY: 0 }}  // Pivot from top (hinge effect)
  transition={{ type: "spring", stiffness: 600, damping: 30 }}
/>

// Black key
<motion.div
  whileTap={{ scaleY: 0.94, backgroundColor: "#3a2e20" }}
  style={{ originY: 0 }}
  transition={{ type: "spring", stiffness: 700, damping: 35 }}
/>

// Active note: add saffron bottom-border glow
// boxShadow: "0 8px 20px var(--active-glow)" when key is in activeKeys
```

### Background Texture

```css
/* Subtle SVG noise at 4% opacity over bg-primary */
.studio-bg::after {
  content: '';
  background-image: url("data:image/svg+xml,..."); /* SVG noise filter */
  opacity: 0.04;
  position: absolute;
  inset: 0;
  pointer-events: none;
}

/* Faint radial amber halo centered on keyboard */
.keyboard-area {
  background: radial-gradient(
    ellipse 80% 40% at 50% 100%,
    rgba(200, 120, 30, 0.06) 0%,
    transparent 70%
  );
}
```

### Raga Card Design

Each raga in the preset grid displays:
- Raga name in **Devanagari script** (large, Playfair Display)
- Raga name in English (small, muted)
- Parent thaat label
- Mood tag (Romantic / Devotional / Serious / Melancholic)
- Time of day indicator (Morning / Evening / Night)
- Mini scale bar: 12 dots, active scale degrees lit in saffron

---

## Raga Presets

Minimum 9 ragas. Each defined as an array of scale degree indices (0 = Sa, 1 = Komal Re, ..., 11 = Komal Ni).

| Raga | Scale Degrees | Time | Mood |
|---|---|---|---|
| **Yaman** | 0, 2, 4, 6, 7, 9, 11 | Evening | Romantic |
| **Bhairavi** | 0, 1, 3, 5, 7, 8, 10 | Morning | Devotional |
| **Bhairav** | 0, 1, 4, 5, 7, 8, 11 | Morning | Serious |
| **Kafi** | 0, 2, 3, 5, 7, 9, 10 | Night | Melancholic |
| **Bilawal** | 0, 2, 4, 5, 7, 9, 11 | Morning | Serene |
| **Khamaj** | 0, 2, 4, 5, 7, 9, 10 | Evening | Romantic |
| **Asavari** | 0, 2, 3, 5, 7, 8, 10 | Afternoon | Serious |
| **Durga** | 0, 2, 5, 7, 9 | Evening | Bright |
| **Desh** | 0, 2, 4, 5, 7, 9, 10 | Night | Longing |

### Raga Strict Mode

When a Raga is active and **Strict Mode** is enabled:
- Invalid scale degrees are visually dimmed on the keyboard
- Playing a dimmed key produces no sound
- Toggle strict mode per-raga via a small lock icon on the raga card

---

## Recording & Export

### Implementation

```ts
// Setup: connect Tone.Recorder to Destination
const recorder = new Tone.Recorder();
Tone.Destination.connect(recorder);

// Start recording
recorder.start();

// Stop and capture
const blob = await recorder.stop();
// Type: audio/webm (Chromium) or audio/ogg (Firefox)

// Store blob in Zustand recorderSlice
set({ recordingBlob: blob, hasRecording: true });

// Playback
const url = URL.createObjectURL(blob);
audioElement.src = url;
audioElement.play();

// Export / Download
const a = document.createElement('a');
a.href = url;
a.download = 'harmonium-recording.webm';
a.click();
```

### Waveform Visualization

- Connect `Tone.Analyser` to `Tone.Destination` during recording
- Draw waveform via `<canvas>` using `requestAnimationFrame`
- Show as a mini thumbnail bar in the recorder strip
- After recording stops: render static waveform preview of the full take

---

## Performance Requirements

| Metric | Target |
|---|---|
| Audio latency (keypress → sound) | < 30ms |
| First Contentful Paint | < 1.2s |
| Animation frame rate | 60fps constant |
| Layout shifts on key press | Zero |
| Simultaneous notes supported | Up to 10 (PolySynth voices) |

### Implementation Notes

- Use `will-change: transform` on all keyboard keys
- Tone.js context created in `"use client"` component, deferred until user gesture
- All heavy audio setup in `useEffect` with full cleanup on unmount
- Zustand selectors with shallow equality to prevent unnecessary re-renders
- No server components for audio-related logic — all client-side
- 3 octaves = 36 keys — flat DOM render is fine, no virtualization needed

---

## Accessibility

```jsx
// Keyboard container
<div
  role="application"
  aria-label="Harmonium keyboard"
  aria-description="Use A–K keys to play Sa through Sa. W, E, T, Y, U for sharp/flat notes."
  tabIndex={0}
>
  {keys.map(key => (
    <motion.button
      key={key.id}
      aria-label={`${key.swara} ${key.western} Octave ${key.octave}`}
      aria-pressed={activeKeys.has(key.id)}
    />
  ))}
</div>
```

Additional requirements:
- Tab to focus keyboard; arrow keys to navigate between notes
- Visual focus ring styled in `--accent-saffron`
- `prefers-reduced-motion`: disable all Framer Motion animations, use instant state changes
- Sufficient color contrast on all text elements (WCAG AA minimum)
- Screen reader announces currently playing note via `aria-live="polite"` region

---

## Delivery Checklist

The final delivered project must include:

- [ ] `package.json` with all dependencies version-pinned
- [ ] `tailwind.config.ts` with custom design tokens
- [ ] All components fully implemented — zero placeholder stubs
- [ ] Working audio output on first `npm run dev`
- [ ] All 9+ raga presets functional
- [ ] Computer keyboard, mouse, and touch input all working
- [ ] Recording → playback → export flow complete
- [ ] Drone toggle functional with fade in/out
- [ ] Sustain toggle functional
- [ ] Sa (root) selector functional — all 12 chromatic roots
- [ ] Octave shift (+/-) working across 3 octaves
- [ ] `README.md` with setup instructions
- [ ] Responsive layout (works on tablet and desktop)
- [ ] No console errors on load

---

## The North Star

> When a musician opens this in a browser, their first reaction should be:
> **"I want to play this."**
> Not *"this looks like a music app."*

The difference is in every detail — the warmth of the keys, the immediacy of the sound, the way the interface breathes with each note.

This is the fusion of **traditional Indian music** and **modern web technology** — elegant, fast, and deeply interactive. Build for that reaction.

---

*Harmonium Studio Build Documentation — v1.0*
