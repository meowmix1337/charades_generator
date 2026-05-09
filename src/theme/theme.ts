import { createTheme, PaletteMode } from '@mui/material';
import '../types/theme.types';

// Brand tokens (mirror src/index.css)
const TOKENS = {
  ink: '#0A0A0B',
  ink2: '#1A1A1D',
  paper: '#FAFAF5',
  paper2: '#F0F0EA',
  lime: '#C6FF3D',
  limeDeep: '#9FD61A',
  magenta: '#FF2E63',
  magentaDeep: '#D9134A',
  yellow: '#FFE600',
  cobalt: '#1F3DFF',
  cobaltDeep: '#0E25CC',
  gold: '#FFB800',
  teal: '#00C2A8',
} as const;

export const getTheme = (mode: PaletteMode) => {
  const isLight = mode === 'light';

  // Surfaces flip in dark mode but accents remain identical (voltage palette is mode-agnostic)
  const fg = isLight ? TOKENS.ink : TOKENS.paper;
  const bg = isLight ? TOKENS.paper : TOKENS.ink;
  const bgPaper = isLight ? TOKENS.paper : TOKENS.ink2;
  const line = fg;
  const shadowColor = fg;
  const fgMuted = isLight ? 'rgba(10,10,11,0.72)' : 'rgba(250,250,245,0.72)';

  return createTheme({
    shape: { borderRadius: 0 },
    palette: {
      mode,
      primary: {
        main: TOKENS.lime,
        contrastText: TOKENS.ink,
      },
      secondary: {
        main: TOKENS.cobalt,
        contrastText: TOKENS.paper,
      },
      error: {
        main: TOKENS.magenta,
        contrastText: TOKENS.paper,
      },
      warning: {
        main: TOKENS.yellow,
        contrastText: TOKENS.ink,
      },
      success: {
        main: TOKENS.lime,
        contrastText: TOKENS.ink,
      },
      info: {
        main: TOKENS.cobalt,
        contrastText: TOKENS.paper,
      },
      background: {
        default: bg,
        paper: bgPaper,
      },
      text: {
        primary: fg,
        secondary: fgMuted,
      },
      countdown: {
        ready: TOKENS.cobalt,
        start: TOKENS.lime,
      },
      winner: {
        gold: TOKENS.gold,
        goldBg: TOKENS.gold,
        goldBorder: TOKENS.ink,
      },
      gradient: {
        summaryStart: TOKENS.ink,
        summaryEnd: TOKENS.ink2,
      },
      overlay: {
        light: isLight ? 'rgba(10,10,11,0.12)' : 'rgba(255,255,255,0.12)',
        dark: isLight ? 'rgba(10,10,11,0.24)' : 'rgba(255,255,255,0.24)',
      },
      wordCard: {
        background: TOKENS.cobalt,
      },
      teamHighlight: {
        background: TOKENS.yellow,
      },
      roundWarning: {
        background: TOKENS.yellow,
        border: TOKENS.ink,
      },
    },
    typography: {
      fontFamily: '"Space Grotesk", system-ui, -apple-system, sans-serif',
      h1: {
        fontFamily: '"Archivo Black", Impact, sans-serif',
        letterSpacing: '-0.02em',
        lineHeight: 0.95,
      },
      h2: {
        fontFamily: '"Archivo Black", Impact, sans-serif',
        letterSpacing: '-0.02em',
        lineHeight: 0.95,
      },
      h3: {
        fontFamily: '"Archivo Black", Impact, sans-serif',
        letterSpacing: '-0.02em',
        lineHeight: 1,
      },
      h4: {
        fontFamily: '"Archivo Black", Impact, sans-serif',
        letterSpacing: '-0.02em',
        lineHeight: 1,
      },
      h5: {
        fontWeight: 700,
        letterSpacing: '0.02em',
      },
      h6: {
        fontWeight: 700,
        letterSpacing: '0.02em',
      },
      button: {
        fontWeight: 700,
        letterSpacing: '0.04em',
        textTransform: 'none',
      },
      caption: {
        letterSpacing: '0.06em',
      },
    },
    components: {
      MuiCssBaseline: {
        styleOverrides: {
          body: {
            // Set theme attribute for CSS variable swap
          },
        },
      },
      MuiPaper: {
        defaultProps: { elevation: 0, square: true },
        styleOverrides: {
          root: {
            backgroundImage: 'none',
            borderRadius: 0,
            border: `2px solid ${line}`,
            boxShadow: `4px 4px 0 ${shadowColor}`,
            backgroundColor: bgPaper,
          },
        },
      },
      MuiButton: {
        defaultProps: { disableRipple: true, disableElevation: true },
        styleOverrides: {
          root: {
            borderRadius: 0,
            border: `2px solid ${line}`,
            boxShadow: `4px 4px 0 ${shadowColor}`,
            fontWeight: 700,
            letterSpacing: '0.04em',
            textTransform: 'none',
            padding: '12px 20px',
            transition:
              'transform 120ms cubic-bezier(0.2,0,0,1), box-shadow 120ms cubic-bezier(0.2,0,0,1), background-color 120ms cubic-bezier(0.2,0,0,1)',
            '&:hover': {
              boxShadow: `6px 6px 0 ${shadowColor}`,
              transform: 'translate(-2px,-2px)',
            },
            '&:active': {
              boxShadow: `0 0 0 ${shadowColor}`,
              transform: 'translate(2px,2px)',
              transitionDuration: '60ms',
            },
            '&.Mui-disabled': {
              opacity: 0.3,
              boxShadow: 'none',
              transform: 'none',
              border: `2px solid ${line}`,
              color: fg,
            },
          },
          sizeLarge: {
            padding: '18px 28px',
            fontSize: '1rem',
          },
          sizeSmall: {
            padding: '8px 14px',
            fontSize: '0.75rem',
            boxShadow: `3px 3px 0 ${shadowColor}`,
          },
          contained: {
            color: TOKENS.ink,
          },
          containedPrimary: { backgroundColor: TOKENS.lime, color: TOKENS.ink },
          containedSecondary: { backgroundColor: TOKENS.cobalt, color: TOKENS.paper },
          containedError: { backgroundColor: TOKENS.magenta, color: TOKENS.paper },
          containedWarning: { backgroundColor: TOKENS.yellow, color: TOKENS.ink },
          containedSuccess: { backgroundColor: TOKENS.lime, color: TOKENS.ink },
          outlined: {
            backgroundColor: bgPaper,
            color: fg,
            border: `2px solid ${line}`,
            '&:hover': {
              backgroundColor: TOKENS.yellow,
              color: TOKENS.ink,
              border: `2px solid ${line}`,
            },
          },
          text: {
            backgroundColor: 'transparent',
            color: fg,
            boxShadow: 'none',
            border: `2px solid ${line}`,
            '&:hover': {
              backgroundColor: TOKENS.yellow,
              color: TOKENS.ink,
              boxShadow: 'none',
              transform: 'none',
              border: `2px solid ${line}`,
            },
            '&:active': {
              boxShadow: 'none',
              transform: 'none',
            },
            '&.Mui-disabled': {
              border: `2px solid ${line}`,
              boxShadow: 'none',
            },
          },
        },
      },
      MuiIconButton: {
        defaultProps: { disableRipple: true },
        styleOverrides: {
          root: {
            borderRadius: 0,
            transition: 'background-color 120ms ease, color 120ms ease',
          },
        },
      },
      MuiTextField: {
        defaultProps: { variant: 'outlined' },
      },
      MuiOutlinedInput: {
        styleOverrides: {
          root: {
            borderRadius: 0,
            backgroundColor: bgPaper,
            '& .MuiOutlinedInput-notchedOutline': {
              borderColor: line,
              borderWidth: 2,
            },
            '&:hover .MuiOutlinedInput-notchedOutline': {
              borderColor: line,
              borderWidth: 2,
            },
            '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
              borderColor: line,
              borderWidth: 2,
              boxShadow: `0 0 0 3px ${TOKENS.yellow}`,
            },
          },
          input: {
            fontFamily: '"Space Grotesk", sans-serif',
            fontWeight: 500,
          },
        },
      },
      MuiInputLabel: {
        styleOverrides: {
          root: {
            fontWeight: 700,
            fontSize: '0.75rem',
            letterSpacing: '0.12em',
            textTransform: 'uppercase',
            color: fgMuted,
            '&.Mui-focused': { color: fg },
          },
        },
      },
      MuiSelect: {
        styleOverrides: {
          select: { borderRadius: 0 },
        },
      },
      MuiMenu: {
        styleOverrides: {
          paper: {
            borderRadius: 0,
            border: `2px solid ${line}`,
            boxShadow: `6px 6px 0 ${shadowColor}`,
          },
        },
      },
      MuiMenuItem: {
        styleOverrides: {
          root: {
            fontWeight: 500,
            '&:hover': { backgroundColor: TOKENS.yellow, color: TOKENS.ink },
            '&.Mui-selected': {
              backgroundColor: TOKENS.lime,
              color: TOKENS.ink,
              '&:hover': { backgroundColor: TOKENS.lime },
            },
          },
        },
      },
      MuiChip: {
        styleOverrides: {
          root: {
            borderRadius: 0,
            border: `2px solid ${line}`,
            backgroundColor: bgPaper,
            color: fg,
            fontWeight: 700,
            letterSpacing: '0.08em',
            textTransform: 'uppercase',
            fontSize: '0.75rem',
            height: 32,
          },
          colorPrimary: { backgroundColor: TOKENS.lime, color: TOKENS.ink },
          colorSecondary: { backgroundColor: TOKENS.cobalt, color: TOKENS.paper },
          colorError: { backgroundColor: TOKENS.magenta, color: TOKENS.paper },
          colorWarning: { backgroundColor: TOKENS.yellow, color: TOKENS.ink },
          colorInfo: { backgroundColor: TOKENS.cobalt, color: TOKENS.paper },
          colorSuccess: { backgroundColor: TOKENS.lime, color: TOKENS.ink },
        },
      },
      MuiSlider: {
        styleOverrides: {
          root: {
            color: TOKENS.ink,
            height: 6,
            padding: '14px 0',
          },
          rail: { color: line, opacity: 1, height: 6, borderRadius: 0 },
          track: { color: line, height: 6, border: 'none', borderRadius: 0 },
          thumb: {
            width: 22,
            height: 22,
            borderRadius: 0,
            backgroundColor: TOKENS.lime,
            border: `2px solid ${line}`,
            boxShadow: 'none',
            '&:hover, &.Mui-focusVisible, &.Mui-active': {
              boxShadow: `0 0 0 3px ${TOKENS.yellow}`,
            },
          },
          mark: {
            backgroundColor: line,
            height: 8,
            width: 2,
          },
          markLabel: {
            fontFamily: '"JetBrains Mono", monospace',
            fontSize: 11,
            color: fgMuted,
          },
          valueLabel: {
            backgroundColor: TOKENS.ink,
            color: TOKENS.paper,
            borderRadius: 0,
            fontFamily: '"JetBrains Mono", monospace',
          },
        },
      },
      MuiLinearProgress: {
        styleOverrides: {
          root: {
            borderRadius: 0,
            backgroundColor: line,
            height: 10,
          },
          bar: { borderRadius: 0 },
        },
      },
      MuiDialog: {
        styleOverrides: {
          paper: {
            borderRadius: 0,
            border: `2px solid ${line}`,
            boxShadow: `8px 8px 0 ${shadowColor}`,
            backgroundImage: 'none',
            backgroundColor: bgPaper,
          },
        },
      },
      MuiDialogTitle: {
        styleOverrides: {
          root: {
            fontFamily: '"Archivo Black", Impact, sans-serif',
            letterSpacing: '-0.02em',
            fontSize: '1.5rem',
          },
        },
      },
      MuiTooltip: {
        styleOverrides: {
          tooltip: {
            borderRadius: 0,
            backgroundColor: TOKENS.ink,
            color: TOKENS.paper,
            border: `2px solid ${TOKENS.ink}`,
            fontFamily: '"Space Grotesk", sans-serif',
            fontWeight: 500,
            fontSize: '0.75rem',
            letterSpacing: '0.06em',
          },
          arrow: { color: TOKENS.ink },
        },
      },
      MuiDivider: {
        styleOverrides: {
          root: {
            borderColor: line,
            borderBottomWidth: 2,
          },
        },
      },
    },
  });
};
