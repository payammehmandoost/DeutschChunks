import React from 'react';
import { UserSettings } from '../services/storageService';

interface Props {
  settings: UserSettings;
  updateSettings: (partial: Partial<UserSettings>) => void;
}

export default function SettingsPage({ settings, updateSettings }: Props) {
  return (
    <div className="px-4 pt-6 animate-fade-in">
      <h1 className="text-2xl font-bold mb-6" style={{ color: 'var(--text-primary)' }}>Settings</h1>

      {/* Theme */}
      <div className="card mb-4">
        <h2 className="font-semibold text-sm mb-3" style={{ color: 'var(--text-secondary)' }}>
          🎨 Appearance
        </h2>
        <div className="flex gap-2">
          {(['light', 'dark', 'system'] as const).map(theme => (
            <button
              key={theme}
              onClick={() => updateSettings({ theme })}
              className={`flex-1 py-2.5 rounded-xl text-sm font-medium transition-all ${
                settings.theme === theme ? 'ring-2 ring-primary-500' : ''
              }`}
              style={{ 
                background: settings.theme === theme ? 'var(--color-primary-100)' : 'var(--bg-secondary)',
                color: settings.theme === theme ? 'var(--color-primary-700)' : 'var(--text-secondary)',
              }}
            >
              {theme === 'light' ? '☀️ Light' : theme === 'dark' ? '🌙 Dark' : '🖥️ System'}
            </button>
          ))}
        </div>
      </div>

      {/* Language */}
      <div className="card mb-4">
        <h2 className="font-semibold text-sm mb-3" style={{ color: 'var(--text-secondary)' }}>
          🌐 Interface Language
        </h2>
        <div className="flex gap-2">
          <button
            onClick={() => updateSettings({ language: 'en' })}
            className={`flex-1 py-2.5 rounded-xl text-sm font-medium transition-all ${
              settings.language === 'en' ? 'ring-2 ring-primary-500' : ''
            }`}
            style={{ 
              background: settings.language === 'en' ? 'var(--color-primary-100)' : 'var(--bg-secondary)',
              color: settings.language === 'en' ? 'var(--color-primary-700)' : 'var(--text-secondary)',
            }}
          >
            🇬🇧 English
          </button>
          <button
            onClick={() => updateSettings({ language: 'fa' })}
            className={`flex-1 py-2.5 rounded-xl text-sm font-medium transition-all ${
              settings.language === 'fa' ? 'ring-2 ring-primary-500' : ''
            }`}
            style={{ 
              background: settings.language === 'fa' ? 'var(--color-primary-100)' : 'var(--bg-secondary)',
              color: settings.language === 'fa' ? 'var(--color-primary-700)' : 'var(--text-secondary)',
            }}
          >
            🇮🇷 فارسی
          </button>
        </div>
      </div>

      {/* Daily Goal */}
      <div className="card mb-4">
        <h2 className="font-semibold text-sm mb-3" style={{ color: 'var(--text-secondary)' }}>
          🎯 Daily Goal
        </h2>
        <div className="grid grid-cols-4 gap-2">
          {[10, 20, 30, 50].map(goal => (
            <button
              key={goal}
              onClick={() => updateSettings({ dailyGoal: goal })}
              className={`py-2.5 rounded-xl text-sm font-medium transition-all ${
                settings.dailyGoal === goal ? 'ring-2 ring-primary-500' : ''
              }`}
              style={{ 
                background: settings.dailyGoal === goal ? 'var(--color-primary-100)' : 'var(--bg-secondary)',
                color: settings.dailyGoal === goal ? 'var(--color-primary-700)' : 'var(--text-secondary)',
              }}
            >
              {goal}
            </button>
          ))}
        </div>
        <p className="text-xs mt-2" style={{ color: 'var(--text-muted)' }}>
          phrases per day
        </p>
      </div>

      {/* Audio Settings */}
      <div className="card mb-4">
        <h2 className="font-semibold text-sm mb-3" style={{ color: 'var(--text-secondary)' }}>
          🔊 Audio
        </h2>
        <div className="space-y-3">
          <label className="flex items-center justify-between">
            <span className="text-sm" style={{ color: 'var(--text-primary)' }}>Autoplay audio</span>
            <button
              onClick={() => updateSettings({ autoplayAudio: !settings.autoplayAudio })}
              className={`w-12 h-6 rounded-full transition-all relative ${
                settings.autoplayAudio ? 'bg-primary-500' : 'bg-gray-300'
              }`}
              role="switch"
              aria-checked={settings.autoplayAudio}
            >
              <span 
                className={`absolute top-0.5 w-5 h-5 rounded-full bg-white shadow transition-all ${
                  settings.autoplayAudio ? 'left-6' : 'left-0.5'
                }`}
              />
            </button>
          </label>
        </div>
      </div>

      {/* About */}
      <div className="card mb-4">
        <h2 className="font-semibold text-sm mb-3" style={{ color: 'var(--text-secondary)' }}>
          ℹ️ About
        </h2>
        <div className="space-y-2">
          <div className="flex justify-between">
            <span className="text-sm" style={{ color: 'var(--text-secondary)' }}>Version</span>
            <span className="text-sm" style={{ color: 'var(--text-muted)' }}>1.0.0</span>
          </div>
          <div className="flex justify-between">
            <span className="text-sm" style={{ color: 'var(--text-secondary)' }}>Phrases</span>
            <span className="text-sm" style={{ color: 'var(--text-muted)' }}>38 A1</span>
          </div>
          <div className="flex justify-between">
            <span className="text-sm" style={{ color: 'var(--text-secondary)' }}>App Type</span>
            <span className="text-sm" style={{ color: 'var(--text-muted)' }}>PWA</span>
          </div>
        </div>
      </div>

      {/* Data */}
      <div className="card">
        <h2 className="font-semibold text-sm mb-3" style={{ color: 'var(--text-secondary)' }}>
          💾 Data
        </h2>
        <p className="text-xs mb-3" style={{ color: 'var(--text-muted)' }}>
          Your progress is stored locally on this device using IndexedDB.
        </p>
        <button
          onClick={() => {
            if (confirm('Reset all progress? This cannot be undone.')) {
              localStorage.clear();
              indexedDB.deleteDatabase('deutsch-chunks-db');
              window.location.reload();
            }
          }}
          className="w-full py-2.5 rounded-xl text-sm font-medium"
          style={{ background: '#fef2f2', color: '#dc2626' }}
        >
          Reset All Data
        </button>
      </div>
    </div>
  );
}
