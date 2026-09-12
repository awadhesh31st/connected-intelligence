# Working in this repo

## Documentation policy

- `README.md` at the repo root is the single source of truth for repo-wide documentation, including the **Changelog** section at the bottom of it.
- A subfolder gets its own `README.md` only when it has a genuinely different workflow the root can't reasonably cover (e.g. `apps/extension`, which has Chrome-specific build/load/permissions steps). Don't add a README per package by default — most of `packages/*` is adequately covered by the root README's overview.
- Keep the number of `.md` files small. Before adding a new one, check whether the content actually belongs in an existing README instead.

## Keep docs current

Whenever you make a non-trivial change — a new feature, an architecture decision, a dependency swap, a notable bug fix, a merge that resolves a real conflict — update the documentation as part of that same piece of work, not as a follow-up someone has to remember to ask for:

1. Update whichever `README.md`(s) the change actually affects (setup steps, structure, usage).
2. Append a dated entry to the **Changelog** section of the root `README.md`: what changed, why, and any trade-offs worth remembering later. Keep entries to a few bullet points — this is a record for future readers (human or AI), not a essay.
3. Use the `update-docs` skill (`.claude/skills/update-docs/`) when you want a structured pass over all the docs after a larger change; for a single focused change, just do steps 1–2 directly.

This is what keeps the documentation an accurate, complete record of the project's history without the user needing to ask for a docs update every time.
