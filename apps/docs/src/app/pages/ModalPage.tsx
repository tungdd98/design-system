import React, { useState } from 'react';
import { Box } from '@mui/material';
import { Typography, Button, Modal } from '@design-system/ui-components';
import { ComponentShowcase } from '../components/ComponentShowcase';

export const ModalPage: React.FC = () => {
  const [basicModalOpen, setBasicModalOpen] = useState(false);
  const [titleModalOpen, setTitleModalOpen] = useState(false);
  const [longContentModalOpen, setLongContentModalOpen] = useState(false);

  return (
    <Box>
      <Typography variant="h4" sx={{ mb: 1, fontWeight: 700 }}>
        Modal
      </Typography>
      <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
        Modals are overlays that prevent interaction with the rest of the application until they are dismissed.
      </Typography>

      <ComponentShowcase
        title="Basic Modal"
        description="A simple modal without a title. Click the button to open it."
      >
        <Button variant="contained" onClick={() => setBasicModalOpen(true)}>
          Open Basic Modal
        </Button>
        <Modal open={basicModalOpen} onClose={() => setBasicModalOpen(false)}>
          <Typography variant="body1">
            This is a basic modal without a title. You can close it by clicking outside or pressing the Escape key.
          </Typography>
        </Modal>
      </ComponentShowcase>

      <ComponentShowcase
        title="Modal with Title"
        description="A modal with a title and close button in the header."
      >
        <Button variant="contained" onClick={() => setTitleModalOpen(true)}>
          Open Modal with Title
        </Button>
        <Modal
          open={titleModalOpen}
          onClose={() => setTitleModalOpen(false)}
          title="Welcome to our Modal"
        >
          <Typography variant="body1" sx={{ mb: 2 }}>
            This modal has a title and a close button in the header. The title helps users understand the purpose of the modal.
          </Typography>
          <Typography variant="body2" color="text.secondary">
            You can include any content inside the modal, including text, forms, images, and other components.
          </Typography>
        </Modal>
      </ComponentShowcase>

      <ComponentShowcase
        title="Modal with Long Content"
        description="Modals handle long content with automatic scrolling."
      >
        <Button variant="contained" onClick={() => setLongContentModalOpen(true)}>
          Open Modal with Long Content
        </Button>
        <Modal
          open={longContentModalOpen}
          onClose={() => setLongContentModalOpen(false)}
          title="Terms and Conditions"
        >
          <Typography variant="body1" sx={{ mb: 2 }}>
            Welcome to our application. Please read these terms and conditions carefully.
          </Typography>
          <Typography variant="h6" sx={{ mt: 3, mb: 1 }}>
            1. Introduction
          </Typography>
          <Typography variant="body2" sx={{ mb: 2 }}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.
          </Typography>
          <Typography variant="h6" sx={{ mt: 3, mb: 1 }}>
            2. User Responsibilities
          </Typography>
          <Typography variant="body2" sx={{ mb: 2 }}>
            Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
          </Typography>
          <Typography variant="h6" sx={{ mt: 3, mb: 1 }}>
            3. Privacy Policy
          </Typography>
          <Typography variant="body2" sx={{ mb: 2 }}>
            Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.
          </Typography>
          <Typography variant="h6" sx={{ mt: 3, mb: 1 }}>
            4. Limitation of Liability
          </Typography>
          <Typography variant="body2" sx={{ mb: 2 }}>
            Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt.
          </Typography>
          <Box sx={{ mt: 3, display: 'flex', gap: 2, justifyContent: 'flex-end' }}>
            <Button variant="outlined" onClick={() => setLongContentModalOpen(false)}>
              Decline
            </Button>
            <Button variant="contained" onClick={() => setLongContentModalOpen(false)}>
              Accept
            </Button>
          </Box>
        </Modal>
      </ComponentShowcase>

      <ComponentShowcase
        title="Usage Example"
        description="Here's how to use the Modal component in your code:"
      >
        <Box sx={{ width: '100%', bgcolor: 'grey.900', p: 2, borderRadius: 1 }}>
          <Typography
            component="pre"
            sx={{
              color: 'common.white',
              fontFamily: 'monospace',
              fontSize: '0.875rem',
              margin: 0,
              whiteSpace: 'pre-wrap',
            }}
          >
            {`const [open, setOpen] = useState(false);

<Button onClick={() => setOpen(true)}>
  Open Modal
</Button>

<Modal
  open={open}
  onClose={() => setOpen(false)}
  title="Modal Title"
>
  <Typography>Modal content goes here</Typography>
</Modal>`}
          </Typography>
        </Box>
      </ComponentShowcase>
    </Box>
  );
};

ModalPage.displayName = 'ModalPage';
