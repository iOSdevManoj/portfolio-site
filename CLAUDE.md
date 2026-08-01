# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Repo location

The git repo root is `project/`, one level below the usual working directory (`Web/`). All commands below run from `project/`. The sibling `portfolio-ready-for-github.zip` is a stale snapshot — ignore it.

Live deployment: https://portfolio-site-roan-mu-47.vercel.app · remote: `github.com/iOSdevManoj/portfolio-site`

## Commands

```bash
npm run dev      # vite dev server
npm run build    # vite build; nitro picks the target from the environment
npm run preview  # serve the production build
npm run lint     # eslint (prettier runs as an eslint rule — lint fails on format drift)
npm run format   # prettier --write .
```

No test runner is configured. There is no `typecheck` script; use `./node_modules/.bin/tsc --noEmit` — plain `npx tsc` resolves to the unrelated `tsc` package on npm and fails with a confusing message.

`package-lock.json` is the committed lockfile (npm). `bunfig.toml` enforces a 24h `minimumReleaseAge` supply-chain guard for anyone installing with bun; its allowlist was Lovable-only and is now empty.

## Architecture

TanStack Start (SSR) + React 19 + Vite 8 + Tailwind v4.

**Vite config is explicit.** `vite.config.ts` registers the plugin stack directly — tailwindcss, tsConfigPaths, tanstackStart, nitro, viteReact, in that order. Two things there are load-bearing and easy to break:

- `css.transformer: "lightningcss"` is set so dev matches build. Vite otherwise runs PostCSS in dev and Lightning CSS only at build, which lets a CSS feature look right in the preview and break in production. Lightning CSS also does vendor prefixing, so **never hand-write `-webkit-` properties** — it rewrites hand-written copies into a form the target browser may ignore. (Verified: the built CSS contains auto-generated `-webkit-backdrop-filter` and `-webkit-mask-image`.)
- `nitro()` takes **no preset**, so it detects the target from the environment: a Vercel build on Vercel (`.vercel/output`, Build Output API v3), a Node server locally. Hardcoding a preset here is what previously made local builds emit Cloudflare `wrangler.json` output.

**Three entry points, layered for error handling:**
- `src/router.tsx` — `getRouter()` builds the router and injects a `QueryClient` into route context.
- `src/start.ts` — `createStart` with a request middleware that catches non-HTTP throws and returns a rendered error page.
- `src/server.ts` — the SSR entry (wired via `tanstackStart.server.entry` in vite config). It wraps `@tanstack/react-start/server-entry` and normalizes h3's swallowed 500s: h3 turns in-handler throws into a JSON `{"unhandled":true,"message":"HTTPError"}` response that no try/catch sees, so `src/lib/error-capture.ts` records the original error out-of-band (5s TTL) for `server.ts` to recover and log.

Client-side boundary errors are logged to the console from the root `errorComponent`. There is no error-reporting service wired up — add one there if you want production visibility.

**Routing** is file-based under `src/routes/`. See `src/routes/README.md` for the conventions table — notably: no `src/pages/`, no `app/layout.tsx`, the only layout is `__root.tsx`, and `routeTree.gen.ts` is generated (never hand-edit; it's also prettier-ignored).

`__root.tsx` owns the HTML shell (`RootShell`), all SEO head tags, JSON-LD Person schema, Google Fonts links, and the 404 / error components.

**All content lives in `src/content/profile.ts`**, separate from presentation. Both `src/routes/index.tsx` (landing page) and `src/routes/cv.tsx` (print CV) render from these exports, so a fact is edited in exactly one place. To change copy, edit that module, not the JSX.

`src/routes/cv.tsx` is a print-first CV; `CONTACT.resume` points at `/cv` so the "CV" button opens a page the browser saves as PDF. It is `noindex` — a CV page can otherwise outrank the portfolio for his name.

- **`CONTACT` / `AVAILABILITY`** — the single source of truth for every link, address and the hero status pill. Links render conditionally: an empty string in `CONTACT` *hides* that button instead of emitting a dead `href="#"`. Keep it that way; the page should never ship a dead anchor. `MAILTO` is derived from `CONTACT.email` with a prefilled enquiry template.
- **Data arrays** — `STATS`, `TRUST`, `PLATFORMS`, `EXPERTISE`, `INDUSTRIES`, `PROJECTS`, `TIMELINE`, `TECH`, `BUDGET_GUIDE`, `ENGAGEMENTS`, `PROCESS`, `WHY`, `TESTIMONIALS`, `FAQ`.
- **`BUDGET_GUIDE`** (section `#investment`) maps budget to scope. Its framing is deliberate and should not be flattened into a price list: the engineering standard is constant across tiers and only *scope* grows, which is what the closing panel states. `adds` describes what each tier gains over the one below, so the ladder reads as accumulating value. These are examples, never packages — the copy says so in two places because it is the thing clients most often misread.
- **`ENGAGEMENTS`** (section `#engagements`) is the *shape* of the work, not its price; the two sections answer different questions and should stay distinct. Four models ordered by commitment, low to high, so a cautious buyer meets the cheapest entry first. Each card carries `best` (who it suits), `points` (what arrives) and `pricing` (how it is charged) — the three questions that otherwise become the first email.
- **`enquiryHref(topic)`** builds a prefilled mailto naming the tier or model clicked, so the first message arrives already scoped.
- **`TESTIMONIALS` is intentionally empty** and the section is wrapped in `{TESTIMONIALS.length > 0 && ...}`. Only real, attributable client quotes go in it — do not repopulate it with generated filler.
- **`PROJECTS[].featured`** controls the initial six cards; the rest appear behind the "Show all" toggle. `PROJECTS[].outcome` is the client-facing result line. The current values are capability statements derived from each project's own `desc` — defensible without a metric. If Manoj supplies real measured numbers, they belong here and are strictly better; keep them short, since this row has the least horizontal room in the bubble. `duration` is optional and its row is hidden when blank. Every project is delivered work, so the "Completed" badge is hardcoded in `ProjectBubble`, not per-record.
- **Primitives**: `Section`, `SectionHeading` (label + title + gradient accent + sub), `Reveal`, `Counter`, `ProjectBubble`.

`ProjectBubble` renders each project as a **literal circle** — `aspect-square rounded-full`, not a rounded card. All content (tag, name, role, description, tech pills) lives inside the sphere; the "Completed" pill rides the outer edge so it costs no interior room.

Four motions run at once, deliberately desynchronised by `index` so the cluster drifts instead of pulsing: CSS `bubble-wobble` (border-radius surface tension), `bubble-iridescence` (rotating soap-film rim), a `WANDER` path (2D closed loop), and a hover spring swell. The description is `line-clamp-3` at rest and released on hover/focus.

**Colour**: each bubble gets a `--bubble-hue` from `BUBBLE_HUES`, set inline and consumed by `bubble-glass` for its water body, secondary refraction (hue + 45°), rim border and outer glow. Hues stay inside the cool aqua band 160–250 — going outside it turns the cluster into a generic multicoloured bubble chart and breaks the brand.

**Spacing is coupled to the animation.** `WANDER` amplitudes peak at ±28px, and the grid gutters are tuned against that: ~77px horizontal and ~44px vertical at rest, giving a closest approach of ~21px and ~16px. Note every `WANDER.y` is ≤ 0 (bubbles only rise), so vertical closure is one-sided — a lower bubble closes on the one above it. **If you raise the amplitudes, widen `gap-y-11` / `gap-x-*` to match or the spheres will intersect.**

**Geometry is the constraint here.** Text in a circle must stay inside the inscribed radius or `overflow-hidden` clips it. Verified worst case is **0.93 of the radius fully expanded** (0.94 on mobile). The `max-w-*` values on three rows exist purely to hold that margin, because each sits where the circle narrows — `max-w-[85%]` on the tag, `max-w-[88%]` on the tech row, and `max-w-[76%]` on `outcome`, which is tightest because it is the lowest row in the stack. Adding the outcome text pushed three bubbles to 1.01 (clipping) before that constraint was applied. If you lengthen `desc`, add a tech pill, or reduce `px-[14%]`, re-measure before shipping: `scrollHeight` is useless for this (the article is `justify-center`, so top overflow goes uncounted) — measure child bounding-box corners against the centre instead.

Under 640px the wobble is disabled and the blur drops to 10px: animating `border-radius` repaints the `backdrop-filter` region every frame, and nine bubbles of that is the heaviest thing on the page.

Positioning covers five platforms — iOS, Android, Flutter, React Native and web — so copy should not narrow back to "iOS & Flutter". `PLATFORMS` renders the strip under the stats band that answers "can he build my thing?" before any scrolling.

Icons in `public/` (`favicon.ico`, `apple-touch-icon.png`, `icon-192/512.png`) are a generated MB monogram on the brand gradient, replacing Lovable's heart. Regenerate with Pillow if the brand colour changes.

Section ids drive the fixed nav, `NAV_LINKS` and `scroll-padding-top`: `#top`, `#about`, `#expertise`, `#work`, `#experience`, `#investment`, `#engagements`, `#process`, `#faq`, `#contact`. Renaming one means updating `NAV_LINKS` too.

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

## Deployment

Vercel builds from `github.com/iOSdevManoj/portfolio-site` on `main` — pushing to `main` deploys to production. There is no Vercel CLI or `.vercel` project link in this repo; the GitHub integration is the whole pipeline.

To check the Vercel build locally before pushing, run `VERCEL=1 npm run build` and confirm `.vercel/output/{config.json,static,functions}` appears.

**Lovable has been fully removed** (`.lovable/`, `AGENTS.md`, the error-reporting telemetry, and `@lovable.dev/vite-tanstack-config`). Do not reintroduce it. `lightningcss` is now a direct devDependency because it used to arrive transitively through that package.

## Outstanding placeholders

These are known-blank and waiting on real values from Manoj — they degrade gracefully (the link simply doesn't render) but the page is weaker until they're filled:

- `CONTACT.calendar` — empty. The "Book a call" button is **not** blocked on it: `BOOKING_HREF` falls back to a structured scheduling email (timezone + three preferred windows + topic). Pasting a Cal.com/Calendly URL swaps it to self-serve booking with no other change.
- `TESTIMONIALS` — empty; section hidden until real quotes exist.
- `PROJECTS[].outcome` — all blank; each needs a real, specific result.
- `public/og-cover.png` is generated by `scripts/make-og-cover.py` (Pillow). Regenerate it after changing the name, role, platforms or portrait — it is a build artefact of the content, not hand-drawn. `public/favicon.ico` and the icon PNGs are generated the same way.
- `STATS` numbers (150+ projects, 25+ App Store apps) came from the original template and should be confirmed before they're quoted at Manoj in a sales call.
