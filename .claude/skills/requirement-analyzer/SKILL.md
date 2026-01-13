---
name: requirement-analyzer
description: Analyzes requirement specifications for design system components and features. Use when users request to "analyze requirement", "analyze: [requirement text]", "what components need to be modified for [feature]", or similar requirement analysis tasks. Identifies impacted components, suggests implementation approach, and provides actionable next steps.
---

# Requirement Analyzer

Systematic analysis of requirements for the Design System project to identify:
- Which components need modification
- What new components need to be created
- Implementation approach and priorities
- Potential risks and dependencies

---

## When to Use

This skill activates when the user requests:
- "Analyze requirement: [specification]"
- "Analyze: [feature description]"
- "What needs to change for [feature]?"
- "Impact analysis for [requirement]"
- "Break down this requirement"

---

## Analysis Process

### Step 1: Requirement Understanding

Extract and clarify:
- **Feature Goal**: What is the user trying to achieve?
- **Scope**: Is this a new feature, enhancement, or bug fix?
- **Components Involved**: Which existing components are affected?
- **New Components**: Do we need new components?

### Step 2: Impact Analysis

Categorize impact:
- **High Impact**: Core components, breaking changes, API changes
- **Medium Impact**: New components, feature additions, theme changes
- **Low Impact**: Bug fixes, styling tweaks, documentation

### Step 3: Implementation Planning

Create action plan:
1. **Preparation**: What needs to be done first?
2. **Implementation Order**: What's the logical sequence?
3. **Testing Strategy**: How to verify it works?
4. **Documentation**: What needs to be documented?

### Step 4: Risk Assessment

Identify risks:
- Breaking changes to existing components
- Performance implications
- Accessibility concerns
- Browser compatibility
- Dependencies on external libraries

---

## Analysis Template

Use this structure for analysis output:

```markdown
# Requirement Analysis: [Feature Name]

## 1. Understanding
- **Goal**: [What user wants to achieve]
- **Type**: New Feature / Enhancement / Bug Fix
- **Priority**: High / Medium / Low

## 2. Impacted Areas

### Existing Components to Modify
- [ ] **ComponentName** (libs/ui-components/src/lib/ComponentName/)
  - Change: [What needs to change]
  - Reason: [Why this change]
  - Breaking: Yes/No

### New Components to Create
- [ ] **NewComponent** (libs/ui-components/src/lib/NewComponent/)
  - Purpose: [What it does]
  - Base: [MUI component to wrap]
  - Props: [Key props needed]

### Theme Changes
- [ ] **Theme area** (libs/ui-components/src/lib/theme/)
  - Change: [What needs updating]

### Documentation Changes
- [ ] **Docs pages** (apps/docs/src/app/)
  - Pages to update: [List]
  - New pages: [List]

## 3. Implementation Plan

### Phase 1: Preparation
```bash
# Commands to run
npx nx serve docs  # Start dev server
```

**Tasks:**
1. [Task 1]
2. [Task 2]

### Phase 2: Implementation
**Order of work:**
1. [ ] Modify [Component A]
   - File: `libs/ui-components/src/lib/ComponentA/ComponentA.tsx`
   - Changes: [Details]
   
2. [ ] Create [Component B]
   - Follow pattern: `.claude/patterns/component-pattern.md`
   - Trigger: "Create component [ComponentB]"

3. [ ] Update theme
   - File: `libs/ui-components/src/lib/theme/themeOptions.ts`
   - Changes: [Details]

### Phase 3: Testing
- [ ] Unit tests for modified components
- [ ] Unit tests for new components
- [ ] Manual testing in docs app
- [ ] Accessibility testing
- [ ] Visual regression testing

### Phase 4: Documentation
- [ ] Update component documentation pages
- [ ] Add usage examples
- [ ] Update navigation
- [ ] Update README if needed

## 4. Technical Considerations

### Performance Impact
- [Analysis of performance implications]

### Accessibility
- [A11y considerations]

### Browser Compatibility
- [Browser support notes]

### Dependencies
- New dependencies needed: [List]
- Version updates needed: [List]

## 5. Risks & Mitigation

| Risk | Severity | Mitigation |
|------|----------|------------|
| [Risk 1] | High/Medium/Low | [How to mitigate] |

## 6. Next Steps

**Immediate Actions:**
1. [First thing to do]
2. [Second thing to do]

**Commands to Run:**
```bash
# Start development
npx nx serve docs

# Generate component (if needed)
# Trigger: "Create component [ComponentName]"
```

## 7. Estimated Effort
- **Development**: [X hours/days]
- **Testing**: [X hours/days]
- **Documentation**: [X hours/days]
- **Total**: [X hours/days]
```

---

## Example Analyses

### Example 1: Add Dark Mode Support

**User Request:** "Analyze requirement: Add dark mode toggle to the design system"

**Analysis:**

```markdown
# Requirement Analysis: Dark Mode Support

## 1. Understanding
- **Goal**: Enable users to switch between light and dark themes
- **Type**: New Feature
- **Priority**: Medium

## 2. Impacted Areas

### Existing Components to Modify
- [ ] **ThemeProvider** (libs/ui-components/src/lib/theme/ThemeProvider.tsx)
  - Change: Add mode state and toggle function
  - Reason: Need to manage theme mode
  - Breaking: No

### New Components to Create
- [ ] **ThemeModeToggle** (libs/ui-components/src/lib/ThemeModeToggle/)
  - Purpose: Button to toggle between light/dark
  - Base: MUI IconButton
  - Props: onChange callback, current mode

### Theme Changes
- [ ] **themeOptions** (libs/ui-components/src/lib/theme/themeOptions.ts)
  - Change: Create separate light and dark palettes
  - Add dark mode color tokens

### Documentation Changes
- [ ] **Theme page** (apps/docs/src/app/theme/ThemePage.tsx)
  - Update with dark mode examples
- [ ] **ThemeModeToggle page** (apps/docs/src/app/components/ThemeModeTogglePage.tsx)
  - New page to showcase toggle

## 3. Implementation Plan

### Phase 1: Preparation
```bash
npx nx serve docs
```

**Tasks:**
1. Review Material-UI dark mode documentation
2. Design dark mode color palette
3. Plan state management approach

### Phase 2: Implementation
**Order:**
1. [ ] Update ThemeProvider
   - Add `mode` state (light/dark)
   - Add `toggleMode` function
   - Expose via context
   
2. [ ] Update themeOptions
   - Create dark palette
   - Add conditional logic for mode
   
3. [ ] Create ThemeModeToggle component
   - Icon button with sun/moon icons
   - Connect to theme context
   - Persist preference to localStorage

### Phase 3: Testing
- [ ] Test toggle functionality
- [ ] Test all components in dark mode
- [ ] Test persistence across reloads
- [ ] Accessibility testing (contrast ratios)

### Phase 4: Documentation
- [ ] Document usage in theme page
- [ ] Add ThemeModeToggle examples
- [ ] Update navigation

## 4. Technical Considerations

### Performance Impact
- Minimal: Only re-renders when mode changes
- Use React.memo for components

### Accessibility
- Ensure WCAG AA contrast ratios for dark mode
- Provide prefers-color-scheme support
- Add aria-label to toggle button

### Browser Compatibility
- localStorage supported in all modern browsers
- CSS variables for theme tokens

### Dependencies
- No new dependencies needed
- Uses existing @mui/material theming

## 5. Risks & Mitigation

| Risk | Severity | Mitigation |
|------|----------|------------|
| Poor contrast in dark mode | High | Test all colors with contrast checker |
| Breaking existing components | Medium | Thorough testing of all components |
| Performance issues | Low | Use React.memo and proper optimization |

## 6. Next Steps

**Immediate Actions:**
1. Design dark mode color palette
2. Update ThemeProvider with mode state
3. Create ThemeModeToggle component

**Commands:**
```bash
# Start dev server
npx nx serve docs

# Create toggle component
# Say: "Create component ThemeModeToggle"
```

## 7. Estimated Effort
- **Development**: 4-6 hours
- **Testing**: 2-3 hours
- **Documentation**: 1-2 hours
- **Total**: 7-11 hours
```

### Example 2: Add Form Validation

**User Request:** "Analyze: Need form validation for Input component"

**Analysis:**

```markdown
# Requirement Analysis: Input Form Validation

## 1. Understanding
- **Goal**: Add validation support to Input component
- **Type**: Enhancement
- **Priority**: High

## 2. Impacted Areas

### Existing Components to Modify
- [ ] **Input** (libs/ui-components/src/lib/Input/Input.tsx)
  - Change: Add validation props and error display
  - Reason: Support form validation
  - Breaking: No (additive change)

### New Components to Create
- [ ] **FormField** (libs/ui-components/src/lib/FormField/)
  - Purpose: Wrapper with label, input, error message
  - Base: Custom wrapper around Input
  - Props: label, error, helperText, required

### Custom Hooks
- [ ] **useFormValidation** (libs/ui-components/src/lib/hooks/useFormValidation.ts)
  - Purpose: Form validation logic
  - Returns: values, errors, handleChange, handleSubmit

## 3. Implementation Plan

### Phase 1: Research
1. Review validation patterns
2. Check `.claude/patterns/component-pattern.md`
3. Study React Hook Form integration

### Phase 2: Implementation
1. [ ] Extend Input component
   - Add `error` prop
   - Add `helperText` prop
   - Add error styling
   
2. [ ] Create FormField wrapper
3. [ ] Create useFormValidation hook
4. [ ] Add validation examples to docs

## 4-7: [Rest of analysis...]
```

---

## Best Practices

### DO:
✅ Always check existing patterns in `.claude/patterns/`
✅ Identify both immediate and future impacts
✅ Suggest using existing skills for implementation
✅ Provide clear, actionable next steps
✅ Consider accessibility and performance
✅ Break down complex requirements into phases

### DON'T:
❌ Start implementation without analysis
❌ Ignore pattern compliance
❌ Skip risk assessment
❌ Forget about documentation
❌ Underestimate testing effort
❌ Miss dependencies between components

---

## Integration with Other Skills

After analysis, suggest:
- **Component creation**: "To create X, say: 'Create component X'"
- **Hook creation**: "To create hook, say: 'Create hook useX'"
- **Code review**: "After implementation, say: 'Review code'"

---

## Output Format

Always structure analysis with:
1. ✅ Clear sections with headers
2. 📋 Checklists for action items
3. 💻 Code snippets where helpful
4. ⚠️ Risks and warnings highlighted
5. 🎯 Concrete next steps
6. 📊 Effort estimates

Keep analysis focused and actionable!
