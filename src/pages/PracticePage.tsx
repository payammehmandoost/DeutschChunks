import React, { useState, useMemo, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { phrases, Phrase } from '../data/phrases';
import { useAudio } from '../hooks/useAudio';
import { useProgress } from '../hooks/useProgress';
import { processReview, Rating } from '../services/spacedRepetition';
import { UserSettings } from '../services/storageService';

interface Props {
  settings: UserSettings;
}

type PracticeMode = 'en-to-de' | 'fa-to-de' | 'audio-to-de' | 'de-to-meaning' | 'listening';
type PracticeState = 'question' | 'revealed' | 'result';

export default function PracticePage({ settings }: Props) {
  const navigate = useNavigate();
  const audio = useAudio();
  const { progress, refresh: refreshProgress } = useProgress();
  
  const [mode, setMode] = useState<PracticeMode | null>(null);
  const [practiceState, setPracticeState] = useState<PracticeState>('question');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [sessionPhrases, setSessionPhrases] = useState<Phrase[]>([]);
  const [xpEarned, setXpEarned] = useState(0);
  const [sessionCorrect, setSessionCorrect] = useState(0);
  const [sessionTotal, setSessionTotal] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [lastRating, setLastRating] = useState<Rating | null>(null);

  // Get due phrases for practice
  const duePhrases = useMemo(() => {
    const dueIds = progress
      .filter(p => p.nextReviewAt <= new Date() || p.status === 'new')
      .map(p => p.phraseId);
    return phrases.filter(p => dueIds.includes(p.id)).slice(0, 10);
  }, [progress]);

  const startPractice = useCallback((selectedMode: PracticeMode) => {
    const pool = duePhrases.length >= 5 ? duePhrases : phrases.slice(0, 10);
    const shuffled = [...pool].sort(() => Math.random() - 0.5).slice(0, 10);
    setSessionPhrases(shuffled);
    setMode(selectedMode);
    setCurrentIndex(0);
    setPracticeState('question');
    setXpEarned(0);
    setSessionCorrect(0);
    setSessionTotal(0);
    setShowResult(false);
  }, [duePhrases]);

  const currentPhrase = sessionPhrases[currentIndex];

  const handleShowAnswer = () => {
    setPracticeState('revealed');
  };

  const handleRate = async (rating: Rating) => {
    if (!currentPhrase) return;
    
    setLastRating(rating);
    const result = await processReview(currentPhrase.id, rating);
    setXpEarned(prev => prev + result.xpEarned);
    setSessionTotal(prev => prev + 1);
    if (rating !== 'again') {
      setSessionCorrect(prev => prev + 1);
    }

    setPracticeState('result');
    setShowResult(true);

    // Auto-advance after short delay
    setTimeout(() => {
      if (currentIndex < sessionPhrases.length - 1) {
        setCurrentIndex(prev => prev + 1);
        setPracticeState('question');
        setShowResult(false);
        audio.stop();
      } else {
        // Session complete
        setPracticeState('result');
      }
    }, 1200);
  };

  const handlePlayAudio = () => {
    if (!currentPhrase) return;
    audio.play(currentPhrase.id, currentPhrase.audio, currentPhrase.german);
  };

  // Mode selection screen
  if (!mode) {
    return (
      <div className="px-4 pt-6 animate-fade-in">
        <h1 className="text-2xl font-bold mb-2" style={{ color: 'var(--text-primary)' }}>Practice</h1>
        <p className="text-sm mb-6" style={{ color: 'var(--text-secondary)' }}>
          Choose a practice mode to test your knowledge.
        </p>

        <div className="space-y-3">
          <button
            onClick={() => startPractice('en-to-de')}
            className="card w-full text-left hover:scale-[1.01] transition-transform"
          >
            <div className="text-lg font-semibold mb-1" style={{ color: 'var(--text-primary)' }}>
              🇬🇧 → 🇩🇪 English to German
            </div>
            <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>
              See English, recall the German phrase
            </p>
          </button>

          <button
            onClick={() => startPractice('fa-to-de')}
            className="card w-full text-left hover:scale-[1.01] transition-transform"
          >
            <div className="text-lg font-semibold mb-1" style={{ color: 'var(--text-primary)' }}>
              🇮🇷 → 🇩🇪 Persian to German
            </div>
            <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>
              See Persian, recall the German phrase
            </p>
          </button>

          <button
            onClick={() => startPractice('audio-to-de')}
            className="card w-full text-left hover:scale-[1.01] transition-transform"
          >
            <div className="text-lg font-semibold mb-1" style={{ color: 'var(--text-primary)' }}>
              🎧 → 🇩🇪 Audio to German
            </div>
            <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>
              Listen to German, recall the meaning
            </p>
          </button>

          <button
            onClick={() => startPractice('de-to-meaning')}
            className="card w-full text-left hover:scale-[1.01] transition-transform"
          >
            <div className="text-lg font-semibold mb-1" style={{ color: 'var(--text-primary)' }}>
              🇩🇪 → 🇬🇧 German to Meaning
            </div>
            <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>
              See German, choose the correct meaning
            </p>
          </button>

          <button
            onClick={() => startPractice('listening')}
            className="card w-full text-left hover:scale-[1.01] transition-transform"
          >
            <div className="text-lg font-semibold mb-1" style={{ color: 'var(--text-primary)' }}>
              🎧 Listening Comprehension
            </div>
            <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>
              Listen and answer multiple choice
            </p>
          </button>
        </div>

        {duePhrases.length > 0 && (
          <div className="mt-6 text-center">
            <p className="text-sm" style={{ color: 'var(--text-muted)' }}>
              📝 {duePhrases.length} phrases due for review
            </p>
          </div>
        )}
      </div>
    );
  }

  // Session complete
  if (currentIndex >= sessionPhrases.length) {
    const accuracy = sessionTotal > 0 ? Math.round((sessionCorrect / sessionTotal) * 100) : 0;
    return (
      <div className="px-4 pt-6 animate-fade-in text-center">
        <div className="text-5xl mb-4">🎉</div>
        <h2 className="text-2xl font-bold mb-2" style={{ color: 'var(--text-primary)' }}>
          Session Complete!
        </h2>
        <p className="text-sm mb-6" style={{ color: 'var(--text-secondary)' }}>
          Great work! Here's your summary:
        </p>

        <div className="card mb-6">
          <div className="grid grid-cols-3 gap-4">
            <div>
              <div className="text-2xl font-bold" style={{ color: 'var(--color-primary-600)' }}>
                {sessionTotal}
              </div>
              <div className="text-xs" style={{ color: 'var(--text-muted)' }}>Reviewed</div>
            </div>
            <div>
              <div className="text-2xl font-bold" style={{ color: 'var(--color-success)' }}>
                {accuracy}%
              </div>
              <div className="text-xs" style={{ color: 'var(--text-muted)' }}>Accuracy</div>
            </div>
            <div>
              <div className="text-2xl font-bold" style={{ color: 'var(--color-warning)' }}>
                +{xpEarned}
              </div>
              <div className="text-xs" style={{ color: 'var(--text-muted)' }}>XP Earned</div>
            </div>
          </div>
        </div>

        <div className="space-y-3">
          <button
            onClick={() => startPractice(mode)}
            className="w-full py-3 rounded-xl font-medium transition-all hover:scale-[1.01] active:scale-[0.99]"
            style={{ background: 'var(--color-primary-600)', color: 'white' }}
          >
            Practice Again
          </button>
          <button
            onClick={() => { setMode(null); audio.stop(); }}
            className="w-full py-3 rounded-xl font-medium transition-all hover:scale-[1.01] active:scale-[0.99]"
            style={{ background: 'var(--bg-secondary)', color: 'var(--text-secondary)' }}
          >
            Choose Different Mode
          </button>
        </div>
      </div>
    );
  }

  if (!currentPhrase) return null;

  // Practice question screen
  return (
    <div className="px-4 pt-6 animate-fade-in">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <button
          onClick={() => { setMode(null); audio.stop(); }}
          className="touch-target rounded-lg p-2 text-sm"
          style={{ color: 'var(--text-secondary)' }}
        >
          ✕
        </button>
        <span className="text-sm font-medium" style={{ color: 'var(--text-muted)' }}>
          {currentIndex + 1} / {sessionPhrases.length}
        </span>
        <span className="text-sm font-medium" style={{ color: 'var(--color-warning)' }}>
          +{xpEarned} XP
        </span>
      </div>

      {/* Progress */}
      <div className="progress-bar mb-6">
        <div 
          className="progress-fill" 
          style={{ width: `${((currentIndex + 1) / sessionPhrases.length) * 100}%` }} 
        />
      </div>

      {/* Question Card */}
      <div className="card mb-4">
        {practiceState === 'question' && (
          <div className="animate-fade-in">
            {/* Show question based on mode */}
            {(mode === 'en-to-de') && (
              <>
                <p className="text-xs font-medium mb-2" style={{ color: 'var(--text-muted)' }}>
                  What's the German for:
                </p>
                <p className="text-2xl font-bold text-english mb-2" style={{ color: 'var(--text-primary)' }}>
                  {currentPhrase.english}
                </p>
                <p className="text-lg text-persian" style={{ color: 'var(--text-secondary)' }}>
                  {currentPhrase.persian}
                </p>
              </>
            )}

            {mode === 'fa-to-de' && (
              <>
                <p className="text-xs font-medium mb-2" style={{ color: 'var(--text-muted)' }}>
                  What's the German for:
                </p>
                <p className="text-2xl font-bold text-persian" style={{ color: 'var(--text-primary)' }}>
                  {currentPhrase.persian}
                </p>
              </>
            )}

            {mode === 'audio-to-de' && (
              <>
                <p className="text-xs font-medium mb-3" style={{ color: 'var(--text-muted)' }}>
                  Listen and recall the phrase:
                </p>
                <button
                  onClick={handlePlayAudio}
                  className="w-full py-6 rounded-xl text-4xl transition-all hover:scale-105 active:scale-95"
                  style={{ background: 'var(--bg-secondary)' }}
                  aria-label="Play German audio"
                >
                  🔊
                </button>
                <p className="text-center text-xs mt-2" style={{ color: 'var(--text-muted)' }}>
                  Tap to play audio
                </p>
              </>
            )}

            {mode === 'de-to-meaning' && (
              <>
                <p className="text-xs font-medium mb-2" style={{ color: 'var(--text-muted)' }}>
                  What does this mean?
                </p>
                <p className="text-2xl font-bold text-german" style={{ color: 'var(--text-primary)' }}>
                  {currentPhrase.german}
                </p>
              </>
            )}

            {mode === 'listening' && (
              <>
                <p className="text-xs font-medium mb-3" style={{ color: 'var(--text-muted)' }}>
                  What does this mean?
                </p>
                <button
                  onClick={handlePlayAudio}
                  className="w-full py-6 rounded-xl text-4xl transition-all hover:scale-105 active:scale-95 mb-3"
                  style={{ background: 'var(--bg-secondary)' }}
                  aria-label="Play German audio"
                >
                  🔊
                </button>
              </>
            )}

            {/* Show Answer button */}
            {mode !== 'listening' && (
              <button
                onClick={handleShowAnswer}
                className="w-full mt-6 py-3 rounded-xl font-medium text-sm transition-all hover:scale-[1.01] active:scale-[0.99]"
                style={{ background: 'var(--color-primary-600)', color: 'white' }}
              >
                Show Answer
              </button>
            )}

            {mode === 'listening' && (
              <div className="mt-4 space-y-2">
                {/* Multiple choice for listening */}
                {[currentPhrase.english, ...getDistractors(currentPhrase, phrases).slice(0, 2)]
                  .sort(() => Math.random() - 0.5)
                  .map((option, i) => (
                    <button
                      key={i}
                      onClick={() => {
                        if (option === currentPhrase.english) {
                          handleRate('good');
                        } else {
                          handleRate('again');
                        }
                      }}
                      className="w-full py-3 px-4 rounded-xl text-left text-sm transition-all hover:scale-[1.01] active:scale-[0.99]"
                      style={{ background: 'var(--bg-secondary)', color: 'var(--text-primary)' }}
                    >
                      {option}
                    </button>
                  ))
                }
              </div>
            )}
          </div>
        )}

        {practiceState === 'revealed' && (
          <div className="animate-slide-up">
            {/* Show the answer */}
            <p className="text-xs font-medium mb-2" style={{ color: 'var(--text-muted)' }}>Answer:</p>
            <p className="text-2xl font-bold text-german mb-2" style={{ color: 'var(--color-primary-600)' }}>
              {currentPhrase.german}
            </p>
            <p className="text-lg text-english mb-1" style={{ color: 'var(--text-secondary)' }}>
              {currentPhrase.english}
            </p>
            <p className="text-base text-persian" style={{ color: 'var(--text-muted)' }}>
              {currentPhrase.persian}
            </p>

            {/* Rating buttons */}
            <div className="grid grid-cols-4 gap-2 mt-6">
              <button
                onClick={() => handleRate('again')}
                className="py-3 rounded-xl text-sm font-medium transition-all hover:scale-105 active:scale-95"
                style={{ background: '#fef2f2', color: '#dc2626' }}
              >
                ❌ Again
              </button>
              <button
                onClick={() => handleRate('hard')}
                className="py-3 rounded-xl text-sm font-medium transition-all hover:scale-105 active:scale-95"
                style={{ background: '#fefce8', color: '#ca8a04' }}
              >
                😐 Hard
              </button>
              <button
                onClick={() => handleRate('good')}
                className="py-3 rounded-xl text-sm font-medium transition-all hover:scale-105 active:scale-95"
                style={{ background: '#f0fdf4', color: '#16a34a' }}
              >
                🙂 Good
              </button>
              <button
                onClick={() => handleRate('easy')}
                className="py-3 rounded-xl text-sm font-medium transition-all hover:scale-105 active:scale-95"
                style={{ background: '#eff6ff', color: '#2563eb' }}
              >
                🔥 Easy
              </button>
            </div>
          </div>
        )}

        {practiceState === 'result' && showResult && (
          <div className="animate-fade-in text-center py-4">
            <div className="text-3xl mb-2">
              {lastRating === 'again' ? '❌' : lastRating === 'hard' ? '😐' : lastRating === 'good' ? '🙂' : '🔥'}
            </div>
            <p className="text-sm font-medium" style={{ color: 'var(--text-primary)' }}>
              {currentPhrase.german}
            </p>
            <p className="text-xs mt-1" style={{ color: 'var(--text-muted)' }}>
              Next phrase coming...
            </p>
          </div>
        )}
      </div>

      {/* Audio indicator */}
      {audio.status === 'playing' && (
        <div className="text-center text-sm animate-pulse" style={{ color: 'var(--text-muted)' }}>
          🔊 Playing...
        </div>
      )}
    </div>
  );
}

// Helper to get distractor answers
function getDistractors(phrase: Phrase, allPhrases: Phrase[]): string[] {
  return allPhrases
    .filter(p => p.id !== phrase.id)
    .sort(() => Math.random() - 0.5)
    .slice(0, 3)
    .map(p => p.english);
}
