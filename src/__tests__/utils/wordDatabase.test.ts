import { describe, it, expect } from 'vitest';
import { wordDatabase, getCategories, getCategoryWords } from '../../data/wordDatabase';

describe('Word Database', () => {
  describe('getCategories', () => {
    it('should return all available categories', () => {
      const categories = getCategories();
      expect(categories).toContain('Movies');
      expect(categories).toContain('Actions');
      expect(categories).toContain('Animals');
      expect(categories).toContain('Objects');
      expect(categories).toContain('Famous People');
      expect(categories).toContain('Places');
    });

    it('should return exactly 6 categories', () => {
      const categories = getCategories();
      expect(categories).toHaveLength(6);
    });
  });

  describe('getCategoryWords', () => {
    it('should return words for a valid category and difficulty', () => {
      const words = getCategoryWords('Movies', 'easy');
      expect(words).toBeDefined();
      expect(Array.isArray(words)).toBe(true);
      expect(words.length).toBeGreaterThan(0);
    });

    it('should return different words for different difficulties', () => {
      const easyWords = getCategoryWords('Movies', 'easy');
      const hardWords = getCategoryWords('Movies', 'hard');
      expect(easyWords).not.toEqual(hardWords);
    });

    it('should return empty array for invalid category', () => {
      const words = getCategoryWords('InvalidCategory', 'easy');
      expect(words).toEqual([]);
    });

    it('should have at least 50 words per category per difficulty', () => {
      const categories = getCategories();
      const difficulties = ['easy', 'medium', 'hard'] as const;

      categories.forEach((category) => {
        difficulties.forEach((difficulty) => {
          const words = getCategoryWords(category, difficulty);
          expect(words.length).toBeGreaterThanOrEqual(50);
        });
      });
    });
  });

  describe('wordDatabase structure', () => {
    it('should have all required difficulties for each category', () => {
      const categories = getCategories();

      categories.forEach((category) => {
        expect(wordDatabase[category]).toHaveProperty('easy');
        expect(wordDatabase[category]).toHaveProperty('medium');
        expect(wordDatabase[category]).toHaveProperty('hard');
      });
    });

    it('should not have duplicate words within a difficulty level', () => {
      const categories = getCategories();
      const difficulties = ['easy', 'medium', 'hard'] as const;

      categories.forEach((category) => {
        difficulties.forEach((difficulty) => {
          const words = getCategoryWords(category, difficulty);
          const uniqueWords = new Set(words);
          expect(uniqueWords.size).toBe(words.length);
        });
      });
    });
  });
});
