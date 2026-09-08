import React, { useState, useEffect, Component, type ReactNode } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { getSettings, saveSettings, UserSettings } from './services/storageService';
import HomePage from './pages/HomePage';
import LearnPage from './pages/LearnPage';
import PracticePage from './pages/PracticePage';
import ProgressPage from './pages/ProgressPage';
import FavoritesPage from './pages/FavoritesPage';
import SettingsPage from './pages/SettingsPage';
import SearchPage from './pages/SearchPage';
import PhraseDetailPage from './pages/PhraseDetailPage';
import BottomNav from './components/BottomNav';

// Error Boundary
class ErrorBoundary extends Component<{ children: ReactNode }, { hasError: boolean; error?: Error }> {
  constructor(props: { children: ReactNode }) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error) {
    return { hasError: true, error };
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center p-6" style={{ background: 'var(--bg-primary)' }}>
          <div className="text-center">
            <div className="text-4xl mb-4">⚠️</div>
            <h1 className="text-xl font-bold mb-2" style={{ color: 'var(--text-primary)' }}>
              Something went wrong
            </h1>
            <p className="text-sm mb-4" style={{ color: 'var(--text-secondary)' }}>
              {this.state.error?.message || 'An unexpected error occurred'}
            </p>
            <button
              onClick={() => window.location.reload()}
              className="px-6 py-2.5 rounded-xl font-medium text-sm"
              style={{ background: 'var(--color-primary-600)', color: 'white' }}
            >
              Reload App
            </button>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}

function AppContent() {
  const [settings, setSettings] = useState<UserSettings>({
    theme: 'system',
    language: 'en',
    dailyGoal: 20,
    autoplayAudio: false,
    normalSpeed: 1.0,
    slowSpeed: 0.7,
  });
  const [settingsLoaded, setSettingsLoaded] = useState(false);
  const location = useLocation();

  useEffect(() => {
    getSettings().then(s => {
      setSettings(s);
      setSettingsLoaded(true);
    }).catch(() => {
      setSettingsLoaded(true);
    });
  }, []);

  useEffect(() => {
    if (!settingsLoaded) return;
    
    const root = document.documentElement;
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    if (settings.theme === 'dark' || (settings.theme === 'system' && prefersDark)) {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }

    if (settings.language === 'fa') {
      root.setAttribute('dir', 'rtl');
    } else {
      root.setAttribute('dir', 'ltr');
    }

    saveSettings(settings).catch(() => {});
  }, [settings, settingsLoaded]);

  const updateSettings = (partial: Partial<UserSettings>) => {
    setSettings(prev => ({ ...prev, ...partial }));
  };

  if (!settingsLoaded) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ background: 'var(--bg-primary)' }}>
        <div className="text-center animate-pulse">
          <div className="text-4xl mb-2">🇩🇪</div>
          <p className="text-sm font-medium" style={{ color: 'var(--text-muted)' }}>Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen" style={{ background: 'var(--bg-primary)' }}>
      <div className="max-w-lg mx-auto pb-20 md:pb-4 md:pt-16">
        <Routes>
          <Route path="/" element={<HomePage settings={settings} />} />
          <Route path="/learn" element={<LearnPage settings={settings} />} />
          <Route path="/learn/:lessonId" element={<LearnPage settings={settings} />} />
          <Route path="/practice" element={<PracticePage settings={settings} />} />
          <Route path="/progress" element={<ProgressPage settings={settings} />} />
          <Route path="/favorites" element={<FavoritesPage settings={settings} />} />
          <Route path="/settings" element={<SettingsPage settings={settings} updateSettings={updateSettings} />} />
          <Route path="/search" element={<SearchPage settings={settings} />} />
          <Route path="/phrase/:phraseId" element={<PhraseDetailPage settings={settings} />} />
          <Route path="*" element={
            <div className="px-4 pt-6 text-center">
              <div className="text-4xl mb-3">🔍</div>
              <h1 className="text-xl font-bold mb-2" style={{ color: 'var(--text-primary)' }}>Page not found</h1>
              <a href="/" className="text-sm underline" style={{ color: 'var(--color-primary-600)' }}>
                Go to home page
              </a>
            </div>
          } />
        </Routes>
      </div>
      <BottomNav />
    </div>
  );
}

export default function App() {
  return (
    <ErrorBoundary>
      <BrowserRouter>
        <AppContent />
      </BrowserRouter>
    </ErrorBoundary>
  );
}
