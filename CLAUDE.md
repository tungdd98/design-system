# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is an Nx monorepo for a design system featuring:
- **UI Components Library** (`libs/ui-components`): A React component library built on Material-UI
- **Documentation App** (`apps/docs`): A React application showcasing the component library

The project uses Vite for building, Vitest for testing, and styled-components as the styling approach for custom components.

## Development Commands

### Running the Documentation App
```bash
# Start dev server (default on port 4200)
npx nx serve docs
# or
npm run dev

# Build for production
npx nx build docs
# or
npm run build

# Preview production build
npx nx preview docs
# or
npm run preview
```

### Linting and Type Checking
```bash
# Lint all projects
npx nx run-many -t lint

# Lint specific project
npx nx lint docs
npx nx lint ui-components

# Type check all projects
npx nx run-many -t typecheck

# Type check specific project
npx nx typecheck docs
npx nx typecheck ui-components
```

### Working with Nx
```bash
# Show project dependency graph
npx nx graph

# Show available targets for a project
npx nx show project docs
npx nx show project ui-components

# List all projects
npx nx list

# Generate new React app
npx nx g @nx/react:app <app-name>

# Generate new React library
npx nx g @nx/react:lib <lib-name>
```

## Architecture

### Monorepo Structure

```
design-system/
├── apps/
│   └── docs/                 # Documentation/showcase app
│       ├── src/
│       │   ├── app/          # App components
│       │   ├── assets/       # Static assets
│       │   └── main.tsx      # Entry point
│       └── vite.config.mts   # Vite config (port 4200)
├── libs/
│   └── ui-components/        # Component library
│       ├── src/
│       │   ├── lib/
│       │   │   ├── Badge/
│       │   │   ├── Button/
│       │   │   ├── Card/
│       │   │   ├── Input/
│       │   │   ├── Typography/
│       │   │   └── theme/    # Theme configuration
│       │   └── index.ts      # Public exports
│       └── package.json
├── tsconfig.base.json        # TypeScript path mappings
└── nx.json                   # Nx configuration
```

### Import Paths

TypeScript path mapping is configured in `tsconfig.base.json`:
```typescript
"@design-system/ui-components": ["./libs/ui-components/src/index.ts"]
```

Import components like this:
```typescript
import { Button, Typography, ThemeProvider } from '@design-system/ui-components';
```

### Component Library Architecture

The `@design-system/ui-components` library:
- Built on top of Material-UI (`@mui/material`)
- Uses Emotion for styling (`@emotion/react`, `@emotion/styled`)
- Components are wrappers that extend MUI components with custom props and theming
- Each component is in its own directory with an `index.ts` barrel export
- Theme configuration is centralized in `libs/ui-components/src/lib/theme/`

**Component Pattern Example** (Button):
```typescript
// Extends MUI ButtonProps with custom props
export interface ButtonProps extends Omit<MuiButtonProps, 'size'> {
  size?: 'small' | 'medium' | 'large';
  isLoading?: boolean;
}

// Wraps MUI component
export const Button: React.FC<ButtonProps> = ({ ... }) => {
  return <MuiButton {...props}>{children}</MuiButton>;
};
```

**Current Components**:
- `Button` - Enhanced MUI Button with loading state
- `Typography` - Text components
- `Input` - Form input
- `Card` - Container component
- `Badge` - Status indicator
- `ThemeProvider` - MUI theme provider wrapper
- `theme` / `themeOptions` - Custom theme configuration

### Theme System

The theme is built on Material-UI's theming system with custom overrides:
- Custom color palette (primary blue, secondary purple)
- Inter font family as default
- Custom border radius (8px for buttons, 12px for cards)
- Typography scale configured for h1-h6 and body text
- Component-level style overrides for MuiButton and MuiCard

Import and use:
```typescript
import { ThemeProvider } from '@design-system/ui-components';

// Wrap your app
<ThemeProvider>
  <App />
</ThemeProvider>
```

### Nx Task Configuration

Nx plugins automatically infer build tasks from Vite and TypeScript configs:
- `@nx/vite/plugin` - Provides build, serve, preview, test targets
- `@nx/js/typescript` - Provides typecheck target
- `@nx/eslint/plugin` - Provides lint target

The `docs` app depends on `ui-components` - Nx automatically builds dependencies when needed via the `dependsOn: ["^build"]` configuration.

## Git Workflow

### Commit Message Convention

This project uses **Conventional Commits** enforced by Husky + commitlint. Commit messages must follow this format:

```
<type>: <subject>
```

**Valid types**:
- `feat` - New feature
- `fix` - Bug fix
- `docs` - Documentation
- `style` - Formatting, missing semicolons
- `refactor` - Code refactoring
- `test` - Adding tests
- `chore` - Maintenance
- `perf` - Performance improvement
- `ci` - CI/CD changes
- `build` - Build system changes
- `revert` - Revert previous commit

**Rules**:
- Subject must be lowercase (no start-case, pascal-case, or upper-case)
- Subject max length: 72 characters

**Examples**:
```
feat: add dark mode support to button component
fix: resolve input validation error
docs: update readme with new component examples
```

The commit-msg hook will reject commits that don't follow this format.

---

## 🎯 Design Patterns & Code Generation Guide

This section defines the **exact patterns** Claude Code should follow when creating new components, hooks, services, or APIs. Following these patterns ensures consistency and maintainability.

### 📦 Creating New UI Components

When asked to create a new component in `@design-system/ui-components`, follow this **exact pattern**:

#### Step 1: Create Component Directory Structure

```
libs/ui-components/src/lib/
└── <ComponentName>/
    ├── <ComponentName>.tsx    # Main component file
    └── index.ts               # Barrel export
```

#### Step 2: Component File Template

**File:** `libs/ui-components/src/lib/<ComponentName>/<ComponentName>.tsx`

```typescript
import React from 'react';
import {
  <MuiComponent> as Mui<ComponentName>,
  <MuiComponent>Props as Mui<ComponentName>Props,
} from '@mui/material';

/**
 * Props for the <ComponentName> component.
 * Extends MUI <MuiComponent>Props with custom properties.
 */
export interface <ComponentName>Props extends Mui<ComponentName>Props {
  // Add custom props here
  // Example: isLoading?: boolean;
}

/**
 * <ComponentName> component description.
 *
 * @example
 * ```tsx
 * <ComponentName>Content</ComponentName>
 * ```
 */
export const <ComponentName>: React.FC<<ComponentName>Props> = ({
  children,
  // Add custom props with defaults
  ...props
}) => {
  return (
    <Mui<ComponentName> {...props}>
      {children}
    </Mui<ComponentName>>
  );
};

<ComponentName>.displayName = '<ComponentName>';
```

**Real Example (Button):**

```typescript
import React from 'react';
import { Button as MuiButton, ButtonProps as MuiButtonProps } from '@mui/material';

export interface ButtonProps extends Omit<MuiButtonProps, 'size'> {
  size?: 'small' | 'medium' | 'large';
  isLoading?: boolean;
}

export const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'contained',
  color = 'primary',
  size = 'medium',
  isLoading = false,
  disabled,
  ...props
}) => {
  return (
    <MuiButton
      variant={variant}
      color={color}
      size={size}
      disabled={disabled || isLoading}
      {...props}
    >
      {isLoading ? 'Loading...' : children}
    </MuiButton>
  );
};

Button.displayName = 'Button';
```

#### Step 3: Barrel Export Template

**File:** `libs/ui-components/src/lib/<ComponentName>/index.ts`

```typescript
export { <ComponentName> } from './<ComponentName>';
export type { <ComponentName>Props } from './<ComponentName>';
```

#### Step 4: Update Public API

**File:** `libs/ui-components/src/index.ts`

Add exports:
```typescript
export { <ComponentName> } from './lib/<ComponentName>';
export type { <ComponentName>Props } from './lib/<ComponentName>';
```

#### Step 5: Create Documentation Page

**File:** `apps/docs/src/app/pages/<ComponentName>Page.tsx`

```typescript
import React from 'react';
import { Box } from '@mui/material';
import { Typography, <ComponentName> } from '@design-system/ui-components';
import { ComponentShowcase } from '../components/ComponentShowcase';

export const <ComponentName>Page: React.FC = () => {
  return (
    <Box>
      <Typography variant="h4" sx={{ mb: 1, fontWeight: 700 }}>
        <ComponentName>
      </Typography>
      <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
        [Component description - what it does and when to use it]
      </Typography>

      <ComponentShowcase
        title="Basic Usage"
        description="[Description of basic usage]"
      >
        <<ComponentName>>Example</<ComponentName>>
      </ComponentShowcase>

      <ComponentShowcase
        title="Variants"
        description="[Description of variants]"
      >
        <<ComponentName> variant="variant1">Variant 1</<ComponentName>>
        <<ComponentName> variant="variant2">Variant 2</<ComponentName>>
      </ComponentShowcase>

      <ComponentShowcase
        title="Sizes"
        description="[Description of sizes]"
      >
        <<ComponentName> size="small">Small</<ComponentName>>
        <<ComponentName> size="medium">Medium</<ComponentName>>
        <<ComponentName> size="large">Large</<ComponentName>>
      </ComponentShowcase>

      <ComponentShowcase
        title="States"
        description="[Description of different states]"
      >
        <<ComponentName> disabled>Disabled</<ComponentName>>
      </ComponentShowcase>
    </Box>
  );
};
```

#### Step 6: Add Route to Documentation App

**File:** `apps/docs/src/app/app.tsx`

Import the page:
```typescript
import { <ComponentName>Page } from './pages/<ComponentName>Page';
```

Add route:
```typescript
<Route path="/<component-name>" element={<<ComponentName>Page />} />
```

Update navigation in `apps/docs/src/app/components/Layout.tsx`:
```typescript
<ListItemButton component={Link} to="/<component-name>">
  <ListItemText primary="<ComponentName>" />
</ListItemButton>
```

---

### 🪝 Creating Custom Hooks

When creating custom React hooks, follow this pattern:

#### Hook File Template

**File:** `libs/ui-components/src/lib/hooks/use<HookName>.ts` (if shared across components)
**Or:** `apps/docs/src/app/hooks/use<HookName>.ts` (if specific to docs app)

```typescript
import { useState, useEffect, useCallback } from 'react';

/**
 * Custom hook for [description].
 *
 * @param {type} param - Parameter description
 * @returns {type} Return value description
 *
 * @example
 * ```tsx
 * const { data, loading, error } = use<HookName>(params);
 * ```
 */
export const use<HookName> = (param: ParamType): ReturnType => {
  const [state, setState] = useState<StateType>(initialValue);

  useEffect(() => {
    // Effect logic
  }, [dependencies]);

  const handleAction = useCallback(() => {
    // Callback logic
  }, [dependencies]);

  return {
    state,
    handleAction,
  };
};
```

**Example:**

```typescript
import { useState, useCallback } from 'react';

/**
 * Hook for managing toggle state.
 *
 * @param initialValue - Initial boolean value
 * @returns Object with current state and toggle function
 *
 * @example
 * ```tsx
 * const { isOpen, toggle } = useToggle(false);
 * ```
 */
export const useToggle = (initialValue: boolean = false) => {
  const [isOpen, setIsOpen] = useState(initialValue);

  const toggle = useCallback(() => {
    setIsOpen((prev) => !prev);
  }, []);

  const open = useCallback(() => setIsOpen(true), []);
  const close = useCallback(() => setIsOpen(false), []);

  return { isOpen, toggle, open, close };
};
```

#### Hook Export Pattern

If in `libs/ui-components/src/lib/hooks/`:
- Create `libs/ui-components/src/lib/hooks/index.ts`:
  ```typescript
  export { use<HookName> } from './use<HookName>';
  ```
- Update `libs/ui-components/src/index.ts`:
  ```typescript
  export { use<HookName> } from './lib/hooks';
  ```

---

### 🌐 Creating API Services & Data Fetching

When implementing API calls or data services, follow this pattern:

#### Service File Template

**File:** `apps/docs/src/app/services/<serviceName>.service.ts`

```typescript
/**
 * API endpoints for [resource name].
 */
const API_BASE_URL = import.meta.env.VITE_API_URL || 'https://api.example.com';

export interface <Resource> {
  id: string;
  // Add resource properties
}

export interface <Resource>CreateInput {
  // Add creation input properties
}

export interface <Resource>UpdateInput {
  // Add update input properties
}

/**
 * Service for managing [resource name] API calls.
 */
export class <ResourceName>Service {
  /**
   * Fetch all [resources].
   */
  static async getAll(): Promise<<Resource>[]> {
    const response = await fetch(`${API_BASE_URL}/<resources>`);
    if (!response.ok) {
      throw new Error(`Failed to fetch <resources>: ${response.statusText}`);
    }
    return response.json();
  }

  /**
   * Fetch a single [resource] by ID.
   */
  static async getById(id: string): Promise<<Resource>> {
    const response = await fetch(`${API_BASE_URL}/<resources>/${id}`);
    if (!response.ok) {
      throw new Error(`Failed to fetch <resource>: ${response.statusText}`);
    }
    return response.json();
  }

  /**
   * Create a new [resource].
   */
  static async create(data: <Resource>CreateInput): Promise<<Resource>> {
    const response = await fetch(`${API_BASE_URL}/<resources>`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    if (!response.ok) {
      throw new Error(`Failed to create <resource>: ${response.statusText}`);
    }
    return response.json();
  }

  /**
   * Update an existing [resource].
   */
  static async update(id: string, data: <Resource>UpdateInput): Promise<<Resource>> {
    const response = await fetch(`${API_BASE_URL}/<resources>/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    if (!response.ok) {
      throw new Error(`Failed to update <resource>: ${response.statusText}`);
    }
    return response.json();
  }

  /**
   * Delete a [resource].
   */
  static async delete(id: string): Promise<void> {
    const response = await fetch(`${API_BASE_URL}/<resources>/${id}`, {
      method: 'DELETE',
    });
    if (!response.ok) {
      throw new Error(`Failed to delete <resource>: ${response.statusText}`);
    }
  }
}
```

#### Data Fetching Hook Pattern

**File:** `apps/docs/src/app/hooks/use<Resource>.ts`

```typescript
import { useState, useEffect } from 'react';
import { <ResourceName>Service, type <Resource> } from '../services/<serviceName>.service';

interface Use<Resource>Result {
  data: <Resource>[] | null;
  loading: boolean;
  error: Error | null;
  refetch: () => Promise<void>;
}

/**
 * Hook for fetching [resources].
 *
 * @returns Object with data, loading state, error, and refetch function
 *
 * @example
 * ```tsx
 * const { data, loading, error, refetch } = use<Resource>();
 * ```
 */
export const use<Resource> = (): Use<Resource>Result => {
  const [data, setData] = useState<<Resource>[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const fetchData = async () => {
    try {
      setLoading(true);
      setError(null);
      const result = await <ResourceName>Service.getAll();
      setData(result);
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Unknown error'));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return {
    data,
    loading,
    error,
    refetch: fetchData,
  };
};
```

---

### 📝 File Naming Conventions

**Components:**
- Component files: `PascalCase.tsx` (e.g., `Button.tsx`, `Card.tsx`)
- Component directories: `PascalCase/` (e.g., `Button/`, `Card/`)
- Barrel exports: `index.ts` (always lowercase)

**Hooks:**
- Hook files: `useCamelCase.ts` (e.g., `useToggle.ts`, `useLocalStorage.ts`)
- Always start with `use` prefix

**Services:**
- Service files: `camelCase.service.ts` (e.g., `user.service.ts`, `api.service.ts`)

**Pages:**
- Page files: `PascalCasePage.tsx` (e.g., `ButtonPage.tsx`, `HomePage.tsx`)

**Types:**
- Type files: `camelCase.types.ts` (e.g., `user.types.ts`, `api.types.ts`)
- Or include types in the same file as the component/service

---

### 🧪 Testing Patterns

When creating tests for components:

**File:** `libs/ui-components/src/lib/<ComponentName>/<ComponentName>.spec.tsx`

```typescript
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { <ComponentName> } from './<ComponentName>';

describe('<ComponentName>', () => {
  it('should render successfully', () => {
    render(<<ComponentName>>Test</<ComponentName>>);
    expect(screen.getByText('Test')).toBeInTheDocument();
  });

  it('should apply custom props correctly', () => {
    render(<<ComponentName> data-testid="test-component">Content</<ComponentName>>);
    const component = screen.getByTestId('test-component');
    expect(component).toBeInTheDocument();
  });

  // Add more test cases as needed
});
```

---

### ⚡ Quick Reference: Creating New Components

**Command to Claude:**
> "Create a new Accordion component in the UI library with expandable sections"

**Expected Actions:**
1. ✅ Create `libs/ui-components/src/lib/Accordion/Accordion.tsx` extending MUI Accordion
2. ✅ Create `libs/ui-components/src/lib/Accordion/index.ts` barrel export
3. ✅ Update `libs/ui-components/src/index.ts` with exports
4. ✅ Create `apps/docs/src/app/pages/AccordionPage.tsx` showcase page
5. ✅ Update `apps/docs/src/app/app.tsx` with new route
6. ✅ Update `apps/docs/src/app/components/Layout.tsx` with navigation link
7. ✅ Run `npx nx run-many -t lint typecheck` to verify code quality
8. ✅ Commit with message: `feat: add accordion component with expandable sections`

---

### 🎨 ComponentShowcase Wrapper Pattern

All documentation pages use the `ComponentShowcase` wrapper to display component examples:

```typescript
<ComponentShowcase
  title="Section Title"
  description="Description of what this section demonstrates"
>
  {/* Component examples here */}
</ComponentShowcase>
```

**Common Showcase Sections:**
1. **Basic Usage** - Simplest example
2. **Variants** - Different visual styles
3. **Sizes** - Size variations
4. **Colors** - Color options
5. **States** - Disabled, loading, error states
6. **Advanced** - Complex examples with multiple props

---

## Adding New Components

**DEPRECATED:** See the comprehensive "🎯 Design Patterns & Code Generation Guide" section above for detailed instructions.

## Dependencies

**Peer Dependencies** (must be installed by consumers):
- `react` ^18.0.0 || ^19.0.0
- `react-dom` ^18.0.0 || ^19.0.0
- `@emotion/react` ^11.0.0
- `@emotion/styled` ^11.0.0
- `@mui/material` ^5.0.0 || ^6.0.0

The docs app already has these installed as regular dependencies.
