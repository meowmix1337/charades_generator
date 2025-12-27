import { CssBaseline, ThemeProvider } from '@mui/material';
import { GameProvider, useGame } from './context/GameContext';
import { ThemeContextProvider, useThemeContext } from './context/ThemeContext';
import { GameSetup } from './components/GameSetup/GameSetup';
import { Countdown } from './components/GamePlay/Countdown';
import { ActiveRound } from './components/GamePlay/ActiveRound';
import { GameSummary } from './components/GameSummary/GameSummary';
import { VersionFooter } from './components/common/VersionFooter';

function GameRouter() {
  const { state } = useGame();

  switch (state.status) {
    case 'setup':
      return <GameSetup />;
    case 'countdown':
      return <Countdown />;
    case 'playing':
    case 'paused':
    case 'round-end':
      return <ActiveRound />;
    case 'game-over':
      return <GameSummary />;
    default:
      return <GameSetup />;
  }
}

function ThemeAwareApp() {
  const { theme } = useThemeContext();

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <GameProvider>
        <GameRouter />
        <VersionFooter />
      </GameProvider>
    </ThemeProvider>
  );
}

function App() {
  return (
    <ThemeContextProvider>
      <ThemeAwareApp />
    </ThemeContextProvider>
  );
}

export default App;
