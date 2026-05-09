import { useState, useEffect } from 'react';
import { Box } from '@mui/material';
import { useGame } from '../../context/GameContext';
import { useWordSelector } from '../../hooks/useWordSelector';
import { ResetButton } from '../common/ResetButton';
import { playCountdownBeep, playStartBeep } from '../../utils/audioUtils';

export function Countdown() {
  const { dispatch } = useGame();
  const { selectRandomWord } = useWordSelector();
  const [count, setCount] = useState(3);

  useEffect(() => {
    if (count === 0) {
      playStartBeep();
    } else {
      playCountdownBeep();
    }
  }, [count]);

  useEffect(() => {
    if (count > 0) {
      const timer = setTimeout(() => setCount(count - 1), 1000);
      return () => clearTimeout(timer);
    } else {
      const firstWord = selectRandomWord();
      dispatch({ type: 'START_TIMER', payload: { word: firstWord } });
    }
  }, [count, dispatch, selectRandomWord]);

  const isStart = count === 0;

  return (
    <Box
      sx={{
        minHeight: '100vh',
        backgroundColor: isStart ? 'var(--lime)' : 'var(--cobalt)',
        backgroundImage: 'none',
        transition: 'background-color 200ms cubic-bezier(0.2,0,0,1)',
        display: 'grid',
        placeItems: 'center',
        padding: 3,
      }}
    >
      <ResetButton onDark={!isStart} />
      <Box
        key={count}
        className="cg-pop-in"
        sx={{
          fontFamily: '"Archivo Black", Impact, sans-serif',
          fontSize: 'clamp(8rem, 26vw, 22rem)',
          color: isStart ? 'var(--ink)' : 'var(--paper)',
          letterSpacing: '-0.04em',
          lineHeight: 1,
          textShadow: '0 6px 0 rgba(0,0,0,0.18)',
        }}
      >
        {isStart ? 'START!' : count}
      </Box>
    </Box>
  );
}
