import { useCallback } from 'react';
import { useGame } from '../context/GameContext';
import { getCategoryWords } from '../data/wordDatabase';

export function useWordSelector() {
  const { state } = useGame();

  const selectRandomWord = useCallback((): string => {
    const { category, difficulty } = state.settings;
    const availableWords = getCategoryWords(category, difficulty).filter(
      (word) => !state.usedWords.includes(word)
    );

    // If all words have been used, reset and start over
    if (availableWords.length === 0) {
      const allWords = getCategoryWords(category, difficulty);
      const randomIndex = Math.floor(Math.random() * allWords.length);
      return allWords[randomIndex];
    }

    const randomIndex = Math.floor(Math.random() * availableWords.length);
    return availableWords[randomIndex];
  }, [state.settings, state.usedWords]);

  return {
    selectRandomWord,
  };
}
