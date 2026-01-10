import React from 'react';
import { Box } from '@mui/material';
import { Typography, Button } from '@design-system/ui-components';
import { ComponentShowcase } from '../components/ComponentShowcase';

export const ButtonPage: React.FC = () => {
  return (
    <Box>
      <Typography variant="h4" sx={{ mb: 1, fontWeight: 700 }}>
        Button
      </Typography>
      <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
        Buttons allow users to take actions and make choices with a single tap.
      </Typography>

      <ComponentShowcase
        title="Variants"
        description="The Button comes in three variants: contained (default), outlined, and text."
      >
        <Button variant="contained">Contained</Button>
        <Button variant="outlined">Outlined</Button>
        <Button variant="text">Text</Button>
      </ComponentShowcase>

      <ComponentShowcase
        title="Colors"
        description="Different colors can convey different meanings or importance levels."
      >
        <Button color="primary">Primary</Button>
        <Button color="secondary">Secondary</Button>
        <Button color="success">Success</Button>
        <Button color="error">Error</Button>
        <Button color="warning">Warning</Button>
        <Button color="info">Info</Button>
      </ComponentShowcase>

      <ComponentShowcase
        title="Sizes"
        description="Buttons come in three sizes: small, medium (default), and large."
      >
        <Button size="small">Small</Button>
        <Button size="medium">Medium</Button>
        <Button size="large">Large</Button>
      </ComponentShowcase>

      <ComponentShowcase
        title="States"
        description="Buttons can be disabled or show a loading state."
      >
        <Button disabled>Disabled</Button>
        <Button isLoading>Loading</Button>
      </ComponentShowcase>

      <ComponentShowcase
        title="Outlined Variants"
        description="Outlined buttons with different colors."
      >
        <Button variant="outlined" color="primary">Primary</Button>
        <Button variant="outlined" color="secondary">Secondary</Button>
        <Button variant="outlined" color="success">Success</Button>
        <Button variant="outlined" color="error">Error</Button>
      </ComponentShowcase>
    </Box>
  );
};
