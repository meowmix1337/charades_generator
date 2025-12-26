import { CssBaseline, ThemeProvider, createTheme } from '@mui/material';
import { GameProvider, useGame } from './context/GameContext';
import { GameSetup } from './components/GameSetup/GameSetup';
import { Countdown } from './components/GamePlay/Countdown';
import { ActiveRound } from './components/GamePlay/ActiveRound';
import { GameSummary } from './components/GameSummary/GameSummary';

const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#1976d2',
    },
    secondary: {
      main: '#dc004e',
    },
  },
});

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

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <GameProvider>
        <GameRouter />
      </GameProvider>
    </ThemeProvider>
  );
}

export default App;
