import React from 'react';
import { Box, Grid, Paper } from '@mui/material';
import { Link } from 'react-router-dom';
import { Typography, Button } from '@design-system/ui-components';

const components = [
  {
    name: 'Button',
    description: 'Buttons trigger actions and events',
    path: '/components/button',
  },
  {
    name: 'Typography',
    description: 'Text styles and formatting',
    path: '/components/typography',
  },
  {
    name: 'Input',
    description: 'Text fields for user input',
    path: '/components/input',
  },
  {
    name: 'Card',
    description: 'Container for content and actions',
    path: '/components/card',
  },
  {
    name: 'Badge',
    description: 'Small labels for status or categories',
    path: '/components/badge',
  },
];

export const HomePage: React.FC = () => {
  return (
    <Box>
      <Box sx={{ mb: 6 }}>
        <Typography variant="h3" sx={{ mb: 2, fontWeight: 700 }}>
          Design System
        </Typography>
        <Typography variant="h6" color="text.secondary" sx={{ maxWidth: 600 }}>
          A collection of reusable components built with React, TypeScript, and Material-UI.
          Use these components to build consistent and beautiful user interfaces.
        </Typography>
      </Box>

      <Typography variant="h5" sx={{ mb: 3, fontWeight: 600 }}>
        Components
      </Typography>

      <Grid container spacing={3}>
        {components.map((component) => (
          <Grid size={{ xs: 12, sm: 6, md: 4 }} key={component.name}>
            <Paper
              sx={{
                p: 3,
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                transition: 'box-shadow 0.2s',
                '&:hover': {
                  boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
                },
              }}
            >
              <Typography variant="h6" sx={{ mb: 1, fontWeight: 600 }}>
                {component.name}
              </Typography>
              <Typography
                variant="body2"
                color="text.secondary"
                sx={{ mb: 2, flexGrow: 1 }}
              >
                {component.description}
              </Typography>
              <Button
                component={Link}
                to={component.path}
                variant="outlined"
                size="small"
              >
                View Component
              </Button>
            </Paper>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};
