import React from 'react';
import { Typography as MuiTypography, TypographyProps as MuiTypographyProps } from '@mui/material';

export interface TypographyProps extends MuiTypographyProps {
  truncate?: boolean;
  maxLines?: number;
}

export const Typography: React.FC<TypographyProps> = ({
  children,
  truncate = false,
  maxLines,
  sx,
  ...props
}) => {
  const truncateStyles = truncate
    ? {
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        whiteSpace: 'nowrap',
      }
    : {};

  const maxLinesStyles = maxLines
    ? {
        overflow: 'hidden',
        display: '-webkit-box',
        WebkitLineClamp: maxLines,
        WebkitBoxOrient: 'vertical',
      }
    : {};

  return (
    <MuiTypography
      sx={{
        ...truncateStyles,
        ...maxLinesStyles,
        ...sx,
      }}
      {...props}
    >
      {children}
    </MuiTypography>
  );
};

Typography.displayName = 'Typography';
