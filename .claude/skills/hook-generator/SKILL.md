---
name: hook-generator
description: Generates custom React hooks following best practices and design patterns. Use when users request to "create hook", "generate hook", "build hook useX", or "add custom hook". Automatically follows React hooks rules, TypeScript typing, dependency management, and cleanup patterns. Always reads hook-pattern.md before generating.
---

# Hook Generator

Automated custom hook generation following React best practices and design patterns.

---

## Prerequisites

**ALWAYS read the pattern documentation first:**

```bash
view /home/claude/.claude/patterns/hook-pattern.md
```

This ensures compliance with:
- Naming convention (use*)
- TypeScript types (Options + Return)
- Dependency arrays
- Cleanup functions
- SSR safety
- React Rules of Hooks

---

## Generation Process

### Step 1: Gather Requirements

Ask user for:
- **Hook Name**: use[Action][Subject] (e.g., `useLocalStorage`, `useFetch`)
- **Purpose**: What the hook does
- **Parameters**: Input options/config
- **Return Value**: What the hook returns
- **Side Effects**: Event listeners, timers, subscriptions

**Example questions:**
```
Hook Generator activated!

To create your custom hook, I need:
1. Hook name (must start with 'use'):
2. Purpose/description:
3. Parameters needed:
4. Return value:
5. Side effects (if any):
```

### Step 2: Generate Hook Files

Create the following structure:

```
libs/ui-components/src/lib/hooks/
├── useHookName.ts          # Main hook
├── useHookName.test.ts     # Unit tests
└── index.ts                # Barrel export (update)
```

### Step 3: Update Library Exports

Add exports to:
```typescript
// libs/ui-components/src/lib/hooks/index.ts
export { useHookName } from './useHookName';
export type { UseHookNameOptions, UseHookNameReturn } from './useHookName';

// libs/ui-components/src/index.ts
export { useHookName } from './lib/hooks';
export type { UseHookNameOptions, UseHookNameReturn } from './lib/hooks';
```

### Step 4: Create Documentation

Add usage examples to:
```
apps/docs/src/app/hooks/HooksPage.tsx
```

Or create dedicated page if complex:
```
apps/docs/src/app/hooks/UseHookNamePage.tsx
```

---

## Hook Template

```typescript
// libs/ui-components/src/lib/hooks/useHookName.ts

import { useState, useEffect, useCallback, useRef } from 'react';

/**
 * [Hook description - what it does and when to use it]
 * 
 * @example
 * ```tsx
 * const { data, loading, error } = useHookName({
 *   option: 'value'
 * });
 * ```
 * 
 * @param options - Configuration options
 * @returns Hook state and actions
 */
export interface UseHookNameOptions {
  /**
   * Option description
   */
  option1?: string;
  
  /**
   * Success callback
   */
  onSuccess?: (data: DataType) => void;
  
  /**
   * Error callback
   */
  onError?: (error: Error) => void;
  
  /**
   * Enable/disable the hook
   * @default true
   */
  enabled?: boolean;
}

/**
 * Return type for useHookName hook
 */
export interface UseHookNameReturn {
  /**
   * Current data state
   */
  data: DataType | null;
  
  /**
   * Loading state
   */
  loading: boolean;
  
  /**
   * Error state
   */
  error: Error | null;
  
  /**
   * Refetch function
   */
  refetch: () => Promise<void>;
  
  /**
   * Reset function
   */
  reset: () => void;
}

export function useHookName(
  options: UseHookNameOptions = {}
): UseHookNameReturn {
  const { option1, enabled = true, onSuccess, onError } = options;
  
  const [data, setData] = useState<DataType | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const refetch = useCallback(async () => {
    if (!enabled) return;
    
    try {
      setLoading(true);
      setError(null);
      
      // Hook logic here
      const result = await fetchData(option1);
      
      setData(result);
      onSuccess?.(result);
    } catch (err) {
      const error = err instanceof Error ? err : new Error('Unknown error');
      setError(error);
      onError?.(error);
    } finally {
      setLoading(false);
    }
  }, [option1, enabled, onSuccess, onError]);

  const reset = useCallback(() => {
    setData(null);
    setError(null);
    setLoading(false);
  }, []);

  useEffect(() => {
    refetch();
  }, [refetch]);

  return { data, loading, error, refetch, reset };
}
```

---

## Test Template

```typescript
// libs/ui-components/src/lib/hooks/useHookName.test.ts

import { renderHook, act, waitFor } from '@testing-library/react';
import { useHookName } from './useHookName';

describe('useHookName', () => {
  it('returns initial state', () => {
    const { result } = renderHook(() => useHookName());
    
    expect(result.current.data).toBeNull();
    expect(result.current.loading).toBe(false);
    expect(result.current.error).toBeNull();
  });

  it('fetches data successfully', async () => {
    const { result } = renderHook(() => useHookName());
    
    await waitFor(() => {
      expect(result.current.loading).toBe(false);
      expect(result.current.data).toBeDefined();
      expect(result.current.error).toBeNull();
    });
  });

  it('handles errors', async () => {
    const { result } = renderHook(() => 
      useHookName({ option1: 'invalid' })
    );
    
    await waitFor(() => {
      expect(result.current.error).toBeDefined();
      expect(result.current.data).toBeNull();
    });
  });

  it('calls onSuccess callback', async () => {
    const onSuccess = jest.fn();
    const { result } = renderHook(() => 
      useHookName({ onSuccess })
    );
    
    await waitFor(() => {
      expect(onSuccess).toHaveBeenCalledWith(expect.any(Object));
    });
  });

  it('respects enabled option', () => {
    const { result } = renderHook(() => 
      useHookName({ enabled: false })
    );
    
    expect(result.current.loading).toBe(false);
  });

  it('refetch works correctly', async () => {
    const { result } = renderHook(() => useHookName());
    
    await act(async () => {
      await result.current.refetch();
    });
    
    expect(result.current.data).toBeDefined();
  });

  it('reset clears state', async () => {
    const { result } = renderHook(() => useHookName());
    
    await waitFor(() => {
      expect(result.current.data).toBeDefined();
    });
    
    act(() => {
      result.current.reset();
    });
    
    expect(result.current.data).toBeNull();
    expect(result.current.error).toBeNull();
  });

  it('cleans up on unmount', () => {
    const cleanup = jest.fn();
    const { unmount } = renderHook(() => {
      useEffect(() => cleanup, []);
      return useHookName();
    });
    
    unmount();
    expect(cleanup).toHaveBeenCalled();
  });
});
```

---

## Common Hook Templates

### 1. Data Fetching Hook

```typescript
export function useFetch<T>(
  url: string,
  options: UseFetchOptions = {}
): UseFetchReturn<T> {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const fetchData = useCallback(async () => {
    if (!options.enabled) return;
    
    try {
      setLoading(true);
      setError(null);
      
      const response = await fetch(url, options.fetchOptions);
      if (!response.ok) throw new Error('Fetch failed');
      
      const result = await response.json();
      setData(result);
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Unknown error'));
    } finally {
      setLoading(false);
    }
  }, [url, options.enabled]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return { data, loading, error, refetch: fetchData };
}
```

### 2. Local Storage Hook

```typescript
export function useLocalStorage<T>(
  key: string,
  initialValue: T
): [T, (value: T | ((prev: T) => T)) => void, () => void] {
  const readValue = useCallback((): T => {
    if (typeof window === 'undefined') return initialValue;
    
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.warn(`Error reading localStorage key "${key}":`, error);
      return initialValue;
    }
  }, [key, initialValue]);

  const [storedValue, setStoredValue] = useState<T>(readValue);

  const setValue = useCallback((value: T | ((prev: T) => T)) => {
    try {
      const newValue = value instanceof Function ? value(storedValue) : value;
      setStoredValue(newValue);
      
      if (typeof window !== 'undefined') {
        window.localStorage.setItem(key, JSON.stringify(newValue));
      }
    } catch (error) {
      console.warn(`Error setting localStorage key "${key}":`, error);
    }
  }, [key, storedValue]);

  const removeValue = useCallback(() => {
    try {
      setStoredValue(initialValue);
      if (typeof window !== 'undefined') {
        window.localStorage.removeItem(key);
      }
    } catch (error) {
      console.warn(`Error removing localStorage key "${key}":`, error);
    }
  }, [key, initialValue]);

  return [storedValue, setValue, removeValue];
}
```

### 3. Debounce Hook

```typescript
export function useDebounce<T>(value: T, delay: number = 500): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => clearTimeout(handler);
  }, [value, delay]);

  return debouncedValue;
}
```

### 4. Event Listener Hook

```typescript
export function useEventListener<K extends keyof WindowEventMap>(
  eventName: K,
  handler: (event: WindowEventMap[K]) => void,
  element: Window | HTMLElement = window
): void {
  const savedHandler = useRef(handler);

  useEffect(() => {
    savedHandler.current = handler;
  }, [handler]);

  useEffect(() => {
    const isSupported = element && element.addEventListener;
    if (!isSupported) return;

    const eventListener = (event: Event) => {
      savedHandler.current(event as WindowEventMap[K]);
    };

    element.addEventListener(eventName, eventListener);

    return () => {
      element.removeEventListener(eventName, eventListener);
    };
  }, [eventName, element]);
}
```

### 5. Toggle Hook

```typescript
export function useToggle(
  initialValue: boolean = false
): [boolean, () => void, (value: boolean) => void] {
  const [value, setValue] = useState(initialValue);

  const toggle = useCallback(() => {
    setValue((v) => !v);
  }, []);

  const setToggle = useCallback((newValue: boolean) => {
    setValue(newValue);
  }, []);

  return [value, toggle, setToggle];
}
```

### 6. Previous Value Hook

```typescript
export function usePrevious<T>(value: T): T | undefined {
  const ref = useRef<T>();
  
  useEffect(() => {
    ref.current = value;
  }, [value]);
  
  return ref.current;
}
```

### 7. Intersection Observer Hook

```typescript
export function useIntersectionObserver(
  elementRef: RefObject<Element>,
  options: IntersectionObserverInit = {}
): IntersectionObserverEntry | undefined {
  const [entry, setEntry] = useState<IntersectionObserverEntry>();

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    const observer = new IntersectionObserver(([entry]) => {
      setEntry(entry);
    }, options);

    observer.observe(element);

    return () => observer.disconnect();
  }, [elementRef, options.threshold, options.root, options.rootMargin]);

  return entry;
}
```

---

## Checklist After Generation

Verify all files were created:
- [ ] Hook file created
- [ ] Test file created
- [ ] Exports updated
- [ ] Documentation added

Verify hook compliance:
- [ ] Name starts with `use`
- [ ] TypeScript types defined
- [ ] Dependencies correct
- [ ] Cleanup functions present
- [ ] SSR-safe (if applicable)
- [ ] JSDoc complete

Run checks:
```bash
# Lint
npx nx lint ui-components

# Type check
npx nx typecheck ui-components

# Test
npx nx test ui-components
```

---

## Example Generation Session

**User:** "Create hook useFormValidation"

**Claude:**
```
Hook Generator activated!

I'll create a useFormValidation hook following React best practices.

Questions:
1. Purpose: Form validation with error handling
2. Parameters:
   - initialValues (object)
   - validate (function)
   - onSubmit (function)
3. Returns:
   - values
   - errors
   - handleChange
   - handleSubmit
   - reset
4. Side effects: None (pure state management)

Generating files...

✅ Created: libs/ui-components/src/lib/hooks/useFormValidation.ts
✅ Created: libs/ui-components/src/lib/hooks/useFormValidation.test.ts
✅ Updated: libs/ui-components/src/lib/hooks/index.ts
✅ Updated: libs/ui-components/src/index.ts

Example usage:
```tsx
const { values, errors, handleChange, handleSubmit } = useFormValidation({
  initialValues: { email: '', password: '' },
  validate: (values) => {
    const errors = {};
    if (!values.email) errors.email = 'Required';
    return errors;
  },
  onSubmit: (values) => console.log(values)
});
```

Next steps:
1. Review generated code
2. Run tests: npx nx test ui-components
3. Add to documentation
```

---

## Error Handling

### If hook name doesn't start with 'use':
```
❌ Invalid hook name: "hookName"
Hook names must start with "use" (e.g., useHookName)

Common patterns:
- useLocalStorage
- useFetch
- useDebounce
- useToggle
```

### If hook already exists:
```
⚠️ Hook "useHookName" already exists!
Would you like to:
1. Create with different name
2. Update existing hook
3. Cancel
```

### If missing required info:
```
❌ Missing required information:
- Hook name
- Purpose/description

Please provide these details to proceed.
```

---

## Best Practices

### DO:
✅ Always read hook-pattern.md first
✅ Use correct naming (use*)
✅ Define TypeScript types
✅ Include JSDoc comments
✅ Add comprehensive tests
✅ Handle cleanup
✅ Make SSR-safe when applicable
✅ Use proper dependencies

### DON'T:
❌ Call hooks conditionally
❌ Skip dependency arrays
❌ Forget cleanup functions
❌ Use any types
❌ Skip error handling
❌ Ignore SSR concerns

---

## Rules of Hooks Reminder

1. **Only call hooks at the top level**
   - ❌ Don't call in loops, conditions, or nested functions
   - ✅ Call at the top of your function

2. **Only call hooks from React functions**
   - ✅ Call from React components
   - ✅ Call from custom hooks
   - ❌ Don't call from regular JavaScript functions

3. **ESLint rule: `react-hooks/rules-of-hooks`**
   - Enforces these rules automatically

---

## Integration Points

After generation:
1. **Test:** Run `npx nx test ui-components`
2. **Review:** "Review code for useHookName"
3. **Document:** Add usage examples
4. **Commit:** Follow Conventional Commits

---

## Summary

This skill automates hook creation while ensuring:
- ✅ Naming convention compliance
- ✅ TypeScript typing
- ✅ Dependency management
- ✅ Cleanup patterns
- ✅ SSR safety
- ✅ Comprehensive tests
- ✅ Rules of Hooks compliance
- ✅ Documentation

Always generates production-ready hooks!
