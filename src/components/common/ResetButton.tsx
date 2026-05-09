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
import { RotateCcw } from 'lucide-react';
import { useGame } from '../../context/GameContext';

interface ResetButtonProps {
  onDark?: boolean;
}

export function ResetButton({ onDark = false }: ResetButtonProps) {
  const { dispatch } = useGame();
  const [open, setOpen] = useState(false);

  const handleConfirm = () => {
    dispatch({ type: 'RESET_GAME' });
    setOpen(false);
  };

  const baseSx = {
    position: 'fixed' as const,
    top: 16,
    right: 16,
    zIndex: 1000,
    width: 44,
    height: 44,
    borderRadius: '9999px',
    border: '2px solid',
    borderColor: onDark ? 'var(--paper)' : 'var(--ink)',
    backgroundColor: onDark ? 'rgba(255,255,255,0.12)' : 'var(--paper)',
    color: onDark ? 'var(--paper)' : 'var(--ink)',
    boxShadow: onDark ? '4px 4px 0 var(--paper)' : '4px 4px 0 var(--ink)',
    transition: 'transform 120ms cubic-bezier(0.2,0,0,1), box-shadow 120ms cubic-bezier(0.2,0,0,1)',
    '&:hover': {
      backgroundColor: 'var(--magenta)',
      color: 'var(--paper)',
      borderColor: onDark ? 'var(--paper)' : 'var(--ink)',
      boxShadow: onDark ? '6px 6px 0 var(--paper)' : '6px 6px 0 var(--ink)',
      transform: 'translate(-2px,-2px)',
    },
    '&:active': {
      boxShadow: '0 0 0 var(--ink)',
      transform: 'translate(2px,2px)',
    },
  };

  return (
    <>
      <Tooltip title="Reset Game">
        <IconButton onClick={() => setOpen(true)} sx={baseSx} aria-label="Reset Game">
          <RotateCcw size={18} strokeWidth={2} />
        </IconButton>
      </Tooltip>

      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle>Reset Game?</DialogTitle>
        <DialogContent>
          <Typography>
            Are you sure you want to reset the game? All progress will be lost and you'll return to
            the setup screen.
          </Typography>
        </DialogContent>
        <DialogActions sx={{ px: 3, pb: 2.5, gap: 1 }}>
          <Button variant="text" onClick={() => setOpen(false)}>
            Cancel
          </Button>
          <Button variant="contained" color="error" onClick={handleConfirm}>
            Reset Game
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
