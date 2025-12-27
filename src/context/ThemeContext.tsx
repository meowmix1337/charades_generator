import { createContext, useContext, useState, useEffect, useMemo, ReactNode } from 'react';
import { Theme, PaletteMode } from '@mui/material';
import { getTheme } from '../theme/theme';

type ThemePreference = 'light' | 'dark' | 'system';

interface ThemeContextValue {
  theme: Theme;
  mode: PaletteMode;
  userPreference: ThemePreference;
  toggleTheme: () => void;
  setThemeMode: (mode: ThemePreference) => void;
}

const ThemeContext = createContext<ThemeContextValue | undefined>(undefined);

const STORAGE_KEY = 'charades_theme_mode';

const getSystemPreference = (): PaletteMode => {
  if (typeof window !== 'undefined' && window.matchMedia) {
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  }
  return 'light';
};

export function ThemeContextProvider({ children }: { children: ReactNode }) {
  const [userPreference, setUserPreference] = useState<ThemePreference>(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    return (saved as ThemePreference) || 'system';
  });

  const mode = useMemo<PaletteMode>(() => {
    if (userPreference === 'system') {
      return getSystemPreference();
    }
    return userPreference;
  }, [userPreference]);

  const theme = useMemo(() => getTheme(mode), [mode]);

  // Listen for system preference changes when in 'system' mode
  useEffect(() => {
    if (userPreference !== 'system') return;

    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handler = () => {
      // Force re-render by setting userPreference to itself
      setUserPreference('system');
    };

    mediaQuery.addEventListener('change', handler);
    return () => mediaQuery.removeEventListener('change', handler);
  }, [userPreference]);

  // Persist user preference to localStorage
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, userPreference);
  }, [userPreference]);

  const toggleTheme = () => {
    setUserPreference((prev) => {
      // Toggle between light and dark (skip system for simple toggle)
      if (prev === 'light' || prev === 'system') return 'dark';
      return 'light';
    });
  };

  const setThemeMode = (newMode: ThemePreference) => {
    setUserPreference(newMode);
  };

  const value: ThemeContextValue = {
    theme,
    mode,
    userPreference,
    toggleTheme,
    setThemeMode,
  };

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

export function useThemeContext() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useThemeContext must be used within ThemeContextProvider');
  }
  return context;
}
