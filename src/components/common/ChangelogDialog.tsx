import {
  Dialog,
  DialogTitle,
  DialogContent,
  IconButton,
  Typography,
  Box,
  Chip,
  List,
  ListItem,
  ListItemText,
  Divider,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { changelog } from '../../data/changelog';

interface ChangelogDialogProps {
  open: boolean;
  onClose: () => void;
}

export function ChangelogDialog({ open, onClose }: ChangelogDialogProps) {
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
        {changelog.map((entry, index) => (
          <Box key={entry.version} sx={{ mb: index < changelog.length - 1 ? 4 : 0 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
              <Chip
                label={`v${entry.version}`}
                color="primary"
                size="small"
              />
              <Typography variant="body2" color="text.secondary">
                {new Date(entry.date).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })}
              </Typography>
            </Box>

            {entry.changes.added && entry.changes.added.length > 0 && (
              <Box sx={{ mb: 2 }}>
                <Typography variant="subtitle2" color="success.main" sx={{ mb: 1 }}>
                  Added
                </Typography>
                <List dense>
                  {entry.changes.added.map((change, i) => (
                    <ListItem key={i} sx={{ py: 0.5, pl: 2 }}>
                      <ListItemText
                        primary={change}
                        primaryTypographyProps={{
                          variant: 'body2',
                        }}
                      />
                    </ListItem>
                  ))}
                </List>
              </Box>
            )}

            {entry.changes.changed && entry.changes.changed.length > 0 && (
              <Box sx={{ mb: 2 }}>
                <Typography variant="subtitle2" color="info.main" sx={{ mb: 1 }}>
                  Changed
                </Typography>
                <List dense>
                  {entry.changes.changed.map((change, i) => (
                    <ListItem key={i} sx={{ py: 0.5, pl: 2 }}>
                      <ListItemText
                        primary={change}
                        primaryTypographyProps={{
                          variant: 'body2',
                        }}
                      />
                    </ListItem>
                  ))}
                </List>
              </Box>
            )}

            {entry.changes.fixed && entry.changes.fixed.length > 0 && (
              <Box sx={{ mb: 2 }}>
                <Typography variant="subtitle2" color="warning.main" sx={{ mb: 1 }}>
                  Fixed
                </Typography>
                <List dense>
                  {entry.changes.fixed.map((change, i) => (
                    <ListItem key={i} sx={{ py: 0.5, pl: 2 }}>
                      <ListItemText
                        primary={change}
                        primaryTypographyProps={{
                          variant: 'body2',
                        }}
                      />
                    </ListItem>
                  ))}
                </List>
              </Box>
            )}

            {entry.changes.removed && entry.changes.removed.length > 0 && (
              <Box sx={{ mb: 2 }}>
                <Typography variant="subtitle2" color="error.main" sx={{ mb: 1 }}>
                  Removed
                </Typography>
                <List dense>
                  {entry.changes.removed.map((change, i) => (
                    <ListItem key={i} sx={{ py: 0.5, pl: 2 }}>
                      <ListItemText
                        primary={change}
                        primaryTypographyProps={{
                          variant: 'body2',
                        }}
                      />
                    </ListItem>
                  ))}
                </List>
              </Box>
            )}

            {entry.changes.security && entry.changes.security.length > 0 && (
              <Box sx={{ mb: 2 }}>
                <Typography variant="subtitle2" color="error.main" sx={{ mb: 1 }}>
                  Security
                </Typography>
                <List dense>
                  {entry.changes.security.map((change, i) => (
                    <ListItem key={i} sx={{ py: 0.5, pl: 2 }}>
                      <ListItemText
                        primary={change}
                        primaryTypographyProps={{
                          variant: 'body2',
                        }}
                      />
                    </ListItem>
                  ))}
                </List>
              </Box>
            )}

            {index < changelog.length - 1 && <Divider sx={{ mt: 2 }} />}
          </Box>
        ))}
      </DialogContent>
    </Dialog>
  );
}
