export interface ChangelogEntry {
  version: string;
  date: string;
  changes: {
    added?: string[];
    changed?: string[];
    fixed?: string[];
    removed?: string[];
    security?: string[];
  };
}

export const changelog: ChangelogEntry[] = [
  {
    version: '0.0.3',
    date: '2025-12-27',
    changes: {
      added: [
        'Dark mode support with light/dark theme toggle',
        '  - Toggle button in footer (moon/sun icon) next to version display',
        '  - Automatic system preference detection with manual override',
        '  - User preference persisted in localStorage',
        '  - All components updated to use theme-aware colors',
        'Button sound effects - distinct audio feedback for Skip (descending tone sweep) and Correct (bright bell with harmonics) buttons to help players confirm their actions',
        'Enhanced "START!" beep - final countdown beep is now louder and uses ascending tones (800Hz → 1000Hz) to clearly signal round beginning',
      ],
      changed: [
        'Round end alarm now plays a bell sound with harmonics instead of simple beeps for a more pleasant notification',
        'Manual "End Round" button now also plays bell sound for consistency',
        'Reduced brightness of word card, team highlights, countdown screens, and round warning in dark mode for better readability and reduced eye strain',
      ],
    },
  },
  {
    version: '0.0.2',
    date: '2025-12-26',
    changes: {
      added: [
        'Countdown beep sounds - audio alert plays for each countdown number (3-2-1-Start) to ensure players are aware the round is starting',
        'In-app changelog viewer accessible via "What\'s New" link in footer',
      ],
    },
  },
  {
    version: '0.0.1',
    date: '2025-12-26',
    changes: {
      added: [
        'Initial release of Charades Generator',
        'Game setup for 1-4 teams with customizable settings',
        '6 categories: Movies, Actions, Animals, Objects, Famous People, Places',
        '3 difficulty levels: Easy, Medium, Hard',
        '1,307 unique words with no repeats during gameplay',
        'Countdown timer with visual progress bar and alarm',
        'Skip and Correct buttons for gameplay',
        'Pause/Resume and End Round functionality',
        'Manual round progression with clear team indicators',
        'Game summary with winner announcement and statistics',
        'Reset Game button to restart anytime',
        'Version display showing build information',
        'localStorage to save game state across page refreshes',
        'Responsive design for desktop, tablet, and mobile',
      ],
    },
  },
];
