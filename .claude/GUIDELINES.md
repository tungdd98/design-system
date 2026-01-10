# Claude Code Guidelines

This is the master index for all guidelines used by Claude Code in this project. All commands, workflows, and automated processes reference these guidelines as the single source of truth.

---

## 📚 Available Guidelines

### Active Guidelines

#### [Code Review Guidelines](guidelines/code-review.md) ✅
Comprehensive code review standards covering:
- Code Quality & Best Practices (React, TypeScript, DRY principles)
- Architecture & Design Patterns (MUI, Nx monorepo, component structure)
- Security & Performance
- Accessibility (WCAG 2.1 AA compliance) ⭐ Critical
- Testing & Documentation
- Design System specific checks

**Used by:**
- CLI command: `/review`
- GitHub workflow: `claude-code-review.yml`

---

### Future Guidelines (Templates)

The following guidelines can be created when needed:

#### 🧪 Testing Guidelines
Standards for unit tests, integration tests, e2e tests, and test coverage requirements.

**Potential topics:**
- Testing library best practices
- Test structure and organization
- Mocking strategies
- Coverage requirements
- Accessibility testing (jest-axe, Testing Library)

#### 🚀 Deployment & CI/CD Guidelines
Standards for deployment processes, CI/CD pipelines, and release management.

**Potential topics:**
- Build process
- Environment management
- Release versioning (semantic versioning)
- Rollback procedures
- Deployment checklist

#### 📚 Documentation Guidelines
Standards for writing documentation, JSDoc comments, README files, and API documentation.

**Potential topics:**
- Component documentation structure
- Props documentation format
- Usage examples
- Do's and Don'ts
- Migration guides

#### 🌿 Git Workflow Guidelines
Standards for branch naming, commit messages, PR descriptions, and merge strategies.

**Potential topics:**
- Branch naming conventions
- Commit message format (conventional commits)
- PR template and description
- Code review workflow
- Merge vs squash vs rebase

#### 🔒 Security Guidelines
Security best practices for frontend development, API integration, and data handling.

**Potential topics:**
- XSS prevention
- CSRF protection
- Secure authentication/authorization
- Secrets management
- Dependency security (npm audit)

#### ♿ Accessibility Guidelines
Dedicated accessibility guidelines beyond code review (design, content, patterns).

**Potential topics:**
- WCAG 2.1 AA/AAA standards
- ARIA patterns by component type
- Keyboard navigation patterns
- Screen reader testing procedures
- Color contrast requirements

---

## 🏗️ Guidelines Structure

Each guideline file should follow this structure:

```markdown
# [Guideline Name]

Brief description of what this guideline covers.

---

## Overview
High-level summary

## Standards/Requirements
Detailed requirements organized by category

## Examples
Good and bad examples

## Tools & Testing
Tools to validate compliance

## References
External resources and documentation
```

---

## 📝 How to Use Guidelines

### For CLI Commands
Reference guidelines in your command file:
```markdown
Follow the comprehensive guidelines in `.claude/guidelines/[guideline-name].md`
```

### For GitHub Workflows
Reference guidelines in your workflow prompt:
```yaml
prompt: |
  1. Read the guidelines from `.claude/guidelines/[guideline-name].md`
  2. Apply the standards defined in the guidelines
  ...
```

### For Team Members
Read guidelines to understand project standards:
```bash
# View all available guidelines
cat .claude/GUIDELINES.md

# Read specific guideline
cat .claude/guidelines/code-review.md
```

---

## ✏️ Adding New Guidelines

When creating a new guideline:

1. **Create file** in `.claude/guidelines/[name].md`
2. **Follow structure** outlined above
3. **Update this index** (GUIDELINES.md) with:
   - Title and link
   - Brief description
   - What it covers
   - Where it's used
4. **Update commands/workflows** to reference the new guideline
5. **Document usage** in command files

---

## 🔄 Maintaining Guidelines

- **Single source of truth:** All commands and workflows reference these files
- **Update in one place:** Changes propagate to all consumers automatically
- **Version control:** Guidelines are tracked in git with the codebase
- **Team collaboration:** Guidelines evolve with team input via PRs

---

**Last Updated:** 2026-01-10
**Maintained By:** Tech Lead & Team
