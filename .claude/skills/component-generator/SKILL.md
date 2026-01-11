---
name: component-generator
description: Generates new React components following the project's design patterns. Use when creating new UI components for the design system.
tools: Read, Write, Edit, Glob, Grep, Bash
---

# Component Generator

Creates React components following the design system's standard patterns.

## Design Pattern Reference

**IMPORTANT:** All components MUST follow the authoritative pattern defined in:
**[Component Pattern](../../patterns/component-pattern.md)**

Read this pattern document for:

- Complete component structure template
- Props interface requirements
- File structure and exports
- Special patterns (compound components, style merging)
- Complete examples and anti-patterns

## Quick Reference

### Minimum Requirements

1. Extend MUI component with `Omit<MuiProps, '...'>`
2. Set `displayName`
3. Spread `...props` into MUI component
4. Create barrel export (`index.ts`)
5. Export from main library (`src/index.ts`)

### File Structure

```
libs/ui-components/src/lib/ComponentName/
├── ComponentName.tsx
└── index.ts
```

## Component Creation Process

### Step 1: Identify Base Component

1. Find suitable MUI component (Button, Card, TextField, etc.)
2. Review MUI props interface
3. Determine props to override/customize

### Step 2: Design Interface

```typescript
export interface ComponentNameProps extends Omit<MuiComponentNameProps, 'size'> {
  size?: 'small' | 'medium' | 'large';
  customProp?: string;
}
```

See [Component Pattern](../../patterns/component-pattern.md#required-elements) for detailed rules.

### Step 3: Implement Component

```typescript
export const ComponentName: React.FC<ComponentNameProps> = ({
  customProp,
  size = 'medium',
  children,
  ...props
}) => {
  return (
    <MuiComponent size={size} {...props}>
      {children}
    </MuiComponent>
  );
};

ComponentName.displayName = 'ComponentName';
```

See [Component Pattern](../../patterns/component-pattern.md#component-structure-template) for full template.

### Step 4: Create Exports

1. Barrel export: `index.ts`

   ```typescript
   export { ComponentName } from './ComponentName';
   export type { ComponentNameProps } from './ComponentName';
   ```

2. Main library export: `libs/ui-components/src/index.ts`
   ```typescript
   export { ComponentName } from './lib/ComponentName';
   export type { ComponentNameProps } from './lib/ComponentName';
   ```

### Step 5: Create Documentation

```typescript
// apps/docs/src/app/pages/ComponentNamePage.tsx
import React from 'react';
import { Box } from '@mui/material';
import { Typography, ComponentName } from '@design-system/ui-components';
import { ComponentShowcase } from '../components/ComponentShowcase';

export const ComponentNamePage: React.FC = () => {
  return (
    <Box>
      <Typography variant="h3" sx={{ mb: 4 }}>
        ComponentName
      </Typography>

      <ComponentShowcase
        title="Basic Usage"
        description="Default component behavior"
      >
        <ComponentName>Content here</ComponentName>
      </ComponentShowcase>

      <ComponentShowcase
        title="Variants"
        description="Different variants"
      >
        <Box sx={{ display: 'flex', gap: 2 }}>
          <ComponentName variant="primary">Primary</ComponentName>
          <ComponentName variant="secondary">Secondary</ComponentName>
        </Box>
      </ComponentShowcase>

      <ComponentShowcase
        title="Sizes"
        description="Different sizes"
      >
        <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
          <ComponentName size="small">Small</ComponentName>
          <ComponentName size="medium">Medium</ComponentName>
          <ComponentName size="large">Large</ComponentName>
        </Box>
      </ComponentShowcase>

      {/* Add more showcases as needed */}
    </Box>
  );
};
```

### Step 6: Update Routing & Navigation

1. Add route in `apps/docs/src/app/app.tsx`:

   ```typescript
   <Route path="/component-name" element={<ComponentNamePage />} />
   ```

2. Add menu item in `apps/docs/src/app/components/Layout.tsx`:
   ```typescript
   { text: 'ComponentName', path: '/component-name' }
   ```

## Special Cases

For compound components, style merging, and controlled components, see:
**[Component Pattern - Special Patterns](../../patterns/component-pattern.md#special-patterns)**

## Pre-Completion Checklist

Use the checklist from [Component Pattern](../../patterns/component-pattern.md#checklist):

- [ ] Component extends MUI component
- [ ] Props interface exported
- [ ] `displayName` set
- [ ] Default values provided
- [ ] `...props` spread
- [ ] Barrel export created
- [ ] Main library export updated
- [ ] Documentation page created (3-4 showcases minimum)
- [ ] Route added
- [ ] Menu item added
- [ ] TypeScript compiles without errors

## Example: Alert Component

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

Then:

1. Create `Alert/index.ts`
2. Update `src/index.ts`
3. Create `AlertPage.tsx` with showcases
4. Update routing and navigation

## Common Mistakes

See [Component Pattern - Common Mistakes](../../patterns/component-pattern.md#common-mistakes-to-avoid) for full list of anti-patterns.

**Most common:**

- ❌ Missing `displayName`
- ❌ Not spreading `...props`
- ❌ Not exporting types
- ❌ Not extending MUI props

## Tips

- **Follow the pattern:** Read [Component Pattern](../../patterns/component-pattern.md) before implementing
- **Reference existing components:** Look at Button, Card, Typography
- **Check MUI docs:** Know available props
- **Keep it simple:** Only customize when necessary
- **Test locally:** Run `npx nx serve docs`

## Build Verification

After implementation:

```bash
npx nx build ui-components
npx nx serve docs
```

Check that:

- TypeScript compiles without errors
- Component renders correctly in docs app
- All props work as expected
