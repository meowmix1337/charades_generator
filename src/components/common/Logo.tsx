import { Box } from '@mui/material';

interface LogoProps {
  size?: 'sm' | 'md' | 'lg';
}

export function Logo({ size = 'md' }: LogoProps) {
  const markSize = size === 'lg' ? 56 : size === 'sm' ? 32 : 40;
  const glyphSize = size === 'lg' ? 40 : size === 'sm' ? 22 : 28;
  const wordSize = size === 'lg' ? 32 : size === 'sm' ? 18 : 22;

  return (
    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
      <Box
        sx={{
          width: markSize,
          height: markSize,
          backgroundColor: 'var(--lime)',
          border: '2px solid var(--ink)',
          display: 'grid',
          placeItems: 'center',
          flexShrink: 0,
        }}
      >
        <svg viewBox="0 0 80 80" width={glyphSize} height={glyphSize}>
          <circle cx="26" cy="32" r="7" fill="#0A0A0B" />
          <circle cx="54" cy="32" r="7" fill="#0A0A0B" />
          <path
            d="M18 54 Q40 70 62 54"
            stroke="#0A0A0B"
            strokeWidth="5"
            fill="none"
            strokeLinecap="square"
          />
        </svg>
      </Box>
      <Box>
        <Box
          sx={{
            fontFamily: '"Archivo Black", Impact, sans-serif',
            fontSize: wordSize,
            letterSpacing: '-0.02em',
            lineHeight: 1,
            color: 'text.primary',
          }}
        >
          CHARADES
        </Box>
        {size === 'lg' && (
          <Box
            sx={{
              fontFamily: '"Space Grotesk", sans-serif',
              fontWeight: 500,
              fontSize: 11,
              letterSpacing: '0.32em',
              marginTop: '4px',
              color: 'text.secondary',
            }}
          >
            GENERATOR
          </Box>
        )}
      </Box>
    </Box>
  );
}
