---
name: component-generator
description: Generates React components following the project's design patterns. Use when users request to "create component", "generate component", "build component", or "add component [ComponentName]". Automatically follows Material-UI wrapper pattern, creates documentation pages, updates exports and routing. Always reads component-pattern.md before generating.
---

# Component Generator

Automated component generation following design system patterns.

---

## Prerequisites

**ALWAYS read the pattern documentation first:**

```bash
view /home/claude/.claude/patterns/component-pattern.md
```

This ensures compliance with:
- MUI wrapper pattern
- Props interface requirements
- ForwardRef usage
- DisplayName assignment
- TypeScript strict mode
- Testing requirements

---

## Generation Process

### Step 1: Gather Requirements

Ask user for:
- **Component Name**: PascalCase (e.g., `Modal`, `DatePicker`)
- **Base MUI Component**: What MUI component to wrap
- **Custom Props**: Additional props beyond MUI
- **Description**: What the component does

**Example questions:**
```
Component Generator activated!

To create your component, I need:
1. Component name (PascalCase): 
2. Base MUI component to wrap:
3. Custom props needed:
4. Brief description:
```

### Step 2: Generate Component Files

Create the following structure:

```
libs/ui-components/src/lib/ComponentName/
├── ComponentName.tsx          # Main component
├── ComponentName.spec.tsx     # Unit tests
└── index.ts                   # Barrel export
```

### Step 3: Update Library Exports

Add exports to:
```typescript
// libs/ui-components/src/index.ts
export { ComponentName } from './lib/ComponentName';
export type { ComponentNameProps } from './lib/ComponentName';
```

### Step 4: Create Documentation Page

Generate:
```
apps/docs/src/app/components/ComponentNamePage.tsx
```

With sections:
- Component description
- Basic usage
- Variants
- Props table
- Accessibility notes

### Step 5: Update Routing

Add route in:
```typescript
// apps/docs/src/app/App.tsx
<Route path="/components/component-name" element={<ComponentNamePage />} />
```

### Step 6: Update Navigation

Add link in:
```typescript
// apps/docs/src/app/Navigation.tsx (or similar)
<Link to="/components/component-name">ComponentName</Link>
```

---

## Component Template

```typescript
// libs/ui-components/src/lib/ComponentName/ComponentName.tsx

import React from 'react';
import {
  ComponentName as MuiComponentName,
  ComponentNameProps as MuiComponentNameProps,
} from '@mui/material';

/**
 * [Component description]
 * 
 * @example
 * ```tsx
 * <ComponentName variant="primary">
 *   Content
 * </ComponentName>
 * ```
 */
export interface ComponentNameProps 
  extends Omit<MuiComponentNameProps, 'overriddenProp'> {
  /**
   * Custom prop description
   */
  customProp?: string;
}

export const ComponentName = React.forwardRef<
  HTMLDivElement,
  ComponentNameProps
>((props, ref) => {
  const { customProp, ...muiProps } = props;

  // Component logic here

  return (
    <MuiComponentName
      ref={ref}
      {...muiProps}
    />
  );
});

ComponentName.displayName = 'ComponentName';
```

---

## Test Template

```typescript
// libs/ui-components/src/lib/ComponentName/ComponentName.spec.tsx

import { render, screen } from '@testing-library/react';
import { ComponentName } from './ComponentName';

describe('ComponentName', () => {
  it('renders correctly', () => {
    render(<ComponentName>Test</ComponentName>);
    expect(screen.getByText('Test')).toBeInTheDocument();
  });

  it('forwards ref correctly', () => {
    const ref = React.createRef<HTMLDivElement>();
    render(<ComponentName ref={ref}>Test</ComponentName>);
    expect(ref.current).toBeInstanceOf(HTMLDivElement);
  });

  it('applies custom props', () => {
    render(<ComponentName customProp="test" />);
    // Test custom prop behavior
  });

  it('applies MUI props', () => {
    const { container } = render(
      <ComponentName className="custom-class">Test</ComponentName>
    );
    expect(container.firstChild).toHaveClass('custom-class');
  });
});
```

---

## Documentation Page Template

```typescript
// apps/docs/src/app/components/ComponentNamePage.tsx

import React from 'react';
import { ComponentName } from '@design-system/ui-components';
import { Box, Typography, Paper, Stack } from '@mui/material';

export const ComponentNamePage: React.FC = () => {
  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h3" gutterBottom>
        ComponentName
      </Typography>
      
      <Typography variant="body1" paragraph>
        [Component description]
      </Typography>

      {/* Basic Usage */}
      <Paper sx={{ p: 3, my: 3 }}>
        <Typography variant="h5" gutterBottom>
          Basic Usage
        </Typography>
        <Stack spacing={2}>
          <ComponentName>Default</ComponentName>
        </Stack>
      </Paper>

      {/* Variants */}
      <Paper sx={{ p: 3, my: 3 }}>
        <Typography variant="h5" gutterBottom>
          Variants
        </Typography>
        <Stack spacing={2}>
          <ComponentName variant="primary">Primary</ComponentName>
          <ComponentName variant="secondary">Secondary</ComponentName>
        </Stack>
      </Paper>

      {/* Props */}
      <Paper sx={{ p: 3, my: 3 }}>
        <Typography variant="h5" gutterBottom>
          Props
        </Typography>
        <Typography variant="body2" component="pre">
          {`interface ComponentNameProps {
  customProp?: string;
  // ... other props
}`}
        </Typography>
      </Paper>

      {/* Accessibility */}
      <Paper sx={{ p: 3, my: 3 }}>
        <Typography variant="h5" gutterBottom>
          Accessibility
        </Typography>
        <Typography variant="body1">
          - Keyboard navigation supported
          - ARIA labels included
          - Screen reader friendly
        </Typography>
      </Paper>
    </Box>
  );
};
```

---

## Barrel Export Template

```typescript
// libs/ui-components/src/lib/ComponentName/index.ts

export { ComponentName } from './ComponentName';
export type { ComponentNameProps } from './ComponentName';
```

---

## Common Component Patterns

### Pattern 1: Simple Wrapper

```typescript
export interface ButtonProps extends Omit<MuiButtonProps, 'variant'> {
  variant?: 'primary' | 'secondary' | 'danger';
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = 'primary', ...props }, ref) => {
    const muiVariant = variant === 'danger' ? 'contained' : 'outlined';
    
    return <MuiButton ref={ref} variant={muiVariant} {...props} />;
  }
);

Button.displayName = 'Button';
```

### Pattern 2: With Loading State

```typescript
export interface ButtonProps extends Omit<MuiButtonProps, 'disabled'> {
  loading?: boolean;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ loading, children, disabled, ...props }, ref) => {
    return (
      <MuiButton ref={ref} disabled={disabled || loading} {...props}>
        {loading ? <CircularProgress size={20} /> : children}
      </MuiButton>
    );
  }
);
```

### Pattern 3: With Internal State

```typescript
export interface InputProps extends Omit<MuiTextFieldProps, 'value' | 'onChange'> {
  defaultValue?: string;
  onChange?: (value: string) => void;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ defaultValue = '', onChange, ...props }, ref) => {
    const [value, setValue] = React.useState(defaultValue);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setValue(e.target.value);
      onChange?.(e.target.value);
    };

    return (
      <MuiTextField
        ref={ref}
        value={value}
        onChange={handleChange}
        {...props}
      />
    );
  }
);
```

### Pattern 4: Compound Components

```typescript
export const Card = React.forwardRef<HTMLDivElement, CardProps>(
  (props, ref) => {
    return <MuiCard ref={ref} {...props} />;
  }
) as React.ForwardRefExoticComponent<CardProps> & {
  Header: typeof CardHeader;
  Content: typeof CardContent;
  Actions: typeof CardActions;
};

Card.displayName = 'Card';
Card.Header = CardHeader;
Card.Content = CardContent;
Card.Actions = CardActions;

// Usage:
// <Card>
//   <Card.Header>Title</Card.Header>
//   <Card.Content>Body</Card.Content>
// </Card>
```

---

## Checklist After Generation

Verify all files were created:
- [ ] Component file created
- [ ] Test file created
- [ ] Barrel export created
- [ ] Main library export updated
- [ ] Documentation page created
- [ ] Route added
- [ ] Navigation updated

Run checks:
```bash
# Lint
npx nx lint ui-components

# Type check
npx nx typecheck ui-components

# Test
npx nx test ui-components

# Build
npx nx build ui-components

# Serve docs to verify
npx nx serve docs
```

---

## Example Generation Session

**User:** "Create component Modal"

**Claude:**
```
Component Generator activated!

I'll create a Modal component following the design system patterns.

Questions:
1. Base MUI component: Dialog (for modal functionality)
2. Custom props needed:
   - open (boolean) - already in MuiDialog
   - onClose (function) - already in MuiDialog
   - title (string) - custom
3. Description: A modal dialog wrapper around Material-UI Dialog

Generating files...

✅ Created: libs/ui-components/src/lib/Modal/Modal.tsx
✅ Created: libs/ui-components/src/lib/Modal/Modal.spec.tsx
✅ Created: libs/ui-components/src/lib/Modal/index.ts
✅ Updated: libs/ui-components/src/index.ts
✅ Created: apps/docs/src/app/components/ModalPage.tsx
✅ Updated: apps/docs/src/app/App.tsx (routing)
✅ Updated: apps/docs/src/app/Navigation.tsx

Next steps:
1. Review generated code
2. Run: npx nx serve docs
3. Navigate to: http://localhost:4200/components/modal
4. Customize as needed
```

---

## Error Handling

### If component already exists:
```
⚠️ Component "ComponentName" already exists!
Would you like to:
1. Create with different name
2. Update existing component
3. Cancel
```

### If base MUI component unknown:
```
⚠️ Unknown MUI component: ComponentName
Common MUI components:
- Button, TextField, Card, Dialog, Menu, Drawer, AppBar, etc.

Please specify a valid MUI component or "custom" for non-MUI wrapper.
```

### If missing required info:
```
❌ Missing required information:
- Component name
- Base MUI component

Please provide these details to proceed.
```

---

## Best Practices

### DO:
✅ Always read component-pattern.md first
✅ Use PascalCase for component names
✅ Use kebab-case for URLs/routes
✅ Add JSDoc comments
✅ Create comprehensive tests
✅ Add accessibility features
✅ Update all navigation

### DON'T:
❌ Skip pattern compliance
❌ Forget displayName
❌ Skip forwardRef for HTML/MUI wraps
❌ Use any types
❌ Skip documentation
❌ Forget to update exports

---

## Integration Points

After generation:
1. **Review code:** "Review code for ComponentName"
2. **Test:** Run `npx nx test ui-components`
3. **Verify:** Check docs app
4. **Commit:** Follow Conventional Commits

---

## Summary

This skill automates component creation while ensuring:
- ✅ Pattern compliance
- ✅ Complete file structure
- ✅ Proper exports
- ✅ Documentation
- ✅ Testing setup
- ✅ TypeScript strict mode
- ✅ Accessibility

Always generates production-ready components!
