import '@mui/material/styles';

declare module '@mui/material/styles' {
  interface Palette {
    countdown: {
      ready: string;
      start: string;
    };
    winner: {
      gold: string;
      goldBg: string;
      goldBorder: string;
    };
    gradient: {
      summaryStart: string;
      summaryEnd: string;
    };
    overlay: {
      light: string;
      dark: string;
    };
    wordCard: {
      background: string;
    };
    teamHighlight: {
      background: string;
    };
    roundWarning: {
      background: string;
      border: string;
    };
  }

  interface PaletteOptions {
    countdown?: {
      ready?: string;
      start?: string;
    };
    winner?: {
      gold?: string;
      goldBg?: string;
      goldBorder?: string;
    };
    gradient?: {
      summaryStart?: string;
      summaryEnd?: string;
    };
    overlay?: {
      light?: string;
      dark?: string;
    };
    wordCard?: {
      background?: string;
    };
    teamHighlight?: {
      background?: string;
    };
    roundWarning?: {
      background?: string;
      border?: string;
    };
  }
}
