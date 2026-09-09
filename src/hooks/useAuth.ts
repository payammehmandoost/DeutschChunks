import { useState, useEffect } from 'react';
import { User } from 'firebase/auth';
import { authService, UserProfile } from '../services/authService';

export function useAuth() {
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = authService.onAuthChange((user) => {
      setUser(user);
      setProfile(user ? authService.toProfile(user) : null);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const signInWithEmail = async (email: string, password: string) => {
    const user = await authService.signInWithEmail(email, password);
    setProfile(authService.toProfile(user));
    return user;
  };

  const signUpWithEmail = async (email: string, password: string, displayName?: string) => {
    const user = await authService.signUpWithEmail(email, password, displayName);
    setProfile(authService.toProfile(user));
    return user;
  };

  const signInWithGoogle = async () => {
    const user = await authService.signInWithGoogle();
    setProfile(authService.toProfile(user));
    return user;
  };

  const logout = async () => {
    await authService.logout();
    setUser(null);
    setProfile(null);
  };

  return {
    user,
    profile,
    loading,
    isAuthenticated: !!user,
    signInWithEmail,
    signUpWithEmail,
    signInWithGoogle,
    logout
  };
}
