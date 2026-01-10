---
allowed-tools: Bash(git status:*), Bash(git diff:*), Bash(git log:*), Bash(git add:*), Bash(git commit:*)
description: Generate commit message based on changed files
---

## Context

Current git status:
!git status

Staged changes:
!git diff --staged

Unstaged changes:
!git diff

Recent commits for style reference:
!git log --oneline -5

## Task

Analyze the changes and generate a conventional commit message.

Rules:
- Use format: type(scope?): subject
- Types: feat, fix, docs, style, refactor, test, chore, perf, ci, build
- Subject max 72 characters, lowercase, no period
- If user provides hint via arguments, incorporate it into the message

User hint: $ARGUMENTS
