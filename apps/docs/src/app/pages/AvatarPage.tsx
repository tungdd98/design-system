import React from 'react';
import { Avatar, Typography } from '@design-system/ui-components';
import { Box, Stack, Paper, Divider } from '@mui/material';
import {
  Person as PersonIcon,
  PhotoCamera as PhotoCameraIcon,
  Folder as FolderIcon,
} from '@mui/icons-material';

export const AvatarPage: React.FC = () => {
  return (
    <Box>
      <Typography variant="h3" gutterBottom>
        Avatar
      </Typography>

      <Typography variant="body1" paragraph>
        Avatars are used to display user profile images, initials, or icons. They support multiple sizes and variants.
      </Typography>

      <Divider sx={{ my: 4 }} />

      {/* Image Avatars */}
      <Paper sx={{ p: 3, mb: 3 }}>
        <Typography variant="h5" gutterBottom>
          Image Avatars
        </Typography>
        <Typography variant="body2" paragraph color="text.secondary">
          Display user profile images with the <code>src</code> prop.
        </Typography>
        <Stack direction="row" spacing={2} alignItems="center">
          <Avatar
            src="https://i.pravatar.cc/150?img=1"
            alt="User 1"
          />
          <Avatar
            src="https://i.pravatar.cc/150?img=2"
            alt="User 2"
          />
          <Avatar
            src="https://i.pravatar.cc/150?img=3"
            alt="User 3"
          />
        </Stack>
      </Paper>

      {/* Letter Avatars */}
      <Paper sx={{ p: 3, mb: 3 }}>
        <Typography variant="h5" gutterBottom>
          Letter Avatars
        </Typography>
        <Typography variant="body2" paragraph color="text.secondary">
          Display user initials when no image is available.
        </Typography>
        <Stack direction="row" spacing={2} alignItems="center">
          <Avatar>JD</Avatar>
          <Avatar sx={{ bgcolor: 'secondary.main' }}>SA</Avatar>
          <Avatar sx={{ bgcolor: 'success.main' }}>MK</Avatar>
          <Avatar sx={{ bgcolor: 'warning.main' }}>TC</Avatar>
        </Stack>
      </Paper>

      {/* Icon Avatars */}
      <Paper sx={{ p: 3, mb: 3 }}>
        <Typography variant="h5" gutterBottom>
          Icon Avatars
        </Typography>
        <Typography variant="body2" paragraph color="text.secondary">
          Use icons for system-related avatars or placeholders.
        </Typography>
        <Stack direction="row" spacing={2} alignItems="center">
          <Avatar>
            <PersonIcon />
          </Avatar>
          <Avatar sx={{ bgcolor: 'secondary.main' }}>
            <PhotoCameraIcon />
          </Avatar>
          <Avatar sx={{ bgcolor: 'success.main' }}>
            <FolderIcon />
          </Avatar>
        </Stack>
      </Paper>

      {/* Sizes */}
      <Paper sx={{ p: 3, mb: 3 }}>
        <Typography variant="h5" gutterBottom>
          Sizes
        </Typography>
        <Typography variant="body2" paragraph color="text.secondary">
          Three size variants: small (32px), medium (40px), and large (56px).
        </Typography>
        <Stack direction="row" spacing={2} alignItems="center">
          <Avatar size="small" src="https://i.pravatar.cc/150?img=4" alt="Small" />
          <Avatar size="medium" src="https://i.pravatar.cc/150?img=5" alt="Medium" />
          <Avatar size="large" src="https://i.pravatar.cc/150?img=6" alt="Large" />
        </Stack>
        <Box sx={{ mt: 2 }}>
          <Typography variant="body2" color="text.secondary">
            With initials:
          </Typography>
          <Stack direction="row" spacing={2} alignItems="center" sx={{ mt: 1 }}>
            <Avatar size="small">S</Avatar>
            <Avatar size="medium">M</Avatar>
            <Avatar size="large">L</Avatar>
          </Stack>
        </Box>
      </Paper>

      {/* Variants */}
      <Paper sx={{ p: 3, mb: 3 }}>
        <Typography variant="h5" gutterBottom>
          Variants
        </Typography>
        <Typography variant="body2" paragraph color="text.secondary">
          Shape variants: circular (default), rounded, and square.
        </Typography>
        <Stack direction="row" spacing={2} alignItems="center">
          <Avatar variant="circular" src="https://i.pravatar.cc/150?img=7" alt="Circular" />
          <Avatar variant="rounded" src="https://i.pravatar.cc/150?img=8" alt="Rounded" />
          <Avatar variant="square" src="https://i.pravatar.cc/150?img=9" alt="Square" />
        </Stack>
        <Box sx={{ mt: 2 }}>
          <Typography variant="body2" color="text.secondary">
            With initials:
          </Typography>
          <Stack direction="row" spacing={2} alignItems="center" sx={{ mt: 1 }}>
            <Avatar variant="circular">C</Avatar>
            <Avatar variant="rounded">R</Avatar>
            <Avatar variant="square">S</Avatar>
          </Stack>
        </Box>
      </Paper>

      {/* Fallback */}
      <Paper sx={{ p: 3, mb: 3 }}>
        <Typography variant="h5" gutterBottom>
          Fallback
        </Typography>
        <Typography variant="body2" paragraph color="text.secondary">
          When an image fails to load, the Avatar falls back to displaying children (initials or icons).
        </Typography>
        <Stack direction="row" spacing={2} alignItems="center">
          <Avatar src="/broken-image.jpg" alt="Fallback">FB</Avatar>
          <Avatar src="/broken-image.jpg" alt="Fallback">
            <PersonIcon />
          </Avatar>
        </Stack>
      </Paper>

      {/* Props */}
      <Paper sx={{ p: 3, mb: 3 }}>
        <Typography variant="h5" gutterBottom>
          Props
        </Typography>
        <Box
          component="pre"
          sx={{
            bgcolor: 'grey.100',
            p: 2,
            borderRadius: 1,
            overflow: 'auto',
            fontSize: '0.875rem',
          }}
        >
          {`interface AvatarProps extends Omit<MuiAvatarProps, 'sx'> {
  /** Size of the avatar */
  size?: 'small' | 'medium' | 'large';

  /** Image source URL */
  src?: string;

  /** Alt text for accessibility */
  alt?: string;

  /** Content to display (initials or icon) */
  children?: React.ReactNode;

  /** Shape variant */
  variant?: 'circular' | 'rounded' | 'square';
}`}
        </Box>
      </Paper>

      {/* Accessibility */}
      <Paper sx={{ p: 3, mb: 3 }}>
        <Typography variant="h5" gutterBottom>
          Accessibility
        </Typography>
        <Box component="ul" sx={{ mt: 1 }}>
          <Typography component="li" variant="body2">
            Always provide <code>alt</code> text for image avatars
          </Typography>
          <Typography component="li" variant="body2">
            Use meaningful initials or icons for non-image avatars
          </Typography>
          <Typography component="li" variant="body2">
            Ensure sufficient color contrast for letter avatars (WCAG AA)
          </Typography>
          <Typography component="li" variant="body2">
            Avatar is decorative by default; add role="img" if semantically important
          </Typography>
        </Box>
      </Paper>

      {/* Usage Example */}
      <Paper sx={{ p: 3 }}>
        <Typography variant="h5" gutterBottom>
          Usage Example
        </Typography>
        <Box
          component="pre"
          sx={{
            bgcolor: 'grey.100',
            p: 2,
            borderRadius: 1,
            overflow: 'auto',
            fontSize: '0.875rem',
          }}
        >
          {`import { Avatar } from '@design-system/ui-components';
import { PersonIcon } from '@mui/icons-material';

// Image avatar
<Avatar src="/user.jpg" alt="John Doe" />

// Letter avatar
<Avatar>JD</Avatar>

// Icon avatar
<Avatar>
  <PersonIcon />
</Avatar>

// Custom size
<Avatar size="large" src="/user.jpg" alt="John Doe" />

// Custom variant
<Avatar variant="rounded" src="/user.jpg" alt="John Doe" />`}
        </Box>
      </Paper>
    </Box>
  );
};
