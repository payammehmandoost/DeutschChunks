# Deutsch Chunks 🇩🇪

> Learn natural German phrases with native German audio. Designed for Persian-speaking learners.

## Overview

Deutsch Chunks is a modern Progressive Web App (PWA) for learning German through natural phrases and chunks rather than isolated vocabulary. The app is designed primarily for Persian-speaking learners and features:

- **Phrase-based learning** — Learn complete German phrases with context
- **Trilingual support** — German, English, and Persian translations
- **Native audio architecture** — Designed for real native German recordings
- **Spaced repetition** — SM-2 inspired algorithm for optimal retention
- **Multiple practice modes** — English→German, Persian→German, Audio→German, and more
- **Offline support** — PWA with IndexedDB storage
- **Dark mode** — Light, dark, and system themes
- **RTL support** — Proper Persian text rendering
- **Responsive design** — Works on phones, tablets, and desktops

## Quick Start

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## Project Structure

```
src/
├── App.tsx                    # Main app with routing
├── main.tsx                   # Entry point
├── index.css                  # Tailwind + custom styles
├── components/
│   └── BottomNav.tsx          # Navigation component
├── pages/
│   ├── HomePage.tsx           # Dashboard
│   ├── LearnPage.tsx          # Learn mode
│   ├── PracticePage.tsx       # Practice modes
│   ├── ProgressPage.tsx       # Progress tracking
│   ├── FavoritesPage.tsx      # Saved phrases
│   ├── SettingsPage.tsx       # App settings
│   ├── SearchPage.tsx         # Search phrases
│   └── PhraseDetailPage.tsx   # Phrase details
├── data/
│   └── phrases.ts             # Phrase database (38 A1 phrases)
├── services/
│   ├── storageService.ts      # IndexedDB abstraction
│   ├── spacedRepetition.ts    # SRS algorithm
│   └── audioService.ts        # Audio playback service
└── hooks/
    ├── useProgress.ts         # Progress tracking hook
    ├── useFavorites.ts        # Favorites hook
    └── useAudio.ts            # Audio hook

public/
├── manifest.webmanifest       # PWA manifest
└── audio/                     # Audio files directory
    └── a1/                    # A1 level audio
```

## Audio System

The app is designed around **real native German audio recordings**. Audio files should be placed in:

```
public/audio/{level}/{phrase_id}.mp3
public/audio/{level}/{phrase_id}_slow.mp3
```

Example:
```
public/audio/a1/a1_001.mp3
public/audio/a1/a1_001_slow.mp3
```

### Audio Requirements
- Native German speaker (Standard Hochdeutsch)
- Clear pronunciation, natural intonation
- 44.1 kHz or 48 kHz source
- MP3 format, compatible with modern browsers

### Fallback
If native audio is unavailable, the app offers browser TTS as a clearly-labeled fallback. Browser TTS is **never** presented as native audio.

## Practice Modes

1. **English → German** — See English, recall German
2. **Persian → German** — See Persian, recall German
3. **Audio → German** — Listen and recall
4. **German → Meaning** — See German, choose meaning
5. **Listening Comprehension** — Listen and answer multiple choice

## Spaced Repetition

The app uses an SM-2 inspired algorithm with 4 rating options:
- **Again** — Review in minutes
- **Hard** — Short interval
- **Good** — Normal interval
- **Easy** — Longer interval

States: NEW → LEARNING → REVIEW → MASTERED

## Data Model

Each phrase contains:
- German text
- English translation
- Persian translation
- CEFR level (A1-C1)
- Category
- Register (formal/informal/neutral)
- Audio paths
- Example sentences
- Tags
- Difficulty rating

## PWA Features

- Installable on Android and iOS
- Works offline
- Service worker for caching
- IndexedDB for persistent storage
- Downloadable audio packs (planned)

## Technology Stack

- **React 18** — UI framework
- **TypeScript** — Type safety
- **Vite** — Build tool
- **Tailwind CSS 4** — Styling
- **React Router** — Navigation
- **IndexedDB (idb)** — Local storage
- **PWA** — Offline support

## Browser Support

- Chrome/Edge 90+
- Firefox 90+
- Safari 15+
- Samsung Internet 15+

## Deployment

The app can be deployed to any static hosting:

- **Vercel**: `vercel deploy`
- **Netlify**: `netlify deploy`
- **Cloudflare Pages**: Connect repo
- **GitHub Pages**: Push to gh-pages branch

## Future Roadmap

- [ ] 500 phrases (A1-C1)
- [ ] Native audio recordings
- [ ] Speech recognition / pronunciation practice
- [ ] AI conversation partner
- [ ] Cloud sync with user accounts
- [ ] Audio download packs
- [ ] Android native app (TWA/Capacitor)

## License

MIT
