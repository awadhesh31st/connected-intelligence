---
name: update-docs
description: Update this repo's README documentation (root and any relevant subfolder) and append a CHANGELOG.md entry after making code changes. Use after implementing a feature, fix, refactor, or architecture decision — or whenever asked to update docs/changelog/README.
---

# Update docs

This repo keeps documentation deliberately small and separated by purpose:

- Root `README.md` — a **pure overview**: what the repo is, its structure/routes,
  and its tech stack. No implementation notes, walkthroughs, or history.
- Root `CHANGELOG.md` — the running history of what changed, why, and any
  trade-offs, newest first.
- A subfolder `README.md` only where a folder's workflow genuinely doesn't fit
  at the root (currently just `apps/extension`).

This skill keeps that documentation in sync with the code as it changes.

## Steps

1. **Figure out what actually changed.** Look at the diff for the current
   work (`git status` / `git diff`, or the changes made earlier this
   session). Identify: what was added/changed/removed, why, and any
   trade-offs or decisions made along the way.

2. **Update the root `README.md` only if the overview itself is now stale** —
   i.e. the structure diagram, routes table, or tech stack changed. Do not
   add implementation notes, usage examples, or history to it; those don't
   belong there.

3. **Update `apps/extension/README.md`** (or another subfolder README, if one
   exists) when its documented setup, permissions, build, or usage changed.

4. **Decide if a new subfolder README is warranted.** Only add one if the
   folder now has a distinct enough workflow (its own build/run/permission
   steps) that the root README can't reasonably cover it. Default to *not*
   adding one.

5. **Append a `CHANGELOG.md` entry**, newest entry first:
   ```
   ### YYYY-MM-DD — <short title>

   - What changed, in a few bullet points.
   - Why (the reasoning/decision), if not obvious from "what".
   - Any trade-offs, known follow-ups, or things intentionally left out.
   ```
   Use today's date. Keep it factual and brief — this is a durable record
   for future readers (human or AI) to reconstruct the project's history
   and reasoning without re-deriving it, not a full commit log (git already
   has that).

6. **Don't let `.md` files sprawl.** Never recreate the old pattern of many
   loosely-scoped root docs. If content doesn't clearly belong in the root
   README, `CHANGELOG.md`, or the one extension README, it probably belongs
   in a code comment, a PR description, or nowhere — not a new file.

## When to run this

- Proactively, as part of finishing any non-trivial change (see `CLAUDE.md`).
- When explicitly asked to "update the docs," "update the changelog," or
  similar.
