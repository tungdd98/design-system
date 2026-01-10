import React from 'react';
import { Chip, ChipProps } from '@mui/material';

export interface BadgeProps extends Omit<ChipProps, 'size'> {
  size?: 'small' | 'medium';
}

export const Badge: React.FC<BadgeProps> = ({
  variant = 'filled',
  size = 'small',
  color = 'primary',
  ...props
}) => {
  return <Chip variant={variant} size={size} color={color} {...props} />;
};

Badge.displayName = 'Badge';
