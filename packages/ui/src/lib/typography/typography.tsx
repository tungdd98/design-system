import { cn } from '@design-system/utils';
import { Slot } from '@radix-ui/react-slot';
import { cva, VariantProps } from 'class-variance-authority';
import React from 'react';

const typographyVariants = cva('', {
  variants: {
    variant: {
      h1: 'text-[60px] leading-[72px] font-bold',
      h2: 'text-[48px] leading-[64px] font-bold',
      h3: 'text-[40px] leading-[48px] font-medium',
      subtitle1: 'text-[28px] leading-[40px]',
      subtitle2: 'text-[18px] leading-[28px] font-bold',
      body1: 'text-[18px] leading-[28px]',
      body2: 'text-[16px] leading-[24px]',
      caption: 'text-[12px] leading-[21px] inline-block',
    },
  },
  defaultVariants: {
    variant: 'body2',
  },
});

export interface TypographyProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof typographyVariants> {
  asChild?: boolean;
}

const Typography = React.forwardRef<HTMLDivElement, TypographyProps>(
  ({ className, variant, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : 'div';

    return (
      <Comp
        className={cn(typographyVariants({ variant, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
Typography.displayName = 'Typography';

export { Typography, typographyVariants };
