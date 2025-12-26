import {
  Box,
  Container,
  Typography,
  Button,
  Paper,
  Stack,
  Divider,
} from '@mui/material';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import RestartAltIcon from '@mui/icons-material/RestartAlt';
import { useGame } from '../../context/GameContext';
import { ResetButton } from '../common/ResetButton';

export function GameSummary() {
  const { state, dispatch } = useGame();

  const sortedTeams = [...state.teams].sort((a, b) => b.score - a.score);
  const maxScore = sortedTeams[0]?.score || 0;
  const winners = sortedTeams.filter((team) => team.score === maxScore);

  const handlePlayAgain = () => {
    dispatch({ type: 'RESET_GAME' });
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        py: 4,
      }}
    >
      <ResetButton />
      <Container maxWidth="md">
        <Paper elevation={6} sx={{ p: 4 }}>
          {/* Winner Announcement */}
          <Box sx={{ textAlign: 'center', mb: 4 }}>
            <EmojiEventsIcon
              sx={{
                fontSize: 80,
                color: 'gold',
                mb: 2,
                animation: 'bounce 1s ease-in-out infinite',
                '@keyframes bounce': {
                  '0%, 100%': {
                    transform: 'translateY(0)',
                  },
                  '50%': {
                    transform: 'translateY(-20px)',
                  },
                },
              }}
            />
            <Typography variant="h3" component="h1" gutterBottom fontWeight="bold">
              Game Over!
            </Typography>
            {winners.length === 1 ? (
              <Typography variant="h4" color="primary" gutterBottom>
                {winners[0].name} Wins!
              </Typography>
            ) : (
              <Typography variant="h4" color="primary" gutterBottom>
                It's a Tie!
              </Typography>
            )}
            {winners.length > 1 && (
              <Typography variant="h6" color="text.secondary">
                Winners: {winners.map((w) => w.name).join(', ')}
              </Typography>
            )}
          </Box>

          <Divider sx={{ my: 3 }} />

          {/* Final Scores */}
          <Box sx={{ mb: 4 }}>
            <Typography variant="h5" gutterBottom align="center" sx={{ mb: 3 }}>
              Final Scores
            </Typography>
            <Stack spacing={2}>
              {sortedTeams.map((team, index) => {
                const isWinner = team.score === maxScore;
                return (
                  <Paper
                    key={team.id}
                    elevation={isWinner ? 4 : 1}
                    sx={{
                      p: 3,
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      bgcolor: isWinner ? 'gold' : 'background.paper',
                      border: isWinner ? '3px solid #FFD700' : 'none',
                      position: 'relative',
                    }}
                  >
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                      <Typography
                        variant="h4"
                        sx={{
                          fontWeight: 'bold',
                          color: isWinner ? 'text.primary' : 'text.secondary',
                          minWidth: 40,
                        }}
                      >
                        {index + 1}
                      </Typography>
                      <Box>
                        <Typography variant="h6" fontWeight="bold">
                          {team.name}
                        </Typography>
                        {isWinner && (
                          <Typography variant="caption" color="text.secondary">
                            Champion!
                          </Typography>
                        )}
                      </Box>
                    </Box>
                    <Typography
                      variant="h4"
                      fontWeight="bold"
                      sx={{
                        color: isWinner ? 'primary.main' : 'text.primary',
                      }}
                    >
                      {team.score}
                    </Typography>
                  </Paper>
                );
              })}
            </Stack>
          </Box>

          {/* Game Stats */}
          <Paper elevation={1} sx={{ p: 3, mb: 4, bgcolor: 'grey.50' }}>
            <Typography variant="h6" gutterBottom>
              Game Statistics
            </Typography>
            <Stack spacing={1}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <Typography variant="body1">Category:</Typography>
                <Typography variant="body1" fontWeight="bold">
                  {state.settings.category}
                </Typography>
              </Box>
              <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <Typography variant="body1">Difficulty:</Typography>
                <Typography variant="body1" fontWeight="bold">
                  {state.settings.difficulty.charAt(0).toUpperCase() + state.settings.difficulty.slice(1)}
                </Typography>
              </Box>
              <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <Typography variant="body1">Rounds Played:</Typography>
                <Typography variant="body1" fontWeight="bold">
                  {state.totalRounds}
                </Typography>
              </Box>
              <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <Typography variant="body1">Total Words Used:</Typography>
                <Typography variant="body1" fontWeight="bold">
                  {state.usedWords.length}
                </Typography>
              </Box>
            </Stack>
          </Paper>

          {/* Play Again Button */}
          <Button
            fullWidth
            variant="contained"
            size="large"
            startIcon={<RestartAltIcon />}
            onClick={handlePlayAgain}
            sx={{ py: 2 }}
          >
            Play Again
          </Button>
        </Paper>
      </Container>
    </Box>
  );
}
