import { openDB, DBSchema, IDBPDatabase } from 'idb';

interface DeutschChunksDB extends DBSchema {
  progress: {
    key: string;
    value: PhraseProgress;
    indexes: { 'by-due': Date; 'by-status': string };
  };
  favorites: {
    key: string;
    value: { phraseId: string; addedAt: Date };
  };
  settings: {
    key: string;
    value: { key: string; value: unknown };
  };
  reviewLog: {
    key: string;
    value: ReviewLogEntry;
    indexes: { 'by-date': Date };
  };
}

export interface PhraseProgress {
  phraseId: string;
  status: 'new' | 'learning' | 'review' | 'mastered';
  repetitions: number;
  correctAnswers: number;
  incorrectAnswers: number;
  ease: number;
  interval: number;
  dueDate: Date;
  lastReviewed: Date | null;
  nextReviewAt: Date;
  xp: number;
}

export interface ReviewLogEntry {
  id: string;
  phraseId: string;
  rating: 'again' | 'hard' | 'good' | 'easy';
  timestamp: Date;
  wasCorrect: boolean;
}

export interface UserSettings {
  theme: 'light' | 'dark' | 'system';
  language: 'en' | 'fa';
  dailyGoal: number;
  autoplayAudio: boolean;
  normalSpeed: number;
  slowSpeed: number;
}

const DB_NAME = 'deutsch-chunks-db';
const DB_VERSION = 1;

let dbInstance: IDBPDatabase<DeutschChunksDB> | null = null;

async function getDB(): Promise<IDBPDatabase<DeutschChunksDB>> {
  if (dbInstance) return dbInstance;
  
  dbInstance = await openDB<DeutschChunksDB>(DB_NAME, DB_VERSION, {
    upgrade(db) {
      const progressStore = db.createObjectStore('progress', { keyPath: 'phraseId' });
      progressStore.createIndex('by-due', 'dueDate');
      progressStore.createIndex('by-status', 'status');

      db.createObjectStore('favorites', { keyPath: 'phraseId' });
      db.createObjectStore('settings', { keyPath: 'key' });

      const reviewStore = db.createObjectStore('reviewLog', { keyPath: 'id' });
      reviewStore.createIndex('by-date', 'timestamp');
    },
  });

  return dbInstance;
}

// Progress operations
export async function getProgress(phraseId: string): Promise<PhraseProgress | null> {
  const db = await getDB();
  const result = await db.get('progress', phraseId);
  return result || null;
}

export async function getAllProgress(): Promise<PhraseProgress[]> {
  const db = await getDB();
  return db.getAll('progress');
}

export async function saveProgress(progress: PhraseProgress): Promise<void> {
  const db = await getDB();
  await db.put('progress', progress);
}

export async function getDuePhrases(): Promise<PhraseProgress[]> {
  const db = await getDB();
  const all = await db.getAll('progress');
  const now = new Date();
  return all.filter(p => p.nextReviewAt <= now && p.status !== 'mastered');
}

export async function getReviewCount(): Promise<number> {
  const due = await getDuePhrases();
  return due.length;
}

// Favorites operations
export async function isFavorite(phraseId: string): Promise<boolean> {
  const db = await getDB();
  const result = await db.get('favorites', phraseId);
  return !!result;
}

export async function addFavorite(phraseId: string): Promise<void> {
  const db = await getDB();
  await db.put('favorites', { phraseId, addedAt: new Date() });
}

export async function removeFavorite(phraseId: string): Promise<void> {
  const db = await getDB();
  await db.delete('favorites', phraseId);
}

export async function toggleFavorite(phraseId: string): Promise<boolean> {
  const fav = await isFavorite(phraseId);
  if (fav) {
    await removeFavorite(phraseId);
    return false;
  } else {
    await addFavorite(phraseId);
    return true;
  }
}

export async function getAllFavorites(): Promise<string[]> {
  const db = await getDB();
  const all = await db.getAll('favorites');
  return all.map(f => f.phraseId);
}

// Settings operations
export async function getSettings(): Promise<UserSettings> {
  const defaults: UserSettings = {
    theme: 'system',
    language: 'en',
    dailyGoal: 20,
    autoplayAudio: false,
    normalSpeed: 1.0,
    slowSpeed: 0.7,
  };

  try {
    const db = await getDB();
    const stored = await db.get('settings', 'userSettings');
    if (stored) {
      return { ...defaults, ...(stored.value as Partial<UserSettings>) };
    }
  } catch {
    // Fallback to localStorage
    const stored = localStorage.getItem('dc_settings');
    if (stored) {
      return { ...defaults, ...JSON.parse(stored) };
    }
  }

  return defaults;
}

export async function saveSettings(settings: UserSettings): Promise<void> {
  try {
    const db = await getDB();
    await db.put('settings', { key: 'userSettings', value: settings });
  } catch {
    localStorage.setItem('dc_settings', JSON.stringify(settings));
  }
}

// Review log operations
export async function addReviewLog(entry: ReviewLogEntry): Promise<void> {
  const db = await getDB();
  await db.put('reviewLog', entry);
}

export async function getReviewLogs(days: number = 7): Promise<ReviewLogEntry[]> {
  const db = await getDB();
  const all = await db.getAll('reviewLog');
  const cutoff = new Date();
  cutoff.setDate(cutoff.getDate() - days);
  return all.filter(e => e.timestamp >= cutoff);
}

// Stats
export async function getStats() {
  const allProgress = await getAllProgress();
  const favorites = await getAllFavorites();
  const logs = await getReviewLogs(7);
  
  const learned = allProgress.filter(p => p.status !== 'new').length;
  const mastered = allProgress.filter(p => p.status === 'mastered').length;
  const totalReviews = logs.length;
  const correctReviews = logs.filter(l => l.wasCorrect).length;
  const accuracy = totalReviews > 0 ? Math.round((correctReviews / totalReviews) * 100) : 0;

  // Calculate streak
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  let streak = 0;
  const reviewedDates = new Set(logs.map(l => {
    const d = new Date(l.timestamp);
    d.setHours(0, 0, 0, 0);
    return d.getTime();
  }));

  const checkDate = new Date(today);
  while (reviewedDates.has(checkDate.getTime())) {
    streak++;
    checkDate.setDate(checkDate.getDate() - 1);
  }

  return {
    learned,
    mastered,
    totalReviews,
    accuracy,
    streak,
    favoritesCount: favorites.length,
    dueCount: allProgress.filter(p => p.nextReviewAt <= new Date() && p.status !== 'mastered').length,
    totalXP: allProgress.reduce((sum, p) => sum + p.xp, 0),
  };
}

// Initialize default progress for all phrases
export async function initializeProgress(phraseIds: string[]): Promise<void> {
  const db = await getDB();
  const existing = await db.getAll('progress');
  const existingIds = new Set(existing.map(p => p.phraseId));
  
  for (const id of phraseIds) {
    if (!existingIds.has(id)) {
      await db.put('progress', {
        phraseId: id,
        status: 'new' as const,
        repetitions: 0,
        correctAnswers: 0,
        incorrectAnswers: 0,
        ease: 2.5,
        interval: 0,
        dueDate: new Date(),
        lastReviewed: null,
        nextReviewAt: new Date(),
        xp: 0,
      });
    }
  }
}
