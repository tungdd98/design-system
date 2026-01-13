import React from 'react';
import {
  Avatar as MuiAvatar,
  AvatarProps as MuiAvatarProps,
} from '@mui/material';

/**
 * Avatar component for displaying user profile images, initials, or icons.
 *
 * Wraps Material-UI's Avatar component with custom size variants.
 *
 * @example
 * ```tsx
 * // Image avatar
 * <Avatar src="/path/to/image.jpg" alt="John Doe" />
 *
 * // Initials avatar
 * <Avatar>JD</Avatar>
 *
 * // Icon avatar
 * <Avatar><PersonIcon /></Avatar>
 *
 * // With custom size
 * <Avatar size="large" src="/image.jpg" alt="User" />
 * ```
 */
export interface AvatarProps extends MuiAvatarProps {
  /**
   * Size of the avatar
   * @default 'medium'
   */
  size?: 'small' | 'medium' | 'large';
}

const sizeMap = {
  small: { width: 32, height: 32, fontSize: '0.875rem' },
  medium: { width: 40, height: 40, fontSize: '1rem' },
  large: { width: 56, height: 56, fontSize: '1.25rem' },
};

export const Avatar = React.forwardRef<HTMLDivElement, AvatarProps>(
  ({ size = 'medium', variant = 'circular', sx, ...props }, ref) => {
    const sizeStyles = sizeMap[size];

    return (
      <MuiAvatar
        ref={ref}
        variant={variant}
        sx={{ ...sizeStyles, ...sx }}
        {...props}
      />
    );
  }
);

Avatar.displayName = 'Avatar';
