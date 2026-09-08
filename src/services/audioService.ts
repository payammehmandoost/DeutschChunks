/**
 * Audio Service
 * Handles native German audio playback with fallback to browser TTS
 */

type AudioStatus = 'idle' | 'loading' | 'playing' | 'paused' | 'error';

interface AudioState {
  status: AudioStatus;
  currentTime: number;
  duration: number;
  playbackRate: number;
  isNativeAudio: boolean;
  error?: string;
}

type AudioStateListener = (state: AudioState) => void;

class AudioService {
  private audio: HTMLAudioElement | null = null;
  private currentPhraseId: string | null = null;
  private listeners: Set<AudioStateListener> = new Set();
  private state: AudioState = {
    status: 'idle',
    currentTime: 0,
    duration: 0,
    playbackRate: 1.0,
    isNativeAudio: false,
  };
  private useTTSFallback: boolean = true;

  constructor() {
    this.audio = new Audio();
    this.setupAudioListeners();
  }

  private setupAudioListeners() {
    if (!this.audio) return;

    this.audio.addEventListener('timeupdate', () => {
      this.updateState({ currentTime: this.audio?.currentTime || 0 });
    });

    this.audio.addEventListener('loadedmetadata', () => {
      this.updateState({ 
        duration: this.audio?.duration || 0,
        status: 'idle',
      });
    });

    this.audio.addEventListener('ended', () => {
      this.updateState({ status: 'idle', currentTime: 0 });
    });

    this.audio.addEventListener('error', () => {
      // If native audio fails, try TTS fallback
      if (this.useTTSFallback && this.state.isNativeAudio) {
        this.tryTTSFallback();
      } else {
        this.updateState({ 
          status: 'error', 
          error: 'Audio unavailable',
          isNativeAudio: false,
        });
      }
    });

    this.audio.addEventListener('waiting', () => {
      this.updateState({ status: 'loading' });
    });

    this.audio.addEventListener('canplay', () => {
      if (this.state.status === 'loading') {
        this.updateState({ status: 'idle' });
      }
    });
  }

  private updateState(partial: Partial<AudioState>) {
    this.state = { ...this.state, ...partial };
    this.listeners.forEach(listener => listener({ ...this.state }));
  }

  subscribe(listener: AudioStateListener): () => void {
    this.listeners.add(listener);
    return () => this.listeners.delete(listener);
  }

  getState(): AudioState {
    return { ...this.state };
  }

  /**
   * Play native audio for a phrase
   */
  async play(phraseId: string, audioPath: string, slow: boolean = false): Promise<void> {
    // Stop any currently playing audio
    this.stop();

    this.currentPhraseId = phraseId;
    this.updateState({ status: 'loading', isNativeAudio: true, currentTime: 0 });

    if (!this.audio) return;

    try {
      this.audio.src = audioPath;
      this.audio.playbackRate = slow ? 0.7 : 1.0;
      this.updateState({ playbackRate: slow ? 0.7 : 1.0 });
      
      await this.audio.play();
      this.updateState({ status: 'playing' });
    } catch (error) {
      // Audio file not found - try TTS
      if (this.useTTSFallback) {
        this.tryTTSFallback();
      } else {
        this.updateState({ status: 'error', error: 'Audio file not found' });
      }
    }
  }

  /**
   * Fallback to browser TTS with German voice
   * Clearly labeled as TTS, not native audio
   */
  private tryTTSFallback() {
    if (!('speechSynthesis' in window)) {
      this.updateState({ 
        status: 'error', 
        error: 'Audio unavailable',
        isNativeAudio: false,
      });
      return;
    }

    // Cancel any ongoing speech
    window.speechSynthesis.cancel();

    // We need the German text - get it from the phrase data
    // This is handled by the caller passing the text
    this.updateState({ 
      status: 'idle',
      isNativeAudio: false,
      error: 'Native audio not available. Use TTS fallback.',
    });
  }

  /**
   * Play using browser TTS as explicit fallback
   */
  playTTS(text: string, slow: boolean = false): void {
    if (!('speechSynthesis' in window)) {
      this.updateState({ status: 'error', error: 'TTS not supported' });
      return;
    }

    this.stop();
    
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'de-DE';
    utterance.rate = slow ? 0.6 : 0.9;
    utterance.pitch = 1.0;

    // Try to find a German voice
    const voices = window.speechSynthesis.getVoices();
    const germanVoice = voices.find(v => v.lang.startsWith('de'));
    if (germanVoice) {
      utterance.voice = germanVoice;
    }

    utterance.onstart = () => {
      this.updateState({ status: 'playing', isNativeAudio: false, currentTime: 0 });
    };

    utterance.onend = () => {
      this.updateState({ status: 'idle', currentTime: 0 });
    };

    utterance.onerror = () => {
      this.updateState({ status: 'error', error: 'TTS playback failed' });
    };

    window.speechSynthesis.speak(utterance);
  }

  pause(): void {
    if (this.audio && this.state.status === 'playing') {
      this.audio.pause();
      this.updateState({ status: 'paused' });
    }
    if ('speechSynthesis' in window) {
      window.speechSynthesis.pause();
    }
  }

  resume(): void {
    if (this.audio && this.state.status === 'paused') {
      this.audio.play();
      this.updateState({ status: 'playing' });
    }
    if ('speechSynthesis' in window) {
      window.speechSynthesis.resume();
    }
  }

  stop(): void {
    if (this.audio) {
      this.audio.pause();
      this.audio.currentTime = 0;
    }
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }
    this.currentPhraseId = null;
    this.updateState({ status: 'idle', currentTime: 0, isNativeAudio: false });
  }

  seek(time: number): void {
    if (this.audio) {
      this.audio.currentTime = time;
      this.updateState({ currentTime: time });
    }
  }

  getCurrentPhraseId(): string | null {
    return this.currentPhraseId;
  }

  setTTSFallback(enabled: boolean): void {
    this.useTTSFallback = enabled;
  }
}

// Singleton instance
export const audioService = new AudioService();
export type { AudioState, AudioStatus };
