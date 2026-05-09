import { useState } from 'react';
import {
  Box,
  Container,
  Typography,
  TextField,
  Button,
  Select,
  MenuItem,
  Paper,
  IconButton,
  Grid,
  Slider,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  DialogContentText,
  Chip,
} from '@mui/material';
import { Trash2, Plus, History, Play } from 'lucide-react';
import { useGame } from '../../context/GameContext';
import { Team, Difficulty } from '../../types/game.types';
import { getCategories } from '../../data/wordDatabase';
import { clearWordHistory } from '../../utils/wordHistory';
import { Logo } from '../common/Logo';

const DIFFICULTY_COLORS: Record<Difficulty, { bg: string; fg: string }> = {
  easy: { bg: 'var(--lime)', fg: 'var(--ink)' },
  medium: { bg: 'var(--yellow)', fg: 'var(--ink)' },
  hard: { bg: 'var(--magenta)', fg: 'var(--paper)' },
};

const formatTime = (s: number) =>
  `${Math.floor(s / 60)}:${(s % 60).toString().padStart(2, '0')}`;

export function GameSetup() {
  const { dispatch } = useGame();
  const [teams, setTeams] = useState<Team[]>([
    { id: '1', name: 'Team 1', score: 0 },
    { id: '2', name: 'Team 2', score: 0 },
  ]);
  const [category, setCategory] = useState('Movies');
  const [difficulty, setDifficulty] = useState<Difficulty>('medium');
  const [timerDuration, setTimerDuration] = useState(120);
  const [totalRounds, setTotalRounds] = useState(5);
  const [clearHistoryDialogOpen, setClearHistoryDialogOpen] = useState(false);

  const categories = getCategories();

  const handleAddTeam = () => {
    if (teams.length < 4) {
      const newId = (Math.max(...teams.map((t) => parseInt(t.id))) + 1).toString();
      setTeams([...teams, { id: newId, name: `Team ${newId}`, score: 0 }]);
    }
  };

  const handleRemoveTeam = (id: string) => {
    if (teams.length > 1) setTeams(teams.filter((team) => team.id !== id));
  };

  const handleTeamNameChange = (id: string, name: string) => {
    setTeams(teams.map((team) => (team.id === id ? { ...team, name } : team)));
  };

  const handleStartGame = () => {
    dispatch({
      type: 'START_GAME',
      payload: {
        teams,
        settings: { category, difficulty, timerDuration },
        totalRounds,
      },
    });
    dispatch({ type: 'START_COUNTDOWN' });
  };

  return (
    <Container maxWidth="md" sx={{ py: 5 }}>
      {/* Header */}
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          mb: 3,
        }}
      >
        <Logo size="lg" />
      </Box>

      <Paper sx={{ p: { xs: 3, sm: 4.5 } }}>
        <Typography
          variant="h1"
          sx={{
            fontSize: 'clamp(2.25rem, 5vw, 3rem)',
            mb: 1,
            textTransform: 'uppercase',
          }}
        >
          Charades Setup
        </Typography>
        <Typography sx={{ color: 'text.secondary', mb: 4 }}>
          Build your roster, pick a category, set the clock. Hit Start when the room is ready.
        </Typography>

        {/* Teams */}
        <Box sx={{ mb: 4 }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1.5 }}>
            <Typography variant="h3" sx={{ fontSize: '1.375rem', m: 0 }}>
              Teams
            </Typography>
            <Chip label={`${teams.length}/4`} />
          </Box>
          <Grid container spacing={1.25}>
            {teams.map((team) => (
              <Grid item xs={12} sm={6} key={team.id}>
                <Box sx={{ display: 'flex', gap: 1 }}>
                  <TextField
                    fullWidth
                    size="small"
                    placeholder={`Team ${team.id} Name`}
                    value={team.name}
                    onChange={(e) => handleTeamNameChange(team.id, e.target.value)}
                  />
                  {teams.length > 1 && (
                    <IconButton
                      onClick={() => handleRemoveTeam(team.id)}
                      aria-label="Remove team"
                      sx={{
                        flexShrink: 0,
                        border: '2px solid var(--ink)',
                        backgroundColor: 'var(--magenta)',
                        color: 'var(--paper)',
                        boxShadow: '3px 3px 0 var(--ink)',
                        width: 44,
                        height: 44,
                        '&:hover': {
                          backgroundColor: 'var(--magenta)',
                          boxShadow: '5px 5px 0 var(--ink)',
                          transform: 'translate(-2px,-2px)',
                        },
                        '&:active': {
                          boxShadow: '0 0 0 var(--ink)',
                          transform: 'translate(2px,2px)',
                        },
                      }}
                    >
                      <Trash2 size={18} strokeWidth={2} />
                    </IconButton>
                  )}
                </Box>
              </Grid>
            ))}
          </Grid>
          {teams.length < 4 && (
            <Button
              size="small"
              variant="contained"
              color="warning"
              startIcon={<Plus size={14} strokeWidth={2} />}
              onClick={handleAddTeam}
              sx={{ mt: 1.75 }}
            >
              Add Team
            </Button>
          )}
        </Box>

        {/* Category + Difficulty */}
        <Grid container spacing={2} sx={{ mb: 3.5 }}>
          <Grid item xs={12} sm={6}>
            <Typography
              sx={{
                fontWeight: 700,
                fontSize: '0.6875rem',
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
                color: 'text.secondary',
                mb: 0.75,
              }}
            >
              Category
            </Typography>
            <Select
              fullWidth
              size="small"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              {categories.map((cat) => (
                <MenuItem key={cat} value={cat}>
                  {cat}
                </MenuItem>
              ))}
            </Select>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Typography
              sx={{
                fontWeight: 700,
                fontSize: '0.6875rem',
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
                color: 'text.secondary',
                mb: 0.75,
              }}
            >
              Difficulty
            </Typography>
            <Box sx={{ display: 'flex', border: '2px solid var(--ink)' }}>
              {(['easy', 'medium', 'hard'] as Difficulty[]).map((d, i) => {
                const active = difficulty === d;
                const colors = DIFFICULTY_COLORS[d];
                return (
                  <Box
                    component="button"
                    key={d}
                    type="button"
                    onClick={() => setDifficulty(d)}
                    sx={{
                      flex: 1,
                      padding: '12px 8px',
                      border: 'none',
                      borderRight: i !== 2 ? '2px solid var(--ink)' : 'none',
                      backgroundColor: active ? colors.bg : 'var(--paper)',
                      color: active ? colors.fg : 'var(--ink)',
                      fontFamily: '"Space Grotesk", sans-serif',
                      fontWeight: 700,
                      fontSize: 12,
                      letterSpacing: '0.12em',
                      textTransform: 'uppercase',
                      cursor: 'pointer',
                      transition: 'background 120ms ease, color 120ms ease',
                    }}
                  >
                    {d}
                  </Box>
                );
              })}
            </Box>
          </Grid>
        </Grid>

        {/* Timer */}
        <Box sx={{ mb: 3 }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
            <Typography
              sx={{
                fontWeight: 700,
                fontSize: '0.75rem',
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
                color: 'text.secondary',
              }}
            >
              Timer Duration
            </Typography>
            <Typography
              sx={{ fontFamily: '"JetBrains Mono", monospace', fontWeight: 700, fontSize: 18 }}
            >
              {formatTime(timerDuration)}
            </Typography>
          </Box>
          <Slider
            value={timerDuration}
            onChange={(_, value) => setTimerDuration(value as number)}
            min={30}
            max={300}
            step={30}
            marks={[
              { value: 30, label: '0:30' },
              { value: 60, label: '1:00' },
              { value: 120, label: '2:00' },
              { value: 180, label: '3:00' },
              { value: 240, label: '4:00' },
              { value: 300, label: '5:00' },
            ]}
            valueLabelDisplay="auto"
            valueLabelFormat={(v) => formatTime(v)}
          />
        </Box>

        {/* Rounds */}
        <Box sx={{ mb: 4 }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
            <Typography
              sx={{
                fontWeight: 700,
                fontSize: '0.75rem',
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
                color: 'text.secondary',
              }}
            >
              Total Rounds
            </Typography>
            <Typography
              sx={{ fontFamily: '"JetBrains Mono", monospace', fontWeight: 700, fontSize: 18 }}
            >
              {totalRounds}
            </Typography>
          </Box>
          <Slider
            value={totalRounds}
            onChange={(_, value) => setTotalRounds(value as number)}
            min={1}
            max={20}
            step={1}
            marks={[
              { value: 1, label: '1' },
              { value: 5, label: '5' },
              { value: 10, label: '10' },
              { value: 15, label: '15' },
              { value: 20, label: '20' },
            ]}
            valueLabelDisplay="auto"
          />
        </Box>

        {/* Start Button */}
        <Button
          fullWidth
          variant="contained"
          color="primary"
          size="large"
          startIcon={<Play size={22} strokeWidth={2} />}
          onClick={handleStartGame}
          sx={{ py: 2.5, fontSize: '1.125rem', boxShadow: '6px 6px 0 var(--ink)' }}
        >
          Start Game
        </Button>

        {/* Clear History */}
        <Button
          fullWidth
          variant="text"
          size="small"
          startIcon={<History size={14} strokeWidth={2} />}
          onClick={() => setClearHistoryDialogOpen(true)}
          sx={{ mt: 1.5 }}
        >
          Clear Word History
        </Button>
      </Paper>

      {/* Clear History Confirmation Dialog */}
      <Dialog
        open={clearHistoryDialogOpen}
        onClose={() => setClearHistoryDialogOpen(false)}
      >
        <DialogTitle>Clear Word History?</DialogTitle>
        <DialogContent>
          <DialogContentText sx={{ color: 'text.primary' }}>
            This will permanently delete all previously used words from the history. You will start
            seeing words you've already played in recent sessions. This action cannot be undone.
          </DialogContentText>
        </DialogContent>
        <DialogActions sx={{ px: 3, pb: 2.5, gap: 1 }}>
          <Button variant="text" onClick={() => setClearHistoryDialogOpen(false)}>
            Cancel
          </Button>
          <Button
            variant="contained"
            color="warning"
            onClick={() => {
              clearWordHistory();
              setClearHistoryDialogOpen(false);
            }}
          >
            Clear History
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
}
