# Charades Generator - Implementation Plan

## Project Overview
A React + TypeScript charades game application supporting up to 4 teams with customizable categories, difficulty levels, timers, and round management.

## Technical Stack
- **Framework**: React 18+ with TypeScript
- **Build Tool**: Vite (modern, fast dev experience)
- **Styling**: CSS Modules or Tailwind CSS
- **State Management**: React Context API + useReducer
- **Persistence**: localStorage for game state
- **Audio**: Web Audio API for timer alarm

## Core Features

### 1. Game Setup
- Configure 1-4 teams with custom names
- Select category (Movies, Actions, Animals, Objects, Famous People, etc.)
- Choose difficulty (Easy, Medium, Hard)
- Set timer duration (default 2 minutes, customizable)
- Set total rounds for the game
- Game state persists in localStorage

### 2. Round Flow
- Manual round progression (players decide when round ends)
- 3-2-1-Start countdown before timer begins
- During active timer:
  - Display current word/topic
  - SKIP button (no penalty, shows next word)
  - CORRECT button (adds point to current team, shows next word)
  - Timer countdown display
  - Pause/resume functionality (optional)
- Timer expiration triggers alarm sound
- No word repeats within a game session

### 3. Game Summary
- Display at game end (when all rounds completed or manually ended)
- Show total points per team
- Declare winner(s)
- Option to start new game

## Data Models

### Game State
```typescript
interface GameState {
  status: 'setup' | 'countdown' | 'playing' | 'paused' | 'round-end' | 'game-over';
  teams: Team[];
  currentTeamIndex: number;
  currentRound: number;
  totalRounds: number;
  settings: GameSettings;
  usedWords: string[];
  currentWord: string | null;
  timeRemaining: number; // in seconds
}

interface Team {
  id: string;
  name: string;
  score: number;
}

interface GameSettings {
  category: string;
  difficulty: 'easy' | 'medium' | 'hard';
  timerDuration: number; // in seconds, default 120
}
```

### Word Database
```typescript
interface WordDatabase {
  [category: string]: {
    easy: string[];
    medium: string[];
    hard: string[];
  };
}
```

## Component Architecture

### Component Hierarchy
```
App
├── GameSetup
│   ├── TeamSetup
│   ├── CategorySelector
│   ├── DifficultySelector
│   └── TimerSettings
├── GamePlay
│   ├── Countdown (3-2-1-Start)
│   ├── ActiveRound
│   │   ├── Timer
│   │   ├── WordDisplay
│   │   └── Controls (Skip/Correct)
│   └── RoundEnd
└── GameSummary
    ├── ScoreBoard
    └── WinnerDisplay
```

### Key Components

**1. GameSetup**
- Form to configure teams (1-4), names
- Dropdowns for category, difficulty
- Input for timer duration and round count
- "Start Game" button

**2. Countdown**
- Full-screen 3-2-1-Start animation
- Auto-transitions to ActiveRound

**3. ActiveRound**
- Large word display
- Countdown timer with visual feedback
- SKIP button (gray/secondary)
- CORRECT button (green/primary)
- Current team indicator
- Current score display

**4. Timer**
- Visual countdown (MM:SS format)
- Progress bar or circular indicator
- Plays alarm when reaches 0
- Red warning when < 10 seconds

**5. GameSummary**
- Final scores for all teams
- Winner announcement
- "Play Again" button (returns to setup)

## Word Database Structure

### Initial Categories
1. **Movies** - Movie titles
2. **Actions** - Verbs and activities
3. **Animals** - Animal names
4. **Objects** - Everyday items
5. **Famous People** - Celebrities, historical figures
6. **Places** - Locations, landmarks

### Difficulty Levels
- **Easy**: Single words, common items (50+ words per category)
- **Medium**: 2-3 word phrases, moderate complexity (50+ words per category)
- **Hard**: Complex phrases, abstract concepts, harder to act out (50+ words per category)

## Implementation Steps

### Phase 1: Project Setup
1. Initialize Vite + React + TypeScript project
2. Set up folder structure
3. Install dependencies (if using Tailwind or other libs)
4. Create basic routing/navigation structure

### Phase 2: Word Database
1. Create word database file with all categories and difficulties
2. Implement word selection logic (random, no repeats)
3. Create utility functions for word management

### Phase 3: State Management
1. Create GameContext with useReducer
2. Define all actions (START_GAME, SKIP_WORD, ADD_POINT, END_ROUND, etc.)
3. Implement localStorage persistence hooks
4. Create custom hooks for game logic (useTimer, useWordSelector)

### Phase 4: Core Components
1. **GameSetup Component**
   - Team configuration UI
   - Settings form
   - Validation logic

2. **Countdown Component**
   - 3-2-1 animation
   - Auto-start timer

3. **ActiveRound Component**
   - Word display
   - Timer integration
   - Skip/Correct controls
   - Team indicator

4. **Timer Component**
   - Countdown logic with useEffect
   - Alarm sound (Web Audio API)
   - Visual states (normal/warning)

5. **GameSummary Component**
   - Score display
   - Winner calculation
   - New game option

### Phase 5: Polish & Features
1. Add sound effects (alarm, button clicks)
2. Implement responsive design (mobile-friendly)
3. Add animations and transitions
4. Error handling and edge cases
5. Testing across browsers

### Phase 6: Testing & Deployment
1. Manual testing of full game flow
2. Test localStorage persistence
3. Build production bundle
4. Optional: Deploy to Vercel/Netlify

## File Structure
```
charades_generator/
├── src/
│   ├── components/
│   │   ├── GameSetup/
│   │   │   ├── GameSetup.tsx
│   │   │   ├── TeamSetup.tsx
│   │   │   ├── CategorySelector.tsx
│   │   │   ├── DifficultySelector.tsx
│   │   │   └── TimerSettings.tsx
│   │   ├── GamePlay/
│   │   │   ├── Countdown.tsx
│   │   │   ├── ActiveRound.tsx
│   │   │   ├── Timer.tsx
│   │   │   ├── WordDisplay.tsx
│   │   │   └── Controls.tsx
│   │   ├── GameSummary/
│   │   │   ├── GameSummary.tsx
│   │   │   └── ScoreBoard.tsx
│   │   └── common/
│   │       └── Button.tsx
│   ├── context/
│   │   └── GameContext.tsx
│   ├── hooks/
│   │   ├── useTimer.ts
│   │   ├── useWordSelector.ts
│   │   └── useLocalStorage.ts
│   ├── data/
│   │   └── wordDatabase.ts
│   ├── types/
│   │   └── game.types.ts
│   ├── utils/
│   │   ├── audioUtils.ts
│   │   └── gameUtils.ts
│   ├── App.tsx
│   ├── main.tsx
│   └── index.css
├── public/
├── package.json
├── tsconfig.json
├── vite.config.ts
└── README.md
```

## Technical Considerations

### Timer Implementation
- Use `setInterval` with 1000ms interval
- Store start time and calculate remaining time to avoid drift
- Clear interval on component unmount
- Handle pause/resume if needed

### Word Selection Algorithm
```typescript
function selectWord(category: string, difficulty: string, usedWords: string[]): string {
  const availableWords = wordDatabase[category][difficulty]
    .filter(word => !usedWords.includes(word));

  if (availableWords.length === 0) {
    // All words used - either restart or show warning
    return selectWord(category, difficulty, []);
  }

  const randomIndex = Math.floor(Math.random() * availableWords.length);
  return availableWords[randomIndex];
}
```

### LocalStorage Schema
```typescript
const STORAGE_KEY = 'charades_game_state';

// Save state
localStorage.setItem(STORAGE_KEY, JSON.stringify(gameState));

// Load state
const savedState = localStorage.getItem(STORAGE_KEY);
const gameState = savedState ? JSON.parse(savedState) : initialState;
```

### Alarm Sound
- Generate tone using Web Audio API (no external files needed)
- Alternative: Use `<audio>` element with a simple beep sound file

## Edge Cases to Handle

1. **All words exhausted**: Reset used words list or show warning
2. **Browser refresh mid-game**: Restore from localStorage
3. **Timer running during page close**: Clear interval properly
4. **Invalid team count**: Validate 1-4 teams
5. **Zero timer duration**: Set minimum (e.g., 10 seconds)
6. **Manual round end with timer running**: Clear timer properly

## Future Enhancements (Optional)
- Custom word lists (user input)
- Multiplayer via WebSockets
- Game history/statistics
- More categories
- Difficulty-based scoring (harder words = more points)
- Mobile app version (React Native)

---

## Summary
This plan outlines a complete charades generator with all requested features. The implementation will use modern React patterns, TypeScript for type safety, and localStorage for persistence. The modular component structure allows for easy testing and future enhancements.
