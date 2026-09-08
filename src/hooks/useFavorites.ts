import { useState, useEffect, useCallback } from 'react';
import { getAllFavorites, toggleFavorite as toggleFav } from '../services/storageService';

export function useFavorites() {
  const [favorites, setFavorites] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  const refresh = useCallback(async () => {
    try {
      const favs = await getAllFavorites();
      setFavorites(favs);
    } catch (error) {
      console.error('Failed to load favorites:', error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    refresh();
  }, [refresh]);

  const isFavorite = useCallback((phraseId: string): boolean => {
    return favorites.includes(phraseId);
  }, [favorites]);

  const toggleFavorite = useCallback(async (phraseId: string): Promise<boolean> => {
    const result = await toggleFav(phraseId);
    await refresh();
    return result;
  }, [refresh]);

  return {
    favorites,
    loading,
    isFavorite,
    toggleFavorite,
    refresh,
  };
}
