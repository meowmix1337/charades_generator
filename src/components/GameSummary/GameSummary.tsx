import { Box, Container, Typography, Button, Paper } from '@mui/material';
import { Trophy } from 'lucide-react';
import { useGame } from '../../context/GameContext';
import { ResetButton } from '../common/ResetButton';

const CONFETTI_COLORS = [
  '#C6FF3D',
  '#FF2E63',
  '#FFE600',
  '#1F3DFF',
  '#FFB800',
  '#FF7A1A',
  '#00C2A8',
];

export function GameSummary() {
  const { state, dispatch } = useGame();

  const sortedTeams = [...state.teams].sort((a, b) => b.score - a.score);
  const maxScore = sortedTeams[0]?.score || 0;
  const winners = sortedTeams.filter((team) => team.score === maxScore);
  const tie = winners.length > 1;

  const confetti = Array.from({ length: 36 }, (_, i) => ({
    left: `${(i * 2.83) % 100}%`,
    cx: `${((i % 5) - 2) * 12}px`,
    color: CONFETTI_COLORS[i % CONFETTI_COLORS.length],
    delay: `${(i * 0.12) % 2.6}s`,
    rot: `${((i * 37) % 90) - 45}deg`,
    w: i % 3 === 0 ? 18 : 12,
    h: i % 4 === 0 ? 8 : 22,
  }));

  return (
    <Box
      sx={{
        minHeight: '100vh',
        backgroundColor: 'var(--ink)',
        backgroundImage: 'none',
        py: 5,
        px: 2,
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Confetti */}
      {confetti.map((c, i) => (
        <Box
          key={i}
          className="cg-confetti"
          sx={{
            left: c.left,
            backgroundColor: c.color,
            width: c.w,
            height: c.h,
            animationDelay: c.delay,
            transform: `rotate(${c.rot})`,
            ['--cx' as never]: c.cx,
          }}
        />
      ))}

      <ResetButton onDark />
      <Container maxWidth="md" sx={{ position: 'relative' }}>
        <Paper
          sx={{
            p: { xs: 3, sm: 5 },
            backgroundColor: 'var(--ink)',
            color: 'var(--paper)',
            borderColor: 'var(--paper)',
            boxShadow: '8px 8px 0 var(--lime)',
          }}
        >
          {/* Winner */}
          <Box sx={{ textAlign: 'center', mb: 3.5, position: 'relative' }}>
            <Box
              sx={{
                position: 'absolute',
                top: 64,
                left: '50%',
                width: 360,
                height: 360,
                transform: 'translate(-50%,-50%)',
                background:
                  'conic-gradient(from 0deg, var(--gold) 0 20deg, transparent 20deg 40deg, var(--magenta) 40deg 60deg, transparent 60deg 80deg, var(--lime) 80deg 100deg, transparent 100deg 120deg, var(--yellow) 120deg 140deg, transparent 140deg 160deg, var(--cobalt) 160deg 180deg, transparent 180deg 200deg, var(--gold) 200deg 220deg, transparent 220deg 240deg, var(--magenta) 240deg 260deg, transparent 260deg 280deg, var(--lime) 280deg 300deg, transparent 300deg 320deg, var(--yellow) 320deg 340deg, transparent 340deg 360deg)',
                opacity: 0.55,
                animation: 'cg-burst-rays 1.2s var(--ease-enter) forwards',
                pointerEvents: 'none',
              }}
            />
            <Box
              className="cg-trophy-pop"
              sx={{
                position: 'relative',
                width: 128,
                height: 128,
                mx: 'auto',
                mb: 2.5,
                backgroundColor: 'var(--gold)',
                border: '3px solid var(--paper)',
                display: 'grid',
                placeItems: 'center',
                boxShadow: '8px 8px 0 var(--magenta), -8px -8px 0 var(--lime)',
              }}
            >
              <Trophy size={72} strokeWidth={2} color="#0A0A0B" />
            </Box>
            <Typography
              sx={{
                fontWeight: 700,
                fontSize: '0.75rem',
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
                color: 'var(--lime)',
                mb: 1,
                position: 'relative',
              }}
            >
              ★ ★ ★&nbsp;&nbsp;Game Over&nbsp;&nbsp;★ ★ ★
            </Typography>
            <Typography
              variant="h1"
              className="cg-title-shake"
              sx={{
                fontSize: 'clamp(3rem, 9vw, 5.5rem)',
                color: 'var(--gold)',
                mb: 1,
                textShadow: '4px 4px 0 var(--magenta), 8px 8px 0 var(--cobalt)',
                position: 'relative',
                textTransform: 'uppercase',
              }}
            >
              {tie ? "It's a Tie!" : `${winners[0].name} Wins!`}
            </Typography>
            {tie && (
              <Typography
                sx={{ color: 'rgba(255,255,255,0.72)', fontSize: 16, position: 'relative' }}
              >
                Winners: {winners.map((w) => w.name).join(', ')}
              </Typography>
            )}
          </Box>

          <Box
            sx={{
              borderTop: '2px solid var(--paper)',
              mx: { xs: -3, sm: -5 },
              mb: 3.5,
            }}
          />

          <Typography
            sx={{
              fontWeight: 700,
              fontSize: '0.75rem',
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              color: 'rgba(255,255,255,0.7)',
              mb: 1.5,
              textAlign: 'center',
            }}
          >
            Final Scores
          </Typography>

          {/* Final scores */}
          <Box sx={{ mb: 3.5 }}>
            {sortedTeams.map((team, i) => {
              const isWinner = team.score === maxScore;
              const stacked = i > 0;
              return (
                <Box
                  key={team.id}
                  sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    padding: '14px 18px',
                    border: isWinner ? '4px solid var(--paper)' : '2px solid var(--paper)',
                    borderTop: stacked ? 0 : undefined,
                    backgroundColor: isWinner ? 'var(--gold)' : 'var(--paper)',
                    color: 'var(--ink)',
                  }}
                >
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                    <Typography
                      sx={{
                        fontFamily: '"Archivo Black", Impact, sans-serif',
                        fontSize: 28,
                        letterSpacing: '-0.02em',
                        minWidth: 28,
                      }}
                    >
                      {i + 1}
                    </Typography>
                    <Box>
                      <Typography sx={{ fontWeight: 700, fontSize: 16 }}>{team.name}</Typography>
                      {isWinner && (
                        <Typography
                          sx={{
                            fontWeight: 700,
                            fontSize: 10,
                            letterSpacing: '0.12em',
                            textTransform: 'uppercase',
                            opacity: 0.7,
                          }}
                        >
                          {tie ? 'Co-Champion' : 'Champion'}
                        </Typography>
                      )}
                    </Box>
                  </Box>
                  <Typography
                    sx={{
                      fontFamily: '"JetBrains Mono", monospace',
                      fontWeight: 700,
                      fontSize: 28,
                    }}
                  >
                    {team.score}
                  </Typography>
                </Box>
              );
            })}
          </Box>

          {/* Stats */}
          <Box
            sx={{
              backgroundColor: 'var(--ink-2, #1A1A1D)',
              border: '2px solid var(--paper)',
              padding: 2.5,
              mb: 3,
            }}
          >
            <Typography
              sx={{
                fontWeight: 700,
                fontSize: '0.75rem',
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
                color: 'rgba(255,255,255,0.7)',
                mb: 1.25,
              }}
            >
              Game Stats
            </Typography>
            {[
              ['Category', state.settings.category, false],
              [
                'Difficulty',
                state.settings.difficulty.charAt(0).toUpperCase() +
                  state.settings.difficulty.slice(1),
                false,
              ],
              ['Rounds Played', state.totalRounds, true],
              ['Total Words Used', state.usedWords.length, true],
            ].map(([k, v, mono]) => (
              <Box
                key={k as string}
                sx={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  py: 1,
                  borderBottom: '1px solid rgba(255,255,255,0.16)',
                  '&:last-child': { borderBottom: 'none' },
                }}
              >
                <Typography sx={{ color: 'rgba(255,255,255,0.72)' }}>{k as string}</Typography>
                <Typography
                  sx={{
                    fontWeight: 700,
                    fontFamily: mono ? '"JetBrains Mono", monospace' : 'inherit',
                  }}
                >
                  {v}
                </Typography>
              </Box>
            ))}
          </Box>

          <Button
            fullWidth
            variant="contained"
            color="primary"
            size="large"
            onClick={() => dispatch({ type: 'RESET_GAME' })}
            sx={{ py: 2.5, fontSize: '1.125rem', boxShadow: '6px 6px 0 var(--paper)' }}
          >
            Play Again
          </Button>
        </Paper>
      </Container>
    </Box>
  );
}
