import React from 'react';
import {
  Modal as MuiModal,
  ModalProps as MuiModalProps,
  Box,
  IconButton,
  Typography,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

export interface ModalProps extends Omit<MuiModalProps, 'open' | 'onClose' | 'children'> {
  /** Controls whether the modal is visible */
  open: boolean;
  /** Callback fired when the modal requests to be closed (backdrop click or Escape key) */
  onClose: () => void;
  /** Optional title displayed in the modal header. When provided, includes a styled header with close button. */
  title?: string;
  /** Content to display inside the modal */
  children: React.ReactNode;
  /** Whether to show the close button. Defaults to true. When true, the button appears in the header (if title exists) or as a floating button in the top-right corner. */
  showCloseButton?: boolean;
}

const modalStyle = {
  position: 'absolute' as const,
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: { xs: '90%', sm: 600 },
  maxWidth: '100%',
  maxHeight: '90vh',
  bgcolor: 'background.paper',
  borderRadius: 2,
  boxShadow: 24,
  display: 'flex',
  flexDirection: 'column',
};

const headerStyle = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  p: 2,
  borderBottom: 1,
  borderColor: 'divider',
};

const contentStyle = {
  p: 3,
  overflow: 'auto',
  flex: 1,
};

const closeButtonStyle = {
  position: 'absolute',
  top: 8,
  right: 8,
  color: 'text.secondary',
};

export const Modal: React.FC<ModalProps> = ({
  open,
  onClose,
  title,
  children,
  showCloseButton = true,
  ...props
}) => {
  return (
    <MuiModal
      open={open}
      onClose={onClose}
      aria-labelledby={title ? "modal-title" : undefined}
      {...props}
    >
      <Box sx={modalStyle}>
        {title && (
          <Box sx={headerStyle}>
            <Typography id="modal-title" variant="h6" component="h2">
              {title}
            </Typography>
            {showCloseButton && (
              <IconButton
                aria-label="close"
                onClick={onClose}
                size="small"
                sx={{ color: 'text.secondary' }}
              >
                <CloseIcon />
              </IconButton>
            )}
          </Box>
        )}
        {!title && showCloseButton && (
          <IconButton
            aria-label="close"
            onClick={onClose}
            size="small"
            sx={closeButtonStyle}
          >
            <CloseIcon />
          </IconButton>
        )}
        <Box sx={contentStyle}>{children}</Box>
      </Box>
    </MuiModal>
  );
};

Modal.displayName = 'Modal';
