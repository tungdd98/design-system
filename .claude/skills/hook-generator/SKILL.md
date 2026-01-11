---
name: hook-generator
description: Generates custom React hooks following best practices. Use when creating custom hooks for state management, side effects, or shared logic.
tools: Read, Write, Edit, Glob, Grep, Bash
---

# Hook Generator

Creates custom React hooks following best practices and design patterns.

## Design Pattern Reference

**IMPORTANT:** All hooks MUST follow the authoritative pattern defined in:
**[Hook Pattern](../../patterns/hook-pattern.md)**

Read this pattern document for:

- Complete hook structure template
- Options and Return interface requirements
- useCallback usage requirements
- Dependency array rules
- Cleanup patterns
- Hook categories with examples

## Quick Reference

### Minimum Requirements

1. Name starts with `use`
2. Export Options interface (if applicable)
3. Export Return interface
4. Use `useCallback` for returned functions
5. Correct dependency arrays
6. Cleanup in useEffect (if applicable)
7. Export from hooks/index.ts

### File Structure

```
libs/ui-components/src/lib/hooks/
├── useHookName.ts
└── index.ts
```

## Hook Creation Process

### Step 1: Define Purpose

- What problem does this hook solve?
- What input parameters needed?
- What should it return?
- Does it need cleanup?

### Step 2: Design Interfaces

```typescript
export interface UseHookNameOptions {
  initialValue?: string;
  onUpdate?: (value: string) => void;
}

export interface UseHookNameReturn {
  value: string;
  setValue: (value: string) => void;
  isLoading: boolean;
}
```

See [Hook Pattern](../../patterns/hook-pattern.md#required-elements) for detailed rules.

### Step 3: Implement Hook

```typescript
export const useHookName = (options: UseHookNameOptions = {}): UseHookNameReturn => {
  const { initialValue = '', onUpdate } = options;

  const [value, setValue] = useState(initialValue);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    onUpdate?.(value);
  }, [value, onUpdate]);

  const handleChange = useCallback((newValue: string) => {
    setValue(newValue);
  }, []);

  return { value, setValue: handleChange, isLoading };
};
```

See [Hook Pattern](../../patterns/hook-pattern.md#hook-structure-template) for full template.

### Step 4: Add Documentation

````typescript
/**
 * Custom hook for managing [description]
 *
 * @param options - Configuration options
 * @returns Hook state and handlers
 *
 * @example
 * ```tsx
 * const { value, handleChange } = useHookName({
 *   initialValue: 'hello',
 *   onUpdate: (val) => console.log(val)
 * });
 * ```
 */
````

### Step 5: Export from Library

1. Export from `hooks/index.ts`:

   ```typescript
   export { useHookName } from './useHookName';
   export type { UseHookNameOptions, UseHookNameReturn } from './useHookName';
   ```

2. Export from `libs/ui-components/src/index.ts`:
   ```typescript
   export { useHookName } from './lib/hooks';
   export type { UseHookNameOptions, UseHookNameReturn } from './lib/hooks';
   ```

## Hook Categories

See [Hook Pattern - Hook Categories](../../patterns/hook-pattern.md#hook-categories) for detailed examples of:

1. **State Management Hooks** - useToggle, useLocalStorage
2. **Side Effect Hooks** - useFetch, useAsync
3. **Event/Lifecycle Hooks** - useWindowSize, useClickOutside
4. **Performance Hooks** - useDebounce, useThrottle
5. **Theme/Context Hooks** - useBreakpoint

## Critical Rules

### MUST use useCallback

```typescript
// ✅ CORRECT
const toggle = useCallback(() => setValue((v) => !v), []);

// ❌ WRONG
const toggle = () => setValue((v) => !v);
```

### MUST have correct dependencies

```typescript
// ✅ CORRECT
useEffect(() => {
  doSomething(value);
}, [value]);

// ❌ WRONG
useEffect(() => {
  doSomething(value);
}, []); // Missing value!
```

### MUST cleanup side effects

```typescript
// ✅ CORRECT
useEffect(() => {
  const timer = setTimeout(() => { ... }, 1000);
  return () => clearTimeout(timer);
}, []);

// ❌ WRONG
useEffect(() => {
  setTimeout(() => { ... }, 1000);
  // No cleanup!
}, []);
```

See [Hook Pattern - Best Practices](../../patterns/hook-pattern.md#best-practices) for complete DO/DON'T list.

## Pre-Completion Checklist

Use the checklist from [Hook Pattern](../../patterns/hook-pattern.md#checklist):

- [ ] Hook name starts with `use`
- [ ] Options interface exported
- [ ] Return interface exported
- [ ] Default value for options
- [ ] useCallback for functions
- [ ] Dependency arrays correct
- [ ] Cleanup implemented
- [ ] Error handling
- [ ] JSDoc documentation
- [ ] Exported from hooks/index.ts
- [ ] Exported from main lib
- [ ] TypeScript compiles

## Example: useToggle

```typescript
// libs/ui-components/src/lib/hooks/useToggle.ts
import { useState, useCallback } from 'react';

export interface UseToggleReturn {
  value: boolean;
  toggle: () => void;
  setTrue: () => void;
  setFalse: () => void;
  setValue: (value: boolean) => void;
}

export const useToggle = (initialValue = false): UseToggleReturn => {
  const [value, setValue] = useState(initialValue);

  const toggle = useCallback(() => setValue((v) => !v), []);
  const setTrue = useCallback(() => setValue(true), []);
  const setFalse = useCallback(() => setValue(false), []);

  return { value, toggle, setTrue, setFalse, setValue };
};
```

Then:

1. Create exports in `hooks/index.ts`
2. Update `src/index.ts`

## Common Mistakes

See [Hook Pattern - Common Mistakes](../../patterns/hook-pattern.md#common-mistakes-to-avoid) for full list.

**Most common:**

- ❌ Conditional hook calls
- ❌ Missing useCallback
- ❌ Missing dependencies
- ❌ Not exporting types
- ❌ Using `any` type

## Tips

- **Follow the pattern:** Read [Hook Pattern](../../patterns/hook-pattern.md) before implementing
- **Reference existing hooks:** Look at React's built-in hooks
- **Use ESLint:** `react-hooks/exhaustive-deps` rule helps catch dependency issues
- **Test edge cases:** Consider cleanup, error states, race conditions

## Build Verification

After implementation:

```bash
npx nx build ui-components
```

Check that:

- TypeScript compiles without errors
- No ESLint warnings about hook rules
- Dependency arrays are correct
