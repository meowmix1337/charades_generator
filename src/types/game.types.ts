export type GameStatus = 'setup' | 'countdown' | 'playing' | 'paused' | 'round-end' | 'game-over';

export type Difficulty = 'easy' | 'medium' | 'hard';

export interface Team {
  id: string;
  name: string;
  score: number;
}

export interface GameSettings {
  category: string;
  difficulty: Difficulty;
  timerDuration: number; // in seconds
}

export interface GameState {
  status: GameStatus;
  teams: Team[];
  currentTeamIndex: number;
  currentRound: number;
  totalRounds: number;
  settings: GameSettings;
  usedWords: string[];
  currentWord: string | null;
  timeRemaining: number; // in seconds
}

export interface WordDatabase {
  [category: string]: {
    easy: string[];
    medium: string[];
    hard: string[];
  };
}

export type GameAction =
  | { type: 'START_GAME'; payload: { teams: Team[]; settings: GameSettings; totalRounds: number } }
  | { type: 'START_COUNTDOWN' }
  | { type: 'START_TIMER'; payload: { word: string } }
  | { type: 'TICK' }
  | { type: 'PAUSE_TIMER' }
  | { type: 'RESUME_TIMER' }
  | { type: 'SKIP_WORD'; payload: { nextWord: string } }
  | { type: 'ADD_POINT'; payload: { nextWord: string } }
  | { type: 'TIMER_EXPIRED' }
  | { type: 'END_ROUND' }
  | { type: 'NEXT_TEAM' }
  | { type: 'END_GAME' }
  | { type: 'RESET_GAME' }
  | { type: 'RESTORE_STATE'; payload: GameState };
