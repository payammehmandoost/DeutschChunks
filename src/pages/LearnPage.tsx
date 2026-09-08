import React, { useState, useMemo } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { phrases, lessons, getPhrasesByLesson, Phrase } from '../data/phrases';
import { useAudio } from '../hooks/useAudio';
import { useFavorites } from '../hooks/useFavorites';
import { useProgress } from '../hooks/useProgress';
import { UserSettings } from '../services/storageService';
import { processReview } from '../services/spacedRepetition';

interface Props {
  settings: UserSettings;
}

export default function LearnPage({ settings }: Props) {
  const { lessonId } = useParams();
  const navigate = useNavigate();
  const audio = useAudio();
  const { isFavorite, toggleFavorite } = useFavorites();
  const { getPhraseProgress, refresh: refreshProgress } = useProgress();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showTranslation, setShowTranslation] = useState(false);
  const [animating, setAnimating] = useState(false);

  const currentPhrases = useMemo(() => {
    if (lessonId) {
      return getPhrasesByLesson(parseInt(lessonId));
    }
    return phrases.filter(p => p.level === 'A1');
  }, [lessonId]);

  const currentLesson = lessonId ? lessons.find(l => l.id === parseInt(lessonId)) : null;
  const phrase = currentPhrases[currentIndex];

  if (!phrase) {
    return (
      <div className="px-4 pt-6">
        <h1 className="text-xl font-bold mb-4" style={{ color: 'var(--text-primary)' }}>Learn</h1>
        <p style={{ color: 'var(--text-secondary)' }}>Select a lesson to start learning.</p>
      </div>
    );
  }

  const handlePlay = (slow: boolean = false) => {
    const path = slow ? phrase.audioSlow : phrase.audio;
    audio.play(phrase.id, path, phrase.german, slow);
  };

  const handlePlayTTS = () => {
    audio.playTTS(phrase.german, false);
  };

  const handleFavorite = async () => {
    await toggleFavorite(phrase.id);
  };

  const handleNext = () => {
    if (currentIndex < currentPhrases.length - 1) {
      setAnimating(true);
      setTimeout(() => {
        setCurrentIndex(prev => prev + 1);
        setShowTranslation(false);
        setAnimating(false);
      }, 150);
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setAnimating(true);
      setTimeout(() => {
        setCurrentIndex(prev => prev - 1);
        setShowTranslation(false);
        setAnimating(false);
      }, 150);
    }
  };

  const handleMarkLearned = async () => {
    await processReview(phrase.id, 'good');
    await refreshProgress();
    handleNext();
  };

  const progress = getPhraseProgress(phrase.id);
  const isFav = isFavorite(phrase.id);

  return (
    <div className="px-4 pt-6 animate-fade-in">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <button 
          onClick={() => navigate('/learn')}
          className="touch-target rounded-lg p-2"
          style={{ color: 'var(--text-secondary)' }}
          aria-label="Back to lessons"
        >
          ←
        </button>
        <div className="text-center">
          <span className="text-xs font-medium px-2 py-1 rounded-full"
            style={{ background: 'var(--color-primary-100)', color: 'var(--color-primary-700)' }}>
            {phrase.level} · {phrase.category}
          </span>
        </div>
        <span className="text-sm font-medium" style={{ color: 'var(--text-muted)' }}>
          {currentIndex + 1}/{currentPhrases.length}
        </span>
      </div>

      {/* Progress bar */}
      <div className="progress-bar mb-6">
        <div 
          className="progress-fill" 
          style={{ width: `${((currentIndex + 1) / currentPhrases.length) * 100}%` }} 
        />
      </div>

      {/* Phrase Card */}
      <div className={`card mb-4 ${animating ? 'opacity-50 scale-95' : 'opacity-100 scale-100'} transition-all duration-150`}>
        {/* Register badge */}
        <div className="flex items-center justify-between mb-4">
          <span className={`text-xs px-2 py-0.5 rounded-full ${
            phrase.register === 'formal' ? 'bg-purple-100 text-purple-700' :
            phrase.register === 'informal' ? 'bg-green-100 text-green-700' :
            'bg-gray-100 text-gray-700'
          }`}>
            {phrase.register === 'formal' ? '👔 Formal' : 
             phrase.register === 'informal' ? '😊 Informal' : '🌐 Neutral'}
          </span>
          <button
            onClick={handleFavorite}
            className={`touch-target text-xl transition-transform ${isFav ? 'animate-heart' : ''}`}
            aria-label={isFav ? 'Remove from favorites' : 'Add to favorites'}
          >
            {isFav ? '❤️' : '🤍'}
          </button>
        </div>

        {/* German phrase - dominant */}
        <div className="text-german mb-4">
          <p className="text-3xl font-bold leading-tight" style={{ color: 'var(--text-primary)' }}>
            {phrase.german}
          </p>
        </div>

        {/* Audio controls */}
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
            title="Browser TTS (fallback)"
          >
            🗣️ TTS
          </button>
        </div>

        {/* Audio status */}
        {audio.status === 'playing' && (
          <div className="mb-3 flex items-center gap-2">
            <div className="audio-progress flex-1">
              <div 
                className="audio-progress-fill" 
                style={{ width: `${audio.duration > 0 ? (audio.currentTime / audio.duration) * 100 : 0}%` }} 
              />
            </div>
            <span className="text-xs" style={{ color: 'var(--text-muted)' }}>
              {!audio.isNativeAudio && '🗣️ TTS'}
            </span>
          </div>
        )}

        {audio.status === 'error' && (
          <div className="mb-3 text-xs px-3 py-2 rounded-lg" style={{ background: '#fef2f2', color: '#dc2626' }}>
            ⚠️ Native audio not available yet. Try TTS fallback.
          </div>
        )}

        {/* Translation toggle */}
        <button
          onClick={() => setShowTranslation(!showTranslation)}
          className="w-full py-2.5 rounded-xl text-sm font-medium mb-3 transition-all hover:scale-[1.01] active:scale-[0.99]"
          style={{ background: 'var(--bg-secondary)', color: 'var(--text-secondary)' }}
        >
          {showTranslation ? 'Hide Translation' : 'Show Translation'}
        </button>

        {/* Translations */}
        {showTranslation && (
          <div className="animate-fade-in space-y-2">
            <div className="text-english">
              <p className="text-lg" style={{ color: 'var(--text-primary)' }}>{phrase.english}</p>
            </div>
            <div className="text-persian">
              <p className="text-lg" style={{ color: 'var(--text-secondary)' }}>{phrase.persian}</p>
            </div>
          </div>
        )}

        {/* Example */}
        {showTranslation && phrase.example && (
          <div className="mt-3 pt-3" style={{ borderTop: '1px solid var(--border-color)' }}>
            <p className="text-xs font-medium mb-1" style={{ color: 'var(--text-muted)' }}>Example:</p>
            <p className="text-sm text-german" style={{ color: 'var(--text-primary)' }}>{phrase.example}</p>
            <p className="text-sm text-english" style={{ color: 'var(--text-secondary)' }}>{phrase.exampleEnglish}</p>
            {phrase.examplePersian && (
              <p className="text-sm text-persian" style={{ color: 'var(--text-muted)' }}>{phrase.examplePersian}</p>
            )}
          </div>
        )}

        {/* Notes */}
        {showTranslation && phrase.notes && (
          <div className="mt-3 pt-3" style={{ borderTop: '1px solid var(--border-color)' }}>
            <p className="text-xs font-medium mb-1" style={{ color: 'var(--text-muted)' }}>💡 Note:</p>
            <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>{phrase.notes}</p>
          </div>
        )}
      </div>

      {/* Status indicator */}
      {progress && progress.status !== 'new' && (
        <div className="text-center mb-4">
          <span className={`text-xs px-2 py-1 rounded-full ${
            progress.status === 'mastered' ? 'bg-green-100 text-green-700' :
            progress.status === 'review' ? 'bg-blue-100 text-blue-700' :
            'bg-yellow-100 text-yellow-700'
          }`}>
            {progress.status === 'mastered' ? '✅ Mastered' :
             progress.status === 'review' ? '📖 In Review' : '📝 Learning'}
          </span>
        </div>
      )}

      {/* Navigation */}
      <div className="flex items-center gap-3">
        <button
          onClick={handlePrev}
          disabled={currentIndex === 0}
          className="flex-1 py-3 rounded-xl font-medium text-sm transition-all disabled:opacity-30 hover:scale-[1.01] active:scale-[0.99]"
          style={{ background: 'var(--bg-secondary)', color: 'var(--text-secondary)' }}
        >
          ← Previous
        </button>
        <button
          onClick={handleMarkLearned}
          className="flex-1 py-3 rounded-xl font-medium text-sm transition-all hover:scale-[1.01] active:scale-[0.99]"
          style={{ background: 'var(--color-success)', color: 'white' }}
        >
          ✓ Got it
        </button>
        <button
          onClick={handleNext}
          disabled={currentIndex === currentPhrases.length - 1}
          className="flex-1 py-3 rounded-xl font-medium text-sm transition-all disabled:opacity-30 hover:scale-[1.01] active:scale-[0.99]"
          style={{ background: 'var(--color-primary-600)', color: 'white' }}
        >
          Next →
        </button>
      </div>

      {/* Detail link */}
      <div className="text-center mt-4">
        <button
          onClick={() => navigate(`/phrase/${phrase.id}`)}
          className="text-sm underline"
          style={{ color: 'var(--text-muted)' }}
        >
          View phrase details →
        </button>
      </div>
    </div>
  );
}
