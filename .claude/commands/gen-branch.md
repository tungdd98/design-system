---
allowed-tools: Bash(git checkout:*), Bash(git branch:*)
description: Generate branch name and checkout
argument-hint: <type> <description>
---

## Task

Generate a git branch name from the provided arguments and checkout to that branch.

Arguments: $ARGUMENTS

### Rules

1. Parse the first word as branch type (feat, fix, docs, style, refactor, test, chore, perf, ci, build)
2. Convert remaining words to kebab-case for the description
3. Format: `type/description-in-kebab-case`
4. Execute `git checkout -b <branch-name>` to create and switch to the new branch

### Examples

Input: `feat add dark mode`
Output branch: `feat/add-dark-mode`

Input: `fix button loading state`
Output branch: `fix/button-loading-state`

Input: `refactor cleanup utility functions`
Output branch: `refactor/cleanup-utility-functions`

### Steps

1. Validate the type is one of: feat, fix, docs, style, refactor, test, chore, perf, ci, build
2. If invalid type, ask user to provide valid type
3. Generate branch name
4. Run `git checkout -b <generated-branch-name>`
5. Confirm the new branch was created successfully
