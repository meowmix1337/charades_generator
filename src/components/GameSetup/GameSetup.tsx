import { useState } from 'react';
import {
  Box,
  Container,
  Typography,
  TextField,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Paper,
  IconButton,
  Grid,
  Slider,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import { useGame } from '../../context/GameContext';
import { Team, Difficulty } from '../../types/game.types';
import { getCategories } from '../../data/wordDatabase';

export function GameSetup() {
  const { dispatch } = useGame();
  const [teams, setTeams] = useState<Team[]>([
    { id: '1', name: 'Team 1', score: 0 },
    { id: '2', name: 'Team 2', score: 0 },
  ]);
  const [category, setCategory] = useState('Movies');
  const [difficulty, setDifficulty] = useState<Difficulty>('medium');
  const [timerDuration, setTimerDuration] = useState(120); // in seconds
  const [totalRounds, setTotalRounds] = useState(5);

  const categories = getCategories();

  const handleAddTeam = () => {
    if (teams.length < 4) {
      const newId = (Math.max(...teams.map(t => parseInt(t.id))) + 1).toString();
      setTeams([...teams, { id: newId, name: `Team ${newId}`, score: 0 }]);
    }
  };

  const handleRemoveTeam = (id: string) => {
    if (teams.length > 1) {
      setTeams(teams.filter(team => team.id !== id));
    }
  };

  const handleTeamNameChange = (id: string, name: string) => {
    setTeams(teams.map(team => team.id === id ? { ...team, name } : team));
  };

  const handleStartGame = () => {
    dispatch({
      type: 'START_GAME',
      payload: {
        teams,
        settings: {
          category,
          difficulty,
          timerDuration,
        },
        totalRounds,
      },
    });
    dispatch({ type: 'START_COUNTDOWN' });
    // The first word will be set when countdown completes
  };

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Paper elevation={3} sx={{ p: 4 }}>
        <Typography variant="h3" component="h1" gutterBottom align="center" sx={{ mb: 4 }}>
          Charades Setup
        </Typography>

        {/* Teams Setup */}
        <Box sx={{ mb: 4 }}>
          <Typography variant="h5" gutterBottom>
            Teams ({teams.length}/4)
          </Typography>
          <Grid container spacing={2}>
            {teams.map((team) => (
              <Grid item xs={12} sm={6} key={team.id}>
                <Box sx={{ display: 'flex', gap: 1 }}>
                  <TextField
                    fullWidth
                    label={`Team ${team.id} Name`}
                    value={team.name}
                    onChange={(e) => handleTeamNameChange(team.id, e.target.value)}
                  />
                  {teams.length > 1 && (
                    <IconButton
                      color="error"
                      onClick={() => handleRemoveTeam(team.id)}
                      sx={{ flexShrink: 0 }}
                    >
                      <DeleteIcon />
                    </IconButton>
                  )}
                </Box>
              </Grid>
            ))}
          </Grid>
          {teams.length < 4 && (
            <Button
              startIcon={<AddIcon />}
              onClick={handleAddTeam}
              sx={{ mt: 2 }}
              variant="outlined"
            >
              Add Team
            </Button>
          )}
        </Box>

        {/* Category Selection */}
        <Box sx={{ mb: 4 }}>
          <FormControl fullWidth>
            <InputLabel>Category</InputLabel>
            <Select
              value={category}
              label="Category"
              onChange={(e) => setCategory(e.target.value)}
            >
              {categories.map((cat) => (
                <MenuItem key={cat} value={cat}>
                  {cat}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>

        {/* Difficulty Selection */}
        <Box sx={{ mb: 4 }}>
          <FormControl fullWidth>
            <InputLabel>Difficulty</InputLabel>
            <Select
              value={difficulty}
              label="Difficulty"
              onChange={(e) => setDifficulty(e.target.value as Difficulty)}
            >
              <MenuItem value="easy">Easy</MenuItem>
              <MenuItem value="medium">Medium</MenuItem>
              <MenuItem value="hard">Hard</MenuItem>
            </Select>
          </FormControl>
        </Box>

        {/* Timer Duration */}
        <Box sx={{ mb: 4 }}>
          <Typography gutterBottom>
            Timer Duration: {Math.floor(timerDuration / 60)}:{(timerDuration % 60).toString().padStart(2, '0')}
          </Typography>
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
            valueLabelFormat={(value) => `${Math.floor(value / 60)}:${(value % 60).toString().padStart(2, '0')}`}
          />
        </Box>

        {/* Total Rounds */}
        <Box sx={{ mb: 4 }}>
          <Typography gutterBottom>
            Total Rounds: {totalRounds}
          </Typography>
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
          size="large"
          onClick={handleStartGame}
          sx={{ mt: 2, py: 2 }}
        >
          Start Game
        </Button>
      </Paper>
    </Container>
  );
}
