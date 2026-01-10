# Code Review Guidelines for Design System

This document defines the comprehensive review criteria used across all code review processes (CLI `/review` command and GitHub Actions workflows).

---

## Review Focus Areas

### 1. Code Quality & Best Practices

#### React Patterns
- ✅ Prefer functional components over class components
- ✅ Follow hooks rules: no calls inside loops, conditionals, or nested functions
- ✅ Single-responsibility principle: components do one thing well
- ✅ Proper component composition and prop drilling avoidance
- ✅ Error boundaries for graceful error handling

#### TypeScript Strictness
- ❌ Avoid `any` type (use `unknown` if truly needed, then narrow with type guards)
- ✅ API types reflect real backend responses (handle optional/missing fields)
- ✅ Type all props, return values, and state variables explicitly
- ✅ Include `null` and `undefined` in types when those values can occur
- ❌ No type assertions (`as`) without justification

#### Code Reusability (DRY)
- ✅ Reuse existing hooks, components, and utilities instead of duplicating
- ✅ Extract shared logic into custom hooks or utility functions
- ❌ No redundant libraries doing the same job

#### Naming Conventions
- ✅ PascalCase for components, camelCase for functions/variables
- ✅ Descriptive names (no `tempVar`, `doStuff`, `handleClick1`)
- ✅ Boolean props/variables prefixed with `is`, `has`, `should`

#### Code Organization
- ✅ Clean, readable, well-structured code
- ✅ Remove unused imports, variables, functions
- ✅ Keep functions and components small and focused
- ✅ Proper code formatting and indentation

---

### 2. Architecture & Design Patterns

#### Component Structure
- ✅ Follows `libs/ui-components/src/lib/ComponentName/` pattern
- ✅ Component files organized logically (component, styles, tests, types)
- ✅ Proper separation of concerns (UI vs logic)

#### Exports
- ✅ Proper index.ts barrel exports with clear public API

#### MUI Integration
- ✅ Correct wrapping/extending of MUI components
- ✅ Uses MUI composition patterns (sx prop, styled components, theme)
- ❌ No direct DOM manipulation bypassing MUI

#### Theme Usage
- ✅ Uses theme tokens instead of hardcoded values
- ✅ Responsive design with theme breakpoints
- ✅ Consistent spacing/sizing with theme units

#### Path Aliases
- ✅ Uses `@design-system/ui-components` correctly

#### Nx Conventions
- ✅ Follows monorepo structure and boundaries
- ❌ No circular dependencies
- ✅ Proper library imports

#### State Management
- ✅ Appropriate patterns (props, useState, useReducer, context)
- ✅ State placed at the right level (local vs shared)
- ✅ Immutable state updates

#### Backward Compatibility
- ❌ No breaking changes to existing component APIs
- ✅ Deprecated props handled with warnings
- ✅ Migration path provided if breaking changes are necessary

---

### 3. Security & Performance

#### Security
- ❌ No XSS vulnerabilities (sanitize user input, avoid `dangerouslySetInnerHTML`)
- ❌ No SQL injection or command injection risks
- ❌ No hardcoded secrets, API keys, or credentials
- ❌ Sensitive data properly handled (no logging, no exposure)
- ✅ Input validation at component boundaries

#### React Performance
- ✅ Proper use of `memo`, `useMemo`, `useCallback` where beneficial (not premature)
- ❌ No unnecessary re-renders (verify with React DevTools Profiler)
- ✅ Efficient list rendering (stable keys, virtualization for long lists)
- ✅ Lazy loading for code splitting where appropriate
- ✅ Optimize expensive computations

#### Bundle Size
- ❌ No unnecessary dependencies
- ✅ Tree-shakeable imports (named imports, not default)
- ✅ Check bundle impact of new dependencies

#### Memory Leaks
- ✅ Cleanup in useEffect return functions
- ✅ Remove event listeners, clear timers/intervals
- ✅ Cancel pending requests on unmount
- ✅ Unsubscribe from observables/subscriptions

---

### 4. Accessibility (a11y) ⭐ CRITICAL

#### Keyboard Navigation
- ✅ All interactive elements keyboard accessible (Tab, Enter, Space, Arrow keys)
- ✅ Visible focus states (no `outline: none` without custom focus styles)
- ✅ Logical tab order (matches visual order)
- ✅ Focus trapping in modals/dialogs

#### Screen Reader Support
- ✅ Semantic HTML (button, nav, main, article, etc.)
- ✅ Proper heading hierarchy (h1, h2, h3...)
- ✅ ARIA labels where needed (aria-label, aria-labelledby, aria-describedby)
- ✅ ARIA roles for custom components (role="button", role="dialog", etc.)
- ✅ Alternative text for images (alt attribute)
- ✅ Form labels associated with inputs

#### Visual Accessibility
- ✅ Color contrast meets WCAG AA standards (4.5:1 for normal text, 3:1 for large)
- ✅ Don't rely on color alone to convey information
- ✅ Text readable and scalable
- ✅ No information loss when zoomed to 200%

#### Testing
- ✅ Run automated a11y checks (eslint-plugin-jsx-a11y, axe, pa11y)
- ✅ Manual keyboard testing performed
- ✅ Screen reader testing (NVDA, JAWS, VoiceOver)

---

### 5. Testing & Documentation

#### Unit Tests
- ✅ Test coverage for new/modified components
- ✅ Tests are meaningful (not just coverage metrics)
- ✅ Test user interactions, not implementation details
- ✅ Mock external dependencies appropriately
- ✅ Tests pass locally and in CI

#### Integration Tests
- ✅ Component integrations tested
- ✅ User workflows tested end-to-end

#### Documentation
- ✅ Component purpose and usage documented
- ✅ Props documented with descriptions and types
- ✅ Usage examples provided (in docs app or Storybook)
- ✅ Edge cases and limitations noted
- ✅ Migration guides for breaking changes

---

## Design System Specific Checks

### Component Quality
- ✅ **Pattern consistency:** Component follows established patterns in the library
- ✅ **MUI integration:** MUI component properly wrapped/extended with custom props
- ✅ **Theming:** Theme tokens used instead of hardcoded values
- ✅ **API design:** Component props well-designed, flexible, and intuitive
- ✅ **Variants:** Variants/sizes/states handled consistently with other components
- ✅ **Consistency:** Maintains visual and behavioral consistency with existing components

### Accessibility (Design System Level)
- ✅ **WCAG compliance:** Component meets WCAG 2.1 AA standards
- ✅ **Focus management:** Keyboard navigation works intuitively
- ✅ **ARIA patterns:** Follows WAI-ARIA design patterns for the component type
- ✅ **Color contrast:** All text/icons meet contrast ratios (use theme color tokens)
- ✅ **Responsive:** Works at all viewport sizes and zoom levels

### Documentation & Examples
- ✅ **Docs app:** Component showcased properly in apps/docs with:
  - Multiple usage examples (basic, variants, states)
  - Props documentation (auto-generated from TypeScript)
  - Accessibility notes and keyboard shortcuts
  - Do's and Don'ts examples
- ✅ **Code examples:** Clear, copy-pasteable examples
- ✅ **Migration guide:** If updating existing component, provide migration path

### Testing Requirements
- ✅ **Unit tests:** Component behavior tested thoroughly
- ✅ **Accessibility tests:** Automated a11y tests pass (jest-axe, Testing Library)
- ✅ **Visual regression:** Screenshots/snapshots for visual changes
- ✅ **Cross-browser:** Tested in Chrome, Firefox, Safari (or documented limitation)
- ✅ **Responsive testing:** Tested at mobile, tablet, desktop breakpoints

### Versioning & Compatibility
- ❌ **No breaking changes:** Existing component usage still works
- ✅ **Deprecation:** If deprecating props/patterns, provide warnings and migration time
- ✅ **Semantic versioning:** Version bump appropriate for change type (patch/minor/major)

---

## Pre-Review Validations

Before diving into code review, verify these basic requirements:

1. ✅ **Tests pass:** Do all unit tests, integration tests, and linting pass?
2. ✅ **Build succeeds:** Does the code build without errors?
3. ✅ **Manual testing:** Has the developer manually tested the changes?
4. ✅ **No console errors:** Check browser console for unexpected errors/warnings
5. ✅ **Documentation:** Is there sufficient context in the PR description or commit messages?

---

## Review Guidelines

1. **Be specific:** Reference exact file paths and line numbers
2. **Be constructive:** Suggest fixes, not just problems
3. **Prioritize:** Use severity levels (Critical, Major, Minor)
4. **Align with requirements:** Check if implementation matches stated requirements
5. **Consider maintainability:** Will this be easy for the team to maintain?
6. **Focus on impact:** Assess how code fits into the bigger system (architectural impact)
7. **Acknowledge good work:** Always highlight what's done well (positive reinforcement)

---

## Review Priorities (in order)

1. 🔴 **Security vulnerabilities** (XSS, injection, exposed secrets) → **Critical**
2. ♿ **Accessibility violations** (keyboard nav, screen reader, contrast) → **Critical/Major**
3. 💥 **Breaking changes** (backward compatibility) → **Critical/Major**
4. 🐛 **Bugs & logic errors** → **Critical**
5. 📘 **TypeScript type safety** issues (`any` usage) → **Major**
6. ⚡ **Performance problems** (memory leaks, unnecessary re-renders) → **Major**
7. 🎨 **Code quality** (DRY, naming, organization) → **Major/Minor**
8. 🧪 **Testing gaps** → **Major/Minor**
9. 📚 **Documentation missing** → **Minor**
10. ✨ **Style & formatting** → **Minor**

---

## Severity Definitions

### 🔴 Critical Issues (Must Fix Before Merge)
Issues that could cause:
- Security vulnerabilities (XSS, injection, exposed secrets)
- Data loss or corruption
- Application crashes or breaking functionality
- Severe accessibility violations (component completely unusable)
- Breaking changes without migration path

### 🟡 Major Issues (Should Fix)
Issues that significantly affect:
- Code quality and maintainability
- Performance (memory leaks, excessive re-renders)
- TypeScript type safety (`any` usage, missing types)
- Accessibility (keyboard nav issues, missing ARIA)
- Testing gaps (no tests for critical functionality)
- Architecture patterns (violates design system conventions)

### 🔵 Minor Issues (Nice to Have)
Issues that are:
- Small improvements or optimizations
- Style inconsistencies (naming, formatting)
- Minor accessibility improvements (better labels)
- Documentation enhancements
- Optional refactoring suggestions

---

## Important Notes

- **Always acknowledge good work** in "What's Good" section (positive reinforcement)
- **Omit empty sections:** If no critical/major/minor issues found, omit those sections
- **Be specific:** Provide file:line references for all specific issues
- **Be actionable:** Every issue should have a concrete fix suggestion
- **Context matters:** Consider the design system context in all feedback
- **Accessibility is non-negotiable:** a11y issues are typically Critical or Major severity
- **TypeScript strictness:** Discourage `any` type, encourage proper typing
- **DRY principle:** Flag duplicate code and suggest extraction to shared utilities
- **Performance:** Only suggest memoization when there's actual performance impact (avoid premature optimization)
- **Breaking changes:** Alert if changes break backward compatibility
- **Testing:** Component changes without tests are typically a Major issue

---

*These guidelines are based on industry best practices from Google, Airbnb, Microsoft Engineering Playbook, and design system standards from VA.gov, Ant Design, and Carbon Design System.*
