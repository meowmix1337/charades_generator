import { Box, Typography, Tooltip } from '@mui/material';
import { getVersionInfo } from '../../utils/version';

export function VersionFooter() {
  const versionInfo = getVersionInfo();

  return (
    <Box
      sx={{
        position: 'fixed',
        bottom: 8,
        left: 8,
        zIndex: 1000,
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
    </Box>
  );
}
