# Audio Directory

Place native German audio recordings here.

## Structure

```
audio/
├── a1/
│   ├── a1_001.mp3          # Normal speed
│   ├── a1_001_slow.mp3     # Slow speed
│   ├── a1_002.mp3
│   ├── a1_002_slow.mp3
│   └── ...
├── a2/
├── b1/
├── b2/
└── c1/
```

## Audio Requirements

- **Format**: MP3 (compatible with all modern browsers)
- **Sample rate**: 44.1 kHz or 48 kHz
- **Bitrate**: 128-192 kbps
- **Speaker**: Native German speaker (Standard Hochdeutsch)
- **Quality**: Clean recording, no background noise
- **Style**: Natural intonation, clear pronunciation

## Naming Convention

- Normal speed: `{phrase_id}.mp3` (e.g., `a1_001.mp3`)
- Slow speed: `{phrase_id}_slow.mp3` (e.g., `a1_001_slow.mp3`)
- Slow speed should be approximately 0.7x normal speed
- Do NOT change pitch when slowing down

## Status

Audio files are being recorded. Until native recordings are available, 
the app uses browser TTS as a clearly-labeled fallback.
