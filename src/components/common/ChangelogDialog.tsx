import {
  Dialog,
  DialogTitle,
  DialogContent,
  IconButton,
  Typography,
  Box,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import ReactMarkdown from 'react-markdown';
import changelogMd from '../../../CHANGELOG.md?raw';

interface ChangelogDialogProps {
  open: boolean;
  onClose: () => void;
}

export function ChangelogDialog({ open, onClose }: ChangelogDialogProps) {
  // Customize react-markdown components for better styling
  const markdownComponents = {
    h1: ({ children }: { children?: React.ReactNode }) => (
      <Typography variant="h4" component="h1" sx={{ mt: 2, mb: 1 }}>
        {children}
      </Typography>
    ),
    h2: ({ children }: { children?: React.ReactNode }) => (
      <Typography variant="h5" component="h2" sx={{ mt: 3, mb: 1 }}>
        {children}
      </Typography>
    ),
    h3: ({ children }: { children?: React.ReactNode }) => {
      // Determine color based on section heading
      const text = typeof children === 'string' ? children : '';
      let color = 'text.primary';

      if (text.includes('Added')) color = 'success.main';
      else if (text.includes('Changed')) color = 'info.main';
      else if (text.includes('Fixed')) color = 'warning.main';
      else if (text.includes('Removed')) color = 'error.main';
      else if (text.includes('Security')) color = 'error.main';

      return (
        <Typography variant="h6" component="h3" sx={{ mt: 2, mb: 1, color }}>
          {children}
        </Typography>
      );
    },
    ul: ({ children }: { children?: React.ReactNode }) => (
      <ul style={{ marginTop: '8px', marginBottom: '8px', paddingLeft: '24px' }}>
        {children}
      </ul>
    ),
    li: ({ children }: { children?: React.ReactNode }) => (
      <li style={{ marginBottom: '4px' }}>
        <Typography variant="body2" component="span">
          {children}
        </Typography>
      </li>
    ),
    a: ({ href, children }: { href?: string; children?: React.ReactNode }) => (
      <a href={href} target="_blank" rel="noopener noreferrer" style={{ color: 'inherit', textDecoration: 'underline' }}>
        {children}
      </a>
    ),
    code: ({ children }: { children?: React.ReactNode }) => (
      <code style={{
        backgroundColor: 'rgba(0, 0, 0, 0.1)',
        padding: '2px 4px',
        borderRadius: '3px',
        fontFamily: 'monospace',
        fontSize: '0.9em'
      }}>
        {children}
      </code>
    ),
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="md"
      fullWidth
      PaperProps={{
        sx: {
          maxHeight: '80vh',
        },
      }}
    >
      <DialogTitle sx={{ m: 0, p: 2, pr: 6 }}>
        <Typography variant="h5" component="div">
          What's New
        </Typography>
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent dividers>
        <Box sx={{ '& > *:first-of-type': { mt: 0 } }}>
          <ReactMarkdown components={markdownComponents}>{changelogMd}</ReactMarkdown>
        </Box>
      </DialogContent>
    </Dialog>
  );
}
