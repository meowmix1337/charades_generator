interface WordHistoryEntry {
  word: string;
  timestamp: number;
  category: string;
  difficulty: string;
}

interface WordHistory {
  entries: WordHistoryEntry[];
  lastCleanup: number;
}

const STORAGE_KEY = 'charades_word_history';
const HISTORY_RETENTION_DAYS = 7;
const CLEANUP_INTERVAL_HOURS = 24;

/**
 * Get word history from localStorage and clean up old entries
 */
export function getWordHistory(): WordHistory {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) {
      return { entries: [], lastCleanup: Date.now() };
    }

    const history: WordHistory = JSON.parse(stored);

    // Check if cleanup is needed (once per day)
    const hoursSinceCleanup = (Date.now() - history.lastCleanup) / (1000 * 60 * 60);
    if (hoursSinceCleanup >= CLEANUP_INTERVAL_HOURS) {
      return cleanupWordHistory(history);
    }

    return history;
  } catch (error) {
    console.error('Error reading word history:', error);
    return { entries: [], lastCleanup: Date.now() };
  }
}

/**
 * Remove entries older than 7 days
 */
function cleanupWordHistory(history: WordHistory): WordHistory {
  const cutoffTime = Date.now() - (HISTORY_RETENTION_DAYS * 24 * 60 * 60 * 1000);
  const cleanedEntries = history.entries.filter(entry => entry.timestamp > cutoffTime);

  const cleanedHistory: WordHistory = {
    entries: cleanedEntries,
    lastCleanup: Date.now(),
  };

  saveWordHistory(cleanedHistory);
  return cleanedHistory;
}

/**
 * Save word history to localStorage
 */
function saveWordHistory(history: WordHistory): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(history));
  } catch (error) {
    console.error('Error saving word history:', error);
  }
}

/**
 * Add a word to the history
 */
export function addWordToHistory(
  word: string,
  category: string,
  difficulty: string
): void {
  const history = getWordHistory();

  // Don't add duplicates
  const existingIndex = history.entries.findIndex(entry => entry.word === word);
  if (existingIndex !== -1) {
    // Update timestamp if word already exists
    history.entries[existingIndex].timestamp = Date.now();
  } else {
    // Add new entry
    history.entries.push({
      word,
      timestamp: Date.now(),
      category,
      difficulty,
    });
  }

  saveWordHistory(history);
}

/**
 * Get used words for a specific category and difficulty
 */
export function getUsedWords(category: string, difficulty: string): string[] {
  const history = getWordHistory();
  return history.entries
    .filter(entry => entry.category === category && entry.difficulty === difficulty)
    .map(entry => entry.word);
}

/**
 * Get all used words (for current game session)
 */
export function getAllUsedWords(): string[] {
  const history = getWordHistory();
  return history.entries.map(entry => entry.word);
}

/**
 * Clear all word history (manual reset)
 */
export function clearWordHistory(): void {
  localStorage.removeItem(STORAGE_KEY);
}

/**
 * Get statistics about word history
 */
export function getWordHistoryStats(): {
  totalWords: number;
  oldestTimestamp: number | null;
  newestTimestamp: number | null;
  categoryCounts: Record<string, number>;
} {
  const history = getWordHistory();

  const stats = {
    totalWords: history.entries.length,
    oldestTimestamp: history.entries.length > 0
      ? Math.min(...history.entries.map(e => e.timestamp))
      : null,
    newestTimestamp: history.entries.length > 0
      ? Math.max(...history.entries.map(e => e.timestamp))
      : null,
    categoryCounts: {} as Record<string, number>,
  };

  // Count words per category
  history.entries.forEach(entry => {
    const key = `${entry.category} (${entry.difficulty})`;
    stats.categoryCounts[key] = (stats.categoryCounts[key] || 0) + 1;
  });

  return stats;
}
