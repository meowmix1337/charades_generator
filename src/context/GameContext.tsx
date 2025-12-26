import React, { createContext, useContext, useReducer, useEffect, ReactNode } from 'react';
import { GameState, GameAction } from '../types/game.types';

const STORAGE_KEY = 'charades_game_state';

const initialState: GameState = {
  status: 'setup',
  teams: [],
  currentTeamIndex: 0,
  currentRound: 1,
  totalRounds: 5,
  settings: {
    category: 'Movies',
    difficulty: 'medium',
    timerDuration: 120, // 2 minutes default
  },
  usedWords: [],
  currentWord: null,
  timeRemaining: 120,
};

function gameReducer(state: GameState, action: GameAction): GameState {
  switch (action.type) {
    case 'START_GAME':
      return {
        ...state,
        status: 'setup',
        teams: action.payload.teams,
        settings: action.payload.settings,
        totalRounds: action.payload.totalRounds,
        currentTeamIndex: 0,
        currentRound: 1,
        usedWords: [],
        currentWord: null,
        timeRemaining: action.payload.settings.timerDuration,
      };

    case 'START_COUNTDOWN':
      return {
        ...state,
        status: 'countdown',
      };

    case 'START_TIMER':
      return {
        ...state,
        status: 'playing',
        currentWord: action.payload.word,
        usedWords: [...state.usedWords, action.payload.word],
        timeRemaining: state.settings.timerDuration,
      };

    case 'TICK':
      return {
        ...state,
        timeRemaining: Math.max(0, state.timeRemaining - 1),
      };

    case 'PAUSE_TIMER':
      return {
        ...state,
        status: 'paused',
      };

    case 'RESUME_TIMER':
      return {
        ...state,
        status: 'playing',
      };

    case 'SKIP_WORD':
      return {
        ...state,
        currentWord: action.payload.nextWord,
        usedWords: [...state.usedWords, action.payload.nextWord],
      };

    case 'ADD_POINT': {
      const updatedTeams = state.teams.map((team, index) =>
        index === state.currentTeamIndex
          ? { ...team, score: team.score + 1 }
          : team
      );
      return {
        ...state,
        teams: updatedTeams,
        currentWord: action.payload.nextWord,
        usedWords: [...state.usedWords, action.payload.nextWord],
      };
    }

    case 'TIMER_EXPIRED':
      return {
        ...state,
        status: 'round-end',
        timeRemaining: 0,
      };

    case 'END_ROUND':
      return {
        ...state,
        status: 'round-end',
      };

    case 'NEXT_TEAM': {
      const nextTeamIndex = (state.currentTeamIndex + 1) % state.teams.length;
      const isNewRound = nextTeamIndex === 0;
      return {
        ...state,
        status: 'countdown',
        currentTeamIndex: nextTeamIndex,
        currentRound: isNewRound ? state.currentRound + 1 : state.currentRound,
        currentWord: null,
        timeRemaining: state.settings.timerDuration,
      };
    }

    case 'END_GAME':
      return {
        ...state,
        status: 'game-over',
      };

    case 'RESET_GAME':
      localStorage.removeItem(STORAGE_KEY);
      return initialState;

    case 'RESTORE_STATE':
      return action.payload;

    default:
      return state;
  }
}

interface GameContextType {
  state: GameState;
  dispatch: React.Dispatch<GameAction>;
}

const GameContext = createContext<GameContextType | undefined>(undefined);

export function GameProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(gameReducer, initialState, (initial) => {
    // Try to restore state from localStorage
    const savedState = localStorage.getItem(STORAGE_KEY);
    if (savedState) {
      try {
        return JSON.parse(savedState);
      } catch (e) {
        console.error('Failed to parse saved game state:', e);
        return initial;
      }
    }
    return initial;
  });

  // Save state to localStorage whenever it changes
  useEffect(() => {
    if (state.status !== 'setup') {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    }
  }, [state]);

  return (
    <GameContext.Provider value={{ state, dispatch }}>
      {children}
    </GameContext.Provider>
  );
}

export function useGame() {
  const context = useContext(GameContext);
  if (context === undefined) {
    throw new Error('useGame must be used within a GameProvider');
  }
  return context;
}
