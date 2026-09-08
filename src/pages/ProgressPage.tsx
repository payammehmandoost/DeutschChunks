import React from 'react';
import { useProgress } from '../hooks/useProgress';
import { useFavorites } from '../hooks/useFavorites';
import { UserSettings } from '../services/storageService';
import { phrases, categories, levels } from '../data/phrases';

interface Props {
  settings: UserSettings;
}

export default function ProgressPage({ settings }: Props) {
  const { stats, progress, loading } = useProgress();
  const { favorites } = useFavorites();

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="animate-pulse text-2xl">📈</div>
      </div>
    );
  }

  // Calculate level progress
  const levelProgress = levels.map(level => {
    const levelPhrases = phrases.filter(p => p.level === level);
    const learnedInLevel = progress.filter(p => 
      levelPhrases.some(lp => lp.id === p.phraseId) && p.status !== 'new'
    ).length;
    return {
      level,
      total: levelPhrases.length,
      learned: learnedInLevel,
      percent: levelPhrases.length > 0 ? Math.round((learnedInLevel / levelPhrases.length) * 100) : 0,
    };
  });

  // Calculate category progress
  const categoryProgress = categories.map(cat => {
    const catPhrases = phrases.filter(p => p.category === cat);
    const learnedInCat = progress.filter(p => 
      catPhrases.some(cp => cp.id === p.phraseId) && p.status !== 'new'
    ).length;
    return {
      category: cat,
      total: catPhrases.length,
      learned: learnedInCat,
      percent: catPhrases.length > 0 ? Math.round((learnedInCat / catPhrases.length) * 100) : 0,
    };
  }).filter(c => c.total > 0);

  return (
    <div className="px-4 pt-6 animate-fade-in">
      <h1 className="text-2xl font-bold mb-6" style={{ color: 'var(--text-primary)' }}>Progress</h1>

      {/* Stats Overview */}
      <div className="grid grid-cols-2 gap-3 mb-6">
        <div className="card">
          <div className="text-2xl mb-1">📚</div>
          <div className="text-xl font-bold" style={{ color: 'var(--text-primary)' }}>{stats.learned}</div>
          <div className="text-xs" style={{ color: 'var(--text-muted)' }}>Phrases learned</div>
        </div>
        <div className="card">
          <div className="text-2xl mb-1">✅</div>
          <div className="text-xl font-bold" style={{ color: 'var(--text-primary)' }}>{stats.mastered}</div>
          <div className="text-xs" style={{ color: 'var(--text-muted)' }}>Mastered</div>
        </div>
        <div className="card">
          <div className="text-2xl mb-1">🔥</div>
          <div className="text-xl font-bold" style={{ color: 'var(--text-primary)' }}>{stats.streak}</div>
          <div className="text-xs" style={{ color: 'var(--text-muted)' }}>Day streak</div>
        </div>
        <div className="card">
          <div className="text-2xl mb-1">🎯</div>
          <div className="text-xl font-bold" style={{ color: 'var(--text-primary)' }}>{stats.accuracy}%</div>
          <div className="text-xs" style={{ color: 'var(--text-muted)' }}>Accuracy</div>
        </div>
        <div className="card">
          <div className="text-2xl mb-1">📝</div>
          <div className="text-xl font-bold" style={{ color: 'var(--text-primary)' }}>{stats.totalReviews}</div>
          <div className="text-xs" style={{ color: 'var(--text-muted)' }}>Reviews (7 days)</div>
        </div>
        <div className="card">
          <div className="text-2xl mb-1">⭐</div>
          <div className="text-xl font-bold" style={{ color: 'var(--text-primary)' }}>{stats.totalXP}</div>
          <div className="text-xs" style={{ color: 'var(--text-muted)' }}>Total XP</div>
        </div>
      </div>

      {/* Level Progress */}
      <div className="mb-6">
        <h2 className="font-semibold text-sm mb-3" style={{ color: 'var(--text-secondary)' }}>
          Level Progress
        </h2>
        <div className="space-y-3">
          {levelProgress.map(lp => (
            <div key={lp.level} className="card py-3">
              <div className="flex items-center justify-between mb-2">
                <span className="font-medium text-sm" style={{ color: 'var(--text-primary)' }}>
                  {lp.level}
                </span>
                <span className="text-xs" style={{ color: 'var(--text-muted)' }}>
                  {lp.learned} / {lp.total} phrases
                </span>
              </div>
              <div className="progress-bar">
                <div className="progress-fill" style={{ width: `${lp.percent}%` }} />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Category Progress */}
      <div className="mb-6">
        <h2 className="font-semibold text-sm mb-3" style={{ color: 'var(--text-secondary)' }}>
          Category Progress
        </h2>
        <div className="space-y-2">
          {categoryProgress.map(cp => (
            <div key={cp.category} className="flex items-center gap-3">
              <span className="text-xs w-24 truncate" style={{ color: 'var(--text-secondary)' }}>
                {cp.category}
              </span>
              <div className="progress-bar flex-1">
                <div className="progress-fill" style={{ width: `${cp.percent}%` }} />
              </div>
              <span className="text-xs w-8 text-right" style={{ color: 'var(--text-muted)' }}>
                {cp.percent}%
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Daily Goal */}
      <div className="card">
        <div className="flex items-center justify-between mb-2">
          <span className="font-medium text-sm" style={{ color: 'var(--text-primary)' }}>
            Daily Goal
          </span>
          <span className="text-xs" style={{ color: 'var(--text-muted)' }}>
            {settings.dailyGoal} phrases/day
          </span>
        </div>
        <div className="progress-bar">
          <div 
            className="progress-fill" 
            style={{ 
              width: `${Math.min(100, Math.round((stats.totalReviews / settings.dailyGoal) * 100))}%`,
              background: stats.totalReviews >= settings.dailyGoal ? 'var(--color-success)' : undefined
            }} 
          />
        </div>
        <p className="text-xs mt-2" style={{ color: 'var(--text-muted)' }}>
          {stats.totalReviews >= settings.dailyGoal 
            ? '🎉 Goal reached!' 
            : `${settings.dailyGoal - stats.totalReviews} more to reach your goal`}
        </p>
      </div>
    </div>
  );
}
