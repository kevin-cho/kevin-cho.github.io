# Plan 02: Switch kevincho.ca to the new site on Vercel

**Status:** In progress (Step 1) · **Branch:** `next-rewrite` → `master` · **Started:** 2026-10-30

## Context
Plan 01 built the new Next.js site on the `next-rewrite` branch and deployed it as a Vercel preview. `kevincho.ca` still serves the old site from `master` via GitHub Pages. This plan makes the new site live on `kevincho.ca`, merges it into `master`, and retires GitHub Pages — with **no downtime** and without breaking the domain's email.

### Current setup (checked 2026-10-30 with `dig` and `whois`)
| Item | Value |
|---|---|
| Registrar | GoDaddy (Go Daddy Domains Canada); domain registered until **2027-03-23** |
| DNS host | GoDaddy (`ns63`/`ns64.domaincontrol.com`) |
| `kevincho.ca` (A) | `185.199.108.153`, `185.199.109.153`, `185.199.110.153`, `185.199.111.153` (GitHub Pages) |
| `www.kevincho.ca` (CNAME) | `kevin-cho.github.io` |
| Email (MX) | `mailstore1.secureserver.net`, `smtp.secureserver.net` (GoDaddy email) — **must not be touched** |
| Vercel project | `kevincho-portal` (team `kevin-cho`); production branch `master`; branch preview at `kevincho-portal-git-next-rewrite-kevin-cho.vercel.app` |

### Decisions
| Decision | Choice | Why |
|---|---|---|
| Main address | **`kevincho.ca`**, with `www.kevincho.ca` redirecting to it | Matches how the site works today. |
| Order of changes | Make the new site Vercel's production deployment **first**, then add the domain, then move DNS, then retire GitHub Pages, then merge | At every moment `kevincho.ca` serves either the old site or the new one, never an error. Merging into `master` first would make GitHub Pages rebuild from Next.js source code and break the live site until DNS moved. |
| DNS host | Stay on GoDaddy; change only the website records | Moving DNS to Vercel would also mean moving the email records; not needed. |

**Rollback at any point:** put the GitHub Pages records back (the four A records and the `www` CNAME in the table above) and re-enable GitHub Pages.

Each step is reviewed and approved on its own before it's carried out. Steps marked **Kevin** are done in his own accounts (Vercel, GoDaddy, GitHub settings); Claude gives exact instructions and verifies the results.

---

## Step 1: Make the new site Vercel's production deployment ⏳ In progress
- **Requirement:** the Vercel project's production deployment is the new site, viewable at its public `*.vercel.app` address.
- **Why:** The domain will point at the *production* deployment, which today is the failed `master` build. Previews are behind Vercel login; production isn't.
- **How:** Kevin, in Vercel: project `kevincho-portal` → **Settings** → find the **production branch** setting (under Git / Environments → Production) → change `master` to `next-rewrite` → save. Changing the setting doesn't deploy anything by itself, so Claude then commits this plan doc and pushes `next-rewrite`, which triggers a production build of the new site.
- **Verify (Claude):** open the production address (e.g. `kevincho-portal.vercel.app`) in the browser without logging in; same checks as Plan 01 Step 7.

## Step 2: Add the domains in Vercel
- **Requirement:** `kevincho.ca` and `www.kevincho.ca` are attached to the project, `www` set to redirect to `kevincho.ca`.
- **Why:** Vercel needs to know which project answers for the domain before DNS points at it; it then tells us exactly which DNS records to set.
- **How (Kevin, in Vercel):** **Settings → Domains** → add `kevincho.ca`. Vercel will offer to add `www.kevincho.ca` too, redirecting to `kevincho.ca` — accept. Both will show "Invalid Configuration" until Step 3; that's expected. Copy the DNS records Vercel shows (an **A** record for `kevincho.ca`, a **CNAME** for `www`) and share them.
- **Verify (Claude):** compare Vercel's records against the current DNS before anything changes.

## Step 3: Point DNS at Vercel (GoDaddy)
- **Requirement:** `kevincho.ca` and `www` resolve to Vercel; email records unchanged.
- **Why:** This is the actual switch. Visitors move over gradually as DNS caches expire (up to ~1 hour with GoDaddy's default TTL); during that time some see the old site, some the new — both work.
- **How (Kevin, in GoDaddy → My Products → kevincho.ca → DNS):**
  - Type **A**, name **@**: delete the four `185.199.x.153` records, add the one A record from Vercel.
  - Type **CNAME**, name **www**: change `kevin-cho.github.io` to the value from Vercel.
  - **Leave MX, NS, and anything else untouched.**
- **Verify (Claude):** `dig` shows the new records (and MX unchanged); Vercel shows the domains as "Valid" and issues HTTPS certificates; `https://kevincho.ca` serves the new site; `www.kevincho.ca` redirects to it.

## Step 4: Turn off GitHub Pages
- **Requirement:** GitHub no longer publishes the repo as a website.
- **Why:** Once DNS points to Vercel, Pages is unused; leaving it on would publish the repo again after the merge and keep a stale custom-domain setting.
- **How (Kevin, in GitHub):** repo **Settings → Pages** → remove the custom domain if one is shown, and set the source to **None** / unpublish.
- **Verify (Claude):** `kevin-cho.github.io` no longer serves the site; `kevincho.ca` still serves the new one.

## Step 5: Merge `next-rewrite` into `master`
- **Requirement:** `master` contains the new site; Vercel's production branch is `master` again.
- **Why:** Keeps `master` as the main branch, so future work branches from it and production follows it.
- **How:** Claude opens a pull request `next-rewrite` → `master` (with Kevin's OK); Kevin reviews and merges it on GitHub. Then (Kevin, in Vercel) set the production branch back to `master`, and confirm a production deployment from `master` succeeds.
- **Verify (Claude):** `kevincho.ca` still serves the new site from the `master` deployment.

## Step 6: Clean up
- Delete the `next-rewrite` branch (local and GitHub) once merged.
- Update `README.md`, Plan 01's "Later plans", and this plan's status.
- **Decision for Kevin:** keep the repo name `kevin-cho.github.io` or rename it (e.g. `kevincho.ca`); the name no longer means anything once Pages is off. Renaming is safe — GitHub redirects the old URL, and Vercel follows the rename — but optional.

---

## Verification (end of this plan)
- `https://kevincho.ca` shows the new site with a valid HTTPS certificate; `https://www.kevincho.ca` redirects to it.
- Email to the domain still works (MX records unchanged).
- GitHub Pages is off; `master` contains the new site; Vercel deploys production from `master`.

## Change log
- **2026-10-30** — Plan created after checking current DNS (GoDaddy, GitHub Pages records, GoDaddy email MX).
- **2026-10-31** — Plan approved; Step 1 started. Step 1 now triggers the production build by pushing this plan doc instead of a manual redeploy.
