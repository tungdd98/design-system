# Hooks Patterns Guidelines

Best practices and patterns for creating and using React Hooks in the Design System.

---

## Overview

This guideline covers patterns for:
- Creating custom hooks
- Using built-in React hooks effectively
- Hook composition and reusability
- Performance optimization with hooks
- Testing hooks

**When to use this guideline:**
- ✅ Creating custom hooks for shared logic
- ✅ Managing component state and side effects
- ✅ Optimizing component performance
- ✅ Integrating with MUI theme and Design System patterns

---

## Standards & Requirements

### Hook Naming

**Required:**
- ✅ Custom hooks MUST start with `use` prefix (e.g., `useToggle`, `useDebounce`)
- ✅ Hook names MUST be camelCase
- ✅ Hook names MUST be descriptive and indicate purpose

**Examples:**
```typescript
// ✅ Good
useLocalStorage
useDebounce
useMediaQuery
useThemeMode

// ❌ Bad
toggleHook
Toggle
get_local_storage
```

### Hook Rules (React Rules of Hooks)

**MUST Follow:**
- ✅ Only call hooks at the top level (not in loops, conditions, or nested functions)
- ✅ Only call hooks from React function components or custom hooks
- ✅ Hooks must be called in the same order every render

**Enforced by:** `eslint-plugin-react-hooks`

---

## Common Hook Patterns

### Pattern 1: Boolean State Toggle

**Use case:** Toggle boolean state (open/close, show/hide, on/off)

```typescript
import { useState, useCallback } from 'react';

export const useToggle = (initialValue = false): [boolean, () => void] => {
  const [value, setValue] = useState(initialValue);

  const toggle = useCallback(() => {
    setValue((prev) => !prev);
  }, []);

  return [value, toggle];
};

// Usage
const MyComponent = () => {
  const [isOpen, toggleOpen] = useToggle(false);

  return (
    <Button onClick={toggleOpen}>
      {isOpen ? 'Close' : 'Open'}
    </Button>
  );
};
```

### Pattern 2: Local Storage Hook

**Use case:** Persist state in localStorage with automatic sync

```typescript
import { useState, useEffect } from 'react';

export const useLocalStorage = <T>(
  key: string,
  initialValue: T
): [T, (value: T) => void] => {
  const [storedValue, setStoredValue] = useState<T>(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.error('Error reading from localStorage:', error);
      return initialValue;
    }
  });

  const setValue = (value: T) => {
    try {
      setStoredValue(value);
      window.localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.error('Error writing to localStorage:', error);
    }
  };

  return [storedValue, setValue];
};

// Usage
const MyComponent = () => {
  const [theme, setTheme] = useLocalStorage('theme', 'light');

  return <ThemeProvider theme={theme} />;
};
```

### Pattern 3: Debounced Value

**Use case:** Debounce rapidly changing values (search input, window resize)

```typescript
import { useState, useEffect } from 'react';

export const useDebounce = <T>(value: T, delay: number): T => {
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
};

// Usage
const SearchComponent = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const debouncedSearch = useDebounce(searchTerm, 500);

  useEffect(() => {
    // API call with debounced value
    fetchResults(debouncedSearch);
  }, [debouncedSearch]);

  return <TextField value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />;
};
```

### Pattern 4: Media Query Hook

**Use case:** Responsive behavior based on screen size (integrates with MUI theme)

```typescript
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';

export const useBreakpoint = () => {
  const theme = useTheme();

  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const isTablet = useMediaQuery(theme.breakpoints.between('sm', 'md'));
  const isDesktop = useMediaQuery(theme.breakpoints.up('md'));

  return { isMobile, isTablet, isDesktop };
};

// Usage
const ResponsiveComponent = () => {
  const { isMobile, isDesktop } = useBreakpoint();

  return (
    <Box>
      {isMobile && <MobileView />}
      {isDesktop && <DesktopView />}
    </Box>
  );
};
```

---

## Performance Optimization

### useMemo - Expensive Calculations

**When to use:** Memoize expensive computations

```typescript
import { useMemo } from 'react';

const ExpensiveComponent = ({ data }: { data: number[] }) => {
  // ✅ Good: Memoize expensive calculation
  const processedData = useMemo(() => {
    return data
      .map((item) => item * 2)
      .filter((item) => item > 100)
      .sort((a, b) => b - a);
  }, [data]);

  return <DataDisplay data={processedData} />;
};

// ❌ Bad: Recalculates every render
const BadComponent = ({ data }: { data: number[] }) => {
  const processedData = data
    .map((item) => item * 2)
    .filter((item) => item > 100)
    .sort((a, b) => b - a);

  return <DataDisplay data={processedData} />;
};
```

### useCallback - Stable Function References

**When to use:** Prevent unnecessary re-renders of child components

```typescript
import { useCallback } from 'react';

const ParentComponent = () => {
  // ✅ Good: Stable function reference
  const handleClick = useCallback(() => {
    console.log('Clicked');
  }, []);

  return <MemoizedChild onClick={handleClick} />;
};

// ❌ Bad: New function every render causes child re-render
const BadParent = () => {
  const handleClick = () => {
    console.log('Clicked');
  };

  return <MemoizedChild onClick={handleClick} />;
};
```

**Note:** Only use when passing functions to memoized child components or as dependencies in other hooks.

---

## Anti-Patterns

### Anti-Pattern 1: Overusing useMemo/useCallback

**Problem:**
```typescript
// ❌ Bad: Premature optimization
const Component = ({ name }: { name: string }) => {
  const greeting = useMemo(() => `Hello, ${name}`, [name]); // Unnecessary
  const handleClick = useCallback(() => alert(greeting), [greeting]); // Unnecessary

  return <Button onClick={handleClick}>{greeting}</Button>;
};
```

**Why it's bad:**
- Simple operations don't need memoization
- Adds complexity without performance benefit
- useMemo/useCallback have their own overhead

**Solution:**
```typescript
// ✅ Good: No unnecessary optimization
const Component = ({ name }: { name: string }) => {
  const greeting = `Hello, ${name}`;
  const handleClick = () => alert(greeting);

  return <Button onClick={handleClick}>{greeting}</Button>;
};
```

### Anti-Pattern 2: Violating Rules of Hooks

**Problem:**
```typescript
// ❌ Bad: Conditional hook
const BadComponent = ({ condition }) => {
  if (condition) {
    const [value, setValue] = useState(0); // Violates rules
  }
  return <div />;
};
```

**Solution:**
```typescript
// ✅ Good: Hook at top level
const GoodComponent = ({ condition }) => {
  const [value, setValue] = useState(0);

  if (!condition) return null;

  return <div>{value}</div>;
};
```

---

## Custom Hook Best Practices

### Structure

```typescript
import { useState, useEffect } from 'react';

/**
 * Custom hook description
 *
 * @param param1 - Description
 * @param param2 - Description
 * @returns Description of return value
 *
 * @example
 * ```tsx
 * const { data, loading, error } = useFetch('/api/data');
 * ```
 */
export const useCustomHook = (param1: string, param2: number) => {
  const [state, setState] = useState(initialState);

  useEffect(() => {
    // Side effects
    return () => {
      // Cleanup
    };
  }, [dependencies]);

  return { state, setState };
};
```

### Return Value Conventions

**Object return (named properties):**
```typescript
// ✅ Good: Use when returning multiple related values
export const useFetch = (url: string) => {
  return { data, loading, error, refetch };
};

const { data, loading } = useFetch('/api');
```

**Array return (positional):**
```typescript
// ✅ Good: Use for 2-3 simple values (like useState)
export const useToggle = (initial: boolean) => {
  return [value, toggle];
};

const [isOpen, toggleOpen] = useToggle(false);
```

---

## Testing Hooks

### Using @testing-library/react-hooks

```typescript
import { renderHook, act } from '@testing-library/react';
import { useToggle } from './useToggle';

describe('useToggle', () => {
  it('should toggle boolean value', () => {
    const { result } = renderHook(() => useToggle(false));

    expect(result.current[0]).toBe(false);

    act(() => {
      result.current[1](); // Call toggle
    });

    expect(result.current[0]).toBe(true);
  });
});
```

---

## Related Guidelines

- **[Component Creation](./component-creation.md)** - Using hooks in components
- **[Code Review](./code-review.md)** - Performance optimization checks

---

## References

### Internal
- [CLAUDE.md](../../CLAUDE.md) - Project overview
- [React Hooks Documentation](https://react.dev/reference/react)

### External
- [Rules of Hooks](https://react.dev/reference/rules/rules-of-hooks)
- [React Hooks Best Practices](https://react.dev/learn/reusing-logic-with-custom-hooks)

---

**Last Updated:** 2026-01-10
**Maintained By:** Tech Lead & Team
**Status:** 🚧 Draft (Expand as needed)
