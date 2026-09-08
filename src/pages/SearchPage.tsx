import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { phrases } from '../data/phrases';
import { useAudio } from '../hooks/useAudio';
import { useFavorites } from '../hooks/useFavorites';
import { UserSettings } from '../services/storageService';

interface Props {
  settings: UserSettings;
}

export default function SearchPage({ settings }: Props) {
  const navigate = useNavigate();
  const [query, setQuery] = useState('');
  const audio = useAudio();
  const { isFavorite, toggleFavorite } = useFavorites();

  const results = useMemo(() => {
    if (!query.trim()) return [];
    const q = query.toLowerCase().trim();
    return phrases.filter(p => 
      p.german.toLowerCase().includes(q) ||
      p.english.toLowerCase().includes(q) ||
      p.persian.includes(q) ||
      p.category.toLowerCase().includes(q) ||
      p.tags.some(t => t.includes(q))
    );
  }, [query]);

  const handlePlay = (phrase: typeof phrases[0]) => {
    audio.play(phrase.id, phrase.audio, phrase.german);
  };

  return (
    <div className="px-4 pt-6 animate-fade-in">
      {/* Header */}
      <div className="flex items-center gap-3 mb-4">
        <button
          onClick={() => navigate(-1)}
          className="touch-target rounded-lg p-2"
          style={{ color: 'var(--text-secondary)' }}
          aria-label="Go back"
        >
          ←
        </button>
        <h1 className="text-xl font-bold" style={{ color: 'var(--text-primary)' }}>Search</h1>
      </div>

      {/* Search input */}
      <div className="relative mb-4">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search German, English or فارسی..."
          className="w-full py-3 px-4 pl-10 rounded-xl text-sm transition-all"
          style={{ 
            background: 'var(--bg-secondary)', 
            color: 'var(--text-primary)',
            border: '1px solid var(--border-color)',
          }}
          autoFocus
          dir="auto"
        />
        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm">🔍</span>
        {query && (
          <button
            onClick={() => setQuery('')}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-sm"
            style={{ color: 'var(--text-muted)' }}
            aria-label="Clear search"
          >
            ✕
          </button>
        )}
      </div>

      {/* Results count */}
      {query && (
        <p className="text-xs mb-3" style={{ color: 'var(--text-muted)' }}>
          {results.length} result{results.length !== 1 ? 's' : ''}
        </p>
      )}

      {/* Results */}
      {results.length === 0 && query ? (
        <div className="text-center py-8">
          <div className="text-3xl mb-2">🔍</div>
          <p className="text-sm" style={{ color: 'var(--text-muted)' }}>
            No results found for "{query}"
          </p>
        </div>
      ) : (
        <div className="space-y-2">
          {results.map(phrase => (
            <button
              key={phrase.id}
              onClick={() => navigate(`/phrase/${phrase.id}`)}
              className="card w-full text-left flex items-center gap-3 py-3 hover:scale-[1.01] transition-transform"
            >
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-0.5">
                  <span className="text-xs px-1.5 py-0.5 rounded"
                    style={{ background: 'var(--color-primary-100)', color: 'var(--color-primary-700)' }}>
                    {phrase.level}
                  </span>
                  <span className="text-xs truncate" style={{ color: 'var(--text-muted)' }}>
                    {phrase.category}
                  </span>
                </div>
                <p className="text-sm font-bold text-german truncate" style={{ color: 'var(--text-primary)' }}>
                  {phrase.german}
                </p>
                <p className="text-xs text-english truncate" style={{ color: 'var(--text-secondary)' }}>
                  {phrase.english}
                </p>
              </div>
              <div className="flex items-center gap-1">
                <button
                  onClick={(e) => { e.stopPropagation(); handlePlay(phrase); }}
                  className="touch-target rounded-lg p-1.5"
                  style={{ background: 'var(--bg-secondary)' }}
                  aria-label="Play pronunciation"
                >
                  🔊
                </button>
                <button
                  onClick={(e) => { e.stopPropagation(); toggleFavorite(phrase.id); }}
                  className="touch-target rounded-lg p-1.5"
                  aria-label={isFavorite(phrase.id) ? 'Remove from favorites' : 'Add to favorites'}
                >
                  {isFavorite(phrase.id) ? '❤️' : '🤍'}
                </button>
              </div>
            </button>
          ))}
        </div>
      )}

      {/* Quick filters */}
      {!query && (
        <div className="mt-6">
          <p className="text-xs font-medium mb-2" style={{ color: 'var(--text-muted)' }}>
            Quick filters:
          </p>
          <div className="flex flex-wrap gap-2">
            {['Greetings', 'Restaurant', 'Shopping', 'Directions', 'Questions'].map(cat => (
              <button
                key={cat}
                onClick={() => setQuery(cat)}
                className="px-3 py-1.5 rounded-full text-xs font-medium transition-all hover:scale-105"
                style={{ background: 'var(--bg-secondary)', color: 'var(--text-secondary)' }}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
