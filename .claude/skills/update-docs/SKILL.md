---
name: update-docs
description: Update this repo's README documentation (root and any relevant subfolder) and append a Changelog entry after making code changes. Use after implementing a feature, fix, refactor, or architecture decision — or whenever asked to update docs/changelog/README.
---

# Update docs

This repo keeps documentation deliberately small: one root `README.md` (with a
Changelog section) plus a subfolder `README.md` only where a folder's workflow
genuinely doesn't fit at the root (currently just `apps/extension`). This
skill keeps that documentation in sync with the code as it changes.

## Steps

1. **Figure out what actually changed.** Look at the diff for the current
   work (`git status` / `git diff`, or the changes made earlier this
   session). Identify: what was added/changed/removed, why, and any
   trade-offs or decisions made along the way.

2. **Update affected README(s).** For each README whose documented setup,
   structure, usage, or command list is now stale:
   - Root `README.md` — structure diagram, tech stack, getting-started
     commands, or package/app overviews.
   - `apps/extension/README.md` — anything about the extension's setup,
     permissions, build, or usage.
   Edit in place; keep the same concise style already used in these files
   (short sections, tables where they help scanning, no exhaustive
   file-by-file API dumps).

3. **Decide if a new subfolder README is warranted.** Only add one if the
   folder now has a distinct enough workflow (its own build/run/permission
   steps) that the root README can't reasonably cover it. Default to *not*
   adding one — fold the information into the root README instead. If you
   do add one, link to it from the root README's structure/overview section.

4. **Append a Changelog entry** to the bottom of the root `README.md`'s
   `## Changelog` section, newest entry first:
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

5. **Don't let `.md` files sprawl.** Never recreate the old pattern of many
   loosely-scoped root docs. If content doesn't clearly belong in the root
   README or the one extension README, it probably belongs in a code
   comment, a PR description, or nowhere — not a new file.

## When to run this

- Proactively, as part of finishing any non-trivial change (see `CLAUDE.md`).
- When explicitly asked to "update the docs," "update the changelog," or
  similar.
