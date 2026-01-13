# Code Review Checklist

**Comprehensive Code Review Standards for Design System**

Use this checklist when reviewing code changes, pull requests, or conducting code audits.

---

## 1. Architecture & Design

### Component Structure
- [ ] Component follows MUI wrapper pattern
- [ ] Props interface uses `Omit<MuiComponentProps, ...>`
- [ ] Component uses `forwardRef` correctly
- [ ] `displayName` is set
- [ ] Single responsibility principle followed
- [ ] Component is properly composable

### Code Organization
- [ ] Files are in correct directory structure
- [ ] Barrel exports (`index.ts`) present
- [ ] Main library exports updated
- [ ] No circular dependencies
- [ ] Proper separation of concerns

### Design Patterns
- [ ] Follows documented patterns in `.claude/patterns/`
- [ ] State management approach is appropriate
- [ ] Event handlers follow naming convention (`handle*`)
- [ ] Props follow naming convention (no `on*` prefix for non-handlers)

---

## 2. TypeScript

### Type Safety
- [ ] No `any` types (use `unknown` if necessary)
- [ ] No `@ts-ignore` comments (use `@ts-expect-error` with explanation)
- [ ] All functions have return types
- [ ] Generics used where appropriate
- [ ] Type guards for runtime checks

### Interfaces & Types
- [ ] Props interfaces properly documented
- [ ] Return types explicitly defined
- [ ] Enums vs Union Types used correctly
- [ ] Optional vs Required props correctly marked
- [ ] Type exports included

### TypeScript Strict Mode
- [ ] `strict: true` compliance
- [ ] `noImplicitAny` passing
- [ ] `strictNullChecks` passing
- [ ] `noUnusedLocals` passing
- [ ] `noImplicitReturns` passing

---

## 3. React Best Practices

### Hooks Rules
- [ ] Hooks called at top level (not in conditions/loops)
- [ ] Dependency arrays correct and complete
- [ ] `useCallback` used for event handlers passed as props
- [ ] `useMemo` used appropriately (not overused)
- [ ] Custom hooks follow naming convention (`use*`)
- [ ] Cleanup functions present where needed

### Component Lifecycle
- [ ] No memory leaks (cleanup effects)
- [ ] Event listeners removed in cleanup
- [ ] Timers cleared in cleanup
- [ ] Subscriptions unsubscribed in cleanup
- [ ] Refs used correctly (not for state)

### Performance
- [ ] `React.memo` used appropriately
- [ ] Unnecessary re-renders prevented
- [ ] Large lists use virtualization if needed
- [ ] Images lazy loaded where appropriate
- [ ] Code splitting considered for large components

### State Management
- [ ] State kept as local as possible
- [ ] Controlled vs uncontrolled components appropriate
- [ ] State updates batched where possible
- [ ] Derived state computed, not stored
- [ ] State shape normalized

---

## 4. Material-UI Integration

### Theme Usage
- [ ] Uses theme tokens instead of hardcoded values
- [ ] Theme customization done via `themeOptions`
- [ ] No inline style objects (use `sx` prop)
- [ ] Responsive breakpoints used correctly
- [ ] Color palette values used appropriately

### MUI Components
- [ ] MUI components imported correctly
- [ ] Props passed correctly to MUI components
- [ ] MUI TypeScript types extended properly
- [ ] Variant props mapped correctly
- [ ] Size props handled appropriately

### Styling
- [ ] Emotion styled components used correctly
- [ ] No CSS conflicts with MUI
- [ ] Theme overrides don't break MUI functionality
- [ ] CSS-in-JS performance considerations

---

## 5. Accessibility (a11y)

### Semantic HTML
- [ ] Proper HTML elements used (`<button>` not `<div onClick>`)
- [ ] Headings hierarchy correct (h1 → h2 → h3)
- [ ] Lists use `<ul>`, `<ol>`, `<li>`
- [ ] Forms use `<form>`, `<label>`, `<input>`
- [ ] Landmarks used (`<nav>`, `<main>`, `<aside>`)

### ARIA
- [ ] ARIA labels present where needed
- [ ] ARIA roles used correctly
- [ ] ARIA states updated appropriately
- [ ] ARIA live regions for dynamic content
- [ ] ARIA described-by for error messages

### Keyboard Navigation
- [ ] All interactive elements keyboard accessible
- [ ] Focus indicators visible
- [ ] Tab order logical
- [ ] Escape key closes modals/dropdowns
- [ ] Enter/Space activate buttons

### Screen Readers
- [ ] Alt text for images
- [ ] Form labels associated with inputs
- [ ] Error messages announced
- [ ] Loading states announced
- [ ] Empty states have meaningful text

### Color & Contrast
- [ ] Color contrast ratio meets WCAG AA (4.5:1)
- [ ] Information not conveyed by color alone
- [ ] Focus indicators have sufficient contrast
- [ ] Disabled states distinguishable

---

## 6. Testing

### Unit Tests
- [ ] Component rendering tested
- [ ] Props variations tested
- [ ] Event handlers tested
- [ ] Error states tested
- [ ] Loading states tested
- [ ] Edge cases covered

### Coverage
- [ ] Test coverage > 80% for new code
- [ ] Critical paths fully covered
- [ ] Error handling tested
- [ ] All branches covered
- [ ] No skipped tests without reason

### Test Quality
- [ ] Tests are readable and maintainable
- [ ] No flaky tests
- [ ] Mock/stub appropriately
- [ ] Tests isolated (no side effects)
- [ ] Meaningful assertions

### Testing Best Practices
- [ ] Arrange-Act-Assert pattern
- [ ] One assertion per test (or related group)
- [ ] Test behavior, not implementation
- [ ] Use `screen` queries from Testing Library
- [ ] Avoid `waitFor` when possible

---

## 7. Performance

### Bundle Size
- [ ] No unnecessary dependencies added
- [ ] Tree-shaking possible
- [ ] Code splitting used where appropriate
- [ ] Dynamic imports for heavy components
- [ ] Bundle analyzer checked

### Runtime Performance
- [ ] No infinite loops
- [ ] No blocking operations on main thread
- [ ] Debounce/throttle used for frequent events
- [ ] Large computations memoized
- [ ] Virtual scrolling for long lists

### Memory
- [ ] No memory leaks
- [ ] Event listeners cleaned up
- [ ] Refs cleared when needed
- [ ] Large objects not held in closure unnecessarily
- [ ] WeakMap/WeakSet used where appropriate

---

## 8. Security

### Input Validation
- [ ] User input sanitized
- [ ] XSS prevention measures in place
- [ ] No `dangerouslySetInnerHTML` without sanitization
- [ ] URL parameters validated
- [ ] File uploads validated

### Authentication & Authorization
- [ ] Sensitive data not exposed in client
- [ ] API keys not in frontend code
- [ ] Proper error messages (no info leakage)
- [ ] CSRF protection where needed

### Dependencies
- [ ] No known vulnerabilities (run `npm audit`)
- [ ] Dependencies up to date
- [ ] No unused dependencies
- [ ] License compatibility checked

---

## 9. Error Handling

### Error Boundaries
- [ ] Error boundaries present for critical sections
- [ ] Fallback UI provided
- [ ] Errors logged appropriately
- [ ] User-friendly error messages

### Try-Catch
- [ ] Async operations wrapped in try-catch
- [ ] Errors typed correctly (not `any`)
- [ ] Error states communicated to user
- [ ] Network errors handled gracefully
- [ ] Timeout errors handled

### Validation
- [ ] Form validation implemented
- [ ] Input constraints enforced
- [ ] Error messages clear and actionable
- [ ] Validation runs at appropriate times
- [ ] Server validation not bypassed

---

## 10. Documentation

### Code Comments
- [ ] Complex logic explained
- [ ] JSDoc for all public APIs
- [ ] Type definitions documented
- [ ] Why, not what (code should be self-documenting)
- [ ] No commented-out code

### Component Documentation
- [ ] Props documented with JSDoc
- [ ] Usage examples provided
- [ ] Edge cases documented
- [ ] Migration guides if breaking changes
- [ ] Storybook stories created (if applicable)

### Documentation Pages
- [ ] Component page created in docs app
- [ ] Props table included
- [ ] Variants showcased
- [ ] Usage examples clear
- [ ] Do's and Don'ts included

---

## 11. Code Quality

### Readability
- [ ] Variable names descriptive
- [ ] Function names clear and verb-based
- [ ] Consistent naming conventions
- [ ] No magic numbers/strings
- [ ] Proper indentation and formatting

### Complexity
- [ ] Functions < 50 lines
- [ ] Cyclomatic complexity reasonable
- [ ] No deeply nested conditionals (> 3 levels)
- [ ] Complex logic broken into smaller functions
- [ ] Single level of abstraction per function

### DRY Principle
- [ ] No duplicate code
- [ ] Common logic extracted
- [ ] Shared utilities used
- [ ] Constants defined once
- [ ] Patterns consistent across codebase

### SOLID Principles
- [ ] Single Responsibility
- [ ] Open/Closed (extensible, not modifiable)
- [ ] Liskov Substitution
- [ ] Interface Segregation
- [ ] Dependency Inversion

---

## 12. Git & Version Control

### Commits
- [ ] Commit messages follow Conventional Commits
- [ ] Commits are atomic (one logical change)
- [ ] No WIP commits in PR
- [ ] Commit messages descriptive
- [ ] No merge commits (use rebase)

### Pull Request
- [ ] PR description complete
- [ ] Changes linked to issue/ticket
- [ ] Screenshots for UI changes
- [ ] Breaking changes documented
- [ ] Migration guide if needed

### Branch Management
- [ ] Branch name follows convention
- [ ] Branch up to date with main
- [ ] No conflicts
- [ ] Feature branch deleted after merge

---

## 13. Build & CI/CD

### Build
- [ ] Build passes without errors
- [ ] Build passes without warnings
- [ ] TypeScript compilation successful
- [ ] Linting passes
- [ ] No console.log in production code

### Tests
- [ ] All tests pass
- [ ] No flaky tests
- [ ] Test coverage meets threshold
- [ ] E2E tests pass (if applicable)

### Deployment
- [ ] Environment variables set correctly
- [ ] No hardcoded values
- [ ] Feature flags used appropriately
- [ ] Rollback plan considered

---

## 14. Project-Specific

### Nx Monorepo
- [ ] Project dependencies correct
- [ ] Build order correct (`dependsOn` configured)
- [ ] No circular dependencies between libs/apps
- [ ] Path mappings updated in `tsconfig.base.json`
- [ ] Nx cache working correctly

### Design System Specific
- [ ] Component added to Storybook (if applicable)
- [ ] Component registered in docs navigation
- [ ] Component exported from library
- [ ] Theme tokens used consistently
- [ ] Follows established patterns

---

## Review Severity Levels

### 🔴 Blocker (Must Fix)
- Security vulnerabilities
- Breaking changes without migration guide
- Memory leaks
- Accessibility violations
- Data loss risks

### 🟡 Major (Should Fix)
- Performance issues
- Poor error handling
- Missing tests
- Incomplete documentation
- TypeScript errors

### 🟢 Minor (Nice to Have)
- Code style improvements
- Additional test coverage
- Optimization opportunities
- Enhanced documentation

### 💡 Suggestion
- Alternative approaches
- Future improvements
- Learning opportunities

---

## Quick Review Script

```bash
# Run all checks locally before review
npm run lint
npm run typecheck
npm test
npm run build

# Check bundle size
npm run analyze

# Security audit
npm audit

# Check for unused dependencies
npx depcheck
```

---

## Review Template

```markdown
## Summary
[Brief description of changes]

## Testing
- [ ] Unit tests pass
- [ ] Manual testing completed
- [ ] Edge cases tested

## Checklist
- [ ] Code follows patterns
- [ ] TypeScript strict mode passing
- [ ] Documentation updated
- [ ] Tests written
- [ ] Accessibility verified

## Concerns
[Any concerns or questions]

## Approval
✅ Approved / ⚠️ Approved with comments / ❌ Changes requested
```
