import { createFileRoute } from "@tanstack/react-router";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { useEffect, useRef, useState } from "react";
import {
  ArrowRight,
  Download,
  MessageCircle,
  Github,
  Linkedin,
  Mail,
  MapPin,
  ChevronRight,
  Bluetooth,
  Brain,
  CheckCircle2,
  ExternalLink,
  ChevronDown,
  CalendarDays,
  Clock,
  Menu,
  X,
} from "lucide-react";
import portrait from "@/assets/manoj.jpg";

export const Route = createFileRoute("/")({
  component: Home,
  head: () => ({
    links: [{ rel: "canonical", href: "/" }],
    meta: [{ property: "og:url", content: "/" }],
  }),
});

import {
  AVAILABILITY,
  BOOKING_HREF,
  BUDGET_GUIDE,
  BOOKING_IS_EXTERNAL,
  CONTACT,
  ENGAGEMENTS,
  enquiryHref,
  EXPERTISE,
  FAQ,
  INDUSTRIES,
  MAILTO,
  PLATFORMS,
  PROCESS,
  PROJECTS,
  STATS,
  TECH,
  TESTIMONIALS,
  TIMELINE,
  TRUST,
  WHATSAPP,
  WHY,
} from "@/content/profile";

// ---------- primitives ----------

function Section({
  id,
  children,
  className = "",
}: {
  id?: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <section
      id={id}
      className={`relative mx-auto w-full max-w-7xl px-6 py-20 sm:py-28 ${className}`}
    >
      {children}
    </section>
  );
}

function SectionHeading({
  label,
  title,
  accent,
  sub,
  align = "center",
}: {
  label: string;
  title: string;
  accent?: string;
  sub?: string;
  align?: "center" | "left";
}) {
  return (
    <div className={align === "center" ? "mx-auto max-w-2xl text-center" : "max-w-2xl"}>
      <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-hairline bg-surface px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.16em] text-teal">
        {label}
      </div>
      <h2 className="font-display text-3xl font-bold sm:text-4xl lg:text-[2.75rem] lg:leading-[1.1]">
        {title} {accent && <span className="text-gradient">{accent}</span>}
      </h2>
      {sub && <p className="mt-4 text-base leading-relaxed text-muted-foreground">{sub}</p>}
    </div>
  );
}

function Reveal({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  const reduce = useReducedMotion();
  if (reduce) return <>{children}</>;
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.55, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}

/** Counts up on first scroll into view. Suffix/prefix characters are preserved. */
function Counter({ value }: { value: string }) {
  const num = parseInt(value.replace(/\D/g, ""), 10);
  const suffix = value.replace(/[0-9]/g, "");
  const reduce = useReducedMotion();
  const [display, setDisplay] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (reduce) {
      setDisplay(num);
      return;
    }
    let started = false;
    let frame = 0;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting || started) return;
        started = true;
        const dur = 1200;
        const start = performance.now();
        const tick = (t: number) => {
          const p = Math.min(1, (t - start) / dur);
          setDisplay(Math.round(num * (1 - Math.pow(1 - p, 3))));
          if (p < 1) frame = requestAnimationFrame(tick);
        };
        frame = requestAnimationFrame(tick);
      },
      { threshold: 0.4 },
    );
    if (ref.current) io.observe(ref.current);
    return () => {
      io.disconnect();
      cancelAnimationFrame(frame);
    };
  }, [num, reduce]);

  return (
    <span ref={ref}>
      {display}
      {suffix}
    </span>
  );
}

/** Decorative bubbles drifting up behind the cluster. Fixed, not random, so
 *  server and client markup match during hydration. */
const RISING_BUBBLES = [
  { left: "8%", size: 14, duration: "24s", delay: "0s" },
  { left: "21%", size: 8, duration: "19s", delay: "3.5s" },
  { left: "37%", size: 18, duration: "28s", delay: "7s" },
  { left: "52%", size: 10, duration: "21s", delay: "1.5s" },
  { left: "68%", size: 15, duration: "26s", delay: "9s" },
  { left: "81%", size: 7, duration: "18s", delay: "5s" },
  { left: "93%", size: 12, duration: "23s", delay: "12s" },
];

/**
 * Water hues per bubble, cycled by index. Deliberately confined to the cool
 * aqua band (seafoam → teal → cyan → sky → blue) so the cluster varies like
 * real water instead of turning into a multicoloured chart.
 */
const BUBBLE_HUES = [196, 172, 224, 205, 162, 240, 188, 214, 178];

/**
 * Wander paths. Each bubble traces its own closed loop, and neighbouring
 * entries push in opposing directions so pairs visibly close on each other and
 * drift apart again. Amplitudes stay under ~30px: the resting gutter between
 * adjacent circles is ~69px at desktop, so two bubbles converging can reach
 * roughly 13px apart — near-touching, never colliding through each other.
 */
const WANDER = [
  { x: [0, 26, 8, -14, 0], y: [0, -16, -28, -10, 0] },
  { x: [0, -22, -6, 18, 0], y: [0, -12, -24, -6, 0] },
  { x: [0, 14, 28, 10, 0], y: [0, -20, -8, -22, 0] },
  { x: [0, -18, -28, -8, 0], y: [0, -22, -10, -18, 0] },
  { x: [0, 20, -10, -22, 0], y: [0, -10, -26, -14, 0] },
  { x: [0, -14, 16, 24, 0], y: [0, -24, -14, -8, 0] },
  { x: [0, 24, -8, -16, 0], y: [0, -14, -22, -26, 0] },
  { x: [0, -26, 10, 14, 0], y: [0, -18, -26, -12, 0] },
  { x: [0, 16, 26, -12, 0], y: [0, -26, -12, -20, 0] },
];

type Project = (typeof PROJECTS)[number];

/**
 * Project rendered as a true water bubble — a circle, not a card.
 *
 * Everything lives inside the sphere: tag, name, role, description and tech.
 * Text is inset by ~15% so it never collides with the curve, and the
 * description is clamped at rest and released on hover/focus as the bubble
 * swells. Three independent motions run at once and are deliberately
 * desynchronised per index so the cluster drifts like bubbles suspended in
 * water rather than pulsing in unison:
 *   1. `bubble-wobble` (CSS)  — surface tension on the outline
 *   2. drift (motion)         — slow vertical + lateral travel
 *   3. hover swell (motion)   — scale + brighten
 * All three are dropped under prefers-reduced-motion.
 */
function ProjectBubble({
  project: p,
  index,
  reduce,
}: {
  project: Project;
  index: number;
  reduce: boolean;
}) {
  const [open, setOpen] = useState(false);

  const hue = BUBBLE_HUES[index % BUBBLE_HUES.length];
  const wander = WANDER[index % WANDER.length];
  // Long, prime-ish periods so loops don't resynchronise into a visible pulse.
  const wanderDuration = 17 + (index % 5) * 3.4;
  const wanderDelay = (index % 6) * 1.3;

  const visibleTech = open ? p.tech : p.tech.slice(0, 3);
  const hiddenTech = p.tech.length - visibleTech.length;

  return (
    <motion.div
      initial={reduce ? false : { opacity: 0, scale: 0.7 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{
        duration: 0.7,
        delay: (index % 3) * 0.1,
        ease: [0.22, 1.2, 0.36, 1], // slight overshoot — bubbles "pop" into place
      }}
      className={`relative mx-auto w-full max-w-[21rem] ${open ? "z-20" : "z-0"}`}
    >
      <motion.div
        animate={reduce ? undefined : { x: wander.x, y: wander.y }}
        transition={{
          duration: wanderDuration,
          delay: wanderDelay,
          repeat: Infinity,
          repeatType: "mirror",
          ease: "easeInOut",
          times: [0, 0.25, 0.5, 0.75, 1],
        }}
        style={{ willChange: reduce ? undefined : "transform" }}
      >
        <motion.article
          whileHover={reduce ? undefined : { scale: 1.06 }}
          transition={{ type: "spring", stiffness: 260, damping: 22 }}
          tabIndex={0}
          onMouseEnter={() => setOpen(true)}
          onMouseLeave={() => setOpen(false)}
          onFocus={() => setOpen(true)}
          onBlur={() => setOpen(false)}
          aria-label={`${p.name} — ${p.role}. ${p.desc}`}
          style={{ "--bubble-hue": hue } as React.CSSProperties}
          className={`bubble-glass group relative flex aspect-square w-full flex-col items-center justify-center overflow-hidden rounded-full px-[14%] text-center transition-shadow duration-500 hover:shadow-glow ${
            reduce ? "" : "bubble-wobble"
          }`}
        >
          {/* Soap-film iridescence around the rim. Applied unconditionally —
              the class carries the gradient, and the global reduced-motion
              rule already halts its rotation. */}
          <span
            className="bubble-iridescence pointer-events-none absolute inset-0 rounded-full opacity-70"
            aria-hidden
          />

          {/* Specular hotspot — the highlight that sells it as a sphere. */}
          <span
            className="pointer-events-none absolute left-[16%] top-[10%] h-[26%] w-[34%] -rotate-12 rounded-[50%] bg-white/25 blur-md"
            aria-hidden
          />
          <span
            className="pointer-events-none absolute left-[24%] top-[19%] h-[6%] w-[10%] rounded-full bg-white/50 blur-[2px]"
            aria-hidden
          />
          {/* Refraction crescent along the lower rim. */}
          <span
            className="pointer-events-none absolute inset-[6%] rounded-full border border-transparent [border-bottom-color:oklch(1_0_0_/_0.16)] [border-right-color:oklch(1_0_0_/_0.09)]"
            aria-hidden
          />

          {/* Top and bottom rows sit where the circle narrows, so they get an
              extra inset — a full-width box corner would breach the rim. */}
          <span className="relative max-w-[85%] text-[9px] font-semibold uppercase tracking-[0.14em] text-teal">
            {p.tag}
          </span>

          <h3 className="relative mt-1.5 font-display text-lg font-bold leading-tight sm:text-xl">
            {p.name}
          </h3>

          <span className="relative mt-1 font-mono text-[9px] uppercase tracking-wider text-amber">
            {p.role}
          </span>

          <p
            className={`relative mt-2.5 text-[11px] leading-snug text-muted-foreground transition-all duration-300 ${
              open ? "" : "line-clamp-3"
            }`}
          >
            {p.desc}
          </p>

          <span className="relative mt-3 flex max-w-[88%] flex-wrap items-center justify-center gap-1">
            {visibleTech.map((t) => (
              <span
                key={t}
                className="rounded-full border border-white/12 bg-white/8 px-2 py-0.5 font-mono text-[9px] text-foreground/75"
              >
                {t}
              </span>
            ))}
            {hiddenTech > 0 && (
              <span className="rounded-full border border-white/12 bg-white/8 px-2 py-0.5 font-mono text-[9px] text-foreground/55">
                +{hiddenTech}
              </span>
            )}
          </span>

          {/* Lowest row in the stack, so it sits where the circle is narrowest —
              it needs the tightest inset of anything in the bubble. */}
          {p.outcome && (
            <span className="relative mt-2 max-w-[76%] text-[10px] font-medium leading-snug text-teal">
              {p.outcome}
            </span>
          )}
        </motion.article>
      </motion.div>

      {/* Status pill rides the bubble's edge so it costs no room inside. */}
      <span className="pointer-events-none absolute bottom-[7%] right-[3%] z-10 inline-flex items-center gap-1 rounded-full border border-emerald-400/30 bg-[oklch(0.18_0.02_250)] px-2.5 py-1 text-[9px] font-semibold uppercase tracking-[0.1em] text-emerald-300 shadow-card">
        <CheckCircle2 className="h-2.5 w-2.5" /> Completed
      </span>
    </motion.div>
  );
}

const NAV_LINKS = [
  { href: "#work", label: "Work" },
  { href: "#expertise", label: "Expertise" },
  { href: "#experience", label: "Experience" },
  { href: "#investment", label: "Pricing" },
  { href: "#engagements", label: "Work with me" },
  { href: "#faq", label: "FAQ" },
];

// ---------- page ----------
function Home() {
  const heroRef = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const heroY = useTransform(scrollYProgress, [0, 1], [0, 90]);
  const heroOpacity = useTransform(scrollYProgress, [0, 1], [1, 0.4]);

  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [showAllProjects, setShowAllProjects] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Lock body scroll behind the mobile menu.
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  const visibleProjects = showAllProjects ? PROJECTS : PROJECTS.filter((p) => p.featured);

  return (
    <div className="dark min-h-screen overflow-x-hidden bg-background text-foreground">
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:rounded-full focus:bg-brand focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-primary-foreground"
      >
        Skip to content
      </a>

      {/* NAV */}
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${scrolled ? "py-3" : "py-5"}`}
      >
        <div
          className={`mx-auto flex max-w-7xl items-center justify-between px-6 transition-all duration-300 ${
            scrolled
              ? "glass-strong mx-4 rounded-full py-2.5 shadow-card sm:mx-auto sm:max-w-6xl"
              : ""
          }`}
        >
          <a
            href="#top"
            className="flex items-center gap-2.5 font-display text-base font-bold tracking-tight"
          >
            <span className="grid h-8 w-8 place-items-center rounded-lg bg-brand text-sm text-primary-foreground shadow-glow">
              MB
            </span>
            <span className="hidden sm:inline">Manoj Barad</span>
          </a>

          <nav
            aria-label="Primary"
            className="hidden items-center gap-7 text-sm text-muted-foreground lg:flex"
          >
            {NAV_LINKS.map((l) => (
              <a key={l.href} href={l.href} className="transition hover:text-foreground">
                {l.label}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <a
              href="#contact"
              className="group hidden items-center gap-2 rounded-full bg-brand px-4 py-2 text-sm font-semibold text-primary-foreground shadow-glow transition hover:opacity-90 sm:inline-flex"
            >
              Start a project
              <ArrowRight className="h-4 w-4 transition group-hover:translate-x-0.5" />
            </a>
            <button
              type="button"
              onClick={() => setMenuOpen(true)}
              aria-label="Open menu"
              aria-expanded={menuOpen}
              className="grid h-9 w-9 place-items-center rounded-lg border border-hairline bg-surface lg:hidden"
            >
              <Menu className="h-4.5 w-4.5" />
            </button>
          </div>
        </div>
      </header>

      {/* MOBILE MENU */}
      {menuOpen && (
        <div className="fixed inset-0 z-[55] lg:hidden">
          <button
            type="button"
            aria-label="Close menu"
            onClick={() => setMenuOpen(false)}
            className="absolute inset-0 bg-background/80 backdrop-blur-sm"
          />
          <motion.nav
            aria-label="Mobile"
            initial={reduce ? false : { x: "100%" }}
            animate={{ x: 0 }}
            transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
            className="absolute inset-y-0 right-0 flex w-[min(20rem,85vw)] flex-col gap-1 border-l border-hairline bg-card p-6 shadow-lift"
          >
            <div className="mb-6 flex items-center justify-between">
              <span className="font-display font-bold">Menu</span>
              <button
                type="button"
                onClick={() => setMenuOpen(false)}
                aria-label="Close menu"
                className="grid h-9 w-9 place-items-center rounded-lg border border-hairline bg-surface"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
            {NAV_LINKS.map((l) => (
              <a
                key={l.href}
                href={l.href}
                onClick={() => setMenuOpen(false)}
                className="rounded-lg px-3 py-3 text-base font-medium text-muted-foreground transition hover:bg-surface hover:text-foreground"
              >
                {l.label}
              </a>
            ))}
            <a
              href="#contact"
              onClick={() => setMenuOpen(false)}
              className="mt-6 inline-flex items-center justify-center gap-2 rounded-full bg-brand px-5 py-3 text-sm font-semibold text-primary-foreground shadow-glow"
            >
              Start a project <ArrowRight className="h-4 w-4" />
            </a>
          </motion.nav>
        </div>
      )}

      <main id="main">
        {/* HERO */}
        <div ref={heroRef} id="top" className="relative bg-hero pt-28 pb-16 sm:pt-36 sm:pb-24">
          <div className="grid-bg pointer-events-none absolute inset-0" aria-hidden />
          <motion.div
            style={reduce ? undefined : { y: heroY, opacity: heroOpacity }}
            className="relative mx-auto max-w-7xl px-6"
          >
            <div className="grid items-center gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16">
              {/* Left column */}
              <div>
                <motion.div
                  initial={reduce ? false : { opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.05 }}
                  className="inline-flex items-center gap-2 rounded-full border border-teal/25 bg-teal-soft px-3 py-1.5 text-xs font-medium text-teal"
                >
                  <span className="relative flex h-2 w-2">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-teal opacity-60" />
                    <span className="relative inline-flex h-2 w-2 rounded-full bg-teal" />
                  </span>
                  {AVAILABILITY}
                </motion.div>

                <motion.h1
                  initial={reduce ? false : { opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.12, duration: 0.7 }}
                  className="mt-6 font-display text-[2.4rem] font-bold leading-[1.07] tracking-tight sm:text-5xl lg:text-[3.5rem] xl:text-[3.9rem]"
                >
                  Senior mobile &amp; web engineer for products that{" "}
                  <span className="text-gradient">can&apos;t fail.</span>
                </motion.h1>

                <motion.p
                  initial={reduce ? false : { opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.22 }}
                  className="mt-6 max-w-xl text-lg leading-relaxed text-muted-foreground"
                >
                  Twelve years building iOS, Android, Flutter and React Native apps — and the web
                  dashboards and APIs behind them — for medical devices, Bluetooth hardware and AI
                  products. Designed, built and delivered by one senior engineer.{" "}
                  <span className="font-medium text-foreground">
                    No agency in between, no handovers, no junior developer taking over.
                  </span>
                </motion.p>

                <motion.div
                  initial={reduce ? false : { opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.32 }}
                  className="mt-8 flex flex-wrap items-center gap-3"
                >
                  <a
                    href="#contact"
                    className="group inline-flex items-center gap-2 rounded-full bg-brand px-6 py-3.5 text-sm font-semibold text-primary-foreground shadow-glow transition hover:opacity-90"
                  >
                    Start a project
                    <ArrowRight className="h-4 w-4 transition group-hover:translate-x-0.5" />
                  </a>
                  {WHATSAPP && (
                    <a
                      href={WHATSAPP}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 rounded-full border border-border bg-surface px-6 py-3.5 text-sm font-semibold transition hover:border-teal/30 hover:bg-surface-strong"
                    >
                      <MessageCircle className="h-4 w-4 text-teal" /> WhatsApp
                    </a>
                  )}
                  <a
                    href="#work"
                    className="inline-flex items-center gap-2 px-2 py-3.5 text-sm font-medium text-muted-foreground transition hover:text-foreground"
                  >
                    See selected work
                  </a>
                  {CONTACT.resume && (
                    <a
                      href={CONTACT.resume}
                      className="inline-flex items-center gap-2 px-2 py-3.5 text-sm font-medium text-muted-foreground transition hover:text-foreground"
                    >
                      <Download className="h-4 w-4" /> CV
                    </a>
                  )}
                </motion.div>

                <motion.p
                  initial={reduce ? false : { opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.45 }}
                  className="mt-5 text-sm text-muted-foreground"
                >
                  Replies within 24 hours · Free scoping call · NDA on request
                </motion.p>
              </div>

              {/* Portrait */}
              <motion.div
                initial={reduce ? false : { opacity: 0, scale: 0.94 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                className="relative mx-auto w-full max-w-[22rem] sm:max-w-[24rem] lg:mx-0 lg:ml-auto lg:max-w-[26rem]"
              >
                <div
                  className="absolute -inset-5 rounded-[2.5rem] bg-brand opacity-[0.16] blur-3xl"
                  aria-hidden
                />
                <figure className="relative overflow-hidden rounded-[1.75rem] border border-border bg-card shadow-lift">
                  {/* Fixed 4:5 frame — the source headshot is square, so the crop is
                      horizontal and the face stays centred at every breakpoint. */}
                  <div className="relative aspect-[4/5] w-full overflow-hidden">
                    <img
                      src={portrait}
                      alt="Manoj Barad, senior iOS and Flutter engineer"
                      width={1200}
                      height={1200}
                      loading="eager"
                      decoding="async"
                      className="portrait-tone absolute inset-0 h-full w-full object-cover object-[center_22%]"
                    />
                    {/* Scrim: keeps the bright studio backdrop from glaring, and gives
                        the caption bar something to sit on. */}
                    <div
                      className="absolute inset-0 bg-gradient-to-b from-background/25 via-transparent to-background/80"
                      aria-hidden
                    />
                    <div
                      className="absolute inset-0 bg-gradient-to-tr from-[color-mix(in_oklch,var(--teal)_18%,transparent)] to-transparent mix-blend-soft-light"
                      aria-hidden
                    />
                  </div>
                  <figcaption className="flex items-center justify-between gap-4 border-t border-hairline bg-card/95 px-5 py-4 backdrop-blur">
                    <div>
                      <div className="font-display text-sm font-bold">Manoj Barad</div>
                      <div className="mt-0.5 text-xs text-muted-foreground">
                        Senior Mobile &amp; Web Engineer · {CONTACT.location}
                      </div>
                    </div>
                    {CONTACT.upwork && (
                      <a
                        href={CONTACT.upwork}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex shrink-0 items-center gap-1.5 rounded-full border border-hairline bg-surface px-3 py-1.5 text-[11px] font-semibold text-teal transition hover:bg-surface-strong"
                      >
                        Upwork profile <ExternalLink className="h-3 w-3" />
                      </a>
                    )}
                  </figcaption>
                </figure>

                {/* Floating chips — inset so they never overflow the viewport. */}
                <motion.div
                  animate={reduce ? undefined : { y: [0, -8, 0] }}
                  transition={{ duration: 5, repeat: Infinity }}
                  className="absolute -left-3 top-8 hidden rounded-xl border border-hairline bg-card/95 p-3 shadow-card backdrop-blur sm:block"
                >
                  <div className="flex items-center gap-2.5">
                    <Bluetooth className="h-4 w-4 shrink-0 text-teal" />
                    <div className="text-xs">
                      <div className="font-semibold">BLE &amp; HealthKit</div>
                      <div className="text-muted-foreground">Connected devices</div>
                    </div>
                  </div>
                </motion.div>
                <motion.div
                  animate={reduce ? undefined : { y: [0, 8, 0] }}
                  transition={{ duration: 6, repeat: Infinity, delay: 1 }}
                  className="absolute -right-3 bottom-28 hidden rounded-xl border border-hairline bg-card/95 p-3 shadow-card backdrop-blur sm:block"
                >
                  <div className="flex items-center gap-2.5">
                    <Brain className="h-4 w-4 shrink-0 text-amber" />
                    <div className="text-xs">
                      <div className="font-semibold">GPT · Claude · RAG</div>
                      <div className="text-muted-foreground">Production AI</div>
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            </div>
          </motion.div>
        </div>

        {/* STATS BAND */}
        <div className="border-y border-hairline bg-card/40">
          <div className="mx-auto grid max-w-7xl grid-cols-2 gap-px px-6 sm:grid-cols-4">
            {STATS.map((s) => (
              <div key={s.label} className="py-8 sm:py-10">
                <div className="font-display text-3xl font-bold text-gradient sm:text-4xl">
                  <Counter value={s.value} />
                </div>
                <div className="mt-1.5 text-xs leading-snug text-muted-foreground">{s.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* PLATFORMS — answers "can he build my thing?" before any scrolling */}
        <Section className="!py-14">
          <Reveal>
            <div className="mb-8 text-center text-[11px] font-semibold uppercase tracking-[0.2em] text-muted-foreground">
              Platforms I build and ship
            </div>
          </Reveal>
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
            {PLATFORMS.map((pf, i) => (
              <Reveal key={pf.name} delay={i * 0.05}>
                <div className="flex h-full flex-col items-center gap-2.5 rounded-2xl card-surface px-4 py-6 text-center transition hover:border-teal/25">
                  <div className="grid h-11 w-11 place-items-center rounded-full bg-teal-soft text-teal">
                    <pf.icon className="h-5 w-5" />
                  </div>
                  <div className="font-display text-sm font-bold">{pf.name}</div>
                  <div className="font-mono text-[10px] leading-relaxed text-muted-foreground">
                    {pf.detail}
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </Section>

        {/* TRUST — the "not an agency" promise, above the fold on most laptops */}
        <Section className="!py-16">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {TRUST.map((t, i) => (
              <Reveal key={t.title} delay={i * 0.05}>
                <div className="flex h-full flex-col rounded-2xl card-surface p-6">
                  <div className="grid h-10 w-10 place-items-center rounded-lg bg-teal-soft text-teal">
                    <t.icon className="h-5 w-5" />
                  </div>
                  <h3 className="mt-4 text-sm font-semibold">{t.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{t.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </Section>

        {/* MARQUEE */}
        <div className="relative overflow-hidden border-y border-hairline bg-card/30 py-5">
          <div className="flex animate-marquee gap-12 whitespace-nowrap text-[11px] uppercase tracking-[0.28em] text-muted-foreground">
            {[...Array(2)].map((_, i) => (
              <div key={i} className="flex items-center gap-12" aria-hidden={i === 1}>
                {[
                  "Healthcare",
                  "Medical devices",
                  "BLE & IoT",
                  "Wearables",
                  "AI / LLM",
                  "Fintech",
                  "Enterprise SaaS",
                  "Telemedicine",
                  "SwiftUI",
                  "Flutter",
                ].map((x) => (
                  <span key={x} className="flex items-center gap-12">
                    {x}
                    <span className="h-1 w-1 rounded-full bg-teal" />
                  </span>
                ))}
              </div>
            ))}
          </div>
        </div>

        {/* ABOUT */}
        <Section id="about">
          <div className="grid gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
            <Reveal>
              <SectionHeading
                align="left"
                label="About"
                title="An engineer you hire,"
                accent="not a vendor you manage."
              />
            </Reveal>
            <Reveal delay={0.1}>
              <div className="space-y-5 text-base leading-relaxed text-muted-foreground sm:text-lg">
                <p>
                  I am Manoj Barad, an independent senior mobile engineer based in Ahmedabad, India.
                  For twelve years I have built iOS and Flutter applications for companies in the
                  United States, the United Kingdom, Europe, the Middle East and India.
                </p>
                <p>
                  Clients usually come to me with one of four problems: a companion app for a
                  medical or Bluetooth device, a healthcare product that has to handle patient data
                  safely, an AI feature that has to work reliably rather than only demonstrate well,
                  or an existing app that has become too slow or too fragile to extend.
                </p>
                <p>
                  I am not an agency, and I do not pass work to subcontractors. You deal directly
                  with the engineer who writes your code — through architecture, development and App
                  Store submission, and afterwards when something needs fixing.
                </p>
                <p>
                  My core skill is <span className="font-medium text-foreground">native iOS</span>.
                  I have worked through Objective-C and Swift to SwiftUI, and I also build
                  production apps in <span className="font-medium text-foreground">Flutter</span>{" "}
                  and React Native when one codebase for both platforms is the sensible choice. My
                  strongest domains are{" "}
                  <span className="font-medium text-foreground">healthcare</span>,{" "}
                  <span className="font-medium text-foreground">
                    Bluetooth and connected hardware
                  </span>
                  , and <span className="font-medium text-foreground">applied AI</span>.
                </p>
                <p>
                  I work in English, keep a daily overlap with your business hours, and send a short
                  written update every working day — so you always know what was finished, what is
                  next, and where the risks are.
                </p>

                <div className="grid gap-3 pt-4 sm:grid-cols-2">
                  {WHY.slice(0, 6).map((w) => (
                    <div key={w} className="flex items-start gap-2.5">
                      <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-teal" />
                      <span className="text-sm text-foreground/85">{w}</span>
                    </div>
                  ))}
                </div>
              </div>
            </Reveal>
          </div>
        </Section>

        {/* EXPERTISE */}
        <Section id="expertise">
          <Reveal>
            <SectionHeading
              label="Expertise"
              title="Where I'm genuinely"
              accent="add the most value"
              sub="Many developers can build a screen. The difficulty is in the parts that fail after launch — hardware connections, patient data, background activity and store review — and in keeping mobile and web consistent when both belong to the same product."
            />
          </Reveal>
          <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {EXPERTISE.map((e, i) => (
              <Reveal key={e.title} delay={i * 0.04}>
                <div className="group h-full rounded-2xl card-surface p-6 transition-all duration-300 hover:-translate-y-1 hover:border-teal/25 hover:shadow-card">
                  <div className="grid h-11 w-11 place-items-center rounded-xl bg-teal-soft text-teal transition group-hover:scale-105">
                    <e.icon className="h-5 w-5" />
                  </div>
                  <h3 className="mt-4 font-display text-base font-bold">{e.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{e.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>

          {/* Industries strip */}
          <Reveal delay={0.1}>
            <div className="mt-6 grid gap-3 rounded-2xl card-surface p-6 sm:grid-cols-3 lg:grid-cols-6">
              {INDUSTRIES.map((ind) => (
                <div key={ind.name} className="flex items-center gap-3">
                  <div className="grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-amber-soft text-amber">
                    <ind.icon className="h-4 w-4" />
                  </div>
                  <span className="text-xs font-medium leading-tight">{ind.name}</span>
                </div>
              ))}
            </div>
          </Reveal>

          {/* Tech stack */}
          <Reveal delay={0.15}>
            <div className="mt-10">
              <div className="mb-5 text-center text-[11px] font-semibold uppercase tracking-[0.2em] text-muted-foreground">
                Day-to-day stack
              </div>
              <div className="flex flex-wrap justify-center gap-2">
                {TECH.map((t) => (
                  <span
                    key={t}
                    className="rounded-lg border border-hairline bg-surface px-3 py-1.5 font-mono text-xs text-muted-foreground transition hover:border-teal/25 hover:text-foreground"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>
          </Reveal>
        </Section>

        {/* WORK — water-bubble cluster */}
        <Section id="work" className="relative">
          {/* Underwater ambience: two deep glows plus small bubbles drifting
              upward. Decorative only, and static under reduced motion. */}
          <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
            <div className="absolute left-[6%] top-[18%] h-64 w-64 rounded-full bg-brand opacity-[0.07] blur-3xl" />
            <div className="absolute right-[4%] top-[52%] h-72 w-72 rounded-full bg-brand opacity-[0.05] blur-3xl" />
            {!reduce &&
              RISING_BUBBLES.map((b, i) => (
                <span
                  key={i}
                  className="bubble-rise absolute bottom-0 rounded-full border border-white/10 bg-white/[0.04]"
                  style={{
                    left: b.left,
                    height: b.size,
                    width: b.size,
                    animationDuration: b.duration,
                    animationDelay: b.delay,
                  }}
                />
              ))}
          </div>

          <Reveal>
            <div className="relative flex flex-wrap items-end justify-between gap-6">
              <SectionHeading
                align="left"
                label="Selected work"
                title="Recent work, delivered"
                accent="and in daily use."
                sub="These are products I have built and shipped over recent engagements — every one completed, released and running in production today, not a concept piece or a portfolio exercise. They span healthcare and medical devices, Bluetooth and connected hardware, payments, automotive safety and consumer apps. The work covers native iOS and Android, Flutter and React Native, together with the web dashboards and APIs supporting them. Hover any bubble to read the full detail and the technologies used."
              />
              <a
                href="#contact"
                className="inline-flex items-center gap-1.5 text-sm font-semibold text-teal transition hover:gap-2.5"
              >
                Request detailed case studies <ChevronRight className="h-4 w-4" />
              </a>
            </div>
          </Reveal>

          {/* Cluster, not a grid: tight gaps let the spheres nearly touch, and
              every second column is pushed down so the rows interlock like
              packed bubbles instead of lining up in a table. */}
          {/* Gutters are tuned against the wander amplitude (±28px): ~77px
              horizontal and ~44px vertical at rest, so converging neighbours
              close to roughly 21px and 16px — visibly near, never colliding.
              Widen these if you increase the amplitudes in WANDER. */}
          <div className="relative mt-16 grid gap-x-4 gap-y-11 sm:grid-cols-2 sm:gap-x-3 lg:grid-cols-3 lg:gap-x-2">
            {visibleProjects.map((p, i) => (
              <div
                key={p.name}
                className={
                  i % 2 === 1
                    ? "sm:translate-y-10 lg:translate-y-0"
                    : "sm:-translate-y-2 lg:translate-y-0"
                }
              >
                <div className={i % 3 === 1 ? "lg:translate-y-14" : "lg:translate-y-0"}>
                  <ProjectBubble project={p} index={i} reduce={!!reduce} />
                </div>
              </div>
            ))}
          </div>

          {PROJECTS.length > visibleProjects.length && (
            <div className="relative mt-14 flex justify-center">
              <button
                type="button"
                onClick={() => setShowAllProjects(true)}
                className="group inline-flex items-center gap-2 rounded-full border border-border bg-surface px-7 py-3.5 text-sm font-semibold transition hover:border-teal/30 hover:bg-surface-strong"
              >
                Show all {PROJECTS.length} projects
                <ChevronDown className="h-4 w-4 transition group-hover:translate-y-0.5" />
              </button>
            </div>
          )}
        </Section>

        {/* EXPERIENCE */}
        <Section id="experience">
          <Reveal>
            <SectionHeading
              label="Experience"
              title="Twelve years of"
              accent="shipping to real deadlines"
            />
          </Reveal>
          <div className="relative mx-auto mt-14 max-w-3xl">
            <div
              className="absolute left-[7px] top-2 bottom-2 w-px bg-gradient-to-b from-teal via-teal/40 to-transparent"
              aria-hidden
            />
            {TIMELINE.map((t, i) => (
              <Reveal key={t.year} delay={i * 0.07}>
                <div className="relative mb-10 pl-10 last:mb-0">
                  <div className="absolute left-0 top-1.5 h-[15px] w-[15px] rounded-full border-2 border-background bg-brand shadow-glow" />
                  <div className="font-mono text-[11px] uppercase tracking-[0.14em] text-teal">
                    {t.year}
                  </div>
                  <h3 className="mt-1.5 font-display text-lg font-bold">{t.role}</h3>
                  <div className="text-sm text-muted-foreground">{t.org}</div>
                  <p className="mt-2.5 text-sm leading-relaxed text-muted-foreground">{t.detail}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </Section>

        {/* INVESTMENT GUIDE — calibrates scope to budget before the ask */}
        <Section id="investment">
          <Reveal>
            <SectionHeading
              label="Investment guide"
              title="What different budgets"
              accent="typically cover"
              sub="Every project is scoped on its own terms, so these are examples rather than packages. They exist to save you a guessing step: find the level closest to what you have in mind, and you will know roughly what that buys before we ever speak."
            />
          </Reveal>

          <div className="mt-14 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {BUDGET_GUIDE.map((b, i) => (
              <Reveal key={b.range} delay={(i % 3) * 0.06}>
                <div
                  className={`relative flex h-full flex-col rounded-2xl p-6 transition-all duration-300 hover:-translate-y-1 ${
                    b.highlight
                      ? "border border-teal/35 bg-surface shadow-glow"
                      : "card-surface hover:border-teal/20"
                  }`}
                >
                  {b.highlight && (
                    <span className="absolute -top-3 left-6 rounded-full bg-brand px-3 py-1 text-[10px] font-bold uppercase tracking-[0.12em] text-primary-foreground">
                      Most requested
                    </span>
                  )}

                  <div className="flex items-center gap-3">
                    <div className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-teal-soft text-teal">
                      <b.icon className="h-5 w-5" />
                    </div>
                    <div className="font-display text-xl font-bold text-gradient">{b.range}</div>
                  </div>

                  <h3 className="mt-4 font-display text-base font-bold leading-snug">{b.name}</h3>
                  <div className="mt-1 text-xs font-medium text-amber">{b.bestFor}</div>
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{b.desc}</p>

                  <ul className="mt-5 flex-1 space-y-2 border-t border-hairline pt-5">
                    {b.includes.map((it) => (
                      <li key={it} className="flex items-start gap-2.5 text-sm">
                        <CheckCircle2 className="mt-0.5 h-3.5 w-3.5 shrink-0 text-teal" />
                        <span className="text-foreground/85">{it}</span>
                      </li>
                    ))}
                  </ul>

                  {b.adds && (
                    <div className="mt-5 rounded-xl bg-teal-soft px-4 py-3 text-xs leading-relaxed text-foreground/85">
                      {b.adds}
                    </div>
                  )}
                </div>
              </Reveal>
            ))}
          </div>

          {/* The point of the whole section, stated plainly. */}
          <Reveal delay={0.1}>
            <div className="mt-8 grid gap-5 rounded-2xl card-surface p-7 sm:p-9 lg:grid-cols-[1.4fr_1fr] lg:items-center">
              <div>
                <h3 className="font-display text-xl font-bold">
                  The standard does not change with the budget. The scope does.
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                  You get the same engineering at every level — the same review, the same handling
                  of edge cases, the same code your next engineer can pick up. What grows with
                  budget is how much gets built, and how much strategy, architecture, testing,
                  documentation, deployment and post-launch support surrounds it. If a budget cannot
                  cover something properly, I will tell you before we start.
                </p>
              </div>
              <div className="flex flex-col gap-3">
                <a
                  href={enquiryHref("Custom estimate")}
                  className="group inline-flex items-center justify-center gap-2 rounded-full bg-brand px-6 py-3.5 text-sm font-semibold text-primary-foreground shadow-glow transition hover:opacity-90"
                >
                  Get a custom estimate
                  <ArrowRight className="h-4 w-4 transition group-hover:translate-x-0.5" />
                </a>
                <p className="text-center text-xs text-muted-foreground">
                  Send your goals, timeline and constraints — you get a written scope and a fixed
                  price back, usually within a day.
                </p>
              </div>
            </div>
          </Reveal>
        </Section>

        {/* ENGAGEMENTS — how the work is shaped, ordered by commitment */}
        <Section id="engagements">
          <Reveal>
            <SectionHeading
              label="Ways to work with me"
              title="Four ways to"
              accent="start"
              sub="The budget sets the scope; this sets the shape of the engagement. They run from the smallest commitment to the largest — most people start at the left and move right as trust builds."
            />
          </Reveal>
          <div className="mt-14 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
            {ENGAGEMENTS.map((e, i) => (
              <Reveal key={e.name} delay={i * 0.06}>
                <div
                  className={`relative flex h-full flex-col rounded-2xl p-6 transition-all duration-300 hover:-translate-y-1 ${
                    e.highlight
                      ? "border border-teal/35 bg-surface shadow-glow"
                      : "card-surface hover:border-teal/20"
                  }`}
                >
                  {e.highlight && (
                    <span className="absolute -top-3 left-6 rounded-full bg-brand px-3 py-1 text-[10px] font-bold uppercase tracking-[0.12em] text-primary-foreground">
                      Where most end up
                    </span>
                  )}
                  <div className="grid h-11 w-11 place-items-center rounded-xl bg-teal-soft text-teal">
                    <e.icon className="h-5 w-5" />
                  </div>
                  <h3 className="mt-5 font-display text-lg font-bold leading-snug">{e.name}</h3>
                  <div className="mt-1.5 text-xs font-medium text-amber">{e.best}</div>
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{e.desc}</p>

                  <ul className="mt-5 flex-1 space-y-2.5 border-t border-hairline pt-5">
                    {e.points.map((pt) => (
                      <li key={pt} className="flex items-start gap-2.5 text-sm">
                        <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-teal" />
                        <span className="text-foreground/85">{pt}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="mt-5 border-t border-hairline pt-4">
                    <div className="text-[10px] uppercase tracking-[0.14em] text-muted-foreground">
                      How it is priced
                    </div>
                    <div className="mt-1 text-sm font-medium">{e.pricing}</div>
                  </div>

                  <a
                    href={enquiryHref(e.name)}
                    className={`mt-5 inline-flex items-center justify-center gap-2 rounded-full px-5 py-3 text-sm font-semibold transition ${
                      e.highlight
                        ? "bg-brand text-primary-foreground shadow-glow hover:opacity-90"
                        : "border border-border bg-surface hover:bg-surface-strong"
                    }`}
                  >
                    Start here <ArrowRight className="h-4 w-4" />
                  </a>
                </div>
              </Reveal>
            ))}
          </div>
        </Section>
        {/* PROCESS */}
        <Section id="process" className="!py-20">
          <Reveal>
            <SectionHeading
              label="Process"
              title="A calm, predictable"
              accent="way to build"
              sub="No black boxes. You always know what's being built this week and what it will cost."
            />
          </Reveal>
          <div className="mt-14 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
            {PROCESS.map((p, i) => (
              <Reveal key={p.step} delay={i * 0.07}>
                <div className="relative h-full overflow-hidden rounded-2xl card-surface p-6">
                  <div className="font-mono text-5xl font-bold text-teal opacity-15">{p.step}</div>
                  <h3 className="mt-2 font-display text-lg font-bold">{p.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{p.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </Section>

        {/* TESTIMONIALS — renders only when real quotes exist. See TESTIMONIALS above. */}
        {TESTIMONIALS.length > 0 && (
          <Section id="testimonials" className="!py-20">
            <Reveal>
              <SectionHeading label="Client feedback" title="What clients" accent="actually said" />
            </Reveal>
            <div className="mt-14 grid gap-5 md:grid-cols-3">
              {TESTIMONIALS.map((t) => (
                <Reveal key={t.author}>
                  <figure className="flex h-full flex-col rounded-2xl card-surface p-6">
                    <blockquote className="flex-1 text-sm leading-relaxed text-foreground/90">
                      &ldquo;{t.quote}&rdquo;
                    </blockquote>
                    <figcaption className="mt-6 border-t border-hairline pt-4">
                      <div className="text-sm font-semibold">{t.author}</div>
                      <div className="text-xs text-muted-foreground">{t.role}</div>
                      {t.source && (
                        <div className="mt-1 text-[11px] uppercase tracking-wider text-teal">
                          via {t.source}
                        </div>
                      )}
                    </figcaption>
                  </figure>
                </Reveal>
              ))}
            </div>
          </Section>
        )}

        {/* FAQ */}
        <Section id="faq">
          <Reveal>
            <SectionHeading label="FAQ" title="Questions clients" accent="ask first" />
          </Reveal>
          <div className="mx-auto mt-12 max-w-3xl divide-y divide-hairline overflow-hidden rounded-2xl card-surface">
            {FAQ.map((f, i) => {
              const open = openFaq === i;
              return (
                <div key={f.q}>
                  <button
                    type="button"
                    onClick={() => setOpenFaq(open ? null : i)}
                    aria-expanded={open}
                    aria-controls={`faq-panel-${i}`}
                    className="flex w-full items-center justify-between gap-6 p-6 text-left transition hover:bg-surface-strong/50"
                  >
                    <span className="font-medium">{f.q}</span>
                    <ChevronDown
                      className={`h-5 w-5 shrink-0 text-teal transition-transform duration-300 ${open ? "rotate-180" : ""}`}
                    />
                  </button>
                  <motion.div
                    id={`faq-panel-${i}`}
                    role="region"
                    initial={false}
                    animate={{ height: open ? "auto" : 0, opacity: open ? 1 : 0 }}
                    transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
                    className="overflow-hidden"
                  >
                    <p className="px-6 pb-6 text-sm leading-relaxed text-muted-foreground">{f.a}</p>
                  </motion.div>
                </div>
              );
            })}
          </div>
        </Section>

        {/* CONTACT */}
        <Section id="contact">
          <div className="relative overflow-hidden rounded-3xl border border-teal/20 bg-card p-8 shadow-lift sm:p-14">
            <div className="grid-bg pointer-events-none absolute inset-0 opacity-60" aria-hidden />
            <div
              className="pointer-events-none absolute -left-32 -top-32 h-80 w-80 rounded-full bg-brand opacity-[0.13] blur-3xl"
              aria-hidden
            />
            <div className="relative grid gap-12 lg:grid-cols-[1.25fr_1fr]">
              <div>
                <h2 className="font-display text-3xl font-bold sm:text-4xl lg:text-[2.75rem] lg:leading-[1.1]">
                  Tell me what you&apos;re building.
                </h2>
                <p className="mt-4 max-w-xl text-base leading-relaxed text-muted-foreground sm:text-lg">
                  Send the product, the platforms, a rough timeline and a budget range. Within 24
                  hours you&apos;ll get a straight answer: whether it&apos;s buildable as scoped,
                  what I&apos;d change, and what it costs. If I&apos;m not the right fit I&apos;ll
                  say so and point you at someone who is.
                </p>

                <div className="mt-8 flex flex-wrap gap-3">
                  <a
                    href={MAILTO}
                    className="group inline-flex items-center gap-2 rounded-full bg-brand px-6 py-3.5 text-sm font-semibold text-primary-foreground shadow-glow transition hover:opacity-90"
                  >
                    <Mail className="h-4 w-4" /> Email me
                    <ArrowRight className="h-4 w-4 transition group-hover:translate-x-0.5" />
                  </a>
                  {/* Always live: a real calendar when one is configured, a
                      structured scheduling email otherwise. */}
                  <a
                    href={BOOKING_HREF}
                    target={BOOKING_IS_EXTERNAL ? "_blank" : undefined}
                    rel={BOOKING_IS_EXTERNAL ? "noopener noreferrer" : undefined}
                    className="inline-flex items-center gap-2 rounded-full border border-border bg-surface px-6 py-3.5 text-sm font-semibold transition hover:border-teal/30 hover:bg-surface-strong"
                  >
                    <CalendarDays className="h-4 w-4 text-teal" /> Book a 30-min call
                  </a>
                  {WHATSAPP && (
                    <a
                      href={WHATSAPP}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 rounded-full border border-border bg-surface px-6 py-3.5 text-sm font-semibold transition hover:bg-surface-strong"
                    >
                      <MessageCircle className="h-4 w-4" /> WhatsApp
                    </a>
                  )}
                </div>

                <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-muted-foreground">
                  <span className="inline-flex items-center gap-2">
                    <MapPin className="h-4 w-4 text-teal" /> {CONTACT.location} · {CONTACT.timezone}
                  </span>
                  <span className="inline-flex items-center gap-2">
                    <Clock className="h-4 w-4 text-teal" /> Overlaps US, UK, EU &amp; MENA hours
                  </span>
                </div>
              </div>

              <div className="grid content-start gap-3">
                {[
                  { icon: Mail, label: "Email", value: CONTACT.email, href: MAILTO },
                  {
                    icon: MessageCircle,
                    label: "WhatsApp",
                    value: CONTACT.whatsappDisplay,
                    href: WHATSAPP,
                  },
                  {
                    icon: ExternalLink,
                    label: "Upwork",
                    value: "Hire through Upwork",
                    href: CONTACT.upwork,
                  },
                  { icon: Linkedin, label: "LinkedIn", value: "Connect", href: CONTACT.linkedin },
                  { icon: Github, label: "GitHub", value: "Code samples", href: CONTACT.github },
                ]
                  .filter((c) => c.href)
                  .map((c) => (
                    <a
                      key={c.label}
                      href={c.href}
                      target={c.href.startsWith("http") ? "_blank" : undefined}
                      rel={c.href.startsWith("http") ? "noopener noreferrer" : undefined}
                      className="group flex items-center gap-3 rounded-xl border border-hairline bg-surface p-3.5 transition hover:border-teal/25 hover:bg-surface-strong"
                    >
                      <div className="grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-teal-soft text-teal">
                        <c.icon className="h-4 w-4" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <div className="text-[10px] uppercase tracking-[0.14em] text-muted-foreground">
                          {c.label}
                        </div>
                        <div className="truncate text-sm font-medium">{c.value}</div>
                      </div>
                      <ChevronRight className="h-4 w-4 shrink-0 text-muted-foreground transition group-hover:translate-x-0.5 group-hover:text-teal" />
                    </a>
                  ))}
              </div>
            </div>
          </div>
        </Section>
      </main>

      {/* FOOTER */}
      <footer className="border-t border-hairline bg-card/40">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-6 py-10 sm:flex-row">
          <div className="flex items-center gap-2.5 text-sm text-muted-foreground">
            <span className="grid h-7 w-7 place-items-center rounded-md bg-brand text-xs font-bold text-primary-foreground">
              MB
            </span>
            © {new Date().getFullYear()} Manoj Barad · Senior Mobile &amp; Web Engineer
          </div>
          <div className="flex items-center gap-2">
            {[
              { href: WHATSAPP, icon: MessageCircle, label: "WhatsApp" },
              { href: CONTACT.linkedin, icon: Linkedin, label: "LinkedIn" },
              { href: CONTACT.github, icon: Github, label: "GitHub" },
              { href: CONTACT.upwork, icon: ExternalLink, label: "Upwork" },
              { href: MAILTO, icon: Mail, label: "Email" },
            ]
              .filter((s) => s.href)
              .map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  aria-label={s.label}
                  target={s.href.startsWith("http") ? "_blank" : undefined}
                  rel={s.href.startsWith("http") ? "noopener noreferrer" : undefined}
                  className="grid h-9 w-9 place-items-center rounded-lg border border-hairline bg-surface text-muted-foreground transition hover:border-teal/25 hover:text-foreground"
                >
                  <s.icon className="h-4 w-4" />
                </a>
              ))}
          </div>
        </div>
      </footer>
    </div>
  );
}
