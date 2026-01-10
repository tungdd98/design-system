---
allowed-tools: Bash(git branch:*), Bash(git diff:*), Bash(git log:*)
description: Review current branch changes with custom requirements
argument-hint: Brief description of the requirements/feature
---

## Context

Current branch:
!git branch --show-current

Commits on this branch (compared to main):
!git log main..HEAD --oneline

Changes summary:
!git diff main --stat

Detailed changes:
!git diff main

## Task

Review the current branch changes thoroughly against the provided requirements and provide actionable feedback.

**Requirements/Feature:** $ARGUMENTS

### Review Criteria

Follow the comprehensive review guidelines defined in `.claude/guidelines/code-review.md`, which covers:

1. **Code Quality & Best Practices** (React patterns, TypeScript strictness, DRY, naming, organization)
2. **Architecture & Design Patterns** (Component structure, MUI integration, theme, Nx conventions, state management, backward compatibility)
3. **Security & Performance** (Security vulnerabilities, React performance, bundle size, memory leaks)
4. **Accessibility (a11y)** ⭐ CRITICAL (Keyboard navigation, screen reader support, visual accessibility, testing)
5. **Testing & Documentation** (Unit tests, integration tests, documentation quality)

**Design System Specific Checks:**
- Component quality and consistency
- WCAG 2.1 AA compliance
- Documentation & examples in docs app
- Testing requirements (unit, a11y, visual regression, cross-browser, responsive)
- Versioning & backward compatibility

**Review Priorities** (see guidelines for full list):
1. Security vulnerabilities → Critical
2. Accessibility violations → Critical/Major
3. Breaking changes → Critical/Major
4. Bugs & logic errors → Critical
5. TypeScript type safety → Major
6. Performance problems → Major
7. Code quality issues → Major/Minor
8. Testing gaps → Major/Minor
9. Documentation missing → Minor
10. Style & formatting → Minor

### Output Format

```markdown
## Code Review: [Branch Name]

**Branch:** [current-branch] → main
**Changes:** +[additions] -[deletions] in [file-count] files
**Requirements:** [User provided requirements or "General review"]

---

### Summary
[2-3 sentences explaining what changes were made and how they align with requirements]

### Verdict: [APPROVE ✅ | REQUEST_CHANGES 🔴 | COMMENT 💬]

- **APPROVE ✅**: Changes look good, ready to merge
- **REQUEST_CHANGES 🔴**: Critical/major issues must be fixed before merge
- **COMMENT 💬**: Minor issues or suggestions, approval depends on context

---

### Pre-Review Checklist
- [x] Tests pass locally
- [x] Build succeeds
- [x] No console errors/warnings
- [x] Manual testing completed
- [x] Linting passes

---

### ✅ What's Good
[List positive aspects of the implementation - at least 2-3 points]
- [Specific good practice, pattern, or implementation detail]
- [Another positive aspect]
- [Highlight proper TypeScript usage, accessibility considerations, or performance optimizations]

### 🔴 Critical Issues (Must Fix Before Merge)
[Issues that could cause bugs, security vulnerabilities, break functionality, or violate accessibility standards]
- [ ] **[file.tsx:123]** Issue description
  - **Problem:** [Explain the issue and impact]
  - **Fix:** [Concrete suggestion with code example if needed]
- [ ] **[Accessibility]** Missing keyboard navigation
  - **Problem:** Interactive element not keyboard accessible
  - **Fix:** Add onKeyDown handler for Enter/Space keys

### 🟡 Major Issues (Should Fix)
[Issues that affect code quality, maintainability, performance, or user experience significantly]
- [ ] **[file.tsx:456]** Issue description
  - **Problem:** [Explain the issue]
  - **Fix:** [Concrete suggestion]
- [ ] **[TypeScript]** Using `any` type defeats type safety
  - **Problem:** Props typed as `any` allows runtime errors
  - **Fix:** Define proper interface for props

### 🔵 Minor Issues (Nice to Have)
[Small improvements, style inconsistencies, optional optimizations, or minor a11y improvements]
- [ ] **[file.tsx:789]** Issue description
  - **Suggestion:** [Concrete suggestion]

### ♿ Accessibility Findings
[Specific accessibility issues or confirmations - omit if no a11y-related changes]
- **Keyboard navigation:** [Status and findings]
- **Screen reader support:** [Status and findings]
- **Color contrast:** [Status and findings]
- **ARIA usage:** [Status and findings]

### 🧪 Testing Status
[Testing coverage and quality assessment]
- **Unit tests:** [Coverage status, quality of tests]
- **Accessibility tests:** [Automated a11y test results]
- **Manual testing:** [What was tested, any issues found]

### 💡 Suggestions
[Optional improvements, best practices, or architectural considerations for future iterations]
- [General suggestion or improvement idea]
- [Performance optimization opportunity]
- [Documentation enhancement]
- [Consider for future: architectural improvement]

### 📚 Documentation
[Documentation quality and completeness - omit if no docs changes]
- **Component docs:** [Status in docs app]
- **Props documentation:** [TypeScript types documented]
- **Usage examples:** [Quality and coverage]
- **Migration guide:** [If applicable]

---
*Reviewed by Claude Code | Focus: Code Quality • Architecture • Security • Performance • Accessibility*
```

### Important Reminders

For detailed review criteria, severity definitions, and guidelines, refer to `.claude/guidelines/code-review.md`.

Key points:
- Always include "What's Good" section (positive reinforcement)
- Omit empty sections (no issues = no section)
- Be specific with file:line references
- Provide concrete, actionable fix suggestions
- Accessibility is non-negotiable (Critical/Major severity)
- Component changes without tests = typically Major issue
