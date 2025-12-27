# Changelog

All notable changes to this project will be documented in this file.

## [Unreleased]

### Added

- Button sound effects - distinct audio feedback for Skip (descending tone sweep) and Correct (bright bell with harmonics) buttons to help players confirm their actions
- Enhanced "START!" beep - final countdown beep is now louder and uses ascending tones (800Hz → 1000Hz) to clearly signal round beginning

### Changed

- Round end alarm now plays a bell sound with harmonics instead of simple beeps for a more pleasant notification
- Manual "End Round" button now also plays bell sound for consistency

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

---

## How to Update This Changelog

Add changes under `[Unreleased]` using these categories:

- **Added** - New features
- **Changed** - Changes to existing features
- **Fixed** - Bug fixes
- **Removed** - Removed features
- **Security** - Security updates

[Unreleased]: https://github.com/meowmix1337/charades_generator/compare/v0.0.2...HEAD
[0.0.2]: https://github.com/meowmix1337/charades_generator/compare/v0.0.1...v0.0.2
[0.0.1]: https://github.com/meowmix1337/charades_generator/releases/tag/v0.0.1
