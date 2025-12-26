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
        'In-app changelog viewer',
      ],
    },
  },
];
