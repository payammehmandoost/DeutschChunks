import React, { useState } from 'react';
import { useAuth } from '../hooks/useAuth';

interface Props {
  onSwitchToRegister: () => void;
}

export default function LoginPage({ onSwitchToRegister }: Props) {
  const { signInWithEmail, signInWithGoogle } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleEmailLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      await signInWithEmail(email, password);
    } catch (err: any) {
      const errorCode = err.code || err?.errorInfo?.code || '';
      const errorMessage = err.message || '';
      console.error('Login error:', err);
      setError(getErrorMessage(errorCode, errorMessage));
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    setError('');
    setLoading(true);

    try {
      await signInWithGoogle();
    } catch (err: any) {
      const errorCode = err.code || err?.errorInfo?.code || '';
      const errorMessage = err.message || '';
      console.error('Google login error:', err);
      setError(getErrorMessage(errorCode, errorMessage));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4" style={{ background: 'var(--bg-primary)' }}>
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="text-5xl mb-3">🇩🇪</div>
          <h1 className="text-3xl font-bold mb-2" style={{ color: 'var(--text-primary)' }}>
            Deutsch Chunks
          </h1>
          <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>
            Learn German naturally
          </p>
        </div>

        {/* Login Card */}
        <div className="card">
          <h2 className="text-xl font-bold mb-6 text-center" style={{ color: 'var(--text-primary)' }}>
            Welcome Back
          </h2>

          {/* Error Message */}
          {error && (
            <div className="mb-4 p-3 rounded-lg text-sm" style={{ background: '#fef2f2', color: '#dc2626' }}>
              {error}
            </div>
          )}

          {/* Google Login */}
          <button
            onClick={handleGoogleLogin}
            disabled={loading}
            className="w-full py-3 px-4 rounded-xl font-medium text-sm mb-4 flex items-center justify-center gap-2 transition-all hover:scale-[1.01] active:scale-[0.99] disabled:opacity-50"
            style={{ background: 'var(--bg-secondary)', color: 'var(--text-primary)', border: '1px solid var(--border-color)' }}
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24">
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
            </svg>
            Continue with Google
          </button>

          {/* Divider */}
          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t" style={{ borderColor: 'var(--border-color)' }}></div>
            </div>
            <div className="relative flex justify-center text-xs">
              <span className="px-2" style={{ background: 'var(--bg-card)', color: 'var(--text-muted)' }}>
                or continue with email
              </span>
            </div>
          </div>

          {/* Email Form */}
          <form onSubmit={handleEmailLogin} className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2" style={{ color: 'var(--text-secondary)' }}>
                Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full px-4 py-3 rounded-xl text-sm transition-all"
                style={{ 
                  background: 'var(--bg-secondary)', 
                  color: 'var(--text-primary)',
                  border: '1px solid var(--border-color)'
                }}
                placeholder="your@email.com"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2" style={{ color: 'var(--text-secondary)' }}>
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full px-4 py-3 rounded-xl text-sm transition-all"
                style={{ 
                  background: 'var(--bg-secondary)', 
                  color: 'var(--text-primary)',
                  border: '1px solid var(--border-color)'
                }}
                placeholder="••••••••"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 rounded-xl font-medium text-sm transition-all hover:scale-[1.01] active:scale-[0.99] disabled:opacity-50"
              style={{ background: 'var(--color-primary-600)', color: 'white' }}
            >
              {loading ? 'Signing in...' : 'Sign In'}
            </button>
          </form>

          {/* Switch to Register */}
          <div className="mt-6 text-center">
            <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>
              Don't have an account?{' '}
              <button
                onClick={onSwitchToRegister}
                className="font-medium underline"
                style={{ color: 'var(--color-primary-600)' }}
              >
                Sign up
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

function getErrorMessage(code: string, message?: string): string {
  console.error('Firebase Auth Error:', { code, message });
  
  switch (code) {
    case 'auth/invalid-email':
      return 'آدرس ایمیل نامعتبر است';
    case 'auth/user-not-found':
      return 'حسابی با این ایمیل پیدا نشد';
    case 'auth/wrong-password':
      return 'رمز عبور اشتباه است';
    case 'auth/invalid-credential':
      return 'ایمیل یا رمز عبور اشتباه است';
    case 'auth/too-many-requests':
      return 'تعداد درخواست‌ها زیاد شد. لطفاً بعداً تلاش کنید';
    case 'auth/popup-closed-by-user':
      return 'ورود لغو شد';
    case 'auth/api-key-not-valid.-please-pass-a-valid-api-key.':
    case 'auth/invalid-api-key':
      return '❌ پیکربندی Firebase اشتباه است. فایل .env.local را بررسی کنید';
    case 'auth/configuration-not-found':
      return '❌ Firebase پیکربندی نشده. فایل .env.local را بررسی کنید';
    case 'auth/operation-not-allowed':
      return '❌ روش ورود فعال نشده. در Firebase Console → Authentication → Sign-in method فعال کنید';
    case 'auth/network-request-failed':
      return 'خطای شبکه. اتصال اینترنت را بررسی کنید';
    case 'auth/missing-email':
      return 'ایمیل را وارد کنید';
    case 'auth/weak-password':
      return 'رمز عبور باید حداقل ۶ کاراکتر باشد';
    case 'auth/email-already-in-use':
      return 'این ایمیل قبلاً ثبت شده';
    default:
      return `خطا: ${code || message || 'مشکلی پیش آمد'}`;
  }
}
