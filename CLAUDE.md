# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
# Development
npm run dev              # Start docs app dev server (http://localhost:4200)
npm run build            # Build docs app for production
npm run preview          # Preview production build

# Linting
npx nx lint docs         # Lint docs app
```

## Architecture

This is an Nx monorepo containing a Design System built with React, TypeScript, and MUI.

### Monorepo Structure

- **apps/docs** - Documentation website showcasing all components (React + Vite)
- **libs/ui-components** - Shared component library wrapping MUI components

### Component Library (`@design-system/ui-components`)

Components are imported via the path alias `@design-system/ui-components` (configured in `tsconfig.base.json` and `vite.config.mts`).

Each component follows this structure:
```
libs/ui-components/src/lib/ComponentName/
├── ComponentName.tsx    # Component implementation
└── index.ts             # Exports
```

Components wrap MUI with custom props/defaults:
- **Button** - MUI Button with `isLoading` prop
- **Typography** - MUI Typography with `truncate` and `maxLines` props
- **Input** - MUI TextField wrapper
- **Card** - MUI Card with simplified `title`, `subheader`, `actions`, `media` props
- **Badge** - MUI Chip wrapper

### Theme

Custom MUI theme is defined in `libs/ui-components/src/lib/theme/theme.ts`. The `ThemeProvider` component wraps the app in `apps/docs/src/main.tsx`.

### Documentation App

- Uses React Router for navigation
- `Layout.tsx` provides sidebar navigation
- Each component has a dedicated page in `apps/docs/src/app/pages/`
- `ComponentShowcase` component displays component examples
