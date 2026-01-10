import React from 'react';
import { TextField, TextFieldProps } from '@mui/material';

export interface InputProps extends Omit<TextFieldProps, 'variant'> {
  variant?: 'outlined' | 'filled' | 'standard';
}

export const Input: React.FC<InputProps> = ({
  variant = 'outlined',
  fullWidth = true,
  ...props
}) => {
  return <TextField variant={variant} fullWidth={fullWidth} {...props} />;
};

Input.displayName = 'Input';
