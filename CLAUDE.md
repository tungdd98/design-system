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

## Adding New Components

When adding a new component to `@design-system/ui-components`:

1. Create component directory in `libs/ui-components/src/lib/`
2. Follow the existing pattern:
   - Component file (e.g., `Button.tsx`)
   - Barrel export (`index.ts`)
   - Extend from MUI components when appropriate
   - Add TypeScript types/interfaces
3. Export from `libs/ui-components/src/index.ts`:
   ```typescript
   export { NewComponent } from './lib/NewComponent';
   export type { NewComponentProps } from './lib/NewComponent';
   ```
4. Use the component in the docs app for showcase

## Dependencies

**Peer Dependencies** (must be installed by consumers):
- `react` ^18.0.0 || ^19.0.0
- `react-dom` ^18.0.0 || ^19.0.0
- `@emotion/react` ^11.0.0
- `@emotion/styled` ^11.0.0
- `@mui/material` ^5.0.0 || ^6.0.0

The docs app already has these installed as regular dependencies.
