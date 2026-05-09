import { useEffect } from 'react';
import {
  Box,
  Container,
  Typography,
  Button,
  Paper,
  Chip,
  Stack,
} from '@mui/material';
import {
  ChevronsRight,
  Check,
  Pause,
  Play,
  Square,
} from 'lucide-react';
import { useGame } from '../../context/GameContext';
import { useTimer } from '../../hooks/useTimer';
import { useWordSelector } from '../../hooks/useWordSelector';
import { formatTime, playAlarmSound, playSkipSound, playCorrectSound } from '../../utils/audioUtils';
import { ResetButton } from '../common/ResetButton';

const CATEGORY_COLORS: Record<string, string> = {
  Movies: '#FF2E63',
  Actions: '#C6FF3D',
  Animals: '#FFB800',
  Objects: '#1F3DFF',
  'Famous People': '#FF7A1A',
  Places: '#00C2A8',
};

export function ActiveRound() {
  const { state, dispatch } = useGame();
  const { timeRemaining, isPaused, pauseTimer, resumeTimer } = useTimer();
  const { selectRandomWord } = useWordSelector();

  const currentTeam = state.teams[state.currentTeamIndex];
  const progress = (timeRemaining / state.settings.timerDuration) * 100;
  const isWarning = timeRemaining <= 10;

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

  // ROUND END
  if (state.status === 'round-end') {
    const isLastTeam = state.currentTeamIndex === state.teams.length - 1;
    const isLastRound = state.currentRound >= state.totalRounds;
    const gameOver = isLastRound && isLastTeam;
    const nextTeam = isLastTeam ? state.teams[0] : state.teams[state.currentTeamIndex + 1];

    return (
      <Container maxWidth="md" sx={{ py: 5 }}>
        <ResetButton />
        <Paper sx={{ p: { xs: 3, sm: 5 }, textAlign: 'center' }}>
          <Typography
            sx={{
              fontWeight: 700,
              fontSize: '0.75rem',
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              color: 'var(--magenta)',
              mb: 1,
            }}
          >
            Round {state.currentRound} of {state.totalRounds}
          </Typography>
          <Typography
            variant="h1"
            className="cg-title-shake"
            sx={{
              fontSize: 'clamp(2.5rem, 6vw, 4rem)',
              mb: 1.5,
              textTransform: 'uppercase',
            }}
          >
            Time's Up!
          </Typography>
          <Typography sx={{ fontSize: 18, mb: 3.5 }}>
            <strong>{currentTeam.name}</strong> scored{' '}
            <Box
              component="span"
              sx={{ fontFamily: '"JetBrains Mono", monospace', fontWeight: 700 }}
            >
              {currentTeam.score}
            </Box>{' '}
            points so far.
          </Typography>

          <Typography
            sx={{
              fontWeight: 700,
              fontSize: '0.75rem',
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              color: 'text.secondary',
              mb: 1,
              textAlign: 'left',
            }}
          >
            Current Scores
          </Typography>
          <Box sx={{ mb: 3.5 }}>
            {state.teams.map((team, index) => (
              <ScoreRow
                key={team.id}
                name={team.name}
                score={team.score}
                active={index === state.currentTeamIndex}
                stack={index > 0}
              />
            ))}
          </Box>

          {gameOver ? (
            <Button
              fullWidth
              variant="contained"
              color="primary"
              size="large"
              onClick={() => dispatch({ type: 'END_GAME' })}
              sx={{ py: 2.5, fontSize: '1.125rem', boxShadow: '6px 6px 0 var(--ink)' }}
            >
              End Game
            </Button>
          ) : (
            <>
              <Box
                sx={{
                  backgroundColor: 'var(--yellow)',
                  border: '2px solid var(--ink)',
                  padding: '16px 18px',
                  mb: 2,
                  textAlign: 'left',
                }}
              >
                <Typography
                  sx={{
                    fontFamily: '"Archivo Black", Impact, sans-serif',
                    fontSize: 20,
                    letterSpacing: '-0.02em',
                    mb: 0.5,
                    color: 'var(--ink)',
                  }}
                >
                  ⚠ GET READY
                </Typography>
                <Typography sx={{ fontSize: 14, lineHeight: 1.5, color: 'var(--ink)' }}>
                  {isLastTeam ? (
                    <>
                      Round <strong>{state.currentRound + 1}</strong> is about to begin.{' '}
                      <strong>{nextTeam.name}</strong> will play next.
                    </>
                  ) : (
                    <>
                      <strong>{nextTeam.name}</strong> is up next.
                    </>
                  )}{' '}
                  The countdown will start immediately when you click below.
                </Typography>
              </Box>
              <Button
                fullWidth
                variant="contained"
                color="primary"
                size="large"
                onClick={() => dispatch({ type: 'NEXT_TEAM' })}
                sx={{ py: 2.5, fontSize: '1.125rem', boxShadow: '6px 6px 0 var(--ink)' }}
              >
                {isLastTeam ? 'Start Next Round' : 'Next Team'}
              </Button>
            </>
          )}
        </Paper>
      </Container>
    );
  }

  // ACTIVE ROUND
  const catColor = CATEGORY_COLORS[state.settings.category] ?? 'var(--lime)';

  return (
    <Box sx={{ minHeight: '100vh', py: 4 }}>
      <ResetButton />
      <Container maxWidth="md">
        {/* Header */}
        <Box
          sx={{
            mb: 2.5,
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            gap: 1.5,
          }}
        >
          <Chip
            label={`ROUND ${state.currentRound} / ${state.totalRounds}`}
            color="info"
          />
          <Typography
            sx={{
              fontFamily: '"Archivo Black", Impact, sans-serif',
              fontSize: 18,
              letterSpacing: '-0.02em',
            }}
          >
            {currentTeam.name}
          </Typography>
          <Chip
            color="warning"
            label={
              <Box component="span" sx={{ display: 'inline-flex', alignItems: 'center' }}>
                SCORE
                <Box
                  component="span"
                  sx={{
                    fontFamily: '"JetBrains Mono", monospace',
                    backgroundColor: 'var(--ink)',
                    color: 'var(--paper)',
                    padding: '2px 8px',
                    ml: 0.75,
                    border: '2px solid var(--ink)',
                  }}
                >
                  {currentTeam.score}
                </Box>
              </Box>
            }
          />
        </Box>

        {/* Timer card */}
        <Paper
          sx={{
            p: 0,
            mb: 2,
            overflow: 'hidden',
          }}
        >
          <Box sx={{ height: 10, backgroundColor: 'var(--ink)', position: 'relative' }}>
            <Box
              sx={{
                position: 'absolute',
                left: 0,
                top: 0,
                bottom: 0,
                width: `${progress}%`,
                backgroundColor: isWarning ? 'var(--magenta)' : 'var(--lime)',
                transition: 'width 1s linear',
              }}
            />
          </Box>
          <Box
            sx={{
              padding: '20px 24px',
              textAlign: 'center',
              backgroundColor: isWarning ? 'var(--magenta)' : 'background.paper',
              color: isWarning ? 'var(--paper)' : 'text.primary',
            }}
          >
            <Typography
              sx={{
                fontWeight: 700,
                fontSize: '0.75rem',
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
                color: isWarning ? 'rgba(255,255,255,0.85)' : 'text.secondary',
                mb: 0.5,
              }}
            >
              {isWarning ? 'Hurry!' : 'Time Left'}
            </Typography>
            <Typography
              className={isWarning ? 'cg-warn-flash' : ''}
              sx={{
                fontFamily: '"JetBrains Mono", monospace',
                fontWeight: 700,
                fontSize: 'clamp(3.5rem, 11vw, 6rem)',
                lineHeight: 1,
                letterSpacing: '-0.04em',
              }}
            >
              {formatTime(timeRemaining)}
            </Typography>
          </Box>
        </Paper>

        {/* Word card */}
        <Paper
          sx={{
            p: { xs: 4, sm: 6 },
            mb: 2.5,
            minHeight: 220,
            display: 'grid',
            placeItems: 'center',
            backgroundColor: 'var(--cobalt)',
            color: 'var(--paper)',
            borderColor: 'var(--ink)',
            boxShadow: '6px 6px 0 var(--ink)',
          }}
        >
          <Box sx={{ display: 'inline-flex', gap: 1, alignItems: 'center', mb: 2 }}>
            <Box
              sx={{
                width: 10,
                height: 10,
                backgroundColor: catColor,
                border: '2px solid var(--paper)',
              }}
            />
            <Typography
              sx={{
                fontWeight: 700,
                fontSize: '0.75rem',
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
                color: 'rgba(255,255,255,0.85)',
              }}
            >
              {state.settings.category} · {state.settings.difficulty}
            </Typography>
          </Box>
          <Typography
            sx={{
              fontFamily: '"Archivo Black", Impact, sans-serif',
              letterSpacing: '-0.02em',
              lineHeight: 0.95,
              fontSize: 'clamp(2.75rem, 7vw, 5rem)',
              textAlign: 'center',
              textWrap: 'balance' as never,
              wordBreak: 'break-word',
            }}
          >
            {state.currentWord || 'Loading…'}
          </Typography>
        </Paper>

        {/* Skip + Correct */}
        <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 1.5, mb: 1.5 }}>
          <Button
            variant="contained"
            color="error"
            size="large"
            startIcon={<ChevronsRight size={22} strokeWidth={2} />}
            onClick={handleSkip}
            disabled={isPaused}
            sx={{ py: 2.5, fontSize: '1.125rem', boxShadow: '6px 6px 0 var(--ink)' }}
          >
            Skip
          </Button>
          <Button
            variant="contained"
            color="primary"
            size="large"
            startIcon={<Check size={22} strokeWidth={2} />}
            onClick={handleCorrect}
            disabled={isPaused}
            sx={{ py: 2.5, fontSize: '1.125rem', boxShadow: '6px 6px 0 var(--ink)' }}
          >
            Correct!
          </Button>
        </Box>

        {/* Pause + End */}
        <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 1.5, mb: 4 }}>
          <Button
            variant="text"
            startIcon={
              isPaused ? <Play size={18} strokeWidth={2} /> : <Pause size={18} strokeWidth={2} />
            }
            onClick={isPaused ? resumeTimer : pauseTimer}
          >
            {isPaused ? 'Resume' : 'Pause'}
          </Button>
          <Button
            variant="text"
            startIcon={<Square size={18} strokeWidth={2} />}
            onClick={handleEndRound}
          >
            End Round
          </Button>
        </Box>

        {/* All Scores */}
        <Box>
          <Typography
            sx={{
              fontWeight: 700,
              fontSize: '0.75rem',
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              color: 'text.secondary',
              mb: 1,
            }}
          >
            All Scores
          </Typography>
          <Stack spacing={0}>
            {state.teams.map((team, index) => (
              <ScoreRow
                key={team.id}
                name={team.name}
                score={team.score}
                active={index === state.currentTeamIndex}
                stack={index > 0}
              />
            ))}
          </Stack>
        </Box>
      </Container>
    </Box>
  );
}

interface ScoreRowProps {
  name: string;
  score: number;
  active?: boolean;
  winner?: boolean;
  stack?: boolean;
}

function ScoreRow({ name, score, active, winner, stack }: ScoreRowProps) {
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '14px 18px',
        border: winner ? '4px solid var(--ink)' : '2px solid var(--ink)',
        borderTop: stack ? 0 : undefined,
        backgroundColor: winner
          ? 'var(--gold)'
          : active
            ? 'var(--yellow)'
            : 'background.paper',
      }}
    >
      <Typography
        sx={{
          fontFamily: '"Space Grotesk", sans-serif',
          fontWeight: 500,
          fontSize: 16,
          color: 'var(--ink)',
        }}
      >
        {name}
        {active && (
          <Box
            component="span"
            sx={{ ml: 1, fontFamily: '"JetBrains Mono", monospace', fontSize: 12 }}
          >
            ◀ ACTING
          </Box>
        )}
      </Typography>
      <Typography
        sx={{
          fontFamily: '"JetBrains Mono", monospace',
          fontWeight: 700,
          fontSize: 20,
          color: 'var(--ink)',
        }}
      >
        {score}
      </Typography>
    </Box>
  );
}
