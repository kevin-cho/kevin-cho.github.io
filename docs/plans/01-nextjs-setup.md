# Plan 01: Set up a new Next.js + TypeScript site

**Status:** In progress (Steps 1–2 done) · **Branch:** `next-rewrite` · **Started:** 2026-10-30

## Context
The current site (`kevincho.ca`) is a single jQuery/fullPage.js `index.html` hosted on GitHub Pages. Kevin wants to start fresh with React + TypeScript and later deploy products **that need a backend** (logins, saved data, secret API keys), hosted on **Vercel**.

Future products will each live in **their own repo**, deployed as separate Vercel projects on **subdomains** of `kevincho.ca` (e.g. `todo.kevincho.ca`); this site is the portal that links to them.

### Decisions
| Decision | Choice | Why |
|---|---|---|
| Framework | **Next.js (App Router) + TypeScript** | React + TypeScript with server features (API routes, server rendering) built in. Vite was simpler but would need a separate backend for anything server-side. |
| Hosting | **Vercel** | Made by the Next.js team; zero-config deploys from GitHub; free tier covers a personal site. GitHub Pages can't run server code. |
| Future products | **Separate repos on subdomains** | Each product deploys and evolves independently, in any framework; the portal only links to them. |
| Node version manager | **nvm** | Kevin already knows it; most widely used. |
| Styling | **Tailwind CSS** (pending confirmation in Step 3) | Widely used with Next.js; easy to change later. |

**Scope:** only a working, deployed skeleton. Design, content, and the domain switch-over are later plans. The old site stays live on GitHub Pages throughout.

Each step is reviewed and approved on its own before it's implemented.

---

## Step 1: Upgrade Node.js ✅ Done
- **Requirement:** Node 24 LTS on this Mac (was v18.17).
- **Why:** Current Next.js needs a newer Node; 18 is end-of-life.
- **How:** Installed nvm v0.40.8 via its official install script, then `nvm install 24 && nvm alias default 24`. Result: Node v24.22.2, npm 11.19.1.

## Step 2: New branch, clear out the old site ✅ Done (commit `1690696`, pushed)
- **Requirement:** a `next-rewrite` branch with old site files removed and keepers saved.
- **Why:** Keeps `master` (and the live site) untouched until the new site is ready; git history keeps the old site recoverable.
- **How:**
  - Created `next-rewrite`; added `.nvmrc` (`24`).
  - Removed: `index.html`, `css/`, `js/` (incl. dead Universal Analytics script), `.DS_Store`, `CNAME`, `images/kevin-cartoon.png`.
  - Kept: `assets/kevin-cho-resume.pdf` (replaced with updated resume), `images/kevin.png`, `images/icons/favicon.png`, `README.md`.
  - Kept the `mario-item-block` submodule to port later (not initialized locally; run `git submodule update --init` to download it).

## Step 3: Scaffold the Next.js app ⏳ Next
- **Requirement:** a running Next.js + TypeScript app in the repo root.
- **Why:** `create-next-app` is the official starter; it configures TypeScript, linting, and the build correctly.
- **How:** `create-next-app@latest` with TypeScript, ESLint, App Router, `src/` directory, `@/*` import alias, Turbopack, and Tailwind CSS. If it refuses the non-empty folder, generate in a temp folder and move files in. Add `.DS_Store` to `.gitignore`. `npm install`, then start the dev server to confirm the starter page loads.

## Step 4: Move kept assets and add a placeholder home page
- **Requirement:** a minimal home page with name, photo, and links (LinkedIn, email, GitHub, resume).
- **Why:** Proves the setup end-to-end with real content, without starting design work.
- **How:** Move kept files into `public/` (e.g. `public/kevin-cho-resume.pdf`, `public/images/…`), set the favicon, replace the starter `src/app/page.tsx`, and set title/description in `src/app/layout.tsx` metadata.

## Step 5: Add a product list for future products
- **Requirement:** one place in the portal that lists products and links to them.
- **Why:** Products live in their own repos on subdomains, so the portal only needs each product's name, description, and URL. One typed data file means adding a product = adding one entry.
- **How:** `src/data/products.ts` exporting a typed `Product[]` (`name`, `description`, `url`), starting empty; render it on `src/app/products/page.tsx` ("coming soon" while empty), linked from the home page. Rewrite `README.md` to explain the portal + subdomain setup.

## Step 6: Verify locally
- **Requirement:** dev server, production build, and linting all pass.
- **How:** `npm run dev` → check `http://localhost:3000` in the browser at desktop and mobile widths; then `npm run build` and `npm run lint` with no errors.

## Step 7: Commit and deploy a preview on Vercel
- **Requirement:** the new site live at a Vercel preview URL (not yet on `kevincho.ca`).
- **Why:** See it on the real host before touching the domain.
- **How:** Commit on `next-rewrite` (no Claude attribution) and push. Kevin signs in to vercel.com with GitHub and imports the repo; Vercel auto-detects Next.js and builds a preview for the branch.

---

## Later plans (not in this one)
- Design and content for the portal.
- Switch `kevincho.ca` DNS from GitHub Pages to Vercel, merge to `master`, turn off GitHub Pages.
- New analytics (e.g. Vercel Analytics) to replace the dead Google one.
- First product (new repo) + backend choices (database, auth), and its subdomain in Vercel/DNS.

## Verification (end of this plan)
- `npm run build` and `npm run lint` succeed.
- Home page renders at localhost and at the Vercel preview URL; links work; resume PDF opens.
- `kevincho.ca` still shows the old site.

---

## Change log
- **2026-10-29** — Plan created. Chose Next.js on Vercel after comparing Vite, Next.js, Astro, and React Router v7 (deciding factor: future products need a backend).
- **2026-10-29** — Products will live in separate repos on subdomains; Step 5 changed from a `products/` code folder to a product-list data file.
- **2026-10-30** — Step 1: switched from fnm to nvm (Kevin's preference). Done.
- **2026-10-30** — Step 2: kept the `mario-item-block` submodule; also removed `kevin-cartoon.png` and replaced the resume PDF. Committed and pushed.
- **2026-10-30** — Plan moved into the repo at `docs/plans/01-nextjs-setup.md` so it's version-controlled.
