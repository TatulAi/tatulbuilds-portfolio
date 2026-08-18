# CLAUDE.md

Guidance for Claude Code (or any future session) working in this repository.

## Project

Single-page portfolio/CV site for Tatul Ghazaryan (TatulBuilds) — n8n automation & modern web development. React + Vite + TypeScript + Tailwind CSS v4. See `README.md` for setup, placeholders still pending, and deployment instructions.

## Commands

```bash
npm run dev      # local dev server (does NOT serve /api/* — see api/contact.ts below)
npm run build    # tsc -b && vite build
npm run lint      # oxlint
npm run preview  # preview the production build
```

## Architecture

- `src/components/` — feature components: `Header`, `Hero`, `About`, `Skills`, `Certifications`, `Projects`, `Contact`, `Footer`, `ThemeToggle`, `LanguageSwitcher`, plus shared `Reveal` (scroll-in animation) and `SectionHeading`.
- `src/components/ui/` — reusable low-level primitives (shadcn-style convention, no shadcn CLI actually installed — see Styling below).
  - `glow-card.tsx` — in active use. Wraps a card `<div>`, tracks cursor angle, drives a `--rotation` CSS var consumed by the `.border-glow` class in `index.css` to sweep an accent-colored ring around the border on hover. Used by `Projects.tsx` and `Certifications.tsx`.
  - `info-card.tsx` — **unused leftover** from an earlier experiment (a heavier neon-bordered card component with its own image/title/description layout). Not imported anywhere. Safe to delete, or repurpose if a fuller card treatment is wanted later.
- `src/context/` — `ThemeContext` (light/dark; sets `data-theme` on `<html>`; persisted to `localStorage` under `tatulbuilds-theme`) and `LanguageContext` (en/sk/am).
- `src/i18n/` — `translations.ts` (all UI copy for `en`/`sk`/`am`), `projects.ts`, `certifications.ts` (typed metadata arrays rendered by their respective components).
- `src/hooks/` — `useScrollReveal`, `useScrollSpy`.
- `api/contact.ts` — Vercel **Edge Function** backing the contact form, sends mail via Resend's REST API (no SDK dependency). Requires env vars `RESEND_API_KEY`, `CONTACT_TO_EMAIL`, `CONTACT_FROM_EMAIL` (set in Vercel project settings). Local `vite dev` does not route `/api/*` — use `vercel dev` to test the form end-to-end.

## Styling conventions

- Tailwind v4, **CSS-first config** — all of it lives in `src/index.css` via `@import "tailwindcss"` and an `@theme { }` block. There is no `tailwind.config.js`.
- Theme tokens are CSS custom properties on `:root` (`--bg`, `--text`, `--accent`, `--border`, `--surface`, etc.), mapped into Tailwind utilities through `@theme { --color-x: var(--x) }`. Use the resulting Tailwind classes (`bg-surface`, `text-accent`, `border-border`, …) rather than raw `var(--x)` in component code.
- **Dark mode is not class-based.** This project does not use shadcn/Tailwind's default `.dark` class toggle. It uses `:root[data-theme="dark"]` (explicit user toggle, set by `ThemeContext`) plus a `prefers-color-scheme` media query guarded by `:not([data-theme="light"])` for the system-default case. Any new component or copy-pasted snippet that assumes a `.dark` class selector needs to be adapted to this pattern.
- Path alias `@/` → `./src` is configured in `vite.config.ts` (`resolve.alias`) and `tsconfig.app.json` (`paths`). Added for shadcn-style component drops; existing app code currently uses relative imports instead.

## Known open items

See `README.md`'s placeholder table — currently: two placeholder project links (Instant, LVG Engineering), project/hero images, and a native-speaker pass on the Slovak/Armenian translations.
