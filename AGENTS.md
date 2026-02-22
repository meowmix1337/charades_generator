# AGENTS.md

## Project Overview

**Charades Generator** is a client-side React + TypeScript web application for playing charades. Players create teams, select word categories and difficulty levels, and play timed rounds with score tracking. There is no backend — all state is managed in-browser via React Context and persisted to localStorage.

**Version:** 0.0.4 (active development)

## Tech Stack

- **Language:** TypeScript 5.7 (strict mode)
- **Framework:** React 18 with functional components and hooks
- **UI Library:** Material-UI (MUI) 5 with Emotion CSS-in-JS
- **Build Tool:** Vite 6
- **Test Runner:** Vitest 2 with @testing-library/react
- **Linter:** ESLint 9 with typescript-eslint and react-hooks plugin
- **CI:** GitHub Actions (Node 18.x and 20.x matrix)

## Commands

```bash
npm run dev            # Start dev server (localhost:5173)
npm run build          # TypeScript compile + Vite production build
npm run lint           # ESLint on all TS/TSX files
npm test               # Run all tests once
npm run test:watch     # Watch mode
npm run test:coverage  # Coverage report (text, JSON, HTML)
```

**CI pipeline** (`.github/workflows/ci.yml`): On push/PR to `main`, runs `npm ci` → `npm run lint` → `npm test` → `npm run build`. All must pass.

## Architecture

### State Management

Uses React Context + `useReducer` (Redux-like pattern):

- **`src/context/GameContext.tsx`** — Game state provider and reducer. All game logic flows through typed actions dispatched to this reducer.
- **`src/context/ThemeContext.tsx`** — Light/dark theme with system preference detection.

Game state shape is defined in `src/types/game.types.ts`. The `GameState.status` field (`setup` | `countdown` | `playing` | `paused` | `round-end` | `game-over`) drives which component renders — see `GameRouter` in `src/App.tsx`.

### Component Structure

```
App.tsx                              # Root: ThemeContext → MUI ThemeProvider → GameProvider
├── GameSetup/GameSetup.tsx          # Team creation, category/difficulty/timer/rounds config
├── GamePlay/Countdown.tsx           # 3-2-1-START countdown before each turn
├── GamePlay/ActiveRound.tsx         # Main gameplay: timer, word display, skip/correct buttons
├── GameSummary/GameSummary.tsx      # End-game results, winner announcement
└── common/
    ├── ResetButton.tsx              # Reset with confirmation dialog
    ├── VersionFooter.tsx            # Version display + theme toggle
    └── ChangelogDialog.tsx          # Changelog modal (renders CHANGELOG.md via react-markdown)
```

### Custom Hooks

- **`useTimer`** (`src/hooks/useTimer.ts`) — Countdown timer with pause/resume
- **`useWordSelector`** (`src/hooks/useWordSelector.ts`) — Random word selection with history deduplication

### Key Utilities

- **`src/utils/audioUtils.ts`** — Procedurally generated sound effects via Web Audio API (no audio files)
- **`src/utils/wordHistory.ts`** — localStorage-based word history to prevent repeats across sessions
- **`src/utils/version.ts`** — Build metadata (version, date, git hash injected by Vite)

### Data

- **`src/data/wordDatabase.ts`** — ~1,300 words across 6 categories (Movies, Actions, Animals, Objects, Famous People, Places) and 3 difficulty levels
- **IMPORTANT:** When modifying `src/data/wordDatabase.ts`, always update `src/data/AGENTS.md` to reflect the changes (e.g., updated word counts, new/removed categories, changed line ranges).

### localStorage Keys

- `charades_game_state` — Persisted game state (JSON)
- `charades_word_history` — Word history with timestamps (JSON)
- `charades_theme_mode` — Theme preference (`light` | `dark` | `system`)

## Commit Convention

Every change should be committed with a small, focused commit using this format:

```
{category}: {message}
```

**Categories:**

| Category | Use when |
|-----------|----------|
| `fix` | Bug fixes |
| `feat` | New features or functionality |
| `word-bank` | Adding, removing, or modifying words in `src/data/wordDatabase.ts` |
| `ci` | CI/CD pipeline changes |
| `agent` | Changes to `AGENTS.md` files |
| `chore` | Refactoring, dependency updates, config changes, and other maintenance |

**Examples:**

- `word-bank: remove extinct animals from hard difficulty`
- `feat: add pause button to active round`
- `fix: prevent duplicate words within same session`
- `agent: update line ranges in src/data/AGENTS.md`
- `ci: add Node 22.x to test matrix`
- `chore: update vite to v7`

Keep commits small and atomic — one logical change per commit.

## Code Conventions

- **Functional components only** — no class components
- **Strict TypeScript** — no `any`, no unused variables (prefix with `_` if intentionally unused)
- **Named exports** for components (not default exports, except `App`)
- **PascalCase** for components and types, **camelCase** for functions and utilities, **UPPER_SNAKE_CASE** for constants
- **Feature-based component directories** — `GameSetup/`, `GamePlay/`, `GameSummary/`, `common/`
- **Event handlers** prefixed with `handle` (e.g., `handleSkip`, `handleCorrect`)
- **Discriminated unions** for reducer action types

## Testing

- Tests live in `src/__tests__/` mirroring the source structure
- Test files use `*.test.ts` / `*.test.tsx` naming
- Vitest globals enabled — no need to import `describe`/`it`/`expect`
- jsdom environment for browser API simulation
- localStorage and Web Audio API are mocked in `src/test/setup.ts`
- Coverage excludes: `node_modules/`, `src/test/`, `*.d.ts`, `*.config.*`, `dist/`

## File Layout

```
src/
├── __tests__/          # Test suites
├── components/         # React components (feature-grouped)
├── context/            # React Context providers + reducers
├── data/               # Static data (word database)
├── hooks/              # Custom React hooks
├── test/               # Test setup/config
├── theme/              # MUI theme configuration
├── types/              # TypeScript type definitions
├── utils/              # Utility functions
├── App.tsx             # Root component
└── main.tsx            # Entry point
```

## CI/CD

- **GitHub Actions** on push/PR to `main`
- Node 18.x and 20.x matrix
- Steps: install → lint → test → build
- Build artifacts uploaded (Node 20.x only, 7-day retention)
- Code owner: `@meowmix1337`
