import React from 'react';
import { Box, Paper } from '@mui/material';
import { Typography } from '@design-system/ui-components';

interface ComponentShowcaseProps {
  title: string;
  description?: string;
  children: React.ReactNode;
}

export const ComponentShowcase: React.FC<ComponentShowcaseProps> = ({
  title,
  description,
  children,
}) => {
  return (
    <Box sx={{ mb: 4 }}>
      <Typography variant="h6" sx={{ mb: 1, fontWeight: 600 }}>
        {title}
      </Typography>
      {description && (
        <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
          {description}
        </Typography>
      )}
      <Paper
        variant="outlined"
        sx={{
          p: 3,
          display: 'flex',
          flexWrap: 'wrap',
          gap: 2,
          alignItems: 'center',
          bgcolor: 'grey.50',
        }}
      >
        {children}
      </Paper>
    </Box>
  );
};
