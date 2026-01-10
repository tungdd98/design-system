import React from 'react';
import {
  Card as MuiCard,
  CardProps as MuiCardProps,
  CardContent,
  CardHeader,
  CardActions,
  CardMedia,
} from '@mui/material';

export interface CardProps extends MuiCardProps {
  title?: string;
  subheader?: string;
  actions?: React.ReactNode;
  media?: {
    image: string;
    alt?: string;
    height?: number;
  };
}

export const Card: React.FC<CardProps> = ({
  children,
  title,
  subheader,
  actions,
  media,
  ...props
}) => {
  return (
    <MuiCard {...props}>
      {media && (
        <CardMedia
          component="img"
          height={media.height || 140}
          image={media.image}
          alt={media.alt || ''}
        />
      )}
      {(title || subheader) && <CardHeader title={title} subheader={subheader} />}
      <CardContent>{children}</CardContent>
      {actions && <CardActions>{actions}</CardActions>}
    </MuiCard>
  );
};

Card.displayName = 'Card';
