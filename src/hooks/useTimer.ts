import { useEffect, useRef } from 'react';
import { useGame } from '../context/GameContext';

export function useTimer() {
  const { state, dispatch } = useGame();
  const intervalRef = useRef<number | null>(null);

  useEffect(() => {
    if (state.status === 'playing' && state.timeRemaining > 0) {
      intervalRef.current = window.setInterval(() => {
        dispatch({ type: 'TICK' });
      }, 1000);

      return () => {
        if (intervalRef.current !== null) {
          clearInterval(intervalRef.current);
        }
      };
    } else if (state.status === 'playing' && state.timeRemaining === 0) {
      dispatch({ type: 'TIMER_EXPIRED' });
    }

    return () => {
      if (intervalRef.current !== null) {
        clearInterval(intervalRef.current);
      }
    };
  }, [state.status, state.timeRemaining, dispatch]);

  const pauseTimer = () => {
    dispatch({ type: 'PAUSE_TIMER' });
  };

  const resumeTimer = () => {
    dispatch({ type: 'RESUME_TIMER' });
  };

  return {
    timeRemaining: state.timeRemaining,
    isPaused: state.status === 'paused',
    pauseTimer,
    resumeTimer,
  };
}
