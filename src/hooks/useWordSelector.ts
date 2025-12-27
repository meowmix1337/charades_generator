import { useCallback } from 'react';
import { useGame } from '../context/GameContext';
import { getCategoryWords } from '../data/wordDatabase';
import { getUsedWords, addWordToHistory } from '../utils/wordHistory';

export function useWordSelector() {
  const { state } = useGame();

  const selectRandomWord = useCallback((): string => {
    const { category, difficulty } = state.settings;

    // Get words used in current session AND from localStorage history
    const historyWords = getUsedWords(category, difficulty);
    const sessionWords = state.usedWords;
    const allUsedWords = [...new Set([...historyWords, ...sessionWords])];

    const availableWords = getCategoryWords(category, difficulty).filter(
      (word) => !allUsedWords.includes(word)
    );

    // Select a word
    let selectedWord: string;
    if (availableWords.length === 0) {
      // If all words have been used, select from full list
      const allWords = getCategoryWords(category, difficulty);
      const randomIndex = Math.floor(Math.random() * allWords.length);
      selectedWord = allWords[randomIndex];
    } else {
      const randomIndex = Math.floor(Math.random() * availableWords.length);
      selectedWord = availableWords[randomIndex];
    }

    // Add to persistent history
    addWordToHistory(selectedWord, category, difficulty);

    return selectedWord;
  }, [state.settings, state.usedWords]);

  return {
    selectRandomWord,
  };
}
