# Component Creation Guidelines

This guideline helps you choose the right approach for creating new components in the Design System.

---

## Overview

We support **3 approaches** for component creation, each optimized for different use cases:

1. **Nx Generators** - Fast, free, standard React patterns
2. **Slash Commands** - Design System specific, MUI wrappers
3. **Natural Language (Sub-agents)** - Complex, context-aware generation

---

## Decision Tree

```
Need to create a component?
│
├─ Standard MUI wrapper? (Button, Input, Badge, Tooltip, Alert, etc.)
│  └─ Use: /gen-component ComponentName MuiComponentName
│     ⚡ Fast, consistent, Design System patterns
│     💰 Minimal cost
│     ✅ Best for: 80% of components
│
├─ Custom simple component? (Hero, Banner, Section, Container, etc.)
│  └─ Use: /gen-component ComponentName
│     ⚡ Fast, basic template
│     ✅ Good starting point
│
├─ Complex component with many features?
│  │
│  ├─ Standard React pattern (no MUI)?
│  │  └─ Use: nx generate @nx/react:component ComponentName --project=ui-components
│  │     ⚡ Fastest, zero cost, offline
│  │     ✅ Nx-integrated, standard React
│  │
│  └─ Design System specific complexity?
│     └─ Use: Natural language description
│        🎯 Context-aware, intelligent, flexible
│        💰💰 Higher cost, slower
│        ✅ Best for: Complex compositions, unique requirements
│
│        Example:
│        "Create a DataTable component with sorting, filtering,
│         pagination, row selection, and CSV export functionality.
│         It should integrate with our theme system."
│
└─ Unsure which to use?
   └─ Start with: /gen-component ComponentName
      You can always refactor or ask Claude for help
```

---

## Approach 1: Slash Commands (Recommended for Most Cases)

### When to Use
- ✅ Simple MUI wrappers (Button, Input, Badge, Tooltip, Alert, etc.)
- ✅ Custom simple components (Hero, Banner, Section)
- ✅ Standard Design System patterns
- ✅ Need consistency across team
- ✅ Want fast, predictable results

### How to Use

**Simple MUI Wrapper:**
```bash
/gen-component Tooltip MuiTooltip
/gen-component Alert MuiAlert
/gen-component Avatar MuiAvatar
```

**Custom Component:**
```bash
/gen-component Hero
/gen-component Banner
/gen-component Section
```

### What It Generates
- `libs/ui-components/src/lib/ComponentName/ComponentName.tsx`
- `libs/ui-components/src/lib/ComponentName/index.ts`
- Updates `libs/ui-components/src/index.ts` (barrel export)

### Advantages
- ⚡ **Fast** - Instant generation, no waiting
- ✅ **Consistent** - Same output every time
- 💰 **Cheap** - Minimal API cost
- 📝 **Predictable** - Know exactly what you'll get
- 🔄 **Version controlled** - Template in git

### Limitations
- ❌ Fixed templates only
- ❌ No context awareness
- ❌ Limited to predefined patterns

---

## Approach 2: Nx Generators (Fastest, Zero Cost)

### When to Use
- ✅ Standard React component (no MUI wrapper)
- ✅ Want fastest generation (no AI overhead)
- ✅ Offline development
- ✅ Zero API cost is priority
- ✅ Team familiar with Nx

### How to Use

```bash
# Generate component
nx generate @nx/react:component Tooltip --project=ui-components

# With options
nx generate @nx/react:component DataTable \
  --project=ui-components \
  --export \
  --style=css
```

### What It Generates
- Component file with standard React structure
- Optional CSS/styled-components
- Integrated with Nx project structure

### Advantages
- ⚡⚡⚡ **Fastest** - No AI reasoning, instant
- 💰 **Free** - No API costs
- 🔌 **Offline** - Works without internet
- 🏗️ **Nx-integrated** - Follows Nx conventions

### Limitations
- ❌ Not Design System specific (no MUI patterns)
- ❌ May need manual updates for MUI integration
- ❌ Requires Nx CLI knowledge

### Post-Generation Steps
After using Nx generator:
1. Update component to wrap MUI if needed
2. Add to barrel export (`libs/ui-components/src/index.ts`)
3. Follow Design System patterns (theme, props interface)

---

## Approach 3: Natural Language (Sub-agents)

### When to Use
- ✅ Complex components with many features
- ✅ Unique requirements not in templates
- ✅ Need context-aware generation
- ✅ Multiple related files (component + tests + docs)
- ✅ Willing to review AI-generated code
- ✅ Senior developers who can validate output

### How to Use

Simply describe what you want in natural language:

**Example 1: Complex Component**
```
"Create a DataTable component with the following features:
- Sorting (ascending/descending)
- Column filtering
- Pagination (10, 25, 50, 100 rows)
- Row selection (single and multi-select)
- Export to CSV functionality
- Integration with our theme system
- TypeScript interfaces for data rows
- Accessibility (keyboard navigation, screen reader support)"
```

**Example 2: Composition Pattern**
```
"Create a Modal component that wraps MUI Dialog with:
- Custom header with close button
- Scrollable content area
- Footer with action buttons (cancel, confirm)
- Support for different sizes (sm, md, lg, xl)
- Backdrop click to close (configurable)
- Escape key to close
- Focus trap for accessibility"
```

**Example 3: Multiple Related Components**
```
"Create a Form system with:
- FormProvider context for form state
- FormInput component wrapping our Input
- FormSelect component wrapping MUI Select
- FormCheckbox component
- FormRadioGroup component
- Validation using react-hook-form
- Error display integration
- Submit handler with loading state"
```

### What It Generates
- Component files following project patterns
- Can generate tests, docs, types
- Updates related files intelligently
- Contextual implementation based on existing codebase

### Advantages
- 🧠 **Context-aware** - Understands conversation and project
- 🎯 **Flexible** - Adapts to unique requirements
- 💬 **Interactive** - Can ask clarifying questions
- 📚 **Holistic** - Generates multiple related files
- 🔍 **Learns** - Explores existing patterns before generating

### Limitations
- 🐌 **Slower** - Requires AI reasoning and exploration
- 💰💰💰 **Expensive** - Higher API costs
- ❓ **Non-deterministic** - Output may vary
- 🔍 **Requires review** - Must validate AI decisions
- ❌ **Not for CI/CD** - Can't automate easily

### Best Practices
1. **Be specific** - Describe all requirements clearly
2. **Mention patterns** - Reference existing components
3. **Review output** - Always check generated code
4. **Iterate** - Refine if needed
5. **Document decisions** - Comment complex logic

---

## Comparison Table

| Aspect | Slash Commands | Nx Generators | Natural Language |
|--------|---------------|---------------|------------------|
| **Speed** | ⚡⚡⚡ Instant | ⚡⚡⚡ Fastest | 🐌 Slow (30s-2min) |
| **Cost** | 💰 Minimal | 💰 Free | 💰💰💰 High |
| **Consistency** | ✅ Perfect | ✅ Perfect | ⚠️ Variable |
| **Flexibility** | ❌ Limited | ❌ Limited | ✅ High |
| **Context-aware** | ❌ No | ❌ No | ✅ Yes |
| **MUI patterns** | ✅ Built-in | ❌ Manual | ✅ Can learn |
| **Learning curve** | ⚡ Easy | ⚠️ Medium | ⚡ Easy |
| **Offline** | ❌ No | ✅ Yes | ❌ No |
| **CI/CD** | ✅ Yes | ✅ Yes | ❌ No |
| **Best for** | 80% cases | Speed/cost | 20% complex |

---

## Examples & Use Cases

### Use Case 1: Simple MUI Wrapper

**Scenario:** Need a Tooltip component wrapping MUI Tooltip

**Recommended:** Slash Command
```bash
/gen-component Tooltip MuiTooltip
```

**Why:** Fast, consistent, perfect for simple wrappers

---

### Use Case 2: Custom Layout Component

**Scenario:** Need a Hero section for landing pages

**Option A:** Slash Command (Quick start)
```bash
/gen-component Hero
```
Then customize manually.

**Option B:** Nx Generator (Fastest)
```bash
nx generate @nx/react:component Hero --project=ui-components
```
Then add to barrel export.

---

### Use Case 3: Complex Data Component

**Scenario:** Need DataTable with sorting, filtering, pagination

**Recommended:** Natural Language
```
"Create a DataTable component with:
- Column configuration (label, field, sortable, filterable)
- Sorting (ascending/descending)
- Column filtering with input fields
- Pagination (configurable page sizes)
- Row selection
- Export to CSV
- TypeScript generics for row data
- Accessibility features
- Integration with our theme system"
```

**Why:** Too complex for templates, needs intelligent composition

---

### Use Case 4: Form Components

**Scenario:** Need validated form inputs

**Option A:** Slash Command for each field
```bash
/gen-component FormInput MuiTextField
/gen-component FormSelect MuiSelect
/gen-component FormCheckbox MuiCheckbox
```

**Option B:** Natural Language for the whole system
```
"Create a Form system with FormProvider, FormInput, FormSelect,
FormCheckbox, validation using react-hook-form, and error display"
```

Choose based on time vs customization needs.

---

## Best Practices

### 1. Start Simple, Iterate
- Begin with slash command or Nx generator
- Add complexity as needed
- Refactor if requirements change

### 2. Follow Design System Patterns
- Look at existing components first
- Match naming conventions (PascalCase)
- Use theme tokens, not hardcoded values
- Follow TypeScript patterns (Props interface, displayName)

### 3. Component Checklist
After generating, ensure:
- ✅ Component follows folder structure (`ComponentName/ComponentName.tsx`, `index.ts`)
- ✅ TypeScript types properly defined
- ✅ Exported from barrel (`libs/ui-components/src/index.ts`)
- ✅ DisplayName set for React DevTools
- ✅ Uses theme tokens (not hardcoded colors/spacing)
- ✅ Props interface extends MUI props (if wrapper)
- ✅ JSDoc comments for IDE intellisense

### 4. Testing & Documentation (Manual)
Currently not auto-generated, add manually:
- Write unit tests (`ComponentName.test.tsx`)
- Add to docs app (`apps/docs/src/app/pages/ComponentName.tsx`)
- Document props and usage examples
- Test accessibility (keyboard nav, screen reader)

### 5. Build & Verify
```bash
# Build to check for TypeScript errors
npm run build

# Run linting
npx nx lint ui-components

# Test import
import { ComponentName } from '@design-system/ui-components';
```

---

## Troubleshooting

### Slash Command Issues

**Component already exists:**
```
Error: Component 'Button' already exists
```
Solution: Use different name or delete existing component first.

**Invalid name (not PascalCase):**
```
Error: Component name must be PascalCase
```
Solution: Use PascalCase (e.g., `MyComponent`, not `myComponent`).

### Nx Generator Issues

**Project not found:**
```
Error: Cannot find project 'ui-components'
```
Solution: Ensure you're in project root and project exists in `workspace.json`.

### Natural Language Issues

**Output doesn't match expectations:**
- Provide more specific requirements
- Reference existing components as examples
- Iterate: ask Claude to refine the output

**Generated code has errors:**
- Review and fix TypeScript errors
- Check imports and dependencies
- Validate against design system patterns

---

## Quick Reference

### Commands Cheat Sheet

```bash
# Slash Command - MUI Wrapper
/gen-component ComponentName MuiComponentName

# Slash Command - Custom
/gen-component ComponentName

# Nx Generator
nx generate @nx/react:component ComponentName --project=ui-components

# Natural Language
"Create a [component description]..."
```

### When in Doubt

1. **Simple wrapper?** → `/gen-component Name MuiName`
2. **Custom simple?** → `/gen-component Name`
3. **Complex?** → Natural language description
4. **Fastest?** → `nx generate`
5. **Need help?** → Ask Claude!

---

## Future Enhancements

Planned improvements to component generation:

- 🧪 Auto-generate test files
- 📚 Auto-generate docs pages
- 🎨 Interactive mode (guided prompts)
- 📖 Storybook story generation
- ✅ Pre-commit validation
- 🔄 Component update/migration tools

---

## Technical Patterns & Standards

### File Structure Pattern

All components must follow this structure:

```
libs/ui-components/src/lib/ComponentName/
├── ComponentName.tsx    # Component implementation
└── index.ts             # Barrel exports
```

**Barrel export (index.ts):**
```typescript
export { ComponentName } from './ComponentName';
export type { ComponentNameProps } from './ComponentName';
```

**Main barrel (`libs/ui-components/src/index.ts`):**
- Add in alphabetical order:
```typescript
export { ComponentName } from './lib/ComponentName';
export type { ComponentNameProps } from './lib/ComponentName';
```

### TypeScript Patterns

**Props Interface (MUI Wrapper):**
```typescript
import { Button as MuiButton, ButtonProps as MuiButtonProps } from '@mui/material';

export interface ButtonProps extends Omit<MuiButtonProps, 'size'> {
  size?: 'small' | 'medium' | 'large';
  isLoading?: boolean; // Custom props
}
```

**Props Interface (Custom Component):**
```typescript
export interface HeroProps {
  title: string;
  subtitle?: string;
  children?: React.ReactNode;
  className?: string;
}
```

**Component Implementation:**
```typescript
export const ComponentName: React.FC<ComponentNameProps> = ({
  // Default props in destructuring
  variant = 'contained',
  size = 'medium',
  ...props
}) => {
  return <MuiComponent {...props} />;
};

// Set displayName for React DevTools
ComponentName.displayName = 'ComponentName';
```

### MUI Integration Patterns

**Simple Wrapper:**
```typescript
import { Tooltip as MuiTooltip, TooltipProps as MuiTooltipProps } from '@mui/material';

export interface TooltipProps extends MuiTooltipProps {}

export const Tooltip: React.FC<TooltipProps> = (props) => {
  return <MuiTooltip {...props} />;
};
```

**Enhanced Wrapper (Custom Props):**
```typescript
export interface ButtonProps extends Omit<MuiButtonProps, 'disabled'> {
  isLoading?: boolean;
}

export const Button: React.FC<ButtonProps> = ({
  isLoading = false,
  children,
  ...props
}) => {
  return (
    <MuiButton disabled={isLoading} {...props}>
      {isLoading ? 'Loading...' : children}
    </MuiButton>
  );
};
```

**Composition Pattern:**
```typescript
export const Card: React.FC<CardProps> = ({
  title,
  subheader,
  actions,
  media,
  children,
  ...props
}) => {
  return (
    <MuiCard {...props}>
      {(title || subheader) && (
        <CardHeader title={title} subheader={subheader} />
      )}
      {media && <CardMedia {...media} />}
      <CardContent>{children}</CardContent>
      {actions && <CardActions>{actions}</CardActions>}
    </MuiCard>
  );
};
```

### Theme Integration

**Using sx prop:**
```typescript
export const Component: React.FC<Props> = ({ truncate, ...props }) => {
  return (
    <MuiTypography
      {...props}
      sx={{
        ...(truncate && {
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          whiteSpace: 'nowrap',
        }),
        ...props.sx, // Merge with user sx
      }}
    />
  );
};
```

**Using useTheme:**
```typescript
import { useTheme } from '@mui/material/styles';

export const Component: React.FC<Props> = (props) => {
  const theme = useTheme();

  return (
    <Box
      sx={{
        color: theme.palette.primary.main,
        padding: theme.spacing(2),
        [theme.breakpoints.up('md')]: {
          padding: theme.spacing(4),
        },
      }}
    >
      {props.children}
    </Box>
  );
};
```

### Accessibility Requirements

**Keyboard Navigation:**
```typescript
export const InteractiveComponent: React.FC<Props> = ({ onClick, ...props }) => {
  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      onClick?.(event as any);
    }
  };

  return (
    <div
      role="button"
      tabIndex={0}
      onClick={onClick}
      onKeyDown={handleKeyDown}
      {...props}
    />
  );
};
```

**ARIA Labels:**
```typescript
<IconButton aria-label="Close modal">
  <CloseIcon />
</IconButton>

<TextField
  label="Email"
  aria-required="true"
  aria-invalid={hasError}
  aria-describedby={hasError ? "email-error" : undefined}
/>
```

**Focus Management:**
```typescript
export const Modal: React.FC<ModalProps> = ({ open, onClose, children }) => {
  const firstFocusableRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (open && firstFocusableRef.current) {
      firstFocusableRef.current.focus();
    }
  }, [open]);

  return (
    <MuiDialog open={open} onClose={onClose}>
      <DialogTitle>
        Title
        <IconButton ref={firstFocusableRef} onClick={onClose}>
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent>{children}</DialogContent>
    </MuiDialog>
  );
};
```

### Naming Conventions

- **Components:** PascalCase (`Button`, `DataTable`, `FormInput`)
- **Props interfaces:** `ComponentNameProps`
- **Functions:** camelCase (`handleClick`, `formatDate`)
- **Boolean props:** `is`, `has`, `should` prefix (`isLoading`, `hasError`, `shouldRender`)
- **Event handlers:** `on` prefix (`onClick`, `onChange`, `onSubmit`)

### JSDoc Comments

```typescript
export interface ButtonProps extends MuiButtonProps {
  /**
   * Whether the button is in a loading state.
   * When true, the button is disabled and shows loading text.
   * @default false
   */
  isLoading?: boolean;
}

/**
 * Button component wrapping MUI Button with loading state support.
 *
 * @example
 * ```tsx
 * <Button isLoading onClick={handleSubmit}>
 *   Submit
 * </Button>
 * ```
 */
export const Button: React.FC<ButtonProps> = ({ ... }) => { ... };
```

### Anti-Patterns (Do NOT Do)

```typescript
// ❌ BAD: Using `any` type
export interface BadProps {
  data: any;
  onClick: any;
}

// ✅ GOOD: Proper types
export interface GoodProps {
  data: { id: string; name: string }[];
  onClick: (event: React.MouseEvent) => void;
}

// ❌ BAD: Hardcoded colors/spacing
<Box sx={{ color: '#1976d2', padding: '16px' }}>

// ✅ GOOD: Theme tokens
<Box sx={{ color: 'primary.main', padding: 2 }}>

// ❌ BAD: Recreating MUI component
export const MyButton = () => (
  <button className="custom-button">Click</button>
);

// ✅ GOOD: Wrapping MUI
export const Button: React.FC<ButtonProps> = (props) => (
  <MuiButton {...props} />
);

// ❌ BAD: Missing displayName
export const Component = () => { ... };

// ✅ GOOD: Set displayName
export const Component = () => { ... };
Component.displayName = 'Component';
```

---

**Remember:** The goal is consistency and speed. Choose the approach that fits your needs, and don't overthink it. You can always refactor later!

For complete technical standards, see also:
- **[Code Review Guidelines](code-review.md)** - Comprehensive quality checklist
- **[CLAUDE.md](../../CLAUDE.md)** - Project overview and quick reference
