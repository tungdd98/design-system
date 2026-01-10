import React from 'react';
import { Box } from '@mui/material';
import { Typography } from '@design-system/ui-components';
import { ComponentShowcase } from '../components/ComponentShowcase';

export const TypographyPage: React.FC = () => {
  return (
    <Box>
      <Typography variant="h4" sx={{ mb: 1, fontWeight: 700 }}>
        Typography
      </Typography>
      <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
        Typography component for consistent text styling across your application.
      </Typography>

      <ComponentShowcase
        title="Headings"
        description="Heading styles from h1 to h6."
      >
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1, width: '100%' }}>
          <Typography variant="h1">Heading 1</Typography>
          <Typography variant="h2">Heading 2</Typography>
          <Typography variant="h3">Heading 3</Typography>
          <Typography variant="h4">Heading 4</Typography>
          <Typography variant="h5">Heading 5</Typography>
          <Typography variant="h6">Heading 6</Typography>
        </Box>
      </ComponentShowcase>

      <ComponentShowcase
        title="Body Text"
        description="Body text styles for paragraphs and content."
      >
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, width: '100%' }}>
          <Typography variant="body1">
            Body 1: Lorem ipsum dolor sit amet, consectetur adipiscing elit.
            Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
          </Typography>
          <Typography variant="body2">
            Body 2: Lorem ipsum dolor sit amet, consectetur adipiscing elit.
            Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
          </Typography>
        </Box>
      </ComponentShowcase>

      <ComponentShowcase
        title="Other Variants"
        description="Additional typography variants for specific use cases."
      >
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, width: '100%' }}>
          <Typography variant="subtitle1">Subtitle 1</Typography>
          <Typography variant="subtitle2">Subtitle 2</Typography>
          <Typography variant="caption">Caption text</Typography>
          <Typography variant="overline">Overline text</Typography>
          <Typography variant="button">Button text</Typography>
        </Box>
      </ComponentShowcase>

      <ComponentShowcase
        title="Colors"
        description="Typography with different colors."
      >
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1, width: '100%' }}>
          <Typography color="primary">Primary color</Typography>
          <Typography color="secondary">Secondary color</Typography>
          <Typography color="text.primary">Text primary</Typography>
          <Typography color="text.secondary">Text secondary</Typography>
          <Typography color="error">Error color</Typography>
          <Typography color="success.main">Success color</Typography>
        </Box>
      </ComponentShowcase>

      <ComponentShowcase
        title="Truncation"
        description="Text truncation with ellipsis."
      >
        <Box sx={{ width: '100%', maxWidth: 300 }}>
          <Typography truncate>
            This is a very long text that will be truncated with ellipsis when it overflows the container.
          </Typography>
        </Box>
      </ComponentShowcase>

      <ComponentShowcase
        title="Max Lines"
        description="Limit text to a specific number of lines."
      >
        <Box sx={{ width: '100%', maxWidth: 400 }}>
          <Typography maxLines={2}>
            This is a very long text that will be limited to two lines.
            Lorem ipsum dolor sit amet, consectetur adipiscing elit.
            Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
            Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.
          </Typography>
        </Box>
      </ComponentShowcase>
    </Box>
  );
};
