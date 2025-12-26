# Charades Generator

A modern, interactive charades game application built with React, TypeScript, and Material-UI. Perfect for game nights, parties, or team building activities!

## Features

- **Customizable Teams**: Support for 1-4 teams with custom names
- **Multiple Categories**: Choose from Movies, Actions, Animals, Objects, Famous People, and Places
- **Difficulty Levels**: Easy, Medium, and Hard word complexity
- **Flexible Timer**: Adjustable countdown from 30 seconds to 5 minutes
- **Multiple Rounds**: Set up to 20 rounds per game
- **3-2-1 Countdown**: Dramatic countdown before each team starts
- **Score Tracking**: Automatic scoring with real-time updates
- **Game State Persistence**: Your game progress is saved automatically (survives page refreshes)
- **No Repeat Words**: Words won't repeat within the same game session
- **Audio Alerts**: Timer alarm when time expires
- **Responsive Design**: Works on desktop, tablet, and mobile devices

## Prerequisites

Before you begin, ensure you have the following installed:
- **Node.js** (version 16 or higher)
- **npm** (comes with Node.js)

## Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd charades_generator
```

2. Install dependencies:
```bash
npm install
```

## Running the Application

### Development Mode

Start the development server:
```bash
npm run dev
```

The application will be available at `http://localhost:5173` (or another port if 5173 is in use).

### Production Build

Build the application for production:
```bash
npm run build
```

Preview the production build:
```bash
npm run preview
```

## How to Play

### 1. Game Setup

When you first open the application, you'll see the **Charades Setup** screen:

- **Teams**:
  - Add 1-4 teams using the "Add Team" button
  - Customize team names by typing in the text fields
  - Remove teams using the delete icon (minimum 1 team required)

- **Category**:
  - Select from: Movies, Actions, Animals, Objects, Famous People, or Places

- **Difficulty**:
  - **Easy**: Simple, common words (e.g., "Frozen", "Running", "Dog")
  - **Medium**: 2-3 word phrases, moderate complexity
  - **Hard**: Complex phrases and abstract concepts

- **Timer Duration**:
  - Adjust the slider from 30 seconds to 5 minutes
  - Default is 2 minutes

- **Total Rounds**:
  - Set how many rounds the game will have (1-20)
  - Each round allows all teams to play once

Click **Start Game** when ready!

### 2. Countdown (3-2-1-Start)

A 3-second countdown prepares the active team before the timer starts. Get ready to act!

### 3. Active Round

During gameplay:

- **Current Word**: Displayed in large text - act it out without speaking!
- **Timer**: Shows remaining time with visual progress bar
- **Controls**:
  - **Skip**: Move to the next word (no penalty)
  - **Correct!**: Team guessed correctly - adds a point and shows next word
  - **Pause/Resume**: Pause the timer if needed
  - **End Round**: Manually end the round early

- **Score Display**: Current team's score and all team scores shown at bottom

### 4. Round End

When the timer expires or you end the round manually:

- View the current team's score
- See all team scores
- **Warning Box**: Shows which team plays next and reminds you the countdown starts immediately
- Click **Next Team** or **Start Next Round** to continue
- Click **End Game** when all rounds are complete

### 5. Game Summary

Final screen showing:

- **Winner Announcement**: Gold trophy for the winning team(s)
- **Final Scores**: All teams ranked by score
- **Game Statistics**: Category, difficulty, rounds played, and total words used
- Click **Play Again** to start a new game

### Reset Game

At any time during the game (except on the setup screen), you can:
- Click the **Reset Button** (circular icon in top-right corner)
- Confirm in the dialog to return to setup and start over

## Game Rules

1. **No Talking**: The person acting cannot speak or make sounds
2. **No Pointing**: Can't point at objects in the room
3. **Team Play**: Only the acting player's team can guess
4. **Skip Freely**: No penalty for skipping difficult words
5. **Round Structure**:
   - Each round cycles through all teams once
   - If you have 2 teams and 5 rounds, each team plays 5 times total

## Technologies Used

- **React 18** - UI framework
- **TypeScript** - Type safety
- **Vite** - Build tool and dev server
- **Material-UI (MUI)** - Component library and styling
- **Context API + useReducer** - State management
- **LocalStorage** - Game state persistence
- **Web Audio API** - Timer alarm sounds

## Project Structure

```
charades_generator/
├── src/
│   ├── components/
│   │   ├── GameSetup/       # Team and settings configuration
│   │   ├── GamePlay/         # Countdown and active round
│   │   ├── GameSummary/      # Final results screen
│   │   └── common/           # Reusable components (ResetButton)
│   ├── context/              # Game state management
│   ├── hooks/                # Custom React hooks
│   ├── data/                 # Word database (900+ words)
│   ├── types/                # TypeScript definitions
│   ├── utils/                # Helper functions
│   ├── App.tsx               # Main app component
│   └── main.tsx              # Entry point
├── public/                   # Static assets
├── index.html                # HTML template
├── package.json              # Dependencies
├── tsconfig.json             # TypeScript config
└── vite.config.ts            # Vite configuration
```

## Adding More Words

Words are stored in `src/data/wordDatabase.ts`. To add more:

1. Open the file
2. Find the category you want to expand
3. Add words to the appropriate difficulty array
4. Save and restart the dev server

Example:
```typescript
Movies: {
  easy: [
    'Frozen',
    'Your New Movie',  // Add here
    ...
  ],
  ...
}
```

## Future Enhancements

Potential features for future versions:
- Custom word lists (user input)
- Team rotation tracking
- Sound effects for correct/skip actions
- Multiplayer over network
- Game history and statistics
- More categories
- Themed word packs

## License

This project is open source and available for personal and educational use.

## Contributing

Contributions are welcome! Feel free to submit issues or pull requests.

---

Enjoy your game night! 🎭