import { describe, it, expect, beforeEach, vi } from 'vitest';
import {
  getWordHistory,
  addWordToHistory,
  getUsedWords,
  getAllUsedWords,
  clearWordHistory,
  getWordHistoryStats,
} from '../../utils/wordHistory';

// Create a proper in-memory localStorage implementation
class LocalStorageMock implements Storage {
  private store: Record<string, string> = {};

  get length(): number {
    return Object.keys(this.store).length;
  }

  clear(): void {
    this.store = {};
  }

  getItem(key: string): string | null {
    return this.store[key] || null;
  }

  setItem(key: string, value: string): void {
    this.store[key] = value;
  }

  removeItem(key: string): void {
    delete this.store[key];
  }

  key(index: number): string | null {
    const keys = Object.keys(this.store);
    return keys[index] || null;
  }
}

describe('Word History', () => {
  beforeEach(() => {
    // Replace localStorage with our working mock
    globalThis.localStorage = new LocalStorageMock() as Storage;
  });

  describe('getWordHistory', () => {
    it('should return empty history when no data exists', () => {
      const history = getWordHistory();
      expect(history.entries).toEqual([]);
      expect(history.lastCleanup).toBeDefined();
    });

    it('should return existing history from localStorage', () => {
      const mockHistory = {
        entries: [
          {
            word: 'Titanic',
            timestamp: Date.now(),
            category: 'Movies',
            difficulty: 'easy',
          },
        ],
        lastCleanup: Date.now(),
      };
      localStorage.setItem('charades_word_history', JSON.stringify(mockHistory));

      const history = getWordHistory();
      expect(history.entries).toHaveLength(1);
      expect(history.entries[0].word).toBe('Titanic');
    });

    it('should auto-cleanup entries older than 7 days', () => {
      const now = Date.now();
      const eightDaysAgo = now - 8 * 24 * 60 * 60 * 1000;
      const twoDaysAgo = now - 2 * 24 * 60 * 60 * 1000;

      const mockHistory = {
        entries: [
          {
            word: 'OldWord',
            timestamp: eightDaysAgo,
            category: 'Movies',
            difficulty: 'easy',
          },
          {
            word: 'RecentWord',
            timestamp: twoDaysAgo,
            category: 'Movies',
            difficulty: 'easy',
          },
        ],
        lastCleanup: now - 25 * 60 * 60 * 1000, // 25 hours ago (triggers cleanup)
      };
      localStorage.setItem('charades_word_history', JSON.stringify(mockHistory));

      const history = getWordHistory();
      expect(history.entries).toHaveLength(1);
      expect(history.entries[0].word).toBe('RecentWord');
    });

    it('should not cleanup if less than 24 hours since last cleanup', () => {
      const now = Date.now();
      const eightDaysAgo = now - 8 * 24 * 60 * 60 * 1000;

      const mockHistory = {
        entries: [
          {
            word: 'OldWord',
            timestamp: eightDaysAgo,
            category: 'Movies',
            difficulty: 'easy',
          },
        ],
        lastCleanup: now - 12 * 60 * 60 * 1000, // 12 hours ago (no cleanup)
      };
      localStorage.setItem('charades_word_history', JSON.stringify(mockHistory));

      const history = getWordHistory();
      // Old word should still be there since cleanup didn't run
      expect(history.entries).toHaveLength(1);
      expect(history.entries[0].word).toBe('OldWord');
    });
  });

  describe('addWordToHistory', () => {
    it('should add a new word to empty history', () => {
      addWordToHistory('Avatar', 'Movies', 'medium');

      const history = getWordHistory();
      expect(history.entries).toHaveLength(1);
      expect(history.entries[0].word).toBe('Avatar');
      expect(history.entries[0].category).toBe('Movies');
      expect(history.entries[0].difficulty).toBe('medium');
    });

    it('should update timestamp when word already exists', () => {
      const oldTimestamp = Date.now() - 1000;
      const mockHistory = {
        entries: [
          {
            word: 'Titanic',
            timestamp: oldTimestamp,
            category: 'Movies',
            difficulty: 'easy',
          },
        ],
        lastCleanup: Date.now(),
      };
      localStorage.setItem('charades_word_history', JSON.stringify(mockHistory));

      addWordToHistory('Titanic', 'Movies', 'easy');

      const history = getWordHistory();
      expect(history.entries).toHaveLength(1);
      expect(history.entries[0].timestamp).toBeGreaterThan(oldTimestamp);
    });

    it('should add multiple words', () => {
      addWordToHistory('Avatar', 'Movies', 'medium');
      addWordToHistory('Running', 'Actions', 'easy');
      addWordToHistory('Lion', 'Animals', 'easy');

      const history = getWordHistory();
      expect(history.entries).toHaveLength(3);
    });
  });

  describe('getUsedWords', () => {
    beforeEach(() => {
      addWordToHistory('Titanic', 'Movies', 'easy');
      addWordToHistory('Avatar', 'Movies', 'medium');
      addWordToHistory('Inception', 'Movies', 'hard');
      addWordToHistory('Running', 'Actions', 'easy');
      addWordToHistory('Lion', 'Animals', 'easy');
    });

    it('should return only words matching category and difficulty', () => {
      const words = getUsedWords('Movies', 'easy');
      expect(words).toEqual(['Titanic']);
    });

    it('should return empty array when no matches', () => {
      const words = getUsedWords('Places', 'easy');
      expect(words).toEqual([]);
    });

    it('should handle multiple words in same category/difficulty', () => {
      addWordToHistory('Jaws', 'Movies', 'easy');
      const words = getUsedWords('Movies', 'easy');
      expect(words).toHaveLength(2);
      expect(words).toContain('Titanic');
      expect(words).toContain('Jaws');
    });
  });

  describe('getAllUsedWords', () => {
    it('should return empty array when no history', () => {
      const words = getAllUsedWords();
      expect(words).toEqual([]);
    });

    it('should return all words from all categories', () => {
      addWordToHistory('Titanic', 'Movies', 'easy');
      addWordToHistory('Running', 'Actions', 'easy');
      addWordToHistory('Lion', 'Animals', 'easy');

      const words = getAllUsedWords();
      expect(words).toHaveLength(3);
      expect(words).toContain('Titanic');
      expect(words).toContain('Running');
      expect(words).toContain('Lion');
    });
  });

  describe('clearWordHistory', () => {
    it('should remove all history from localStorage', () => {
      addWordToHistory('Titanic', 'Movies', 'easy');
      addWordToHistory('Running', 'Actions', 'easy');

      clearWordHistory();

      const history = getWordHistory();
      expect(history.entries).toEqual([]);
    });

    it('should not throw error when clearing empty history', () => {
      expect(() => clearWordHistory()).not.toThrow();
    });
  });

  describe('getWordHistoryStats', () => {
    it('should return correct stats for empty history', () => {
      const stats = getWordHistoryStats();
      expect(stats.totalWords).toBe(0);
      expect(stats.oldestTimestamp).toBeNull();
      expect(stats.newestTimestamp).toBeNull();
      expect(stats.categoryCounts).toEqual({});
    });

    it('should return correct stats for single word', () => {
      addWordToHistory('Titanic', 'Movies', 'easy');

      const stats = getWordHistoryStats();
      expect(stats.totalWords).toBe(1);
      expect(stats.oldestTimestamp).toBeDefined();
      expect(stats.newestTimestamp).toBeDefined();
      expect(stats.categoryCounts['Movies (easy)']).toBe(1);
    });

    it('should return correct stats for multiple words', () => {
      addWordToHistory('Titanic', 'Movies', 'easy');
      addWordToHistory('Avatar', 'Movies', 'easy');
      addWordToHistory('Inception', 'Movies', 'hard');
      addWordToHistory('Running', 'Actions', 'easy');

      const stats = getWordHistoryStats();
      expect(stats.totalWords).toBe(4);
      expect(stats.categoryCounts['Movies (easy)']).toBe(2);
      expect(stats.categoryCounts['Movies (hard)']).toBe(1);
      expect(stats.categoryCounts['Actions (easy)']).toBe(1);
    });

    it('should calculate oldest and newest timestamps correctly', () => {
      const now = Date.now();

      // Manually set timestamps to test ordering
      const history = getWordHistory();
      history.entries = [
        {
          word: 'OldWord',
          timestamp: now - 1000,
          category: 'Movies',
          difficulty: 'easy',
        },
        {
          word: 'NewWord',
          timestamp: now,
          category: 'Movies',
          difficulty: 'easy',
        },
      ];
      localStorage.setItem('charades_word_history', JSON.stringify(history));

      const stats = getWordHistoryStats();
      expect(stats.oldestTimestamp).toBe(now - 1000);
      expect(stats.newestTimestamp).toBe(now);
    });
  });

  describe('error handling', () => {
    it('should handle corrupted localStorage data gracefully', () => {
      localStorage.setItem('charades_word_history', 'invalid json');

      const history = getWordHistory();
      expect(history.entries).toEqual([]);
      expect(history.lastCleanup).toBeDefined();
    });

    it('should handle localStorage errors when saving', () => {
      // Mock localStorage.setItem to throw an error
      const setItemSpy = vi.spyOn(Storage.prototype, 'setItem');
      setItemSpy.mockImplementation(() => {
        throw new Error('QuotaExceededError');
      });

      // Should not throw even if localStorage fails
      expect(() => addWordToHistory('Test', 'Movies', 'easy')).not.toThrow();

      setItemSpy.mockRestore();
    });
  });
});
