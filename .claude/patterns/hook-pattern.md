# Hook Design Pattern

**Single Source of Truth for Custom Hook Architecture**

This document defines the authoritative hook pattern for the design system. All custom hooks MUST follow this pattern.

## Pattern Overview

All custom hooks in this design system:
- Follow React hooks rules and conventions
- Use proper TypeScript typing with Options and Return interfaces
- Use useCallback for returned functions
- Handle cleanup properly
- Export both hook and types

## Hook Structure Template

```typescript
import { useState, useEffect, useCallback } from 'react';

export interface UseHookNameOptions {
  // Configuration options
  initialValue?: string;
  onUpdate?: (value: string) => void;
}

export interface UseHookNameReturn {
  // Return values
  value: string;
  setValue: (value: string) => void;
  isLoading: boolean;
  error: Error | null;
}

export const useHookName = (
  options: UseHookNameOptions = {}
): UseHookNameReturn => {
  const { initialValue = '', onUpdate } = options;

  // State declarations
  const [value, setValue] = useState(initialValue);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  // Effects
  useEffect(() => {
    onUpdate?.(value);
  }, [value, onUpdate]);

  // Memoized callbacks
  const handleSomething = useCallback(() => {
    // logic
  }, [/* dependencies */]);

  return {
    value,
    setValue,
    isLoading,
    error,
  };
};
```

## Required Elements

### 1. Options Interface
```typescript
export interface UseHookNameOptions {
  initialValue?: string;
  onUpdate?: (value: string) => void;
}
```

**Rules:**
- MUST be exported
- Use PascalCase: `Use{HookName}Options`
- All options should be optional (use `?`)
- Include callback handlers with proper typing

### 2. Return Interface
```typescript
export interface UseHookNameReturn {
  value: string;
  isLoading: boolean;
  error: Error | null;
}
```

**Rules:**
- MUST be exported
- Use PascalCase: `Use{HookName}Return`
- Define all returned values
- Use specific types (not `any`)

### 3. Hook Implementation
```typescript
export const useHookName = (
  options: UseHookNameOptions = {}
): UseHookNameReturn => {
  // Implementation
  return { ... };
};
```

**Rules:**
- Name MUST start with `use`
- Use camelCase: `useHookName`
- Provide default value for options: `= {}`
- Return type MUST match `UseHookNameReturn`

## File Structure

```
libs/ui-components/src/lib/hooks/
├── useHookName.ts             # Hook implementation
├── useHookName.spec.ts        # Tests (optional)
└── index.ts                   # Barrel export
```

### Barrel Export (`hooks/index.ts`)
```typescript
export { useHookName } from './useHookName';
export type { UseHookNameOptions, UseHookNameReturn } from './useHookName';
```

### Main Library Export
Update `libs/ui-components/src/index.ts`:
```typescript
export { useHookName } from './lib/hooks';
export type { UseHookNameOptions, UseHookNameReturn } from './lib/hooks';
```

## Hook Implementation Order

Follow this structure:
```typescript
export const useHook = (options = {}) => {
  // 1. Destructure options
  const { initialValue = '', onUpdate } = options;

  // 2. State declarations
  const [value, setValue] = useState(initialValue);
  const [isLoading, setIsLoading] = useState(false);

  // 3. Refs (if needed)
  const mounted = useRef(true);

  // 4. Effects
  useEffect(() => {
    // Effect logic
    return () => {
      // Cleanup
    };
  }, [/* dependencies */]);

  // 5. Memoized values
  const computedValue = useMemo(() => {
    return expensiveComputation(value);
  }, [value]);

  // 6. Memoized callbacks
  const handleChange = useCallback(() => {
    // Handler logic
  }, [/* dependencies */]);

  // 7. Return object
  return {
    value,
    isLoading,
    handleChange,
  };
};
```

## useCallback for Functions

**MUST use useCallback for ALL returned functions:**

```typescript
// ✅ GOOD
const toggle = useCallback(() => {
  setValue((v) => !v);
}, []);

const handleChange = useCallback((newValue: string) => {
  setValue(newValue);
  onChange?.(newValue);
}, [onChange]);

return { value, toggle, handleChange };
```

```typescript
// ❌ BAD - Functions recreated on every render
const toggle = () => setValue((v) => !v);
const handleChange = (newValue: string) => {
  setValue(newValue);
};

return { value, toggle, handleChange };
```

## Dependency Arrays

**ALWAYS specify correct dependencies:**

```typescript
// ✅ GOOD
useEffect(() => {
  fetchData(url);
}, [url]); // url in deps

const handleClick = useCallback(() => {
  doSomething(value);
}, [value]); // value in deps
```

```typescript
// ❌ BAD - Missing dependencies
useEffect(() => {
  fetchData(url);
}, []); // url missing!

const handleClick = useCallback(() => {
  doSomething(value);
}, []); // value missing!
```

## Cleanup

**ALWAYS cleanup side effects:**

```typescript
// ✅ GOOD
useEffect(() => {
  const timer = setTimeout(() => {
    doSomething();
  }, 1000);

  return () => {
    clearTimeout(timer); // Cleanup
  };
}, []);

useEffect(() => {
  const subscription = subscribe();

  return () => {
    subscription.unsubscribe(); // Cleanup
  };
}, []);
```

## Error Handling

**Handle errors gracefully:**

```typescript
export const useFetch = <T,>(url: string): UseFetchReturn<T> => {
  const [data, setData] = useState<T | null>(null);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const result = await response.json();
        setData(result);
      } catch (err) {
        // Convert to Error type
        const error = err instanceof Error ? err : new Error('Unknown error');
        setError(error);
      }
    };

    fetchData();
  }, [url]);

  return { data, error };
};
```

## Generic Types

**Use generics for flexible hooks:**

```typescript
export const useLocalStorage = <T,>(
  key: string,
  initialValue: T
): [T, (value: T) => void] => {
  const [storedValue, setStoredValue] = useState<T>(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      return initialValue;
    }
  });

  const setValue = (value: T) => {
    try {
      setStoredValue(value);
      window.localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.error('Error saving to localStorage', error);
    }
  };

  return [storedValue, setValue];
};
```

## Hook Categories

### 1. State Management Hooks
```typescript
export const useToggle = (initialValue = false): UseToggleReturn => {
  const [value, setValue] = useState(initialValue);
  const toggle = useCallback(() => setValue((v) => !v), []);
  const setTrue = useCallback(() => setValue(true), []);
  const setFalse = useCallback(() => setValue(false), []);
  return { value, toggle, setTrue, setFalse, setValue };
};
```

### 2. Side Effect Hooks
```typescript
export const useFetch = <T,>(url: string): UseFetchReturn<T> => {
  const [data, setData] = useState<T | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    let cancelled = false;

    const fetchData = async () => {
      try {
        setIsLoading(true);
        const response = await fetch(url);
        const result = await response.json();
        if (!cancelled) {
          setData(result);
        }
      } catch (err) {
        if (!cancelled) {
          setError(err instanceof Error ? err : new Error('Unknown error'));
        }
      } finally {
        if (!cancelled) {
          setIsLoading(false);
        }
      }
    };

    fetchData();

    return () => {
      cancelled = true;
    };
  }, [url]);

  return { data, isLoading, error };
};
```

### 3. Event/Lifecycle Hooks
```typescript
export const useWindowSize = (): WindowSize => {
  const [windowSize, setWindowSize] = useState<WindowSize>({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  useEffect(() => {
    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return windowSize;
};
```

### 4. Performance Hooks
```typescript
export const useDebounce = <T,>(value: T, delay: number): T => {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => clearTimeout(handler);
  }, [value, delay]);

  return debouncedValue;
};
```

## JSDoc Documentation

**Add JSDoc with examples:**

```typescript
/**
 * Custom hook for managing form validation
 *
 * @param initialValues - Initial form values
 * @param validationSchema - Validation rules for each field
 * @returns Form state and handlers
 *
 * @example
 * ```tsx
 * const { values, errors, handleChange, handleSubmit } = useFormValidation({
 *   initialValues: { email: '', password: '' },
 *   validationSchema: {
 *     email: { required: true, pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/ },
 *     password: { required: true, minLength: 8 }
 *   },
 *   onSubmit: async (values) => {
 *     await api.login(values);
 *   }
 * });
 * ```
 */
export const useFormValidation = <T extends Record<string, string>>({
  initialValues,
  validationSchema,
  onSubmit,
}: UseFormValidationOptions<T>): UseFormValidationReturn<T> => {
  // Implementation
};
```

## Complete Example

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

```typescript
// libs/ui-components/src/lib/hooks/index.ts
export { useToggle } from './useToggle';
export type { UseToggleReturn } from './useToggle';
```

```typescript
// libs/ui-components/src/index.ts (add these lines)
export { useToggle } from './lib/hooks';
export type { UseToggleReturn } from './lib/hooks';
```

## Checklist

Before marking a hook complete:

- [ ] Hook name starts with `use`
- [ ] Options interface exported (if hook takes options)
- [ ] Return interface exported
- [ ] Default value provided for options parameter
- [ ] useCallback used for ALL returned functions
- [ ] Dependency arrays complete and correct
- [ ] Cleanup implemented in useEffect (if needed)
- [ ] No conditional hook calls
- [ ] Error handling implemented (if applicable)
- [ ] JSDoc documentation added
- [ ] Exported from hooks/index.ts
- [ ] Exported from main lib index.ts
- [ ] TypeScript compiles without errors
- [ ] No `any` types used

## Common Mistakes to Avoid

### ❌ Conditional Hook Calls
```typescript
// ❌ WRONG
if (condition) {
  const [state, setState] = useState();
}

// ✅ CORRECT
const [state, setState] = useState();
if (condition) {
  // use state
}
```

### ❌ Missing useCallback
```typescript
// ❌ WRONG
const toggle = () => setValue((v) => !v);

// ✅ CORRECT
const toggle = useCallback(() => setValue((v) => !v), []);
```

### ❌ Missing Dependencies
```typescript
// ❌ WRONG
useEffect(() => {
  doSomething(value);
}, []); // value missing!

// ✅ CORRECT
useEffect(() => {
  doSomething(value);
}, [value]);
```

### ❌ Not Exporting Types
```typescript
// ❌ WRONG
export { useToggle } from './useToggle';

// ✅ CORRECT
export { useToggle } from './useToggle';
export type { UseToggleReturn } from './useToggle';
```

### ❌ Using `any` Type
```typescript
// ❌ WRONG
const [data, setData] = useState<any>(null);

// ✅ CORRECT
const [data, setData] = useState<User | null>(null);
```

## References

- React Hooks Documentation: https://react.dev/reference/react
- React Hooks Rules: https://react.dev/warnings/invalid-hook-call-warning
- TypeScript Handbook: https://www.typescriptlang.org/docs/handbook/
- Project CLAUDE.md for architecture overview
