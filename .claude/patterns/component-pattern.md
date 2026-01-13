# Component Design Pattern

**Authoritative Source for Component Architecture in Design System**

All components MUST follow this pattern. This is the single source of truth for component design.

---

## 1. Component Structure Template

```typescript
// libs/ui-components/src/lib/ComponentName/ComponentName.tsx

import React from 'react';
import {
  ComponentName as MuiComponentName,
  ComponentNameProps as MuiComponentNameProps,
} from '@mui/material';

/**
 * ComponentName component description
 * 
 * @example
 * ```tsx
 * <ComponentName variant="primary">Content</ComponentName>
 * ```
 */
export interface ComponentNameProps 
  extends Omit<MuiComponentNameProps, 'color' | 'size'> {
  /** Custom prop description */
  customProp?: string;
  
  /** Override size variants */
  size?: 'small' | 'medium' | 'large';
}

export const ComponentName = React.forwardRef<
  HTMLDivElement,
  ComponentNameProps
>((props, ref) => {
  const { customProp, ...muiProps } = props;

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

## 2. Required Elements

### ✅ Props Interface

```typescript
export interface ComponentNameProps 
  extends Omit<MuiComponentNameProps, 'overriddenProp'> {
  // Custom props only
}
```

**Rules:**
- Always use `Omit<MuiComponentNameProps, ...>` to exclude overridden props
- Document each custom prop with JSDoc
- Use strict TypeScript types (no `any`)
- Group related props together

### ✅ Forward Ref

```typescript
export const ComponentName = React.forwardRef<HTMLElement, ComponentNameProps>(
  (props, ref) => { /* ... */ }
);
```

**Why:**
- Enables parent components to access DOM node
- Required for Material-UI integration
- Supports form libraries and animations

### ✅ Display Name

```typescript
ComponentName.displayName = 'ComponentName';
```

**Why:**
- Improves debugging in React DevTools
- Required for HOCs and component composition
- Better error messages

---

## 3. Barrel Export Pattern

```typescript
// libs/ui-components/src/lib/ComponentName/index.ts

export { ComponentName } from './ComponentName';
export type { ComponentNameProps } from './ComponentName';
```

**Then update main library export:**

```typescript
// libs/ui-components/src/index.ts

export { ComponentName } from './lib/ComponentName';
export type { ComponentNameProps } from './lib/ComponentName';
```

---

## 4. Variant Patterns

### Simple Variants

```typescript
interface ButtonProps extends Omit<MuiButtonProps, 'variant'> {
  variant?: 'primary' | 'secondary' | 'danger';
}

export const Button: React.FC<ButtonProps> = ({ variant = 'primary', ...props }) => {
  const muiVariant = variant === 'danger' ? 'contained' : 'outlined';
  const color = variant === 'danger' ? 'error' : 'primary';
  
  return <MuiButton variant={muiVariant} color={color} {...props} />;
};
```

### Complex Variants with Mapping

```typescript
const variantMap = {
  primary: { variant: 'contained', color: 'primary' },
  secondary: { variant: 'outlined', color: 'secondary' },
  danger: { variant: 'contained', color: 'error' },
} as const;

export const Button: React.FC<ButtonProps> = ({ variant = 'primary', ...props }) => {
  const muiProps = variantMap[variant];
  return <MuiButton {...muiProps} {...props} />;
};
```

---

## 5. State Management Patterns

### Internal State

```typescript
export const Input: React.FC<InputProps> = (props) => {
  const [value, setValue] = React.useState(props.defaultValue || '');
  
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
    props.onChange?.(event);
  };

  return <MuiTextField value={value} onChange={handleChange} {...props} />;
};
```

### Controlled + Uncontrolled Support

```typescript
export const Input: React.FC<InputProps> = (props) => {
  const isControlled = props.value !== undefined;
  const [internalValue, setInternalValue] = React.useState(props.defaultValue || '');
  
  const value = isControlled ? props.value : internalValue;
  
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!isControlled) {
      setInternalValue(event.target.value);
    }
    props.onChange?.(event);
  };

  return <MuiTextField value={value} onChange={handleChange} />;
};
```

---

## 6. Loading State Pattern

```typescript
interface ButtonProps extends Omit<MuiButtonProps, 'disabled'> {
  loading?: boolean;
}

export const Button: React.FC<ButtonProps> = ({ loading, children, disabled, ...props }) => {
  return (
    <MuiButton disabled={disabled || loading} {...props}>
      {loading ? <CircularProgress size={20} /> : children}
    </MuiButton>
  );
};
```

---

## 7. Compound Components Pattern

```typescript
// Card.tsx
export const Card: React.FC<CardProps> & {
  Header: typeof CardHeader;
  Content: typeof CardContent;
  Actions: typeof CardActions;
} = (props) => {
  return <MuiCard {...props} />;
};

// Attach sub-components
Card.Header = CardHeader;
Card.Content = CardContent;
Card.Actions = CardActions;

// Usage:
// <Card>
//   <Card.Header>Title</Card.Header>
//   <Card.Content>Body</Card.Content>
//   <Card.Actions>Actions</Card.Actions>
// </Card>
```

---

## 8. Testing Requirements

Every component MUST have:

```typescript
// ComponentName.spec.tsx
import { render, screen } from '@testing-library/react';
import { ComponentName } from './ComponentName';

describe('ComponentName', () => {
  it('renders children correctly', () => {
    render(<ComponentName>Test Content</ComponentName>);
    expect(screen.getByText('Test Content')).toBeInTheDocument();
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
});
```

---

## 9. Documentation Requirements

Every component MUST have a documentation page:

```typescript
// apps/docs/src/app/components/ComponentNamePage.tsx

import { ComponentName } from '@design-system/ui-components';

export const ComponentNamePage = () => {
  return (
    <div>
      <h1>ComponentName</h1>
      <p>Component description and usage guidelines</p>
      
      <section>
        <h2>Basic Usage</h2>
        <ComponentName>Example</ComponentName>
      </section>
      
      <section>
        <h2>Variants</h2>
        {/* Show all variants */}
      </section>
      
      <section>
        <h2>Props</h2>
        {/* Props table */}
      </section>
    </div>
  );
};
```

**Update routing:**

```typescript
// apps/docs/src/app/App.tsx
<Route path="/components/component-name" element={<ComponentNamePage />} />
```

**Update navigation:**

```typescript
// apps/docs/src/app/components/Navigation.tsx
<Link to="/components/component-name">ComponentName</Link>
```

---

## 10. Common Mistakes to Avoid

❌ **Don't:**
- Forget `displayName`
- Use `any` types
- Ignore `forwardRef` when wrapping HTML/MUI components
- Skip JSDoc documentation
- Create components without tests
- Forget to update exports

✅ **Do:**
- Use TypeScript strict mode
- Document all props with JSDoc
- Add comprehensive tests
- Follow naming conventions (PascalCase)
- Keep components focused and single-responsibility
- Use Material-UI components as base

---

## 11. Accessibility (a11y) Requirements

```typescript
export const Button: React.FC<ButtonProps> = ({ ariaLabel, ...props }) => {
  return (
    <MuiButton
      aria-label={ariaLabel || props.children?.toString()}
      {...props}
    />
  );
};
```

**Checklist:**
- ✅ Keyboard navigation support
- ✅ ARIA labels and roles
- ✅ Focus management
- ✅ Screen reader support
- ✅ Color contrast compliance

---

## 12. Performance Optimization

```typescript
// Memoize expensive components
export const ExpensiveComponent = React.memo<ComponentProps>((props) => {
  // Component logic
});

// Use callbacks for event handlers
const handleClick = React.useCallback(() => {
  // Handler logic
}, [dependencies]);
```

---

## Quick Checklist

Before submitting a component:

- [ ] Props extend `Omit<MuiComponentNameProps, ...>`
- [ ] Component uses `forwardRef`
- [ ] `displayName` is set
- [ ] Barrel export created (`index.ts`)
- [ ] Exported from main library (`libs/ui-components/src/index.ts`)
- [ ] JSDoc documentation on all props
- [ ] Unit tests written and passing
- [ ] Documentation page created
- [ ] Routing updated
- [ ] Navigation updated
- [ ] Accessibility tested
- [ ] TypeScript strict mode passing
