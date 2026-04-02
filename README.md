# Harmonium Studio

A high-fidelity, browser-native Indian classical music instrument built with Next.js 16, React 19, Tone.js, and Zustand.

## Features

- **High-Fidelity Audio**: Custom-tuned PolySynth to mimic the warm, rich reeds of a traditional harmonium.
- **Drone Support**: Integrated Sa-Pa drone with smooth fade-in/out logic for a meditative practice experience.
- **Raga System**: 9 curated raga presets (Yaman, Bhairavi, etc.) with:
  - **Strict Mode**: Dims non-raga keys for focused playing.
  - **Sa Selector**: Remap the entire instrument to any of the 12 chromatic notes.
- **Visual Feedback**:
  - **Devanagari Note Display**: Real-time swara display (सा, रे, ग...).
  - **Circular Scale Ring**: Visualizes active scale degrees in a chromatic 12-dot ring.
  - **Active Octave Centering**: The keyboard smoothly scrolls to center the active octave whenever it's shifted.
- **Recording & Export**: Capture your sessions directly in the browser and export them as high-quality audio files.
- **Responsive Controls**: Desktop keyboard shortcuts (A-K / W-U), touch support for mobile/tablets, and glissando-ready mouse interactions.

## Tech Stack

- **Framework**: Next.js 16 (App Router)
- **Library**: React 19
- **Styling**: Tailwind CSS v4 (Vanilla CSS variables for design system)
- **Audio Engine**: Tone.js
- **State Management**: Zustand (Modular slicing)
- **Animations**: Framer Motion

## Getting Started

1. **Install Dependencies**:
   ```bash
   npm install
   ```

2. **Run Dev Server**:
   ```bash
   npm run dev
   ```

3. **Play**:
   Open `http://localhost:3000` and start playing! Use your computer keyboard (A through K) or click/touch the keys.

## License

MIT
