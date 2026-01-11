# Component Design Pattern

**Single Source of Truth for Component Architecture**

This document defines the authoritative component pattern for the design system. All components MUST follow this pattern.

## Pattern Overview

All components in this design system:
- Extend from Material-UI (MUI) base components
- Wrap MUI components with custom props and behavior
- Follow strict TypeScript typing
- Export both component and types

## Component Structure Template

```typescript
import React from 'react';
import { ComponentName as MuiComponentName, ComponentNameProps as MuiComponentNameProps } from '@mui/material';

export interface ComponentNameProps extends Omit<MuiComponentNameProps, 'conflictingProp'> {
  // Custom props
  customProp?: string;
  isLoading?: boolean;
}

export const ComponentName: React.FC<ComponentNameProps> = ({
  // Destructure custom props first
  customProp,
  isLoading = false,

  // Destructure common props
  children,

  // Rest props to forward
  ...props
}) => {
  // Component logic here

  return (
    <MuiComponentName {...props}>
      {children}
    </MuiComponentName>
  );
};

ComponentName.displayName = 'ComponentName';
```

## Required Elements

### 1. Props Interface
```typescript
export interface ComponentNameProps extends Omit<MuiComponentNameProps, 'conflictingProp'> {
  customProp?: string;
}
```

**Rules:**
- MUST extend MUI component props
- Use `Omit<MuiProps, 'prop'>` when overriding MUI props
- Export the interface
- Use TypeScript unions for variants (`'small' | 'medium' | 'large'`)
- Optional props use `?`

### 2. Component Implementation
```typescript
export const ComponentName: React.FC<ComponentNameProps> = ({
  customProp,
  children,
  ...props
}) => {
  return <MuiComponentName {...props}>{children}</MuiComponentName>;
};
```

**Rules:**
- Use `React.FC<ComponentNameProps>` type
- Destructure custom props first
- Destructure common props (children, etc.)
- Use `...props` for rest
- MUST spread `...props` into MUI component
- Provide default values for custom props

### 3. Display Name
```typescript
ComponentName.displayName = 'ComponentName';
```

**Rules:**
- MUST be set after component definition
- Use PascalCase matching component name
- Critical for React DevTools debugging

## File Structure

```
libs/ui-components/src/lib/ComponentName/
├── ComponentName.tsx          # Main component
├── index.ts                   # Barrel export
└── ComponentName.spec.tsx     # Tests (optional)
```

### Barrel Export (`index.ts`)
```typescript
export { ComponentName } from './ComponentName';
export type { ComponentNameProps } from './ComponentName';
```

**Rules:**
- Export both component AND type
- Use named exports (not default)

### Main Library Export
Update `libs/ui-components/src/index.ts`:
```typescript
export { ComponentName } from './lib/ComponentName';
export type { ComponentNameProps } from './lib/ComponentName';
```

## Props Destructuring Order

MUST follow this order:
```typescript
export const Component: React.FC<Props> = ({
  // 1. Custom props (specific to this component)
  customProp,
  isLoading = false,

  // 2. Common React props
  children,
  className,

  // 3. Rest props
  ...props
}) => { ... }
```

## Default Values

Provide defaults for custom props:
```typescript
export const Button: React.FC<ButtonProps> = ({
  size = 'medium',        // ✅ Good
  variant = 'contained',  // ✅ Good
  isLoading = false,      // ✅ Good
  ...props
}) => { ... }
```

## Special Patterns

### Compound Components
For complex components with multiple sub-components:

```typescript
export interface CardProps {
  title?: string;
  subheader?: string;
  media?: {
    image: string;
    alt: string;
    height?: number;
  };
  actions?: React.ReactNode;
  children: React.ReactNode;
}

export const Card: React.FC<CardProps> = ({
  title,
  subheader,
  media,
  actions,
  children,
  ...props
}) => {
  return (
    <MuiCard {...props}>
      {media && (
        <CardMedia
          component="img"
          height={media.height || 140}
          image={media.image}
          alt={media.alt}
        />
      )}
      {(title || subheader) && (
        <CardHeader title={title} subheader={subheader} />
      )}
      <CardContent>{children}</CardContent>
      {actions && <CardActions>{actions}</CardActions>}
    </MuiCard>
  );
};
```

### Style Merging
When component needs custom styles merged with user styles:

```typescript
export const Component: React.FC<Props> = ({ sx, ...props }) => {
  const customStyles = {
    display: 'flex',
    gap: 2,
  };

  return (
    <MuiComponent
      sx={{
        ...customStyles,
        ...sx, // User styles override custom styles
      }}
      {...props}
    />
  );
};
```

### Controlled Components
For components managing internal state:

```typescript
export const Component: React.FC<Props> = ({
  defaultValue,
  onChange
}) => {
  const [value, setValue] = React.useState(defaultValue);

  const handleChange = (newValue: string) => {
    setValue(newValue);
    onChange?.(newValue); // Call optional callback
  };

  return <MuiComponent value={value} onChange={handleChange} />;
};
```

## Complete Example

```typescript
// libs/ui-components/src/lib/Alert/Alert.tsx
import React from 'react';
import { Alert as MuiAlert, AlertProps as MuiAlertProps } from '@mui/material';

export interface AlertProps extends MuiAlertProps {
  variant?: 'filled' | 'outlined' | 'standard';
}

export const Alert: React.FC<AlertProps> = ({
  variant = 'standard',
  severity = 'info',
  children,
  ...props
}) => {
  return (
    <MuiAlert variant={variant} severity={severity} {...props}>
      {children}
    </MuiAlert>
  );
};

Alert.displayName = 'Alert';
```

```typescript
// libs/ui-components/src/lib/Alert/index.ts
export { Alert } from './Alert';
export type { AlertProps } from './Alert';
```

```typescript
// libs/ui-components/src/index.ts (add these lines)
export { Alert } from './lib/Alert';
export type { AlertProps } from './lib/Alert';
```

## Checklist

Before marking a component complete:

- [ ] Component extends MUI component with proper `Omit<>` usage
- [ ] Props interface is exported
- [ ] Component uses `React.FC<Props>` typing
- [ ] `displayName` is set
- [ ] Custom props have default values
- [ ] Props destructured in correct order
- [ ] `...props` spread into MUI component
- [ ] Barrel export (`index.ts`) created with both component and type
- [ ] Main library export updated (`src/index.ts`)
- [ ] TypeScript compiles without errors
- [ ] No `any` types used

## Common Mistakes to Avoid

### ❌ Missing displayName
```typescript
export const Button = () => { ... }
// Missing: Button.displayName = 'Button';
```

### ❌ Not extending MUI props
```typescript
export interface ButtonProps {
  size: string;
  // Should extend: Omit<MuiButtonProps, 'size'>
}
```

### ❌ Not spreading props
```typescript
return <MuiButton onClick={onClick}>{children}</MuiButton>;
// Should be: <MuiButton {...props}>{children}</MuiButton>
```

### ❌ Using default exports
```typescript
export default Button; // ❌ Wrong
export { Button };     // ✅ Correct
```

### ❌ Not exporting types
```typescript
export { Button } from './Button';
// Missing: export type { ButtonProps } from './Button';
```

## References

- Material-UI Documentation: https://mui.com/
- React TypeScript Cheatsheet: https://react-typescript-cheatsheet.netlify.app/
- Project CLAUDE.md for architecture overview
