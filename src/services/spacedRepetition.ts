import { PhraseProgress, ReviewLogEntry, saveProgress, addReviewLog, getProgress } from './storageService';

export type Rating = 'again' | 'hard' | 'good' | 'easy';

interface SRResult {
  progress: PhraseProgress;
  logEntry: ReviewLogEntry;
  xpEarned: number;
}

/**
 * SM-2 inspired spaced repetition algorithm
 * Adapted for phrase learning with 4 rating options
 */
export function calculateNextReview(
  current: PhraseProgress,
  rating: Rating
): SRResult {
  const now = new Date();
  let { ease, interval, repetitions, correctAnswers, incorrectAnswers, status } = current;
  
  const wasCorrect = rating !== 'again';
  let xpEarned = 0;

  switch (rating) {
    case 'again':
      // Reset - review in a few minutes
      repetitions = 0;
      interval = 0;
      ease = Math.max(1.3, ease - 0.2);
      incorrectAnswers++;
      xpEarned = 2;
      status = 'learning';
      break;

    case 'hard':
      // Short interval
      if (repetitions === 0) {
        interval = 1; // 1 minute
      } else if (repetitions === 1) {
        interval = 6; // 6 minutes
      } else {
        interval = Math.max(1, Math.round(interval * 1.2));
      }
      ease = Math.max(1.3, ease - 0.15);
      repetitions++;
      correctAnswers++;
      xpEarned = 5;
      status = repetitions >= 3 ? 'review' : 'learning';
      break;

    case 'good':
      // Normal interval
      if (repetitions === 0) {
        interval = 1; // 1 minute
      } else if (repetitions === 1) {
        interval = 10; // 10 minutes
      } else if (repetitions === 2) {
        interval = 1440; // 1 day (in minutes)
      } else {
        interval = Math.round(interval * ease);
      }
      repetitions++;
      correctAnswers++;
      xpEarned = 10;
      status = repetitions >= 3 ? 'review' : 'learning';
      break;

    case 'easy':
      // Longer interval
      if (repetitions === 0) {
        interval = 4; // 4 minutes
      } else if (repetitions === 1) {
        interval = 60; // 1 hour
      } else if (repetitions === 2) {
        interval = 4320; // 3 days
      } else {
        interval = Math.round(interval * ease * 1.3);
      }
      ease = Math.min(3.0, ease + 0.1);
      repetitions++;
      correctAnswers++;
      xpEarned = 15;
      status = repetitions >= 2 ? 'review' : 'learning';
      break;
  }

  // Check if mastered (high ease, many repetitions, long interval)
  if (repetitions >= 5 && ease >= 2.5 && interval >= 21) {
    status = 'mastered';
    xpEarned += 20;
  }

  // Calculate next review date
  const nextReviewAt = new Date(now.getTime() + interval * 60 * 1000);

  const updatedProgress: PhraseProgress = {
    ...current,
    ease,
    interval,
    repetitions,
    correctAnswers,
    incorrectAnswers,
    status,
    lastReviewed: now,
    nextReviewAt,
    dueDate: nextReviewAt,
    xp: current.xp + xpEarned,
  };

  const logEntry: ReviewLogEntry = {
    id: `${current.phraseId}_${now.getTime()}`,
    phraseId: current.phraseId,
    rating,
    timestamp: now,
    wasCorrect,
  };

  return { progress: updatedProgress, logEntry, xpEarned };
}

/**
 * Process a review and save results
 */
export async function processReview(
  phraseId: string,
  rating: Rating
): Promise<SRResult> {
  let current = await getProgress(phraseId);
  
  if (!current) {
    current = {
      phraseId,
      status: 'new',
      repetitions: 0,
      correctAnswers: 0,
      incorrectAnswers: 0,
      ease: 2.5,
      interval: 0,
      dueDate: new Date(),
      lastReviewed: null,
      nextReviewAt: new Date(),
      xp: 0,
    };
  }

  const result = calculateNextReview(current, rating);
  
  await saveProgress(result.progress);
  await addReviewLog(result.logEntry);

  return result;
}

/**
 * Get XP for a rating without saving
 */
export function getXpForRating(rating: Rating): number {
  switch (rating) {
    case 'again': return 2;
    case 'hard': return 5;
    case 'good': return 10;
    case 'easy': return 15;
  }
}
