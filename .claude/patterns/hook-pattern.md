# Custom Hook Design Pattern

**Authoritative Source for Custom Hook Architecture in Design System**

All custom hooks MUST follow this pattern. This is the single source of truth for hook design.

---

## 1. Hook Structure Template

```typescript
// libs/ui-components/src/lib/hooks/useHookName.ts

import { useState, useEffect, useCallback } from 'react';

/**
 * Hook description - what it does and when to use it
 * 
 * @example
 * ```tsx
 * const { data, loading, error } = useHookName(options);
 * ```
 * 
 * @param options - Configuration options
 * @returns Hook return value
 */
export interface UseHookNameOptions {
  /** Option description */
  option1?: string;
  
  /** Callback description */
  onSuccess?: (data: DataType) => void;
  
  /** Error callback */
  onError?: (error: Error) => void;
}

export interface UseHookNameReturn {
  /** Current data state */
  data: DataType | null;
  
  /** Loading state */
  loading: boolean;
  
  /** Error state */
  error: Error | null;
  
  /** Action function */
  refetch: () => Promise<void>;
}

export function useHookName(
  options: UseHookNameOptions = {}
): UseHookNameReturn {
  const [data, setData] = useState<DataType | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const refetch = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      
      // Hook logic here
      const result = await fetchData();
      
      setData(result);
      options.onSuccess?.(result);
    } catch (err) {
      const error = err instanceof Error ? err : new Error('Unknown error');
      setError(error);
      options.onError?.(error);
    } finally {
      setLoading(false);
    }
  }, [options.option1]);

  useEffect(() => {
    refetch();
  }, [refetch]);

  return { data, loading, error, refetch };
}
```

---

## 2. Hook Naming Convention

**Format:** `use[Action][Subject]`

✅ **Good:**
- `useLocalStorage`
- `useWindowSize`
- `useDebounce`
- `useIntersectionObserver`
- `usePrevious`

❌ **Bad:**
- `localStorage` (missing `use`)
- `getWindowSize` (not a hook)
- `handleDebounce` (sounds like a function)

---

## 3. Required TypeScript Types

### Options Interface

```typescript
export interface UseHookNameOptions {
  // All parameters with default values should be optional
  enabled?: boolean;
  
  // Callbacks should be optional
  onSuccess?: (data: DataType) => void;
  onError?: (error: Error) => void;
  
  // Required parameters should not have `?`
  required: string;
}
```

### Return Type Interface

```typescript
export interface UseHookNameReturn {
  // Always explicitly type return values
  data: DataType | null;
  loading: boolean;
  error: Error | null;
  
  // Functions should be typed
  refetch: () => Promise<void>;
  reset: () => void;
}
```

---

## 4. Common Hook Patterns

### 4.1 Data Fetching Hook

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
      
      const response = await fetch(url);
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

### 4.2 Local Storage Hook

```typescript
export function useLocalStorage<T>(
  key: string,
  initialValue: T
): [T, (value: T | ((prev: T) => T)) => void, () => void] {
  // Read from localStorage on mount
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

  // Save to localStorage
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

  // Remove from localStorage
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

### 4.3 Debounce Hook

```typescript
export function useDebounce<T>(value: T, delay: number = 500): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
}
```

### 4.4 Window Size Hook

```typescript
interface WindowSize {
  width: number;
  height: number;
}

export function useWindowSize(): WindowSize {
  const [windowSize, setWindowSize] = useState<WindowSize>({
    width: typeof window !== 'undefined' ? window.innerWidth : 0,
    height: typeof window !== 'undefined' ? window.innerHeight : 0,
  });

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    window.addEventListener('resize', handleResize);
    
    // Call handler right away so state gets updated with initial window size
    handleResize();

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return windowSize;
}
```

### 4.5 Previous Value Hook

```typescript
export function usePrevious<T>(value: T): T | undefined {
  const ref = useRef<T>();
  
  useEffect(() => {
    ref.current = value;
  }, [value]);
  
  return ref.current;
}
```

### 4.6 Toggle Hook

```typescript
export function useToggle(
  initialValue: boolean = false
): [boolean, () => void, (value: boolean) => void] {
  const [value, setValue] = useState(initialValue);

  const toggle = useCallback(() => {
    setValue((v) => !v);
  }, []);

  const setToggle = useCallback((value: boolean) => {
    setValue(value);
  }, []);

  return [value, toggle, setToggle];
}
```

### 4.7 Async Hook

```typescript
export function useAsync<T>(
  asyncFunction: () => Promise<T>,
  immediate: boolean = true
): UseAsyncReturn<T> {
  const [status, setStatus] = useState<'idle' | 'pending' | 'success' | 'error'>('idle');
  const [data, setData] = useState<T | null>(null);
  const [error, setError] = useState<Error | null>(null);

  const execute = useCallback(async () => {
    setStatus('pending');
    setData(null);
    setError(null);

    try {
      const response = await asyncFunction();
      setData(response);
      setStatus('success');
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Unknown error'));
      setStatus('error');
    }
  }, [asyncFunction]);

  useEffect(() => {
    if (immediate) {
      execute();
    }
  }, [execute, immediate]);

  return {
    execute,
    status,
    data,
    error,
    loading: status === 'pending',
  };
}
```

---

## 5. Dependency Array Rules

### ✅ Always Include Dependencies

```typescript
// ✅ GOOD
const handleClick = useCallback(() => {
  console.log(count);
}, [count]);

useEffect(() => {
  document.title = `Count: ${count}`;
}, [count]);
```

### ❌ Never Skip Dependencies

```typescript
// ❌ BAD
const handleClick = useCallback(() => {
  console.log(count);
}, []); // Missing count dependency!

useEffect(() => {
  document.title = `Count: ${count}`;
}, []); // Missing count dependency!
```

### 🔧 Use ESLint Rule

Enable `react-hooks/exhaustive-deps` to catch missing dependencies:

```json
{
  "rules": {
    "react-hooks/exhaustive-deps": "error"
  }
}
```

---

## 6. Cleanup Pattern

Always cleanup side effects to prevent memory leaks:

```typescript
export function useEventListener<K extends keyof WindowEventMap>(
  eventName: K,
  handler: (event: WindowEventMap[K]) => void,
  element: Window | HTMLElement = window
) {
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

    // ✅ Cleanup function
    return () => {
      element.removeEventListener(eventName, eventListener);
    };
  }, [eventName, element]);
}
```

**Common cleanup scenarios:**
- `removeEventListener` for event listeners
- `clearTimeout` / `clearInterval` for timers
- `abort()` for fetch requests
- `unsubscribe()` for subscriptions

---

## 7. SSR (Server-Side Rendering) Support

```typescript
export function useMediaQuery(query: string): boolean {
  // ✅ Check if window exists (SSR-safe)
  const [matches, setMatches] = useState(() => {
    if (typeof window !== 'undefined') {
      return window.matchMedia(query).matches;
    }
    return false;
  });

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const mediaQuery = window.matchMedia(query);
    const handleChange = () => setMatches(mediaQuery.matches);

    mediaQuery.addEventListener('change', handleChange);
    
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, [query]);

  return matches;
}
```

---

## 8. Error Handling

```typescript
export function useSafeAsync<T>(
  asyncFunction: () => Promise<T>
): UseSafeAsyncReturn<T> {
  const [data, setData] = useState<T | null>(null);
  const [error, setError] = useState<Error | null>(null);
  const [loading, setLoading] = useState(false);

  const execute = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      
      const result = await asyncFunction();
      setData(result);
      
      return { success: true, data: result } as const;
    } catch (err) {
      const error = err instanceof Error ? err : new Error('Unknown error');
      setError(error);
      
      return { success: false, error } as const;
    } finally {
      setLoading(false);
    }
  }, [asyncFunction]);

  return { data, error, loading, execute };
}
```

---

## 9. Testing Requirements

```typescript
// useHookName.test.ts
import { renderHook, act } from '@testing-library/react';
import { useHookName } from './useHookName';

describe('useHookName', () => {
  it('returns initial state', () => {
    const { result } = renderHook(() => useHookName());
    
    expect(result.current.data).toBeNull();
    expect(result.current.loading).toBe(false);
    expect(result.current.error).toBeNull();
  });

  it('handles async operations', async () => {
    const { result } = renderHook(() => useHookName());
    
    await act(async () => {
      await result.current.refetch();
    });
    
    expect(result.current.data).toBeDefined();
    expect(result.current.loading).toBe(false);
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

## 10. Documentation Requirements

### JSDoc Comments

```typescript
/**
 * Custom hook for managing form state with validation
 * 
 * @example
 * ```tsx
 * const { values, errors, handleChange, handleSubmit } = useForm({
 *   initialValues: { email: '', password: '' },
 *   onSubmit: (values) => console.log(values),
 *   validate: (values) => {
 *     const errors = {};
 *     if (!values.email) errors.email = 'Required';
 *     return errors;
 *   }
 * });
 * ```
 * 
 * @param options - Configuration options
 * @param options.initialValues - Initial form values
 * @param options.onSubmit - Submit handler
 * @param options.validate - Validation function
 * @returns Form state and handlers
 */
```

### Export from Main Library

```typescript
// libs/ui-components/src/lib/hooks/index.ts
export { useHookName } from './useHookName';
export type { UseHookNameOptions, UseHookNameReturn } from './useHookName';

// libs/ui-components/src/index.ts
export { useHookName } from './lib/hooks';
export type { UseHookNameOptions, UseHookNameReturn } from './lib/hooks';
```

---

## 11. Performance Optimization

### Memoization

```typescript
export function useExpensiveComputation<T>(
  computeFn: () => T,
  deps: React.DependencyList
): T {
  return useMemo(() => {
    console.log('Computing...');
    return computeFn();
  }, deps);
}
```

### Callback Memoization

```typescript
export function useStableCallback<T extends (...args: any[]) => any>(
  callback: T
): T {
  const callbackRef = useRef(callback);

  useEffect(() => {
    callbackRef.current = callback;
  });

  return useCallback(((...args) => {
    return callbackRef.current(...args);
  }) as T, []);
}
```

---

## 12. Common Mistakes to Avoid

❌ **Don't:**
- Call hooks conditionally
- Call hooks in loops
- Call hooks in nested functions
- Forget cleanup functions
- Skip dependency arrays
- Use `any` types

✅ **Do:**
- Call hooks at the top level
- Use TypeScript strict mode
- Add comprehensive JSDoc
- Write unit tests
- Handle errors gracefully
- Support SSR when applicable

---

## 13. Hook Composition

```typescript
// Compose multiple hooks
export function useFormField(name: string) {
  const { values, errors, handleChange } = useForm();
  const [touched, setTouched] = useState(false);
  
  const handleBlur = useCallback(() => {
    setTouched(true);
  }, []);

  return {
    value: values[name],
    error: touched ? errors[name] : undefined,
    onChange: handleChange(name),
    onBlur: handleBlur,
  };
}
```

---

## Quick Checklist

Before submitting a custom hook:

- [ ] Name starts with `use`
- [ ] TypeScript types defined (Options + Return)
- [ ] JSDoc documentation complete
- [ ] Dependencies array correct
- [ ] Cleanup functions implemented
- [ ] Error handling included
- [ ] SSR-safe (if applicable)
- [ ] Unit tests written and passing
- [ ] Exported from main library
- [ ] Performance optimized (memo/callback)
- [ ] Follows React Rules of Hooks
- [ ] TypeScript strict mode passing
