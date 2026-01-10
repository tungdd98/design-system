---
allowed-tools: Bash(gh pr:*), Bash(git diff:*)
description: Review a Pull Request and provide feedback
---

## Context

PR details:
!gh pr view $ARGUMENTS --json title,body,files,additions,deletions,author,baseRefName,headRefName

PR diff:
!gh pr diff $ARGUMENTS

## Task

Review this Pull Request thoroughly and provide feedback in English.

### Review Checklist

1. **Code Quality**
   - Clean, readable code
   - Follows project conventions
   - No code smells or anti-patterns

2. **Logic & Correctness**
   - No bugs or logical errors
   - Edge cases handled
   - Error handling in place

3. **Security**
   - No XSS, SQL injection, or command injection
   - Sensitive data properly handled
   - No hardcoded secrets

4. **Performance**
   - No obvious performance issues
   - Efficient algorithms
   - No memory leaks

5. **Tests**
   - Adequate test coverage
   - Tests are meaningful

6. **Documentation**
   - Code is self-documenting
   - Complex logic has comments

### Output Format

```markdown
## PR Review: [PR Title]

**Author:** [author]
**Branch:** [head] → [base]
**Changes:** +[additions] -[deletions] in [file count] files

---

### Summary
[2-3 sentences explaining what this PR does]

### Verdict: [APPROVE ✅ | REQUEST_CHANGES 🔴 | COMMENT 💬]

---

### What's Good
- [Positive point 1]
- [Positive point 2]

### Issues Found
- [ ] **[Critical]** [Issue description and fix suggestion]
- [ ] **[Major]** [Issue description and fix suggestion]
- [ ] **[Minor]** [Issue description and fix suggestion]

### Suggestions
- [Optional improvement 1]
- [Optional improvement 2]

---
*Reviewed by Claude*
```
