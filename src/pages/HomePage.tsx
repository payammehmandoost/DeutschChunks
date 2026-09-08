import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useProgress } from '../hooks/useProgress';
import { useFavorites } from '../hooks/useFavorites';
import { UserSettings } from '../services/storageService';
import { lessons, phrases } from '../data/phrases';

interface Props {
  settings: UserSettings;
}

export default function HomePage({ settings }: Props) {
  const navigate = useNavigate();
  const { stats, dueCount, loading } = useProgress();
  const { favorites } = useFavorites();

  const todayProgress = Math.min(100, Math.round((stats.totalReviews / settings.dailyGoal) * 100));
  
  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good morning';
    if (hour < 18) return 'Good afternoon';
    return 'Good evening';
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="animate-pulse text-2xl">🇩🇪</div>
      </div>
    );
  }

  return (
    <div className="px-4 pt-6 animate-fade-in">
      {/* Header */}
      <header className="mb-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm" style={{ color: 'var(--text-muted)' }}>{getGreeting()} 👋</p>
            <h1 className="text-2xl font-bold" style={{ color: 'var(--text-primary)' }}>
              Deutsch Chunks
            </h1>
            <p className="text-sm mt-0.5" style={{ color: 'var(--text-secondary)' }}>
              Learn German naturally
            </p>
          </div>
          <button 
            onClick={() => navigate('/search')}
            className="touch-target rounded-xl p-2.5 transition-colors"
            style={{ background: 'var(--bg-secondary)' }}
            aria-label="Search phrases"
          >
            🔍
          </button>
        </div>
      </header>

      {/* Today's Goal */}
      <div className="card mb-4">
        <div className="flex items-center justify-between mb-3">
          <h2 className="font-semibold text-sm" style={{ color: 'var(--text-secondary)' }}>
            Today's Goal
          </h2>
          <span className="text-xs font-medium px-2 py-1 rounded-full" 
            style={{ background: 'var(--color-primary-100)', color: 'var(--color-primary-700)' }}>
            {stats.totalReviews}/{settings.dailyGoal}
          </span>
        </div>
        <div className="progress-bar mb-2">
          <div className="progress-fill" style={{ width: `${todayProgress}%` }} />
        </div>
        <div className="flex items-center gap-4 text-sm">
          <span style={{ color: 'var(--text-secondary)' }}>
            🔥 {stats.streak} day streak
          </span>
          <span style={{ color: 'var(--text-secondary)' }}>
            ⭐ {stats.totalXP} XP
          </span>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 gap-3 mb-6">
        <button 
          onClick={() => navigate('/practice')}
          className="card text-left hover:scale-[1.02] transition-transform"
        >
          <div className="text-2xl mb-1">🎯</div>
          <div className="text-xl font-bold" style={{ color: 'var(--text-primary)' }}>{dueCount}</div>
          <div className="text-xs" style={{ color: 'var(--text-muted)' }}>Due for review</div>
        </button>
        <button 
          onClick={() => navigate('/progress')}
          className="card text-left hover:scale-[1.02] transition-transform"
        >
          <div className="text-2xl mb-1">📚</div>
          <div className="text-xl font-bold" style={{ color: 'var(--text-primary)' }}>{stats.learned}</div>
          <div className="text-xs" style={{ color: 'var(--text-muted)' }}>Phrases learned</div>
        </button>
        <button 
          onClick={() => navigate('/favorites')}
          className="card text-left hover:scale-[1.02] transition-transform"
        >
          <div className="text-2xl mb-1">⭐</div>
          <div className="text-xl font-bold" style={{ color: 'var(--text-primary)' }}>{favorites.length}</div>
          <div className="text-xs" style={{ color: 'var(--text-muted)' }}>Favorites</div>
        </button>
        <button 
          onClick={() => navigate('/progress')}
          className="card text-left hover:scale-[1.02] transition-transform"
        >
          <div className="text-2xl mb-1">🎯</div>
          <div className="text-xl font-bold" style={{ color: 'var(--text-primary)' }}>{stats.accuracy}%</div>
          <div className="text-xs" style={{ color: 'var(--text-muted)' }}>Accuracy</div>
        </button>
      </div>

      {/* Quick Actions */}
      <div className="space-y-3 mb-6">
        <h2 className="font-semibold text-sm" style={{ color: 'var(--text-secondary)' }}>
          Continue Learning
        </h2>
        
        {/* Due Review */}
        {dueCount > 0 && (
          <button
            onClick={() => navigate('/practice')}
            className="card w-full text-left flex items-center justify-between hover:scale-[1.01] transition-transform"
            style={{ borderColor: 'var(--color-primary-300)', borderWidth: '2px' }}
          >
            <div>
              <div className="font-semibold" style={{ color: 'var(--text-primary)' }}>
                Today's Review
              </div>
              <div className="text-sm" style={{ color: 'var(--text-secondary)' }}>
                {dueCount} phrases waiting
              </div>
            </div>
            <div className="text-2xl">→</div>
          </button>
        )}

        {/* Recommended Lesson */}
        <button
          onClick={() => navigate('/learn')}
          className="card w-full text-left flex items-center justify-between hover:scale-[1.01] transition-transform"
        >
          <div>
            <div className="font-semibold" style={{ color: 'var(--text-primary)' }}>
              {lessons[0].icon} {lessons[0].name}
            </div>
            <div className="text-sm" style={{ color: 'var(--text-secondary)' }}>
              {phrases.filter(p => p.lesson === 1).length} phrases
            </div>
          </div>
          <div className="text-2xl">→</div>
        </button>

        {/* Quick Practice */}
        <button
          onClick={() => navigate('/practice')}
          className="card w-full text-left flex items-center justify-between hover:scale-[1.01] transition-transform"
        >
          <div>
            <div className="font-semibold" style={{ color: 'var(--text-primary)' }}>
              🎧 Quick Practice
            </div>
            <div className="text-sm" style={{ color: 'var(--text-secondary)' }}>
              Test your knowledge
            </div>
          </div>
          <div className="text-2xl">→</div>
        </button>
      </div>

      {/* Lessons Overview */}
      <div className="mb-6">
        <h2 className="font-semibold text-sm mb-3" style={{ color: 'var(--text-secondary)' }}>
          A1 Lessons
        </h2>
        <div className="grid grid-cols-1 gap-2">
          {lessons.map(lesson => {
            const lessonPhrases = phrases.filter(p => p.lesson === lesson.id);
            return (
              <button
                key={lesson.id}
                onClick={() => navigate(`/learn/${lesson.id}`)}
                className="card flex items-center gap-3 text-left hover:scale-[1.01] transition-transform py-3"
              >
                <span className="text-2xl">{lesson.icon}</span>
                <div className="flex-1">
                  <div className="font-medium text-sm" style={{ color: 'var(--text-primary)' }}>
                    Lesson {String(lesson.id).padStart(2, '0')} — {lesson.name}
                  </div>
                  <div className="text-xs" style={{ color: 'var(--text-muted)' }}>
                    {lessonPhrases.length} phrases
                  </div>
                </div>
                <span className="text-sm" style={{ color: 'var(--text-muted)' }}>→</span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
