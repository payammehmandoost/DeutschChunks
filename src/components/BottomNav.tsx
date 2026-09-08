import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const navItems = [
  { path: '/', label: 'Home', icon: '🏠' },
  { path: '/learn', label: 'Learn', icon: '📚' },
  { path: '/practice', label: 'Practice', icon: '🎧' },
  { path: '/progress', label: 'Progress', icon: '📈' },
  { path: '/settings', label: 'Settings', icon: '⚙️' },
];

export default function BottomNav() {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <nav 
      className="fixed bottom-0 left-0 right-0 z-50 md:top-0 md:bottom-auto md:h-auto"
      style={{ 
        background: 'var(--nav-bg)',
        backdropFilter: 'blur(12px)',
        borderTop: '1px solid var(--border-color)',
      }}
      role="navigation"
      aria-label="Main navigation"
    >
      {/* Desktop: top bar */}
      <div className="hidden md:flex items-center justify-between max-w-4xl mx-auto px-6 py-3">
        <div className="flex items-center gap-2">
          <span className="text-xl">🇩🇪</span>
          <span className="font-bold text-lg" style={{ color: 'var(--text-primary)' }}>Deutsch Chunks</span>
        </div>
        <div className="flex items-center gap-1">
          {navItems.map(item => (
            <button
              key={item.path}
              onClick={() => navigate(item.path)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                location.pathname === item.path 
                  ? 'bg-primary-100 text-primary-700 dark:bg-primary-900/30 dark:text-primary-300' 
                  : 'hover:bg-surface-100 dark:hover:bg-surface-800'
              }`}
              style={{ 
                color: location.pathname === item.path ? undefined : 'var(--text-secondary)',
                background: location.pathname === item.path ? 'var(--color-primary-100)' : 'transparent',
              }}
              aria-label={item.label}
              aria-current={location.pathname === item.path ? 'page' : undefined}
            >
              <span className="mr-1.5">{item.icon}</span>
              {item.label}
            </button>
          ))}
        </div>
      </div>

      {/* Mobile: bottom bar */}
      <div className="flex md:hidden items-center justify-around px-2 py-safe pb-safe">
        {navItems.map(item => {
          const isActive = location.pathname === item.path;
          return (
            <button
              key={item.path}
              onClick={() => navigate(item.path)}
              className={`flex flex-col items-center py-2 px-3 rounded-xl transition-all touch-target ${
                isActive ? 'scale-105' : 'opacity-60'
              }`}
              aria-label={item.label}
              aria-current={isActive ? 'page' : undefined}
            >
              <span className={`text-xl ${isActive ? 'animate-fade-in' : ''}`}>{item.icon}</span>
              <span 
                className={`text-[10px] mt-0.5 font-medium ${isActive ? 'font-semibold' : ''}`}
                style={{ color: isActive ? 'var(--color-primary-600)' : 'var(--text-muted)' }}
              >
                {item.label}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
}
