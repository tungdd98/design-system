---
allowed-tools: Bash(ls:*), Bash(mkdir:*), Write(*), Read(*), Edit(*)
description: Generate new component following Design System patterns
argument-hint: ComponentName [MuiComponentName]
---

## Context

Arguments provided:
```
$ARGUMENTS
```

## Task

Generate a new component for the Design System following established patterns and conventions.

### Step 1: Parse and Validate Arguments

Parse the arguments:
- **ComponentName** (required): The name of the component to generate (e.g., "Tooltip", "Hero")
- **MuiComponentName** (optional): The MUI component to wrap (e.g., "MuiTooltip", "MuiAlert")

**Validation Rules:**

1. **ComponentName is required**
   - If missing, show error: "Error: ComponentName is required. Usage: /gen-component ComponentName [MuiComponentName]"
   - Stop execution

2. **ComponentName must be PascalCase**
   - First character must be uppercase
   - Must start with a letter
   - Can contain letters and numbers only
   - If invalid, show error: "Error: Component name must be PascalCase (e.g., MyComponent, Button, Hero123)"
   - Stop execution

3. **Component must not already exist**
   - Check if directory exists: `libs/ui-components/src/lib/{ComponentName}/`
   - If exists, show error: "Error: Component '{ComponentName}' already exists in libs/ui-components/src/lib/"
   - Stop execution

4. **MuiComponentName validation** (optional)
   - If provided, should start with "Mui" (e.g., MuiButton, MuiTooltip)
   - If doesn't start with "Mui", add "Mui" prefix automatically
   - Example: "Tooltip" → "MuiTooltip", "Alert" → "MuiAlert"

### Step 2: Determine Component Pattern

Based on arguments:

- **If MuiComponentName provided** → Use **MUI Wrapper Template**
- **If no MuiComponentName** → Use **Minimal Template**

### Step 3: Generate Component Files

#### 3.1 Create Component Directory

```bash
mkdir -p libs/ui-components/src/lib/{ComponentName}
```

#### 3.2 Generate Component File (`{ComponentName}.tsx`)

**For MUI Wrapper Template:**

```typescript
import React from 'react';
import {
  {MuiComponentName},
  {MuiComponentName}Props as Mui{MuiComponentName}Props,
} from '@mui/material';

export interface {ComponentName}Props extends Mui{MuiComponentName}Props {
  // Add custom props here if needed
}

/**
 * {ComponentName} component wrapping MUI {MuiComponentName}.
 *
 * @example
 * ```tsx
 * <{ComponentName}>Content</{ComponentName}>
 * ```
 */
export const {ComponentName}: React.FC<{ComponentName}Props> = ({
  ...props
}) => {
  return <{MuiComponentName} {...props} />;
};

{ComponentName}.displayName = '{ComponentName}';
```

**For Minimal Template (no MUI):**

```typescript
import React from 'react';

export interface {ComponentName}Props {
  /**
   * The content of the component.
   */
  children?: React.ReactNode;
  /**
   * Additional CSS class name.
   */
  className?: string;
}

/**
 * {ComponentName} component.
 *
 * @example
 * ```tsx
 * <{ComponentName}>Content</{ComponentName}>
 * ```
 */
export const {ComponentName}: React.FC<{ComponentName}Props> = ({
  children,
  className,
  ...props
}) => {
  return (
    <div className={className} {...props}>
      {children}
    </div>
  );
};

{ComponentName}.displayName = '{ComponentName}';
```

Write this file to: `libs/ui-components/src/lib/{ComponentName}/{ComponentName}.tsx`

#### 3.3 Generate Index File (`index.ts`)

```typescript
export { {ComponentName} } from './{ComponentName}';
export type { {ComponentName}Props } from './{ComponentName}';
```

Write this file to: `libs/ui-components/src/lib/{ComponentName}/index.ts`

### Step 4: Update Barrel Export

Read the main barrel export file: `libs/ui-components/src/index.ts`

Find the appropriate location to insert the new component exports (alphabetical order).

Add these two lines in alphabetical order:
```typescript
export { {ComponentName} } from './lib/{ComponentName}';
export type { {ComponentName}Props } from './lib/{ComponentName}';
```

**Important:**
- Maintain alphabetical order (case-sensitive, uppercase comes before lowercase)
- Keep existing comments and organization intact
- Insert both export statements together
- Follow the existing pattern in the file

### Step 5: Verification

After generating files:

1. **Verify files created:**
   - `libs/ui-components/src/lib/{ComponentName}/{ComponentName}.tsx`
   - `libs/ui-components/src/lib/{ComponentName}/index.ts`

2. **Verify barrel export updated:**
   - `libs/ui-components/src/index.ts` contains new exports

### Step 6: Output Summary

Display a success message with:

```markdown
✅ Component '{ComponentName}' generated successfully!

**Files created:**
- libs/ui-components/src/lib/{ComponentName}/{ComponentName}.tsx
- libs/ui-components/src/lib/{ComponentName}/index.ts

**Files updated:**
- libs/ui-components/src/index.ts (added exports)

**Usage:**
\`\`\`tsx
import { {ComponentName} } from '@design-system/ui-components';

function App() {
  return <{ComponentName}>Hello World</{ComponentName}>;
}
\`\`\`

**Next steps:**
1. Review and customize the generated component code
2. Add custom props and logic as needed
3. Run build to verify: \`npm run build\`
4. Add component to docs app showcase (manual)
5. Write tests for the component (manual)
```

### Error Handling

If any step fails:
- Show clear error message explaining what went wrong
- Do NOT create partial files
- Do NOT update barrel export if component creation failed
- Suggest how to fix the issue

### Examples

**Example 1: MUI Wrapper**
```bash
/gen-component Tooltip MuiTooltip
```
Generates Tooltip component wrapping MUI Tooltip.

**Example 2: MUI Wrapper (auto-prefix)**
```bash
/gen-component Alert Alert
```
Auto-converts "Alert" to "MuiAlert" and generates Alert component.

**Example 3: Custom Component**
```bash
/gen-component Hero
```
Generates custom Hero component with minimal template (no MUI).

**Example 4: Invalid name**
```bash
/gen-component myComponent
```
Error: Component name must be PascalCase.

**Example 5: Already exists**
```bash
/gen-component Button
```
Error: Component 'Button' already exists.

### Important Notes

- Generated components follow Design System conventions
- TypeScript strict mode compatible
- Includes displayName for React DevTools
- JSDoc comments for better IDE intellisense
- Props interface properly typed
- Follows existing component patterns (Button, Typography, Card)
- Barrel exports maintained in alphabetical order

### Future Enhancements

This command currently generates basic component structure. Future versions may include:
- Test file generation (ComponentName.test.tsx)
- Docs page generation (apps/docs/src/app/pages/)
- Interactive mode (ask for props, variants)
- Storybook story generation
- More complex patterns (composition, enhanced wrappers)
