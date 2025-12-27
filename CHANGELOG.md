# Changelog

All notable changes to this project will be documented in this file.

## [0.0.4] - 2025-12-27

### Added

- localStorage word history tracking - words are now remembered across game sessions
  - Automatically tracks used words for each category and difficulty combination
  - 7-day retention period with automatic cleanup every 24 hours
  - Prevents word repeats for better gameplay experience
  - Clear Word History button in GameSetup screen with confirmation dialog
- Massively expanded word database for Actions, Animals, and Famous People categories
  - Actions: +150 words total (50 per difficulty level)
  - Animals: +150 words total (50 per difficulty level)
  - Famous People: +150 words total (50 per difficulty level)
- Comprehensive test suite for word history utility with 20 passing tests

### Changed

- Word selection now checks both session and localStorage history to avoid repeats
- Improved word database quality by removing numbered sequels and confusing variations

### Fixed

- Removed duplicate words across all categories and difficulty levels

## [0.0.3] - 2025-12-27

### Added

- Dark mode support with light/dark theme toggle
  - Toggle button in footer (moon/sun icon) next to version display
  - Automatic system preference detection with manual override
  - User preference persisted in localStorage
  - All components updated to use theme-aware colors
- Button sound effects - distinct audio feedback for Skip (descending tone sweep) and Correct (bright bell with harmonics) buttons to help players confirm their actions
- Enhanced "START!" beep - final countdown beep is now louder and uses ascending tones (800Hz → 1000Hz) to clearly signal round beginning

### Changed

- Round end alarm now plays a bell sound with harmonics instead of simple beeps for a more pleasant notification
- Manual "End Round" button now also plays bell sound for consistency
- Reduced brightness of word card, team highlights, countdown screens, and round warning in dark mode for better readability and reduced eye strain

## [0.0.2] - 2025-12-26

### Added

- Countdown beep sounds - audio alert plays for each countdown number (3-2-1-Start) to ensure players are aware the round is starting
- In-app changelog viewer accessible via "What's New" link in footer

## [0.0.1] - 2025-12-26

### Added

- Initial release of Charades Generator
- Game setup for 1-4 teams with customizable settings
- 6 categories: Movies, Actions, Animals, Objects, Famous People, Places
- 3 difficulty levels: Easy, Medium, Hard
- 1,307 unique words with no repeats during gameplay
- Countdown timer with visual progress bar and alarm
- Skip and Correct buttons for gameplay
- Pause/Resume and End Round functionality
- Manual round progression with clear team indicators
- Game summary with winner announcement and statistics
- Reset Game button to restart anytime
- Version display showing build information
- localStorage to save game state across page refreshes
- Responsive design for desktop, tablet, and mobile
- Comprehensive test suite with 28 passing tests

### Technical

- React 18 + TypeScript
- Material-UI component library
- Vite build tool
- GitHub Actions CI/CD
- ESLint v9 for code quality
