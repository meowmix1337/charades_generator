import { createTheme, PaletteMode } from '@mui/material';
import '../types/theme.types';

export const getTheme = (mode: PaletteMode) => {
  const isLight = mode === 'light';

  return createTheme({
    palette: {
      mode,
      primary: {
        main: isLight ? '#1976d2' : '#90caf9',
      },
      secondary: {
        main: isLight ? '#dc004e' : '#f48fb1',
      },
      background: {
        default: isLight ? '#fafafa' : '#121212',
        paper: isLight ? '#fff' : '#1e1e1e',
      },
      countdown: {
        ready: isLight ? '#1976d2' : '#1565c0',
        start: isLight ? '#4caf50' : '#388e3c',
      },
      winner: {
        gold: isLight ? '#FFD700' : '#ffd54f',
        goldBg: isLight ? '#FFF9C4' : '#5d4037',
        goldBorder: isLight ? '#FFD700' : '#ffd54f',
      },
      gradient: {
        summaryStart: isLight ? '#667eea' : '#8b9dc3',
        summaryEnd: isLight ? '#764ba2' : '#9b8bb0',
      },
      overlay: {
        light: isLight ? 'rgba(0, 0, 0, 0.1)' : 'rgba(255, 255, 255, 0.08)',
        dark: isLight ? 'rgba(0, 0, 0, 0.2)' : 'rgba(255, 255, 255, 0.12)',
      },
      wordCard: {
        background: isLight ? '#1976d2' : '#1565c0',
      },
      teamHighlight: {
        background: isLight ? '#bbdefb' : 'rgba(144, 202, 249, 0.5)',
      },
      roundWarning: {
        background: isLight ? '#fff3e0' : 'rgba(255, 152, 0, 0.15)',
        border: isLight ? '#ff9800' : '#fb8c00',
      },
    },
    components: {
      MuiPaper: {
        styleOverrides: {
          root: {
            backgroundImage: 'none',
          },
        },
      },
    },
  });
};
