import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useFavorites } from '../hooks/useFavorites';
import { useAudio } from '../hooks/useAudio';
import { phrases } from '../data/phrases';
import { UserSettings } from '../services/storageService';

interface Props {
  settings: UserSettings;
}

export default function FavoritesPage({ settings }: Props) {
  const navigate = useNavigate();
  const { favorites, toggleFavorite } = useFavorites();
  const audio = useAudio();

  const favoritePhrases = phrases.filter(p => favorites.includes(p.id));

  const handlePlay = (phrase: typeof phrases[0], slow: boolean = false) => {
    const path = slow ? phrase.audioSlow : phrase.audio;
    audio.play(phrase.id, path, phrase.german, slow);
  };

  return (
    <div className="px-4 pt-6 animate-fade-in">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold" style={{ color: 'var(--text-primary)' }}>
          ⭐ Favorites
        </h1>
        <span className="text-sm" style={{ color: 'var(--text-muted)' }}>
          {favorites.length} phrases
        </span>
      </div>

      {favoritePhrases.length === 0 ? (
        <div className="text-center py-12">
          <div className="text-4xl mb-3">⭐</div>
          <p className="font-medium mb-1" style={{ color: 'var(--text-primary)' }}>
            No favorites yet
          </p>
          <p className="text-sm" style={{ color: 'var(--text-muted)' }}>
            Tap the heart on any phrase to save it here.
          </p>
          <button
            onClick={() => navigate('/learn')}
            className="mt-4 px-6 py-2.5 rounded-xl font-medium text-sm"
            style={{ background: 'var(--color-primary-600)', color: 'white' }}
          >
            Start Learning
          </button>
        </div>
      ) : (
        <div className="space-y-3">
          {favoritePhrases.map(phrase => (
            <div key={phrase.id} className="card">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-xs px-1.5 py-0.5 rounded"
                      style={{ background: 'var(--color-primary-100)', color: 'var(--color-primary-700)' }}>
                      {phrase.level}
                    </span>
                    <span className="text-xs" style={{ color: 'var(--text-muted)' }}>
                      {phrase.category}
                    </span>
                  </div>
                  <p className="text-lg font-bold text-german mb-1" style={{ color: 'var(--text-primary)' }}>
                    {phrase.german}
                  </p>
                  <p className="text-sm text-english" style={{ color: 'var(--text-secondary)' }}>
                    {phrase.english}
                  </p>
                  <p className="text-sm text-persian mt-0.5" style={{ color: 'var(--text-muted)' }}>
                    {phrase.persian}
                  </p>
                </div>
                <div className="flex flex-col items-center gap-1">
                  <button
                    onClick={() => handlePlay(phrase)}
                    className="touch-target rounded-lg p-2"
                    style={{ background: 'var(--bg-secondary)' }}
                    aria-label="Play pronunciation"
                  >
                    🔊
                  </button>
                  <button
                    onClick={() => toggleFavorite(phrase.id)}
                    className="touch-target rounded-lg p-2 animate-heart"
                    aria-label="Remove from favorites"
                  >
                    ❤️
                  </button>
                </div>
              </div>
              <button
                onClick={() => navigate(`/phrase/${phrase.id}`)}
                className="mt-2 text-xs underline"
                style={{ color: 'var(--text-muted)' }}
              >
                View details →
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
