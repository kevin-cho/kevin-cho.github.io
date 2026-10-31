# Plan 02: Switch kevincho.ca to the new site on Vercel

**Status:** ✅ Done (2026-10-31) — **new site is live on kevincho.ca** · **Branch:** `master` (merged from `next-rewrite`) · **Started:** 2026-10-30

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
| Main address | **`kevincho.ca`**, with `www.kevincho.ca` redirecting to it | Matches how the site works today and is shorter. Vercel recommends `www` as the main address (a `www` CNAME lets Vercel reroute without DNS edits, and keeps cookies off the bare domain; GoDaddy can't "flatten" a CNAME at the bare domain), but an A record for `kevincho.ca` is supported and reliable, and apps at paths make the cookie point minor. Considered and declined 2026-10-31. |
| Order of changes | Make the new site Vercel's production deployment **first**, then add the domain, then move DNS, then retire GitHub Pages, then merge | At every moment `kevincho.ca` serves either the old site or the new one, never an error. Merging into `master` first would make GitHub Pages rebuild from Next.js source code and break the live site until DNS moved. |
| DNS host | Stay on GoDaddy; change only the website records | Moving DNS to Vercel would also mean moving the email records; not needed. |

**Rollback at any point:** put the GitHub Pages records back (the four A records and the `www` CNAME in the table above) and re-enable GitHub Pages.

Each step is reviewed and approved on its own before it's carried out. Steps marked **Kevin** are done in his own accounts (Vercel, GoDaddy, GitHub settings); Claude gives exact instructions and verifies the results.

---

## Step 1: Make the new site Vercel's production deployment ✅ Done (commit `12e8243`)
- **Requirement:** the Vercel project's production deployment is the new site, viewable at its public `*.vercel.app` address.
- **Why:** The domain will point at the *production* deployment, which today is the failed `master` build. Previews are behind Vercel login; production isn't.
- **How:** Kevin, in Vercel: project `kevincho-portal` → **Settings** → find the **production branch** setting (under Git / Environments → Production) → change `master` to `next-rewrite` → save. Changing the setting doesn't deploy anything by itself, so Claude then commits this plan doc and pushes `next-rewrite`, which triggers a production build of the new site.
- **Verify (Claude):** open the production address (e.g. `kevincho-portal.vercel.app`) in the browser without logging in; same checks as Plan 01 Step 7.
- **Result (2026-10-31):** Kevin set the production branch to `next-rewrite` (skipped Vercel's "redeploy" prompt, which would have rebuilt the old failed `master` deployment). Pushing `12e8243` built production successfully. `https://kevincho-portal.vercel.app` (public, no login) serves the new site: title, description, tagline, Poppins, photo, icons, all four links, resume PDF (HTTP 200), theme script; no console errors.

## Step 2: Add the domains in Vercel ✅ Done
- **Requirement:** `kevincho.ca` and `www.kevincho.ca` are attached to the project, `www` set to redirect to `kevincho.ca`.
- **Why:** Vercel needs to know which project answers for the domain before DNS points at it; it then tells us exactly which DNS records to set.
- **How (Kevin, in Vercel):** **Settings → Domains** → add `kevincho.ca`. Vercel will offer to add `www.kevincho.ca` too, redirecting to `kevincho.ca` — accept. Both will show "Invalid Configuration" until Step 3; that's expected. Copy the DNS records Vercel shows (an **A** record for `kevincho.ca`, a **CNAME** for `www`) and share them.
- **Verify (Claude):** compare Vercel's records against the current DNS before anything changes.
- **Result (2026-10-31):** In Vercel (project → Networking → Domains): `kevincho.ca` connected to Production with "Redirect apex domain to www" left off; `www.kevincho.ca` set to redirect to `kevincho.ca`. Vercel's records: **A `@` → `216.198.79.1`** and **CNAME `www` → `a86240f6841ce499.vercel-dns-017.com.`** (project-specific). Checked: the IP belongs to Vercel, Inc. and the CNAME resolves to Vercel addresses. Current records have a 1-hour TTL, so the switch reaches everyone within about an hour.

## Step 3: Point DNS at Vercel (GoDaddy) ✅ Done
- **Requirement:** `kevincho.ca` and `www` resolve to Vercel; email records unchanged.
- **Why:** This is the actual switch. Visitors move over gradually as DNS caches expire (up to ~1 hour with GoDaddy's default TTL); during that time some see the old site, some the new — both work.
- **How (Kevin, in GoDaddy → My Products → kevincho.ca → DNS):**
  - Type **A**, name **@**: delete the four `185.199.x.153` records, add the one A record from Vercel.
  - Type **CNAME**, name **www**: change `kevin-cho.github.io` to the value from Vercel.
  - **Leave MX, NS, and anything else untouched.**
- **Verify (Claude):** `dig` shows the new records (and MX unchanged); Vercel shows the domains as "Valid" and issues HTTPS certificates; `https://kevincho.ca` serves the new site; `www.kevincho.ca` redirects to it.
- **Result (2026-10-31):** Kevin edited one `@` A record to `216.198.79.1`, deleted the other three, and pointed the `www` CNAME at `a86240f6841ce499.vercel-dns-017.com`. Checked via GoDaddy's nameserver, Google (8.8.8.8), and Cloudflare (1.1.1.1): new records everywhere; **MX unchanged**. Vercel issued Let's Encrypt certificates (`www` first; `kevincho.ca` about 6 minutes later, briefly inconsistent across Vercel's servers, then stable 8/8). `https://kevincho.ca` from Vercel serves the new site; `http://kevincho.ca` and `https://www.kevincho.ca` redirect (308) to `https://kevincho.ca/`. This Mac still had GitHub's address cached (1-hour TTL), so it showed the old site until the cache expired — expected.

## Step 4: Turn off GitHub Pages ✅ Done
- **Requirement:** GitHub no longer publishes the repo as a website.
- **Why:** Once DNS points to Vercel, Pages is unused; leaving it on would publish the repo again after the merge and keep a stale custom-domain setting.
- **How (Kevin, in GitHub):** repo **Settings → Pages** → remove the custom domain if one is shown, and set the source to **None** / unpublish.
- **Verify (Claude):** `kevin-cho.github.io` no longer serves the site; `kevincho.ca` still serves the new one.
- **Result (2026-10-31):** Kevin removed the custom domain and unpublished Pages in the repo settings. GitHub now returns 404 for `kevin-cho.github.io` and for `kevincho.ca` on its servers; Vercel returns 200. This Mac still had GitHub's addresses cached, so it showed the 404 until the cache was flushed (`sudo dscacheutil -flushcache; sudo killall -HUP mDNSResponder`) or expired.
- **Follow-up (2026-10-31):** "Unpublish site" only took the site offline; Pages stayed enabled with `master` as its source, so every push started a failing "pages build and deployment" run (and a failure email). Kevin set **Build and deployment → Branch** to **None**; GitHub now reports `has_pages: false`. Lesson: to fully turn off Pages, set the branch to None, not just unpublish.

## Step 5: Merge `next-rewrite` into `master` ✅ Done (PR #15, merge `4d0f078`)
- **Requirement:** `master` contains the new site; Vercel's production branch is `master` again.
- **Why:** Keeps `master` as the main branch, so future work branches from it and production follows it.
- **How:** Claude opens a pull request `next-rewrite` → `master` (with Kevin's OK); Kevin reviews and merges it on GitHub. Then (Kevin, in Vercel) set the production branch back to `master`, and confirm a production deployment from `master` succeeds.
- **Verify (Claude):** `kevincho.ca` still serves the new site from the `master` deployment.
- **Result (2026-10-31):** `gh` isn't installed, so Claude prepared a prefilled GitHub "new pull request" link; Kevin opened PR #15 (`next-rewrite` → `master`), merged it (`4d0f078`), deleted `next-rewrite` on GitHub, and set Vercel's production branch back to `master`. `master` now matches `next-rewrite` exactly; GitHub had also added a "Delete CNAME" commit (`203a1a4`) to `master` when the Pages custom domain was removed. Claude deleted the local `next-rewrite` branch and pushed this plan update to `master` to trigger the production build.
- **Verified (2026-10-31):** pushing `c7a3d07` to `master` built production successfully. From Vercel, `https://kevincho.ca` serves the new site (200), the resume PDF loads (200), and `www` redirects (308) to `https://kevincho.ca/`.

## Step 6: Clean up ✅ Done
- ✅ Delete the `next-rewrite` branch (Kevin deleted it on GitHub; Claude deleted the local copy).
- ✅ Update Plan 01's "Later plans" (domain switch marked done). `README.md` already describes Vercel hosting, nothing to change.
- ✅ **Repo renamed (decided):** Kevin renamed the GitHub repo from `kevin-cho.github.io` to **`kevincho.ca`** (the old name only mattered for GitHub Pages; renaming also frees the `kevin-cho.github.io` user-site name for future use). GitHub redirects the old URL (checked: 301 → `github.com/kevin-cho/kevincho.ca`). Claude pointed the local `origin` remote at `git@github.com:kevin-cho/kevincho.ca.git`. The local folder keeps its old name. Older mentions of `kevin-cho.github.io` in these docs are left as history.

---

## Verification (end of this plan)
- `https://kevincho.ca` shows the new site with a valid HTTPS certificate; `https://www.kevincho.ca` redirects to it.
- Email to the domain still works (MX records unchanged).
- GitHub Pages is off; `master` contains the new site; Vercel deploys production from `master`.

## Change log
- **2026-10-30** — Plan created after checking current DNS (GoDaddy, GitHub Pages records, GoDaddy email MX).
- **2026-10-31** — Plan approved; Step 1 started. Step 1 now triggers the production build by pushing this plan doc instead of a manual redeploy.
- **2026-10-31** — Step 1 done: new site is Vercel production at kevincho-portal.vercel.app.
- **2026-10-31** — Step 2: confirmed `kevincho.ca` (not `www`) as the main address after weighing Vercel's `www` recommendation.
- **2026-10-31** — Step 2 done: domains added in Vercel; got and checked Vercel's DNS records.
- **2026-10-31** — Step 3 done: DNS moved to Vercel; HTTPS issued; kevincho.ca serves the new site (email records untouched).
- **2026-10-31** — Step 4: Kevin chose to turn off GitHub Pages right away rather than waiting out the 1-hour DNS cache (accepting that visitors with a stale cache may briefly see a GitHub 404).
- **2026-10-31** — Step 4: `kevincho.ca` was also removed from GitHub's *account-level* verified domains (github.com/settings/pages). Harmless: verification only stops other GitHub users from attaching the domain to their Pages sites, which requires DNS pointing at GitHub, and DNS now points at Vercel. Re-adding it later would need a GitHub TXT record in GoDaddy DNS; not needed.
- **2026-10-31** — Step 4 done: GitHub Pages turned off.
- **2026-10-31** — Step 5 done: merged via PR #15; Vercel production follows `master` again.
- **2026-10-31** — Step 6 done: repo renamed to `kevincho.ca`; local remote updated. Plan 02 complete.
- **2026-10-31** — Follow-up: GitHub Pages fully disabled (branch set to None) to stop failing Pages builds after each push.
