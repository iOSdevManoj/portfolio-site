# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Repo location

The git repo root is `project/`, one level below the usual working directory (`Web/`). All commands below run from `project/`. The sibling `portfolio-ready-for-github.zip` is a stale snapshot — ignore it.

Live deployment: https://portfolio-site-roan-mu-47.vercel.app · remote: `github.com/iOSdevManoj/portfolio-site`

## Commands

```bash
npm run dev      # vite dev server
npm run build    # vite build (nitro, cloudflare target by default)
npm run preview  # serve the production build
npm run lint     # eslint (prettier runs as an eslint rule — lint fails on format drift)
npm run format   # prettier --write .
```

No test runner is configured. There is no `typecheck` script; use `npx tsc --noEmit` for type checking.

`package-lock.json` is the committed lockfile (npm), but `bunfig.toml` is also present and enforces a 24h `minimumReleaseAge` supply-chain guard with an explicit allowlist — do not add entries to `minimumReleaseAgeExcludes` without asking.

## Architecture

TanStack Start (SSR) + React 19 + Vite 8 + Tailwind v4, scaffolded from a Lovable template.

**Vite config is intentionally thin.** `vite.config.ts` wraps `@lovable.dev/vite-tanstack-config`, which already registers tanstackStart, viteReact, tailwindcss, tsConfigPaths, nitro, devtools, the `@` alias, and React/TanStack dedupe. Adding any of those manually breaks the app with duplicate plugins.

**Three entry points, layered for error handling:**
- `src/router.tsx` — `getRouter()` builds the router and injects a `QueryClient` into route context.
- `src/start.ts` — `createStart` with a request middleware that catches non-HTTP throws and returns a rendered error page.
- `src/server.ts` — the SSR entry (wired via `tanstackStart.server.entry` in vite config). It wraps `@tanstack/react-start/server-entry` and normalizes h3's swallowed 500s: h3 turns in-handler throws into a JSON `{"unhandled":true,"message":"HTTPError"}` response that no try/catch sees, so `src/lib/error-capture.ts` records the original error out-of-band (5s TTL) for `server.ts` to recover and log.

Client-side boundary errors flow to Lovable via `src/lib/lovable-error-reporting.ts` (`window.__lovableEvents`), called from the root `errorComponent`.

**Routing** is file-based under `src/routes/`. See `src/routes/README.md` for the conventions table — notably: no `src/pages/`, no `app/layout.tsx`, the only layout is `__root.tsx`, and `routeTree.gen.ts` is generated (never hand-edit; it's also prettier-ignored).

`__root.tsx` owns the HTML shell (`RootShell`), all SEO head tags, JSON-LD Person schema, Google Fonts links, and the 404 / error components.

**The site is a single page.** `src/routes/index.tsx` is the entire portfolio, organised as config → data → primitives → one `Home` component. To change copy, edit the data, not the JSX.

- **`CONTACT` / `AVAILABILITY` (top of file)** — the single source of truth for every link, address and the hero status pill. Links render conditionally: an empty string in `CONTACT` *hides* that button instead of emitting a dead `href="#"`. Keep it that way; the page should never ship a dead anchor. `MAILTO` is derived from `CONTACT.email` with a prefilled enquiry template.
- **Data arrays** — `STATS`, `TRUST`, `EXPERTISE`, `INDUSTRIES`, `PROJECTS`, `TIMELINE`, `TECH`, `ENGAGEMENTS`, `PROCESS`, `WHY`, `TESTIMONIALS`, `FAQ`.
- **`TESTIMONIALS` is intentionally empty** and the section is wrapped in `{TESTIMONIALS.length > 0 && ...}`. Only real, attributable client quotes go in it — do not repopulate it with generated filler.
- **`PROJECTS[].featured`** controls the initial six cards; the rest appear behind the "Show all" toggle. `PROJECTS[].outcome` renders a highlighted result chip and is blank by default — fill it with a real result or leave it empty. `duration` is optional and its row is hidden when blank. Every project is delivered work, so the "Completed" badge is hardcoded in `ProjectBubble`, not per-record.
- **Primitives**: `Section`, `SectionHeading` (label + title + gradient accent + sub), `Reveal`, `Counter`, `ProjectBubble`.

`ProjectBubble` renders each project as a **literal circle** — `aspect-square rounded-full`, not a rounded card. All content (tag, name, role, description, tech pills) lives inside the sphere; the "Completed" pill rides the outer edge so it costs no interior room.

Four motions run at once, deliberately desynchronised by `index` so the cluster drifts instead of pulsing: CSS `bubble-wobble` (border-radius surface tension), `bubble-iridescence` (rotating soap-film rim), a `WANDER` path (2D closed loop), and a hover spring swell. The description is `line-clamp-3` at rest and released on hover/focus.

**Colour**: each bubble gets a `--bubble-hue` from `BUBBLE_HUES`, set inline and consumed by `bubble-glass` for its water body, secondary refraction (hue + 45°), rim border and outer glow. Hues stay inside the cool aqua band 160–250 — going outside it turns the cluster into a generic multicoloured bubble chart and breaks the brand.

**Spacing is coupled to the animation.** `WANDER` amplitudes peak at ±28px, and the grid gutters are tuned against that: ~77px horizontal and ~44px vertical at rest, giving a closest approach of ~21px and ~16px. Note every `WANDER.y` is ≤ 0 (bubbles only rise), so vertical closure is one-sided — a lower bubble closes on the one above it. **If you raise the amplitudes, widen `gap-y-11` / `gap-x-*` to match or the spheres will intersect.**

**Geometry is the constraint here.** Text in a circle must stay inside the inscribed radius or `overflow-hidden` clips it. Verified worst-case corner distance is **0.87 of the radius fully expanded** (0.88 on mobile) — `max-w-[85%]` on the tag and `max-w-[88%]` on the tech row exist purely to hold that margin, because those rows sit where the circle narrows. If you lengthen `desc`, add a tech pill, or reduce `px-[14%]`, re-measure before shipping: `scrollHeight` is useless for this (the article is `justify-center`, so top overflow goes uncounted) — measure child bounding-box corners against the centre instead.

Under 640px the wobble is disabled and the blur drops to 10px: animating `border-radius` repaints the `backdrop-filter` region every frame, and nine bubbles of that is the heaviest thing on the page.

Section ids drive the fixed nav, `NAV_LINKS` and `scroll-padding-top`: `#top`, `#about`, `#expertise`, `#work`, `#experience`, `#engagements`, `#process`, `#faq`, `#contact`. Renaming one means updating `NAV_LINKS` too.

## Styling

Tailwind v4, CSS-first — no `tailwind.config.js`. Everything lives in `src/styles.css`:
- `@theme inline` maps design tokens to Tailwind color/font/radius utilities.
- `:root` defines the palette in **oklch**: neutral slate ink with a single teal accent. **Amber is a highlight only** — never a surface, never a headline gradient. `--gradient-brand` is teal→cyan on purpose; the old teal→amber "sunset" read as template-y.
- Custom utilities via `@utility`: `card-surface`, `glass`, `glass-strong`, `text-gradient`, `bg-hero`, `bg-brand`, `shadow-glow`, `shadow-card`, `shadow-lift`, `grid-bg`, `portrait-tone`, `animate-float`, `animate-marquee`. Reuse these rather than re-inlining gradients.
- **Prefer `card-surface` over `glass` for text-dense sections.** Translucency over the grid background costs contrast; glass is now reserved for the floating nav and hero chips.
- A global `prefers-reduced-motion` block kills animations, and `Reveal`/`Counter`/hero parallax check `useReducedMotion()` and render statically. Keep that guard on anything new.

The page is **dark-only** — `index.tsx` hardcodes `className="dark"` on its outermost div. There is no light-mode palette and no theme toggle; don't assume `@media (prefers-color-scheme)` support.

shadcn/ui (new-york style, slate base, lucide icons) is configured in `components.json`, and 46 primitives sit in `src/components/ui/` — but the portfolio page currently uses none of them, only raw Tailwind + `motion/react`. Add new primitives via the shadcn CLI rather than by hand.

Animation is `motion` (v12, imported as `motion/react`): `useScroll`/`useTransform` for hero parallax, and the local `Reveal` wrapper for scroll-triggered entrances.

## Lovable sync

This project is connected to Lovable (`.lovable/project.json`, `AGENTS.md`). Never force-push, rebase, amend, or squash already-pushed commits — that rewrites history on Lovable's side and the user loses project history. Commits to the connected branch sync back into the Lovable editor, so keep the branch working.

## Outstanding placeholders

These are known-blank and waiting on real values from Manoj — they degrade gracefully (the link simply doesn't render) but the page is weaker until they're filled:

- `CONTACT.calendar` and `CONTACT.resume` — empty, so those buttons are hidden.
- `CONTACT.linkedin` — empty (the template's `/in/manoj-barad` was never confirmed), so all LinkedIn links are hidden until a real URL is added.
- `TESTIMONIALS` — empty; section hidden until real quotes exist.
- `PROJECTS[].outcome` — all blank; each needs a real, specific result.
- `OG_IMAGE` in `__root.tsx` points at `/og-cover.png`, which does not exist yet in `public/`. Social shares have no preview image until it's added (1200×630).
- `STATS` numbers (150+ projects, 25+ App Store apps) came from the original template and should be confirmed before they're quoted at Manoj in a sales call.
