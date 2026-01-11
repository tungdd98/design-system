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

**Design Patterns**: All components and hooks MUST follow the authoritative patterns defined in `.claude/patterns/`:
- **[Component Pattern](.claude/patterns/component-pattern.md)** - Complete component design rules
- **[Hook Pattern](.claude/patterns/hook-pattern.md)** - Complete hook design rules
- **[Review Checklist](.claude/patterns/review-checklist.md)** - Code review standards

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

**IMPORTANT**: Follow the authoritative **[Component Pattern](.claude/patterns/component-pattern.md)** which defines:
- Complete component structure template
- Props interface requirements with `Omit<MuiProps, '...'>`
- Required `displayName` assignment
- Barrel export pattern
- Main library export updates
- Documentation page creation
- Routing and navigation updates

**Quick steps:**
1. Create component directory in `libs/ui-components/src/lib/ComponentName/`
2. Implement following [Component Pattern](.claude/patterns/component-pattern.md)
3. Create barrel export (`index.ts`)
4. Export from `libs/ui-components/src/index.ts`
5. Create documentation page in `apps/docs/`
6. Update routing and navigation

**Tip**: Use the `component-generator` skill which automatically follows the pattern.

## Dependencies

**Peer Dependencies** (must be installed by consumers):
- `react` ^18.0.0 || ^19.0.0
- `react-dom` ^18.0.0 || ^19.0.0
- `@emotion/react` ^11.0.0
- `@emotion/styled` ^11.0.0
- `@mui/material` ^5.0.0 || ^6.0.0

The docs app already has these installed as regular dependencies.

## Claude Code Configuration

This project is configured with **Skills** and **Sub-agents** to assist developers with common tasks.

### Available Skills

Skills automatically activate when Claude detects relevant requests:

1. **requirement-analyzer** (`.claude/skills/requirement-analyzer/`)
   - Analyzes requirement specifications
   - Identifies which features/components need modification
   - Provides impact analysis and next steps
   - **Triggers on:** "Analyze requirement...", "Analyze: ...", etc.

2. **component-generator** (`.claude/skills/component-generator/`)
   - Generates React components following project design patterns
   - Ensures MUI wrapper pattern compliance
   - Creates documentation pages automatically
   - Updates routing and exports
   - **Triggers on:** "Create component...", "Generate component...", etc.

3. **hook-generator** (`.claude/skills/hook-generator/`)
   - Generates custom React hooks with best practices
   - Ensures proper TypeScript typing
   - Follows React hooks rules (deps, cleanup, etc.)
   - **Triggers on:** "Create hook...", "Generate hook...", etc.

### Available Sub-agents

Sub-agents are specialized AI assistants for specific tasks:

1. **code-reviewer** (`.claude/agents/code-reviewer.md`)
   - Comprehensive code quality review
   - Checks design pattern compliance
   - Security vulnerability detection
   - Performance analysis
   - Documentation completeness verification
   - **Invoke with:** "Review code", "Review changes", etc.

### Usage Examples

**Example 1: Create New Component**
```
"Create Modal component with props: open, onClose, title, children"
→ component-generator creates component following MUI wrapper pattern
→ Automatically creates docs page, updates routing and exports
```

**Example 2: Analyze Requirements**
```
"Analyze requirement: Add dark mode toggle to Settings page"
→ requirement-analyzer identifies impacted components and provides action plan
```

**Example 3: Code Review**
```
"Review code changes"
→ code-reviewer runs comprehensive quality check and provides detailed report
```

### Configuration Files

- **`.claude/patterns/`** - Design pattern documentation (Single Source of Truth)
  - `component-pattern.md` - Component design rules
  - `hook-pattern.md` - Hook design rules
  - `review-checklist.md` - Code review standards
- **`.claude/skills/`** - Custom Skills (auto-activate based on request)
- **`.claude/agents/`** - Sub-agents (delegated for specialized tasks)
- **`.claude/settings.local.json`** - Personal permissions (gitignored)
