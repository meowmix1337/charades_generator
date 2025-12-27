import { useEffect } from 'react';
import {
  Box,
  Container,
  Typography,
  Button,
  Paper,
  LinearProgress,
  Chip,
  Stack,
} from '@mui/material';
import SkipNextIcon from '@mui/icons-material/SkipNext';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import PauseIcon from '@mui/icons-material/Pause';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import StopIcon from '@mui/icons-material/Stop';
import { useGame } from '../../context/GameContext';
import { useTimer } from '../../hooks/useTimer';
import { useWordSelector } from '../../hooks/useWordSelector';
import { formatTime, playAlarmSound, playSkipSound, playCorrectSound } from '../../utils/audioUtils';
import { ResetButton } from '../common/ResetButton';

export function ActiveRound() {
  const { state, dispatch } = useGame();
  const { timeRemaining, isPaused, pauseTimer, resumeTimer } = useTimer();
  const { selectRandomWord } = useWordSelector();

  const currentTeam = state.teams[state.currentTeamIndex];
  const progress = (timeRemaining / state.settings.timerDuration) * 100;
  const isWarning = timeRemaining <= 10;

  // Play alarm when timer expires
  useEffect(() => {
    if (timeRemaining === 0 && state.status === 'round-end') {
      playAlarmSound();
    }
  }, [timeRemaining, state.status]);

  const handleSkip = () => {
    playSkipSound();
    const nextWord = selectRandomWord();
    dispatch({ type: 'SKIP_WORD', payload: { nextWord } });
  };

  const handleCorrect = () => {
    playCorrectSound();
    const nextWord = selectRandomWord();
    dispatch({ type: 'ADD_POINT', payload: { nextWord } });
  };

  const handleEndRound = () => {
    playAlarmSound();
    dispatch({ type: 'END_ROUND' });
  };

  if (state.status === 'round-end') {
    return (
      <Container maxWidth="md" sx={{ py: 4 }}>
        <ResetButton />
        <Paper elevation={3} sx={{ p: 4, textAlign: 'center' }}>
          <Typography variant="h4" gutterBottom color="error">
            Time's Up!
          </Typography>
          <Typography variant="h6" gutterBottom sx={{ mb: 3 }}>
            {currentTeam.name} scored {currentTeam.score} points this round
          </Typography>

          <Typography variant="h6" gutterBottom sx={{ mb: 2 }}>
            Current Scores:
          </Typography>
          <Stack spacing={1} sx={{ mb: 4 }}>
            {state.teams.map((team, index) => (
              <Box
                key={team.id}
                sx={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  p: 2,
                  bgcolor: index === state.currentTeamIndex ? 'primary.light' : 'grey.100',
                  borderRadius: 1,
                }}
              >
                <Typography variant="body1" fontWeight="bold">
                  {team.name}
                </Typography>
                <Typography variant="body1">
                  {team.score} points
                </Typography>
              </Box>
            ))}
          </Stack>

          {state.currentRound >= state.totalRounds &&
           state.currentTeamIndex === state.teams.length - 1 ? (
            <Button
              fullWidth
              variant="contained"
              size="large"
              onClick={() => dispatch({ type: 'END_GAME' })}
              sx={{ mt: 2 }}
            >
              End Game
            </Button>
          ) : (
            <>
              <Paper
                elevation={0}
                sx={{
                  p: 2,
                  bgcolor: 'warning.light',
                  border: '2px solid',
                  borderColor: 'warning.main',
                  mb: 2,
                }}
              >
                <Typography variant="body1" fontWeight="bold" gutterBottom>
                  ⚠️ Get Ready!
                </Typography>
                <Typography variant="body2">
                  {state.currentTeamIndex === state.teams.length - 1
                    ? `Round ${state.currentRound + 1} is about to begin. ${state.teams[0].name} will play next.`
                    : `${state.teams[state.currentTeamIndex + 1].name} is up next.`}
                  {' '}The countdown will start immediately when you click the button below.
                </Typography>
              </Paper>
              <Button
                fullWidth
                variant="contained"
                size="large"
                onClick={() => {
                  dispatch({ type: 'NEXT_TEAM' });
                }}
                sx={{ mt: 2 }}
              >
                {state.currentTeamIndex === state.teams.length - 1 ? 'Start Next Round' : 'Next Team'}
              </Button>
            </>
          )}
        </Paper>
      </Container>
    );
  }

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: 'background.default', py: 4 }}>
      <ResetButton />
      <Container maxWidth="md">
        {/* Header with team and round info */}
        <Box sx={{ mb: 3, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Chip
            label={`Round ${state.currentRound} of ${state.totalRounds}`}
            color="primary"
            size="medium"
          />
          <Typography variant="h6">
            {currentTeam.name}
          </Typography>
          <Chip
            label={`Score: ${currentTeam.score}`}
            color="secondary"
            size="medium"
          />
        </Box>

        {/* Timer Progress Bar */}
        <Paper elevation={3} sx={{ mb: 3, overflow: 'hidden' }}>
          <LinearProgress
            variant="determinate"
            value={progress}
            sx={{
              height: 10,
              bgcolor: 'grey.200',
              '& .MuiLinearProgress-bar': {
                bgcolor: isWarning ? 'error.main' : 'success.main',
              },
            }}
          />
          <Box sx={{ p: 2, textAlign: 'center' }}>
            <Typography
              variant="h2"
              sx={{
                fontWeight: 'bold',
                color: isWarning ? 'error.main' : 'text.primary',
                fontFamily: 'monospace',
              }}
            >
              {formatTime(timeRemaining)}
            </Typography>
          </Box>
        </Paper>

        {/* Word Display */}
        <Paper
          elevation={3}
          sx={{
            p: 6,
            mb: 3,
            minHeight: 200,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            bgcolor: 'primary.main',
            color: 'white',
          }}
        >
          <Typography
            variant="h3"
            component="div"
            sx={{
              fontWeight: 'bold',
              textAlign: 'center',
              wordBreak: 'break-word',
            }}
          >
            {state.currentWord || 'Loading...'}
          </Typography>
        </Paper>

        {/* Controls */}
        <Stack spacing={2}>
          <Box sx={{ display: 'flex', gap: 2 }}>
            <Button
              fullWidth
              variant="outlined"
              size="large"
              startIcon={<SkipNextIcon />}
              onClick={handleSkip}
              disabled={isPaused}
              sx={{ py: 2 }}
            >
              Skip
            </Button>
            <Button
              fullWidth
              variant="contained"
              size="large"
              color="success"
              startIcon={<CheckCircleIcon />}
              onClick={handleCorrect}
              disabled={isPaused}
              sx={{ py: 2 }}
            >
              Correct!
            </Button>
          </Box>

          <Box sx={{ display: 'flex', gap: 2 }}>
            <Button
              fullWidth
              variant="outlined"
              size="medium"
              startIcon={isPaused ? <PlayArrowIcon /> : <PauseIcon />}
              onClick={isPaused ? resumeTimer : pauseTimer}
            >
              {isPaused ? 'Resume' : 'Pause'}
            </Button>
            <Button
              fullWidth
              variant="outlined"
              size="medium"
              color="error"
              startIcon={<StopIcon />}
              onClick={handleEndRound}
            >
              End Round
            </Button>
          </Box>
        </Stack>

        {/* All Teams Scores */}
        <Paper elevation={1} sx={{ mt: 4, p: 3 }}>
          <Typography variant="h6" gutterBottom>
            All Scores:
          </Typography>
          <Stack spacing={1}>
            {state.teams.map((team, index) => (
              <Box
                key={team.id}
                sx={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  p: 1.5,
                  bgcolor: index === state.currentTeamIndex ? 'primary.light' : 'transparent',
                  borderRadius: 1,
                }}
              >
                <Typography variant="body1">
                  {team.name}
                </Typography>
                <Typography variant="body1" fontWeight="bold">
                  {team.score}
                </Typography>
              </Box>
            ))}
          </Stack>
        </Paper>
      </Container>
    </Box>
  );
}
