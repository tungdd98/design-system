# Code Review Checklist

**Single Source of Truth for Code Review Standards**

This document defines the authoritative checklist for code reviews. All code reviews MUST use this checklist.

## Overview

This checklist ensures:
- Design pattern compliance
- TypeScript quality
- React best practices
- Security
- Performance
- Documentation completeness

## A. Design Pattern Compliance ⭐ (CRITICAL)

### Component Pattern Checklist

Refer to [component-pattern.md](./component-pattern.md) for full details.

- [ ] Component extends MUI component correctly
- [ ] Props interface uses `Omit<MuiProps, '...'>` for overrides
- [ ] Component has `displayName` set
- [ ] Props are properly destructured (custom first, common, then `...props`)
- [ ] `...props` spread into MUI component
- [ ] Default values provided for custom props
- [ ] Barrel export created (`index.ts`) with both component AND type
- [ ] Exported from main library (`src/index.ts`)

**Good Example:**
```typescript
export interface ButtonProps extends Omit<MuiButtonProps, 'size'> {
  size?: 'small' | 'medium' | 'large';
  isLoading?: boolean;
}

export const Button: React.FC<ButtonProps> = ({
  size = 'medium',
  isLoading = false,
  children,
  ...props
}) => {
  return <MuiButton {...props}>{isLoading ? 'Loading...' : children}</MuiButton>;
};

Button.displayName = 'Button';
```

**Bad Example:**
```typescript
// ❌ Missing displayName
// ❌ Doesn't extend MUI props
// ❌ Doesn't spread props
export const Button = ({ children }) => {
  return <div>{children}</div>;
};
```

### Hook Pattern Checklist

Refer to [hook-pattern.md](./hook-pattern.md) for full details.

- [ ] Hook name starts with `use`
- [ ] Options interface exported
- [ ] Return interface exported
- [ ] useCallback used for returned functions
- [ ] Dependency arrays complete and correct
- [ ] Cleanup implemented in useEffect (if needed)
- [ ] No conditional hook calls
- [ ] Exported from hooks/index.ts with both hook AND types

**Good Example:**
```typescript
export interface UseToggleReturn {
  value: boolean;
  toggle: () => void;
}

export const useToggle = (initialValue = false): UseToggleReturn => {
  const [value, setValue] = useState(initialValue);
  const toggle = useCallback(() => setValue((v) => !v), []);
  return { value, toggle };
};
```

**Bad Example:**
```typescript
// ❌ Missing interface
// ❌ Missing useCallback
export const useToggle = (initialValue) => {
  const [value, setValue] = useState(initialValue);
  const toggle = () => setValue(!value);
  return { value, toggle };
};
```

## B. TypeScript Quality

- [ ] Strict mode compliance (no `any` types)
- [ ] All props typed with interfaces (not `type` aliases for props)
- [ ] Generic types used appropriately (`<T>` when needed)
- [ ] Union types for variants/enums (`'small' | 'medium' | 'large'`)
- [ ] Optional props marked with `?`
- [ ] No type assertions unless absolutely necessary (avoid `as`)
- [ ] Exported types alongside components/hooks

**Common Issues:**
```typescript
// ❌ BAD
const handleClick = (e: any) => { ... }
const data = response as MyType;

// ✅ GOOD
const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => { ... }
const data: MyType = response;
```

## C. React Best Practices

- [ ] Functional components only (no class components)
- [ ] Hooks at top level (not in conditions/loops)
- [ ] Event handlers properly typed
- [ ] Keys in lists when mapping
- [ ] Controlled components (when applicable)
- [ ] Proper state initialization
- [ ] Side effects in useEffect (not in render)
- [ ] Memoization where appropriate (useMemo, useCallback)

**Common Issues:**
```typescript
// ❌ BAD
const Component = () => {
  if (condition) {
    const [state, setState] = useState(); // Conditional hook!
  }
  return items.map(item => <Item />); // Missing key!
};

// ✅ GOOD
const Component = () => {
  const [state, setState] = useState();
  if (!condition) return null;
  return items.map(item => <Item key={item.id} {...item} />);
};
```

## D. Code Quality & Maintainability

- [ ] Clear, descriptive variable/function names
- [ ] No magic numbers (use named constants)
- [ ] No duplicated code (DRY principle)
- [ ] Single Responsibility Principle
- [ ] Functions under 50 lines
- [ ] No deeply nested code (max 3 levels)
- [ ] Error handling present
- [ ] Edge cases handled

**Example:**
```typescript
// ❌ BAD
const x = data.filter(d => d.age > 18).map(d => ({ ...d, status: 1 }));

// ✅ GOOD
const ADULT_AGE = 18;
const ACTIVE_STATUS = 1;

const adults = data.filter(person => person.age > ADULT_AGE);
const activeAdults = adults.map(person => ({
  ...person,
  status: ACTIVE_STATUS
}));
```

## E. Security ⚠️ (CRITICAL)

- [ ] No exposed API keys/secrets
- [ ] No SQL injection risks
- [ ] No XSS vulnerabilities (avoid `dangerouslySetInnerHTML`)
- [ ] Input validation present
- [ ] Safe URL handling
- [ ] No `eval()` or `Function()` constructor
- [ ] Dependencies up to date (check for vulnerabilities)

**Critical Checks:**
```typescript
// ❌ DANGER
<div dangerouslySetInnerHTML={{ __html: userInput }} />
eval(userInput);

// ✅ SAFE
<div>{sanitize(userInput)}</div>
// Don't use eval at all
```

## F. Performance

- [ ] No unnecessary re-renders
- [ ] Large lists virtualized (if applicable)
- [ ] Images optimized and lazy-loaded
- [ ] Bundle size impact minimal
- [ ] No memory leaks (cleanup in useEffect)
- [ ] Expensive calculations memoized (useMemo)
- [ ] Callbacks memoized (useCallback)

**Performance Patterns:**
```typescript
// ✅ Memoized expensive computation
const expensiveValue = useMemo(() => {
  return computeExpensiveValue(data);
}, [data]);

// ✅ Memoized callback
const handleClick = useCallback(() => {
  doSomething(value);
}, [value]);

// ✅ Cleanup to prevent memory leaks
useEffect(() => {
  const subscription = subscribe();
  return () => subscription.unsubscribe();
}, []);
```

## G. Testing Readiness

- [ ] Component testable (no hard dependencies)
- [ ] Test cases identified (if tests exist)
- [ ] Mock-friendly design
- [ ] Accessible (ARIA labels, semantic HTML)

**Accessibility Checks:**
```typescript
// ✅ GOOD - Semantic HTML and ARIA
<button aria-label="Close modal" onClick={onClose}>
  <CloseIcon />
</button>

// ❌ BAD - Non-semantic, no ARIA
<div onClick={onClose}>
  <CloseIcon />
</div>
```

## H. Documentation & Examples

### For Components:
- [ ] Documentation page created/updated (`apps/docs/src/app/pages/`)
- [ ] At least 3-4 ComponentShowcase examples
- [ ] Route added to `app.tsx`
- [ ] Menu item added to `Layout.tsx`
- [ ] Props documented (JSDoc if complex)

### For Hooks:
- [ ] JSDoc with `@param` and `@returns`
- [ ] Usage example in JSDoc
- [ ] Example in docs app (if applicable)

**JSDoc Example:**
```typescript
/**
 * Custom hook for managing toggle state
 *
 * @param initialValue - Initial boolean value (default: false)
 * @returns Object with value and control functions
 *
 * @example
 * ```tsx
 * const { value, toggle, setTrue, setFalse } = useToggle(false);
 * ```
 */
export const useToggle = (initialValue = false): UseToggleReturn => {
  // Implementation
};
```

## I. Git & Commit Standards

- [ ] Commit message follows Conventional Commits
- [ ] Format: `type: subject` (lowercase, max 72 chars)
- [ ] Valid types: `feat`, `fix`, `docs`, `style`, `refactor`, `test`, `chore`, `perf`, `ci`, `build`, `revert`
- [ ] Changes grouped logically in commits
- [ ] No debugging code left (console.log, debugger)

**Commit Message Examples:**
```bash
# ✅ GOOD
feat: add modal component with overlay support
fix: resolve button loading state animation
docs: update typography component examples
refactor: simplify validation logic in form hook

# ❌ BAD
Added new stuff
FIX: Button bug (uppercase type)
feat: Added modal component (uppercase F in "Added", vague)
WIP
```

## J. Monorepo & Nx Compliance

- [ ] Module boundaries respected
- [ ] No circular dependencies
- [ ] Path aliases used (`@design-system/ui-components`)
- [ ] Build succeeds (`npx nx build ui-components`)
- [ ] No breaking changes to library API (unless versioned)

**Path Alias Check:**
```typescript
// ✅ GOOD - Using path alias
import { Button, Typography } from '@design-system/ui-components';

// ❌ BAD - Relative import from outside package
import { Button } from '../../../libs/ui-components/src/lib/Button';
```

## Review Severity Levels

### 🚨 Critical Issues (Must Fix)
- Security vulnerabilities
- Pattern violations (missing displayName, not extending MUI, etc.)
- TypeScript `any` types
- Missing error handling
- Memory leaks
- Breaking changes without versioning

### ⚠️ Warnings (Should Fix)
- Missing documentation
- Performance issues
- Code quality issues (magic numbers, duplication)
- Inconsistent patterns
- Missing tests

### 💡 Suggestions (Consider)
- Code organization improvements
- Better naming
- Alternative approaches
- Future considerations

## Common Review Findings

### 1. Missing displayName
```typescript
// 🚨 CRITICAL
Component.displayName = 'Component'; // Add this!
```

### 2. Not using useCallback
```typescript
// ⚠️ WARNING
const toggle = useCallback(() => setValue(v => !v), []); // Wrap in useCallback
```

### 3. Missing type exports
```typescript
// ⚠️ WARNING
export type { ComponentProps } from './Component'; // Add this!
```

### 4. Hardcoded values
```typescript
// 💡 SUGGESTION
const MAX_RETRIES = 3; // Extract to constant
```

### 5. Missing cleanup
```typescript
// 🚨 CRITICAL
return () => clearTimeout(timer); // Add cleanup!
```

## Review Report Template

```markdown
# Code Review Report

## ✅ Summary
[Brief overview]

## 🔍 Files Reviewed
- `file1.tsx` - [Component]
- `file2.ts` - [Hook]

---

## 🚨 Critical Issues (Must Fix)

### 1. [Issue] - `file.tsx:line`
**Problem:** [Explanation]
**Fix:** [Code snippet]
**Why:** [Reason]

---

## ⚠️ Warnings (Should Fix)

### 1. [Issue] - `file.tsx:line`
**Problem:** [Explanation]
**Suggested Fix:** [Solution]

---

## 💡 Suggestions

### 1. [Improvement]
**Current:** [Current code]
**Better:** [Improved code]
**Benefits:** [Why better]

---

## ✨ Good Practices Observed

- ✅ [Good thing 1]
- ✅ [Good thing 2]

---

## 📋 Checklist: X/Y Passed

[Checklist results summary]

---

## 🎯 Action Items

1. [ ] Fix critical issue 1
2. [ ] Address warning 1
3. [ ] Consider suggestion 1

---

## 📊 Overall Assessment

**Status:** APPROVED ✅ / NEEDS CHANGES ⚠️ / REJECTED ❌
**Recommendation:** [Final recommendation]
```

## References

- [Component Pattern](./component-pattern.md) - Detailed component standards
- [Hook Pattern](./hook-pattern.md) - Detailed hook standards
- [CLAUDE.md](../CLAUDE.md) - Project overview and architecture
- [Conventional Commits](https://www.conventionalcommits.org/) - Commit message format
