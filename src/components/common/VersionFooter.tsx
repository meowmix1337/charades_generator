import { useState } from 'react';
import { Box, Typography, Tooltip, Link, IconButton } from '@mui/material';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import { getVersionInfo } from '../../utils/version';
import { ChangelogDialog } from './ChangelogDialog';
import { useThemeContext } from '../../context/ThemeContext';

export function VersionFooter() {
  const versionInfo = getVersionInfo();
  const [changelogOpen, setChangelogOpen] = useState(false);
  const { mode, toggleTheme } = useThemeContext();

  return (
    <>
      <Box
        sx={{
          position: 'fixed',
          bottom: 8,
          left: 8,
          zIndex: 1000,
          display: 'flex',
          gap: 1,
          alignItems: 'center',
        }}
      >
        <Tooltip
          title={
            <Box sx={{ p: 1 }}>
              <Typography variant="caption" display="block">
                Version: {versionInfo.version}
              </Typography>
              <Typography variant="caption" display="block">
                Git: {versionInfo.gitHash}
              </Typography>
              <Typography variant="caption" display="block">
                Built: {new Date(versionInfo.buildDate).toLocaleString()}
              </Typography>
            </Box>
          }
          placement="top-start"
        >
          <Typography
            variant="caption"
            sx={{
              color: 'text.secondary',
              fontSize: '0.7rem',
              opacity: 0.5,
              cursor: 'help',
              userSelect: 'none',
              '&:hover': {
                opacity: 1,
              },
            }}
          >
            v{versionInfo.version}
          </Typography>
        </Tooltip>
        <Typography variant="caption" sx={{ color: 'text.secondary', opacity: 0.5 }}>
          •
        </Typography>
        <Link
          component="button"
          variant="caption"
          onClick={() => setChangelogOpen(true)}
          sx={{
            color: 'text.secondary',
            fontSize: '0.7rem',
            opacity: 0.5,
            cursor: 'pointer',
            textDecoration: 'none',
            '&:hover': {
              opacity: 1,
              textDecoration: 'underline',
            },
          }}
        >
          What's New
        </Link>
        <Typography variant="caption" sx={{ color: 'text.secondary', opacity: 0.5 }}>
          •
        </Typography>
        <Tooltip title={`Switch to ${mode === 'light' ? 'dark' : 'light'} mode`} placement="top-start">
          <IconButton
            onClick={toggleTheme}
            size="small"
            sx={{
              color: 'text.secondary',
              opacity: 0.5,
              padding: 0.5,
              '&:hover': {
                opacity: 1,
              },
            }}
          >
            {mode === 'light' ? (
              <Brightness4Icon sx={{ fontSize: '1rem' }} />
            ) : (
              <Brightness7Icon sx={{ fontSize: '1rem' }} />
            )}
          </IconButton>
        </Tooltip>
      </Box>
      <ChangelogDialog open={changelogOpen} onClose={() => setChangelogOpen(false)} />
    </>
  );
}
