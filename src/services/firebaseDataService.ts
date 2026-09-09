import { 
  doc, 
  setDoc, 
  getDoc, 
  collection, 
  query, 
  where, 
  getDocs,
  deleteDoc,
  Timestamp
} from 'firebase/firestore';
import { db } from './firebase';
import { PhraseProgress, ReviewLogEntry, UserSettings } from './storageService';

export const firebaseDataService = {
  // ============ PROGRESS ============
  
  // ذخیره پیشرفت یک عبارت
  async saveProgress(userId: string, progress: PhraseProgress): Promise<void> {
    const docRef = doc(db, 'users', userId, 'progress', progress.phraseId);
    await setDoc(docRef, {
      ...progress,
      dueDate: Timestamp.fromDate(progress.dueDate),
      lastReviewed: progress.lastReviewed ? Timestamp.fromDate(progress.lastReviewed) : null,
      nextReviewAt: Timestamp.fromDate(progress.nextReviewAt)
    });
  },

  // دریافت پیشرفت یک عبارت
  async getProgress(userId: string, phraseId: string): Promise<PhraseProgress | null> {
    const docRef = doc(db, 'users', userId, 'progress', phraseId);
    const docSnap = await getDoc(docRef);
    
    if (!docSnap.exists()) return null;
    
    const data = docSnap.data();
    return {
      ...data,
      dueDate: data.dueDate.toDate(),
      lastReviewed: data.lastReviewed ? data.lastReviewed.toDate() : null,
      nextReviewAt: data.nextReviewAt.toDate()
    } as PhraseProgress;
  },

  // دریافت تمام پیشرفت‌های کاربر
  async getAllProgress(userId: string): Promise<PhraseProgress[]> {
    const q = query(collection(db, 'users', userId, 'progress'));
    const querySnapshot = await getDocs(q);
    
    return querySnapshot.docs.map(docSnap => {
      const data = docSnap.data();
      return {
        ...data,
        dueDate: data.dueDate.toDate(),
        lastReviewed: data.lastReviewed ? data.lastReviewed.toDate() : null,
        nextReviewAt: data.nextReviewAt.toDate()
      } as PhraseProgress;
    });
  },

  // دریافت عبارات آماده مرور
  async getDuePhrases(userId: string): Promise<PhraseProgress[]> {
    const allProgress = await this.getAllProgress(userId);
    const now = new Date();
    return allProgress.filter(p => p.nextReviewAt <= now && p.status !== 'mastered');
  },

  // ============ FAVORITES ============
  
  // اضافه کردن به علاقه‌مندی‌ها
  async addFavorite(userId: string, phraseId: string): Promise<void> {
    const docRef = doc(db, 'users', userId, 'favorites', phraseId);
    await setDoc(docRef, {
      phraseId,
      addedAt: Timestamp.fromDate(new Date())
    });
  },

  // حذف از علاقه‌مندی‌ها
  async removeFavorite(userId: string, phraseId: string): Promise<void> {
    const docRef = doc(db, 'users', userId, 'favorites', phraseId);
    await deleteDoc(docRef);
  },

  // بررسی علاقه‌مندی بودن
  async isFavorite(userId: string, phraseId: string): Promise<boolean> {
    const docRef = doc(db, 'users', userId, 'favorites', phraseId);
    const docSnap = await getDoc(docRef);
    return docSnap.exists();
  },

  // دریافت تمام علاقه‌مندی‌ها
  async getAllFavorites(userId: string): Promise<string[]> {
    const q = query(collection(db, 'users', userId, 'favorites'));
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(docSnap => docSnap.id);
  },

  // ============ SETTINGS ============
  
  // ذخیره تنظیمات
  async saveSettings(userId: string, settings: UserSettings): Promise<void> {
    const docRef = doc(db, 'users', userId, 'settings', 'userSettings');
    await setDoc(docRef, settings);
  },

  // دریافت تنظیمات
  async getSettings(userId: string): Promise<UserSettings | null> {
    const docRef = doc(db, 'users', userId, 'settings', 'userSettings');
    const docSnap = await getDoc(docRef);
    return docSnap.exists() ? docSnap.data() as UserSettings : null;
  },

  // ============ REVIEW LOG ============
  
  // ذخیره لاگ مرور
  async addReviewLog(userId: string, entry: ReviewLogEntry): Promise<void> {
    const docRef = doc(db, 'users', userId, 'reviewLog', entry.id);
    await setDoc(docRef, {
      ...entry,
      timestamp: Timestamp.fromDate(entry.timestamp)
    });
  },

  // دریافت لاگ‌های مرور
  async getReviewLogs(userId: string, days: number = 7): Promise<ReviewLogEntry[]> {
    const q = query(collection(db, 'users', userId, 'reviewLog'));
    const querySnapshot = await getDocs(q);
    
    const cutoff = new Date();
    cutoff.setDate(cutoff.getDate() - days);
    
    return querySnapshot.docs
      .map(docSnap => {
        const data = docSnap.data();
        return {
          ...data,
          timestamp: data.timestamp.toDate()
        } as ReviewLogEntry;
      })
      .filter(entry => entry.timestamp >= cutoff);
  },

  // ============ STATS ============
  
  // دریافت آمار کاربر
  async getStats(userId: string) {
    const allProgress = await this.getAllProgress(userId);
    const favorites = await this.getAllFavorites(userId);
    const logs = await this.getReviewLogs(userId, 7);
    
    const learned = allProgress.filter(p => p.status !== 'new').length;
    const mastered = allProgress.filter(p => p.status === 'mastered').length;
    const totalReviews = logs.length;
    const correctReviews = logs.filter(l => l.wasCorrect).length;
    const accuracy = totalReviews > 0 ? Math.round((correctReviews / totalReviews) * 100) : 0;

    // محاسبه streak
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
  },

  // ============ MIGRATION ============
  
  // مهاجرت داده‌ها از IndexedDB به Firestore
  async migrateFromIndexedDB(
    userId: string,
    progress: PhraseProgress[],
    favorites: string[],
    settings: UserSettings
  ): Promise<void> {
    // مهاجرت پیشرفت
    for (const p of progress) {
      await this.saveProgress(userId, p);
    }

    // مهاجرت علاقه‌مندی‌ها
    for (const phraseId of favorites) {
      await this.addFavorite(userId, phraseId);
    }

    // مهاجرت تنظیمات
    await this.saveSettings(userId, settings);
  }
};
