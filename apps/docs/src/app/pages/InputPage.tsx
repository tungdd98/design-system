import React, { useState } from 'react';
import { Box } from '@mui/material';
import { Typography, Input } from '@design-system/ui-components';
import { ComponentShowcase } from '../components/ComponentShowcase';

export const InputPage: React.FC = () => {
  const [value, setValue] = useState('');

  return (
    <Box>
      <Typography variant="h4" sx={{ mb: 1, fontWeight: 700 }}>
        Input
      </Typography>
      <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
        Text fields let users enter and edit text.
      </Typography>

      <ComponentShowcase
        title="Variants"
        description="Input comes in three variants: outlined (default), filled, and standard."
      >
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, width: '100%', maxWidth: 400 }}>
          <Input label="Outlined" variant="outlined" />
          <Input label="Filled" variant="filled" />
          <Input label="Standard" variant="standard" />
        </Box>
      </ComponentShowcase>

      <ComponentShowcase
        title="With Helper Text"
        description="Provide additional context with helper text."
      >
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, width: '100%', maxWidth: 400 }}>
          <Input label="Email" helperText="We'll never share your email" />
          <Input label="Password" type="password" helperText="Must be at least 8 characters" />
        </Box>
      </ComponentShowcase>

      <ComponentShowcase
        title="States"
        description="Different input states for validation feedback."
      >
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, width: '100%', maxWidth: 400 }}>
          <Input label="Default" />
          <Input label="Disabled" disabled />
          <Input label="Error" error helperText="This field is required" />
          <Input label="Success" color="success" focused />
        </Box>
      </ComponentShowcase>

      <ComponentShowcase
        title="Sizes"
        description="Input fields come in two sizes."
      >
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, width: '100%', maxWidth: 400 }}>
          <Input label="Small" size="small" />
          <Input label="Medium" size="medium" />
        </Box>
      </ComponentShowcase>

      <ComponentShowcase
        title="Multiline"
        description="For longer text content, use multiline input."
      >
        <Box sx={{ width: '100%', maxWidth: 400 }}>
          <Input
            label="Description"
            multiline
            rows={4}
            placeholder="Enter your description here..."
          />
        </Box>
      </ComponentShowcase>

      <ComponentShowcase
        title="Controlled Input"
        description="Controlled input with state management."
      >
        <Box sx={{ width: '100%', maxWidth: 400 }}>
          <Input
            label="Controlled Input"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            helperText={`Characters: ${value.length}`}
          />
        </Box>
      </ComponentShowcase>
    </Box>
  );
};
