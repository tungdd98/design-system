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

---

## 📚 Development Guidelines

This project follows comprehensive guidelines for code quality, component creation, and best practices.

### Component Creation

**Quick Start:**
```bash
# Simple MUI wrapper (80% of cases)
/gen-component Tooltip MuiTooltip

# Custom component
/gen-component Hero

# Nx generator (fastest, free)
nx generate @nx/react:component Name --project=ui-components
```

**Key Patterns:**
- Components in `libs/ui-components/src/lib/ComponentName/`
- Wrap MUI components, don't recreate from scratch
- TypeScript strict mode (no `any`)
- Accessibility is mandatory (WCAG 2.1 AA)
- Use theme tokens, not hardcoded values
- Export from barrel: `libs/ui-components/src/index.ts`

**Detailed Guidelines:**
- 📖 **[Component Creation Guide](.claude/guidelines/component-creation.md)** - When to use slash commands vs sub-agents vs Nx generators (80/20 rule, decision tree, examples)
- 📖 **[Code Review Standards](.claude/guidelines/code-review.md)** - Quality checklist, architecture patterns, security, accessibility, testing

**Master Index:**
- 📋 **[All Guidelines](.claude/GUIDELINES.md)** - Complete list of available guidelines

### Important Rules for AI Agents

When creating components via sub-agents or manual coding:

**MUST Follow:**
1. ✅ Read `.claude/guidelines/component-creation.md` for detailed patterns
2. ✅ Wrap MUI components (don't recreate)
3. ✅ TypeScript strict: Props interface extending MUI props
4. ✅ Accessibility: Keyboard nav, ARIA, WCAG AA contrast
5. ✅ Theme: Use tokens via `sx` or `useTheme()`
6. ✅ Exports: Update `libs/ui-components/src/index.ts` (alphabetical)
7. ✅ DisplayName: Set `Component.displayName = 'Component'`

**MUST NOT:**
- ❌ Use `any` type
- ❌ Hardcode colors/spacing
- ❌ Skip accessibility features
- ❌ Recreate MUI from scratch

See guidelines for complete rules, examples, and best practices.
