# TatulBuilds Portfolio

Single-page portfolio/CV site for Tatul Ghazaryan (TatulBuilds) — n8n automation & AI-assisted web development. Built with React + Vite + TypeScript + Tailwind CSS.

## Getting started

```bash
npm install
npm run dev      # local dev server
npm run build    # production build
npm run lint      # oxlint
```

## Placeholders to replace before going live

| What | Where | Notes |
|---|---|---|
| Project links | `src/i18n/projects.ts` | "Instant" and "LVG Engineering" use `#` placeholder links (`isPlaceholderLink: true`). |
| Project images | Not yet added — cards are currently text-only, styled to the site's palette. Add images and update `Projects.tsx` when ready. |
| Contact form backend | `api/contact.ts` (Vercel Edge Function, sends via [Resend](https://resend.com)) | Requires env vars `RESEND_API_KEY`, `CONTACT_TO_EMAIL`, `CONTACT_FROM_EMAIL` (the `FROM` address must be on a domain verified in Resend). Set these in the Vercel project settings before going live. Local `vite dev` won't hit `/api/*` — use `vercel dev` to test the form locally. |
| SEO domain | `index.html` (canonical/OG/Twitter URLs, JSON-LD), `public/robots.txt`, `public/sitemap.xml` | All currently point to the placeholder `https://tatulai-portfolio.vercel.app/`. Update to the real production domain once one is finalized. |
| Social preview image | `index.html` (`og:image`/`twitter:image`) | Currently reuses `logo.png`. Replace with a dedicated 1200×630 image for a proper link-preview card. |

## Translations

All copy lives in `src/i18n/translations.ts` (`en`, `sk`, `am`). The Slovak and Armenian translations were machine-drafted for a natural, professional tone — worth a native-speaker pass before launch.

## Deployment

Ready to deploy to Vercel: `vercel` or connect the repo via the Vercel dashboard. Set `RESEND_API_KEY`, `CONTACT_TO_EMAIL`, and `CONTACT_FROM_EMAIL` in the project's environment variables for the contact form to work (see table above).
