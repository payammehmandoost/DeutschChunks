import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getPhraseById } from '../data/phrases';
import { useAudio } from '../hooks/useAudio';
import { useFavorites } from '../hooks/useFavorites';
import { useProgress } from '../hooks/useProgress';
import { UserSettings } from '../services/storageService';

interface Props {
  settings: UserSettings;
}

export default function PhraseDetailPage({ settings }: Props) {
  const { phraseId } = useParams();
  const navigate = useNavigate();
  const audio = useAudio();
  const { isFavorite, toggleFavorite } = useFavorites();
  const { getPhraseProgress } = useProgress();

  const phrase = phraseId ? getPhraseById(phraseId) : null;
  const progress = phraseId ? getPhraseProgress(phraseId) : null;
  const isFav = phraseId ? isFavorite(phraseId) : false;

  if (!phrase) {
    return (
      <div className="px-4 pt-6 text-center">
        <p style={{ color: 'var(--text-secondary)' }}>Phrase not found.</p>
        <button
          onClick={() => navigate('/')}
          className="mt-4 px-4 py-2 rounded-xl text-sm"
          style={{ background: 'var(--color-primary-600)', color: 'white' }}
        >
          Go Home
        </button>
      </div>
    );
  }

  const handlePlay = (slow: boolean = false) => {
    const path = slow ? phrase.audioSlow : phrase.audio;
    audio.play(phrase.id, path, phrase.german, slow);
  };

  const handlePlayTTS = () => {
    audio.playTTS(phrase.german);
  };

  return (
    <div className="px-4 pt-6 animate-fade-in">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <button
          onClick={() => navigate(-1)}
          className="touch-target rounded-lg p-2"
          style={{ color: 'var(--text-secondary)' }}
          aria-label="Go back"
        >
          ←
        </button>
        <button
          onClick={() => toggleFavorite(phrase.id)}
          className={`touch-target text-xl transition-transform ${isFav ? 'animate-heart' : ''}`}
          aria-label={isFav ? 'Remove from favorites' : 'Add to favorites'}
        >
          {isFav ? '❤️' : '🤍'}
        </button>
      </div>

      {/* Main Card */}
      <div className="card mb-4">
        {/* Badges */}
        <div className="flex items-center gap-2 mb-4 flex-wrap">
          <span className="text-xs px-2 py-0.5 rounded-full"
            style={{ background: 'var(--color-primary-100)', color: 'var(--color-primary-700)' }}>
            {phrase.level}
          </span>
          <span className="text-xs px-2 py-0.5 rounded-full"
            style={{ background: 'var(--bg-secondary)', color: 'var(--text-secondary)' }}>
            {phrase.category}
          </span>
          <span className={`text-xs px-2 py-0.5 rounded-full ${
            phrase.register === 'formal' ? 'bg-purple-100 text-purple-700' :
            phrase.register === 'informal' ? 'bg-green-100 text-green-700' :
            'bg-gray-100 text-gray-700'
          }`}>
            {phrase.register === 'formal' ? '👔 Formal' : 
             phrase.register === 'informal' ? '😊 Informal' : '🌐 Neutral'}
          </span>
        </div>

        {/* German - dominant */}
        <div className="text-german mb-4">
          <p className="text-3xl font-bold leading-tight" style={{ color: 'var(--text-primary)' }}>
            {phrase.german}
          </p>
        </div>

        {/* Audio Controls */}
        <div className="flex items-center gap-2 mb-4">
          <button
            onClick={() => handlePlay(false)}
            className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl font-medium text-sm transition-all hover:scale-105 active:scale-95"
            style={{ background: 'var(--color-primary-600)', color: 'white' }}
            aria-label="Play native German pronunciation"
          >
            🔊 Native
          </button>
          <button
            onClick={() => handlePlay(true)}
            className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl font-medium text-sm transition-all hover:scale-105 active:scale-95"
            style={{ background: 'var(--bg-secondary)', color: 'var(--text-secondary)' }}
            aria-label="Play slow German pronunciation"
          >
            🐢 Slow
          </button>
          <button
            onClick={handlePlayTTS}
            className="flex items-center gap-1.5 px-3 py-2.5 rounded-xl text-xs transition-all hover:scale-105 active:scale-95"
            style={{ background: 'var(--bg-secondary)', color: 'var(--text-muted)' }}
            aria-label="Play using browser TTS as fallback"
          >
            🗣️ TTS
          </button>
        </div>

        {/* Audio progress */}
        {audio.status === 'playing' && (
          <div className="mb-4 flex items-center gap-2">
            <div className="audio-progress flex-1">
              <div 
                className="audio-progress-fill" 
                style={{ width: `${audio.duration > 0 ? (audio.currentTime / audio.duration) * 100 : 0}%` }} 
              />
            </div>
            <span className="text-xs" style={{ color: 'var(--text-muted)' }}>
              {audio.isNativeAudio ? '🇩🇪 Native' : '🗣️ TTS'}
            </span>
          </div>
        )}

        {audio.status === 'error' && (
          <div className="mb-4 text-xs px-3 py-2 rounded-lg" style={{ background: '#fef2f2', color: '#dc2626' }}>
            ⚠️ Native audio not available yet. Use TTS fallback above.
          </div>
        )}

        {/* English */}
        <div className="text-english mb-2">
          <p className="text-xs font-medium mb-1" style={{ color: 'var(--text-muted)' }}>English:</p>
          <p className="text-lg" style={{ color: 'var(--text-primary)' }}>{phrase.english}</p>
        </div>

        {/* Persian */}
        <div className="text-persian mb-4">
          <p className="text-xs font-medium mb-1" style={{ color: 'var(--text-muted)' }}>فارسی:</p>
          <p className="text-lg" style={{ color: 'var(--text-secondary)' }}>{phrase.persian}</p>
        </div>

        {/* Example */}
        {phrase.example && (
          <div className="pt-3 mb-3" style={{ borderTop: '1px solid var(--border-color)' }}>
            <p className="text-xs font-medium mb-2" style={{ color: 'var(--text-muted)' }}>💬 Example:</p>
            <p className="text-sm text-german mb-1" style={{ color: 'var(--text-primary)' }}>{phrase.example}</p>
            {phrase.exampleEnglish && (
              <p className="text-sm text-english mb-1" style={{ color: 'var(--text-secondary)' }}>{phrase.exampleEnglish}</p>
            )}
            {phrase.examplePersian && (
              <p className="text-sm text-persian" style={{ color: 'var(--text-muted)' }}>{phrase.examplePersian}</p>
            )}
          </div>
        )}

        {/* Notes */}
        {phrase.notes && (
          <div className="pt-3" style={{ borderTop: '1px solid var(--border-color)' }}>
            <p className="text-xs font-medium mb-1" style={{ color: 'var(--text-muted)' }}>💡 Note:</p>
            <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>{phrase.notes}</p>
          </div>
        )}
      </div>

      {/* Tags */}
      <div className="card mb-4">
        <p className="text-xs font-medium mb-2" style={{ color: 'var(--text-muted)' }}>Tags:</p>
        <div className="flex flex-wrap gap-1.5">
          {phrase.tags.map(tag => (
            <span key={tag} className="text-xs px-2 py-1 rounded-full"
              style={{ background: 'var(--bg-secondary)', color: 'var(--text-secondary)' }}>
              #{tag}
            </span>
          ))}
        </div>
      </div>

      {/* Learning Status */}
      {progress && (
        <div className="card mb-4">
          <p className="text-xs font-medium mb-2" style={{ color: 'var(--text-muted)' }}>Learning Status:</p>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <span className={`text-xs px-2 py-1 rounded-full ${
                progress.status === 'mastered' ? 'bg-green-100 text-green-700' :
                progress.status === 'review' ? 'bg-blue-100 text-blue-700' :
                progress.status === 'learning' ? 'bg-yellow-100 text-yellow-700' :
                'bg-gray-100 text-gray-700'
              }`}>
                {progress.status === 'mastered' ? '✅ Mastered' :
                 progress.status === 'review' ? '📖 Review' :
                 progress.status === 'learning' ? '📝 Learning' : '🆕 New'}
              </span>
            </div>
            <div className="text-right">
              <span className="text-xs" style={{ color: 'var(--text-muted)' }}>
                Reps: {progress.repetitions} | Ease: {progress.ease.toFixed(1)}
              </span>
            </div>
            <div className="text-xs" style={{ color: 'var(--text-muted)' }}>
              Correct: {progress.correctAnswers}
            </div>
            <div className="text-xs text-right" style={{ color: 'var(--text-muted)' }}>
              Incorrect: {progress.incorrectAnswers}
            </div>
            <div className="text-xs" style={{ color: 'var(--text-muted)' }}>
              XP: {progress.xp}
            </div>
            <div className="text-xs text-right" style={{ color: 'var(--text-muted)' }}>
              Interval: {progress.interval} min
            </div>
          </div>
        </div>
      )}

      {/* Audio info */}
      <div className="card">
        <p className="text-xs font-medium mb-2" style={{ color: 'var(--text-muted)' }}>Audio Info:</p>
        <div className="space-y-1">
          <p className="text-xs" style={{ color: 'var(--text-secondary)' }}>
            📁 ID: {phrase.id}
          </p>
          <p className="text-xs" style={{ color: 'var(--text-secondary)' }}>
            🔊 Native: {phrase.audio}
          </p>
          <p className="text-xs" style={{ color: 'var(--text-secondary)' }}>
            🐢 Slow: {phrase.audioSlow}
          </p>
          <p className="text-xs mt-2" style={{ color: 'var(--text-muted)' }}>
            ⚠️ Native recordings will be added by the content team. Use TTS as fallback.
          </p>
        </div>
      </div>
    </div>
  );
}
