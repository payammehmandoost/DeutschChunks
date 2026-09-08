import { useState, useEffect, useCallback, useRef } from 'react';
import { audioService, AudioState } from '../services/audioService';

export function useAudio() {
  const [state, setState] = useState<AudioState>(audioService.getState());
  const [currentText, setCurrentText] = useState<string>('');
  const subscriptionRef = useRef<(() => void) | null>(null);

  useEffect(() => {
    subscriptionRef.current = audioService.subscribe((newState) => {
      setState(newState);
    });

    return () => {
      if (subscriptionRef.current) {
        subscriptionRef.current();
      }
    };
  }, []);

  const play = useCallback(async (phraseId: string, audioPath: string, text: string, slow: boolean = false) => {
    setCurrentText(text);
    await audioService.play(phraseId, audioPath, slow);
  }, []);

  const playTTS = useCallback((text: string, slow: boolean = false) => {
    setCurrentText(text);
    audioService.playTTS(text, slow);
  }, []);

  const pause = useCallback(() => audioService.pause(), []);
  const resume = useCallback(() => audioService.resume(), []);
  const stop = useCallback(() => {
    audioService.stop();
    setCurrentText('');
  }, []);

  return {
    ...state,
    currentText,
    play,
    playTTS,
    pause,
    resume,
    stop,
  };
}
