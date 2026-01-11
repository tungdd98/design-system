---
allowed-tools: Bash(git status:*), Bash(git diff:*), Bash(git log:*), Bash(git branch:*)
description: Generate PR title and description based on changes
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

Generate a Pull Request title and description based on the changes above.

IMPORTANT: Only generate and display the title and description for the user to copy. Do NOT create the actual PR or ask to create it.

### Title Format

Use conventional format: `type: brief description`

- Types: feat, fix, docs, style, refactor, test, chore, perf, ci, build
- Keep under 72 characters
- Use imperative mood (e.g., "add" not "added")

### Description Template

Generate description following this structure:

```markdown
## Summary

<!-- 2-3 sentences explaining what this PR does and why -->

## Type of Change

<!-- Check relevant options -->

- [ ] Bug fix (non-breaking change that fixes an issue)
- [ ] New feature (non-breaking change that adds functionality)
- [ ] Breaking change (fix or feature that would cause existing functionality to change)
- [ ] Documentation update
- [ ] Refactoring (no functional changes)
- [ ] Build/CI changes

## Changes Made

<!-- Bullet list of specific changes -->

## How to Test

<!-- Steps to test the changes -->

1.
2.
3.

## Checklist

- [ ] My code follows the project's style guidelines
- [ ] I have performed a self-review of my code
- [ ] I have added tests that prove my fix/feature works
- [ ] New and existing tests pass locally
```

If user provides context via arguments, incorporate it into the summary.

User context: $ARGUMENTS
