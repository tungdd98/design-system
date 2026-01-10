import React from 'react';
import { Box, Grid } from '@mui/material';
import { Typography, Card, Button } from '@design-system/ui-components';
import { ComponentShowcase } from '../components/ComponentShowcase';

export const CardPage: React.FC = () => {
  return (
    <Box>
      <Typography variant="h4" sx={{ mb: 1, fontWeight: 700 }}>
        Card
      </Typography>
      <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
        Cards contain content and actions about a single subject.
      </Typography>

      <ComponentShowcase
        title="Basic Card"
        description="A simple card with content."
      >
        <Card sx={{ maxWidth: 345 }}>
          <Typography variant="body1">
            This is a basic card with some content. Cards are surfaces that display content
            and actions on a single topic.
          </Typography>
        </Card>
      </ComponentShowcase>

      <ComponentShowcase
        title="Card with Header"
        description="Card with title and subheader."
      >
        <Card
          title="Card Title"
          subheader="September 14, 2024"
          sx={{ maxWidth: 345 }}
        >
          <Typography variant="body2" color="text.secondary">
            This card has a header with a title and subheader. Perfect for displaying
            structured content with metadata.
          </Typography>
        </Card>
      </ComponentShowcase>

      <ComponentShowcase
        title="Card with Actions"
        description="Card with action buttons."
      >
        <Card
          title="Interactive Card"
          subheader="Click the buttons below"
          actions={
            <>
              <Button size="small">Share</Button>
              <Button size="small" color="secondary">Learn More</Button>
            </>
          }
          sx={{ maxWidth: 345 }}
        >
          <Typography variant="body2" color="text.secondary">
            Cards can include action buttons at the bottom for user interactions.
          </Typography>
        </Card>
      </ComponentShowcase>

      <ComponentShowcase
        title="Card with Media"
        description="Card featuring an image."
      >
        <Card
          title="Nature"
          subheader="Beautiful landscape"
          media={{
            image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=400',
            alt: 'Nature landscape',
            height: 200,
          }}
          actions={
            <>
              <Button size="small">Share</Button>
              <Button size="small">Explore</Button>
            </>
          }
          sx={{ maxWidth: 345 }}
        >
          <Typography variant="body2" color="text.secondary">
            Stunning natural landscape featuring mountains, lakes, and forests.
          </Typography>
        </Card>
      </ComponentShowcase>

      <ComponentShowcase
        title="Card Grid"
        description="Multiple cards in a responsive grid layout."
      >
        <Grid container spacing={2} sx={{ width: '100%' }}>
          {[1, 2, 3].map((item) => (
            <Grid size={{ xs: 12, sm: 6, md: 4 }} key={item}>
              <Card
                title={`Card ${item}`}
                subheader="Card example"
                actions={<Button size="small">Action</Button>}
              >
                <Typography variant="body2" color="text.secondary">
                  This is card number {item} in a responsive grid layout.
                </Typography>
              </Card>
            </Grid>
          ))}
        </Grid>
      </ComponentShowcase>
    </Box>
  );
};
