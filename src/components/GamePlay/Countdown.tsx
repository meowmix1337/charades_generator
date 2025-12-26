import { useState, useEffect } from 'react';
import { Box, Typography, Fade } from '@mui/material';
import { useGame } from '../../context/GameContext';
import { useWordSelector } from '../../hooks/useWordSelector';
import { ResetButton } from '../common/ResetButton';

export function Countdown() {
  const { dispatch } = useGame();
  const { selectRandomWord } = useWordSelector();
  const [count, setCount] = useState(3);

  useEffect(() => {
    if (count > 0) {
      const timer = setTimeout(() => setCount(count - 1), 1000);
      return () => clearTimeout(timer);
    } else {
      // Countdown finished, start the timer with first word
      const firstWord = selectRandomWord();
      dispatch({ type: 'START_TIMER', payload: { word: firstWord } });
    }
  }, [count, dispatch, selectRandomWord]);

  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '100vh',
        backgroundColor: count === 0 ? '#4caf50' : '#1976d2',
        transition: 'background-color 0.3s ease',
      }}
    >
      <ResetButton />
      <Fade in={true} timeout={500}>
        <Typography
          variant="h1"
          sx={{
            fontSize: { xs: '8rem', sm: '12rem', md: '16rem' },
            fontWeight: 'bold',
            color: 'white',
            textShadow: '0 4px 8px rgba(0,0,0,0.3)',
            animation: 'pulse 0.5s ease-in-out',
            '@keyframes pulse': {
              '0%': {
                transform: 'scale(0.8)',
                opacity: 0,
              },
              '50%': {
                transform: 'scale(1.1)',
                opacity: 1,
              },
              '100%': {
                transform: 'scale(1)',
                opacity: 1,
              },
            },
          }}
        >
          {count === 0 ? 'START!' : count}
        </Typography>
      </Fade>
    </Box>
  );
}
