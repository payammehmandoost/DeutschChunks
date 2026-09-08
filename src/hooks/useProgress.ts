import { useState, useEffect, useCallback } from 'react';
import { 
  getAllProgress, getDuePhrases, getStats, initializeProgress,
  PhraseProgress 
} from '../services/storageService';
import { phrases } from '../data/phrases';

export function useProgress() {
  const [progress, setProgress] = useState<PhraseProgress[]>([]);
  const [dueCount, setDueCount] = useState(0);
  const [stats, setStats] = useState({
    learned: 0,
    mastered: 0,
    totalReviews: 0,
    accuracy: 0,
    streak: 0,
    favoritesCount: 0,
    dueCount: 0,
    totalXP: 0,
  });
  const [loading, setLoading] = useState(true);

  const refresh = useCallback(async () => {
    try {
      const allProgress = await getAllProgress();
      const due = await getDuePhrases();
      const s = await getStats();
      
      setProgress(allProgress);
      setDueCount(due.length);
      setStats(s);
    } catch (error) {
      console.error('Failed to load progress:', error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    const init = async () => {
      const phraseIds = phrases.map(p => p.id);
      await initializeProgress(phraseIds);
      await refresh();
    };
    init();
  }, [refresh]);

  const getPhraseProgress = useCallback((phraseId: string): PhraseProgress | undefined => {
    return progress.find(p => p.phraseId === phraseId);
  }, [progress]);

  return {
    progress,
    dueCount,
    stats,
    loading,
    refresh,
    getPhraseProgress,
  };
}
