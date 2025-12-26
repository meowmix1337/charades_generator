import { useState } from 'react';
import {
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  Tooltip,
} from '@mui/material';
import RestartAltIcon from '@mui/icons-material/RestartAlt';
import { useGame } from '../../context/GameContext';

export function ResetButton() {
  const { dispatch } = useGame();
  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleConfirm = () => {
    dispatch({ type: 'RESET_GAME' });
    handleClose();
  };

  return (
    <>
      <Tooltip title="Reset Game">
        <IconButton
          onClick={handleOpen}
          color="inherit"
          sx={{
            position: 'fixed',
            top: 16,
            right: 16,
            bgcolor: 'rgba(0, 0, 0, 0.1)',
            '&:hover': {
              bgcolor: 'rgba(0, 0, 0, 0.2)',
            },
            zIndex: 1000,
          }}
        >
          <RestartAltIcon />
        </IconButton>
      </Tooltip>

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Reset Game?</DialogTitle>
        <DialogContent>
          <Typography>
            Are you sure you want to reset the game? All progress will be lost and you'll return to the setup screen.
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleConfirm} color="error" variant="contained">
            Reset Game
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
