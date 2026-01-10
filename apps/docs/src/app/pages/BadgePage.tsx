import React from 'react';
import { Box } from '@mui/material';
import { Typography, Badge } from '@design-system/ui-components';
import { ComponentShowcase } from '../components/ComponentShowcase';

export const BadgePage: React.FC = () => {
  return (
    <Box>
      <Typography variant="h4" sx={{ mb: 1, fontWeight: 700 }}>
        Badge
      </Typography>
      <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
        Badges are small labels that represent a status, category, or other metadata.
      </Typography>

      <ComponentShowcase
        title="Colors"
        description="Badges come in different colors to convey meaning."
      >
        <Badge label="Default" color="default" />
        <Badge label="Primary" color="primary" />
        <Badge label="Secondary" color="secondary" />
        <Badge label="Success" color="success" />
        <Badge label="Error" color="error" />
        <Badge label="Warning" color="warning" />
        <Badge label="Info" color="info" />
      </ComponentShowcase>

      <ComponentShowcase
        title="Variants"
        description="Badges can be filled or outlined."
      >
        <Badge label="Filled" variant="filled" color="primary" />
        <Badge label="Outlined" variant="outlined" color="primary" />
      </ComponentShowcase>

      <ComponentShowcase
        title="Sizes"
        description="Badges come in two sizes."
      >
        <Badge label="Small" size="small" />
        <Badge label="Medium" size="medium" />
      </ComponentShowcase>

      <ComponentShowcase
        title="Clickable & Deletable"
        description="Badges can be interactive."
      >
        <Badge label="Clickable" onClick={() => alert('Clicked!')} />
        <Badge label="Deletable" onDelete={() => alert('Delete clicked!')} />
        <Badge
          label="Both"
          onClick={() => alert('Clicked!')}
          onDelete={() => alert('Delete clicked!')}
        />
      </ComponentShowcase>

      <ComponentShowcase
        title="Use Cases"
        description="Common badge use cases in applications."
      >
        <Badge label="New" color="success" size="small" />
        <Badge label="Draft" color="warning" variant="outlined" />
        <Badge label="Deprecated" color="error" />
        <Badge label="v2.0.0" color="info" variant="outlined" />
        <Badge label="React" color="primary" />
        <Badge label="TypeScript" color="secondary" />
      </ComponentShowcase>
    </Box>
  );
};
