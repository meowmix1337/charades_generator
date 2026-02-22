# Data Directory — AGENTS.md

## Purpose

This directory contains the static word database used by the charades game. It is the single source of truth for all playable words.

## Files

- **`wordDatabase.ts`** — The complete word database, exported as a typed `WordDatabase` object (defined in `src/types/game.types.ts`).

## Word Database Structure

The database is organized as a nested object: **category → difficulty → string array**.

### Categories (6)

| Category | Line Range |
|----------|------------|
| Movies | 4–725 |
| Actions | 726–1177 |
| Animals | 1178–1514 |
| Objects | 1515–2127 |
| Famous People | 2128–2441 |
| Places | 2442–2613 |

### Difficulty Levels (3)

Each category contains three difficulty tiers: `easy`, `medium`, `hard`. Difficulty is subjective but follows this general guideline:

- **easy** — Universally well-known (e.g., "Frozen", "Cat", "New York")
- **medium** — Recognizable but may require some knowledge (e.g., "Yosemite National Park", "Marie Curie")
- **hard** — Niche or obscure (e.g., "Kjeragbolten", "Srinivasa Ramanujan", "Dilution Refrigerator")

### Total Word Count

~1,300+ unique words across all categories and difficulties.

## Exported Functions

| Function | Signature | Returns |
|----------|-----------|---------|
| `getCategories` | `() => string[]` | Array of category names |
| `getCategoryWords` | `(category: string, difficulty: 'easy' \| 'medium' \| 'hard') => string[]` | Words for that category/difficulty, or `[]` if not found |

## How to Add Words

1. Find the appropriate category and difficulty section in `wordDatabase.ts`.
2. Add new words as strings to the array. Maintain alphabetical order where practical.
3. Ensure no duplicates within the same category/difficulty tier.
4. Use proper casing (title case for proper nouns, standard casing for common nouns).
5. Escape apostrophes with backslash (e.g., `'A Bug\'s Life'`).
6. Run `npm test` — the word database tests (`src/__tests__/utils/wordDatabase.test.ts`) validate structure and accessibility.

## How to Add a New Category

1. Add a new key to the `wordDatabase` object in `wordDatabase.ts` with `easy`, `medium`, and `hard` arrays.
2. The `WordDatabase` type in `src/types/game.types.ts` uses an index signature (`[category: string]`), so no type changes are needed.
3. The new category will automatically appear in `getCategories()` and be available in the game setup UI.

## Consumers

- **`src/hooks/useWordSelector.ts`** — Calls `getCategoryWords` to select random words during gameplay.
- **`src/components/GameSetup/GameSetup.tsx`** — Calls `getCategories` to populate the category selector.
- **`src/__tests__/utils/wordDatabase.test.ts`** — Tests database structure and helper functions.
