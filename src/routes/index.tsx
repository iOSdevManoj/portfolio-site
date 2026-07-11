import { createFileRoute } from "@tanstack/react-router";
import { motion, useScroll, useTransform } from "motion/react";
import { useEffect, useRef, useState } from "react";
import {
  ArrowRight, Download, MessageCircle, Calendar, Github, Linkedin, Mail,
  Phone, MapPin, ChevronRight, Sparkles, Shield, Zap, Cpu, Heart,
  Smartphone, Bluetooth, Cloud, Brain, Code2, Rocket, Award,
  CheckCircle2, Star, ExternalLink, Layers, Database, GitBranch,
  Users, Building2, Activity, Watch, Stethoscope, ChevronDown,
} from "lucide-react";
import portraitAsset from "@/assets/manoj.jpg.asset.json";
const portrait = portraitAsset.url;

export const Route = createFileRoute("/")({
  component: Home,
  head: () => ({
    links: [{ rel: "canonical", href: "/" }],
    meta: [{ property: "og:url", content: "/" }],
  }),
});

// ---------- data ----------
const STATS = [
  { value: "12+", label: "Years Experience" },
  { value: "150+", label: "Projects Delivered" },
  { value: "40+", label: "Enterprise Clients" },
  { value: "25+", label: "Apps on App Store" },
];

const EXPERTISE = [
  { icon: Smartphone, title: "Native iOS", desc: "Swift, SwiftUI, UIKit, Combine, async/await, TCA & MVVM at scale." },
  { icon: Layers, title: "Flutter & Cross-Platform", desc: "Production Flutter apps, Riverpod/Bloc, platform channels, native bridges." },
  { icon: Brain, title: "AI Integration", desc: "OpenAI, Claude, Gemini, RAG, embeddings, on-device Core ML." },
  { icon: Heart, title: "Healthcare & Medical", desc: "HealthKit, HIPAA-friendly architecture, telemedicine, medical dashboards." },
  { icon: Bluetooth, title: "BLE & IoT", desc: "Wearables, sensors, firmware OTA, background sync, low-power protocols." },
  { icon: Cloud, title: "Cloud & Backend", desc: "Firebase, AWS, Azure, Node.js, Laravel, REST, GraphQL, Sockets." },
  { icon: Shield, title: "Security & Compliance", desc: "Encryption, keychain, biometrics, secure storage, audit-ready code." },
  { icon: Rocket, title: "Architecture & Scale", desc: "Clean architecture, modular design, CI/CD, App Store & Play Store release." },
];

const INDUSTRIES = [
  { icon: Stethoscope, name: "Healthcare & Medical" },
  { icon: Watch, name: "Fitness & Wearables" },
  { icon: Activity, name: "IoT & Smart Devices" },
  { icon: Building2, name: "Enterprise & SaaS" },
  { icon: Brain, name: "AI Products" },
  { icon: Users, name: "Social & Marketplace" },
];

const PROJECTS = [
  { name: "iPass", role: "iOS Developer", duration: "In Progress", team: "2", tools: "Xcode + BLE", tag: "Access Control · BLE", desc: "Seamless, secure Bluetooth-based access control using ECC key authentication between smartphone and iPass BLE device.", tech: ["SwiftUI", "BLE", "ECC Key Authentication"], color: "from-teal-500/20 to-indigo-500/20" },
  { name: "CokePay", role: "Sr. iOS Developer", duration: "In Progress", team: "2", tools: "Xcode", tag: "Payments · IoT", desc: "App connecting CokePay vending machines via encrypted BLE communication, with wallet top-up and in-app product purchasing.", tech: ["SwiftUI", "BLE", "Lottie", "Wallet Payment"], color: "from-rose-500/20 to-amber-500/20" },
  { name: "CamCrasher", role: "iOS Developer", duration: "In Progress", team: "1", tools: "Xcode", tag: "Automotive · Safety", desc: "Driver-safety app providing light-based alerts for upcoming speed cameras using accurate TomTom® data without distracting notifications.", tech: ["Swift", "BLE", "MVVM", "TomTom Data"], color: "from-amber-500/20 to-teal-500/20" },
  { name: "STIMLEVE", role: "iOS Developer", duration: "1 year", team: "2", tools: "Xcode", tag: "Healthcare · BLE", desc: "Revolutionary rehab programme synchronising electrical muscle stimulation with mobility exercises to alleviate pain and enhance body biomechanics.", tech: ["SwiftUI", "BLE", "Lottie Animation"], color: "from-rose-500/20 to-teal-500/20" },
  { name: "Moovii", role: "Flutter Developer", duration: "Cross-platform", team: "2", tools: "Xcode / Android Studio", tag: "Entertainment · Cross-platform", desc: "Personalised movie & TV show recommendation app using intelligent matching algorithms that improve with usage. Available on the App Store.", tech: ["Flutter", "REST API", "Firebase", "Recommendation", "Social Auth"], color: "from-indigo-500/20 to-teal-500/20" },
  { name: "HummBugs", role: "Sr. React Native Developer", duration: "2 months", team: "2", tools: "Xcode / RN CLI", tag: "IoT · Cross-platform", desc: "Cross-platform React Native application with BLE integration for connecting and controlling smart hardware devices, featuring smooth Lottie animations.", tech: ["React Native", "BLE", "Lottie", "iOS", "Android"], color: "from-amber-500/20 to-rose-500/20" },
  { name: "Handson (BLE Tool Tracker)", role: "Sr. React Native Developer", duration: "2 months", team: "2", tools: "Xcode / RN CLI", tag: "Enterprise · BLE", desc: "Cross-platform tool-tracking app using BLE-enabled trackers to monitor tool locations in real time, with map clustering and location features.", tech: ["React Native", "BLE", "Location", "Spiderfier", "MVVM"], color: "from-emerald-500/20 to-teal-500/20" },
  { name: "GoBe!", role: "iOS Developer", duration: "2.5 months", team: "1", tools: "Xcode", tag: "Social · Media", desc: "Location-memory app to capture and remember interesting places, buildings, street art and views with rich media editing and social sharing.", tech: ["Swift", "MVVM", "Image Edit", "Video", "Social Share", "Social Auth"], color: "from-teal-500/20 to-amber-500/20" },
  { name: "Park & Recharge", role: "iOS Developer", duration: "1.5 months", team: "1", tools: "Xcode", tag: "EV · Payments", desc: "EV charge-point companion app providing network access, usage history, and payment integration for electric vehicle drivers.", tech: ["Swift", "Line Chart", "REST API", "Core Data", "Payments"], color: "from-emerald-500/20 to-indigo-500/20" },
  // Additional selected work from earlier engagements
  { name: "HealthKit Companion", role: "Sr. iOS Developer", duration: "4 months", team: "3", tools: "Xcode", tag: "Healthcare · Wearables", desc: "HIPAA-conscious iOS app aggregating HealthKit, Apple Watch and third-party wearable data into a unified patient dashboard for remote care teams.", tech: ["SwiftUI", "HealthKit", "WatchKit", "Combine", "CloudKit"], color: "from-teal-500/20 to-rose-500/20" },
  { name: "AI Voice Coach", role: "Mobile & AI Engineer", duration: "3 months", team: "2", tools: "Xcode / Flutter", tag: "AI · Wellness", desc: "Real-time voice coaching app using OpenAI Realtime API with on-device transcription, custom prompts and streaming responses for daily habit building.", tech: ["Flutter", "OpenAI", "WebRTC", "Realtime API", "RAG"], color: "from-indigo-500/20 to-amber-500/20" },
  { name: "FitPulse Wearable", role: "iOS Developer", duration: "6 months", team: "4", tools: "Xcode", tag: "Fitness · BLE", desc: "Companion iOS app for a proprietary fitness wearable — BLE pairing, firmware OTA updates, workout sync and Strava/Apple Health integration.", tech: ["Swift", "CoreBluetooth", "HealthKit", "OTA", "Strava API"], color: "from-amber-500/20 to-emerald-500/20" },
  { name: "SmartHome Hub", role: "Flutter Developer", duration: "5 months", team: "3", tools: "Android Studio / Xcode", tag: "IoT · Smart Home", desc: "Cross-platform hub controlling BLE + Wi-Fi smart devices with scenes, automations and voice control through Siri Shortcuts and Google Assistant.", tech: ["Flutter", "BLE", "MQTT", "Firebase", "Siri Shortcuts"], color: "from-teal-500/20 to-indigo-500/20" },
  { name: "MedRemind Pro", role: "iOS Developer", duration: "3 months", team: "2", tools: "Xcode", tag: "Healthcare · Reminders", desc: "Medication adherence app with smart scheduling, caregiver alerts, HealthKit logging and offline-first sync for elderly patients.", tech: ["SwiftUI", "Core Data", "HealthKit", "Local Notifications"], color: "from-rose-500/20 to-teal-500/20" },
];


const TIMELINE = [
  { year: "2024 — Present", role: "Senior Mobile Architect", org: "Iottive Pvt Ltd", detail: "Leading iOS, Flutter & AI initiatives for healthcare and enterprise clients across US, EU and MENA." },
  { year: "2020 — 2024", role: "Lead iOS Engineer", org: "Product Studios & Direct Clients", detail: "Shipped 40+ production apps — fintech, healthcare, IoT — with dedicated squads on Upwork Enterprise." },
  { year: "2016 — 2020", role: "Senior iOS Developer", org: "Multiple Product Companies", detail: "Built and scaled consumer & B2B apps across sports, media, e-commerce and travel." },
  { year: "2013 — 2016", role: "iOS Developer", org: "Software Consultancies", detail: "Objective-C → Swift transition, native SDKs, App Store launches, agency delivery." },
];

const TECH = [
  "Swift", "SwiftUI", "UIKit", "Objective-C", "Combine", "Flutter", "Dart",
  "React Native", "Firebase", "Node.js", "Laravel", "Python", "PostgreSQL",
  "MongoDB", "AWS", "Azure", "GCP", "Docker", "GitHub Actions",
  "OpenAI", "Claude", "Gemini", "Core ML", "HealthKit", "CoreBluetooth",
  "Stripe", "GraphQL", "REST", "WebSockets", "Figma",
];

const SERVICES = [
  { icon: Smartphone, title: "Native iOS Development", desc: "Swift & SwiftUI apps built to Apple's highest quality bar." },
  { icon: Layers, title: "Flutter Development", desc: "One codebase, iOS + Android, pixel-perfect on both." },
  { icon: Brain, title: "AI Integration", desc: "Chatbots, RAG, embeddings, voice AI, OpenAI/Claude/Gemini." },
  { icon: Heart, title: "Healthcare Apps", desc: "HIPAA-conscious architecture, HealthKit, medical dashboards." },
  { icon: Bluetooth, title: "BLE & IoT", desc: "Wearables, sensors, firmware OTA, background sync." },
  { icon: Cloud, title: "Backend & Cloud", desc: "Firebase, AWS, Node.js APIs, real-time infrastructure." },
  { icon: Zap, title: "Performance Optimization", desc: "Cold-start, memory, battery, network — measurable wins." },
  { icon: Cpu, title: "Architecture Consulting", desc: "Clean, modular, testable systems that scale for years." },
];

const PROCESS = [
  { step: "01", title: "Discovery", desc: "Deep-dive into your product, users, constraints and business goals." },
  { step: "02", title: "Architecture", desc: "System design, tech choices, milestones, risk & compliance plan." },
  { step: "03", title: "Design & Build", desc: "Sprint-based delivery with weekly demos, clean code, full test coverage." },
  { step: "04", title: "Ship & Scale", desc: "App Store / Play release, monitoring, iteration, long-term partnership." },
];

const TESTIMONIALS = [
  { quote: "Manoj is one of the sharpest mobile architects we've worked with. He shipped our healthcare iOS app ahead of schedule and it just works.", author: "CTO, US Health-Tech Startup" },
  { quote: "Rare combination of deep technical skill and clear communication. He rebuilt our BLE stack and cut battery drain by 60%.", author: "VP Engineering, IoT Wearable Co." },
  { quote: "He treated our product like it was his own. Enterprise-grade code, on-time delivery, no hand-holding required.", author: "Founder, Fintech Platform" },
];

const FAQ = [
  { q: "What kind of projects do you take on?", a: "End-to-end mobile products (iOS + Flutter), AI integrations, healthcare & wearable apps, BLE/IoT systems, and architecture rescue missions for existing apps." },
  { q: "Do you work solo or with a team?", a: "Both. I deliver solo for focused scopes, and lead squads of designers, backend and QA engineers for larger builds." },
  { q: "What time zones do you cover?", a: "I overlap with US, EU, UK and MENA business hours. Async-first, with reliable daily check-ins." },
  { q: "How do you handle NDAs and IP?", a: "Standard practice. NDA before scoping, full IP transfer on delivery, private repos, and audit-ready commit history." },
  { q: "What's your typical engagement model?", a: "Fixed-scope milestones for MVPs, or dedicated monthly retainers for ongoing product work. Both include architecture, code and release management." },
];

// ---------- small components ----------
function Section({ id, children, className = "" }: { id?: string; children: React.ReactNode; className?: string }) {
  return (
    <section id={id} className={`relative mx-auto w-full max-w-7xl px-6 py-24 sm:py-32 ${className}`}>
      {children}
    </section>
  );
}

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <div className="mb-4 inline-flex items-center gap-2 rounded-full glass px-3 py-1 text-xs font-medium uppercase tracking-widest text-teal">
      <Sparkles className="h-3 w-3" /> {children}
    </div>
  );
}

function Reveal({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}

function Counter({ value }: { value: string }) {
  const num = parseInt(value.replace(/\D/g, ""), 10);
  const suffix = value.replace(/[0-9]/g, "");
  const [display, setDisplay] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  useEffect(() => {
    let started = false;
    const io = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !started) {
        started = true;
        const dur = 1400; const start = performance.now();
        const tick = (t: number) => {
          const p = Math.min(1, (t - start) / dur);
          setDisplay(Math.round(num * (1 - Math.pow(1 - p, 3))));
          if (p < 1) requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
      }
    }, { threshold: 0.4 });
    if (ref.current) io.observe(ref.current);
    return () => io.disconnect();
  }, [num]);
  return <span ref={ref}>{display}{suffix}</span>;
}

// ---------- page ----------
function Home() {
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const heroY = useTransform(scrollYProgress, [0, 1], [0, 120]);
  const heroOpacity = useTransform(scrollYProgress, [0, 1], [1, 0.3]);

  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const [openFaq, setOpenFaq] = useState<number | null>(0);

  return (
    <div className="dark min-h-screen bg-background text-foreground overflow-x-hidden">
      {/* NAV */}
      <motion.header
        initial={{ y: -40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6 }}
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${scrolled ? "py-3" : "py-5"}`}
      >
        <div className={`mx-auto flex max-w-7xl items-center justify-between px-6 ${scrolled ? "glass-strong rounded-full mx-4 sm:mx-auto sm:max-w-6xl" : ""} transition-all duration-300 ${scrolled ? "py-2.5" : ""}`}>
          <a href="#top" className="flex items-center gap-2 font-display text-lg font-bold tracking-tight">
            <span className="grid h-8 w-8 place-items-center rounded-lg bg-brand text-primary-foreground shadow-glow">MB</span>
            <span className="hidden sm:inline">Manoj Barad</span>
          </a>
          <nav className="hidden items-center gap-8 text-sm text-muted-foreground md:flex">
            <a href="#expertise" className="hover:text-foreground transition">Expertise</a>
            <a href="#projects" className="hover:text-foreground transition">Projects</a>
            <a href="#experience" className="hover:text-foreground transition">Experience</a>
            <a href="#services" className="hover:text-foreground transition">Services</a>
            <a href="#contact" className="hover:text-foreground transition">Contact</a>
          </nav>
          <a href="#contact" className="group inline-flex items-center gap-2 rounded-full bg-brand px-4 py-2 text-sm font-medium text-primary-foreground shadow-glow transition hover:opacity-90">
            Hire Me <ArrowRight className="h-4 w-4 transition group-hover:translate-x-0.5" />
          </a>
        </div>
      </motion.header>

      {/* HERO */}
      <div ref={heroRef} id="top" className="relative bg-hero pt-32 pb-24 sm:pt-40 sm:pb-32">
        <div className="absolute inset-0 grid-bg pointer-events-none" />
        <motion.div style={{ y: heroY, opacity: heroOpacity }} className="relative mx-auto max-w-7xl px-6">
          <div className="grid items-center gap-14 lg:grid-cols-[1.15fr_1fr]">
            <div>
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
                className="inline-flex items-center gap-2 rounded-full glass px-3 py-1.5 text-xs font-medium">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-teal opacity-60" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-teal" />
                </span>
                Available for select Q1 2026 engagements
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2, duration: 0.8 }}
                className="mt-6 font-display text-5xl font-bold leading-[1.05] tracking-tight sm:text-6xl lg:text-7xl"
              >
                Senior Mobile <br className="hidden sm:block" />
                <span className="text-gradient">Application Architect</span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.35 }}
                className="mt-6 max-w-xl text-lg text-muted-foreground sm:text-xl"
              >
                12+ years designing and shipping enterprise-grade iOS, Flutter, AI, BLE and IoT applications for startups, healthcare pioneers and Fortune 500 teams.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}
                className="mt-8 flex flex-wrap gap-3"
              >
                <a href="#contact" className="group inline-flex items-center gap-2 rounded-full bg-brand px-6 py-3 text-sm font-semibold text-primary-foreground shadow-glow transition hover:opacity-90">
                  Hire Me <ArrowRight className="h-4 w-4 transition group-hover:translate-x-0.5" />
                </a>
                <a href="#contact" className="inline-flex items-center gap-2 rounded-full glass-strong px-6 py-3 text-sm font-semibold hover:bg-white/5 transition">
                  <Calendar className="h-4 w-4" /> Schedule Meeting
                </a>
                <a href="https://wa.me/" className="inline-flex items-center gap-2 rounded-full glass px-6 py-3 text-sm font-semibold hover:bg-white/5 transition">
                  <MessageCircle className="h-4 w-4" /> WhatsApp
                </a>
                <a href="#" className="inline-flex items-center gap-2 rounded-full glass px-6 py-3 text-sm font-semibold hover:bg-white/5 transition">
                  <Download className="h-4 w-4" /> Resume
                </a>
              </motion.div>

              <motion.div
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.7 }}
                className="mt-14 grid grid-cols-2 gap-6 sm:grid-cols-4"
              >
                {STATS.map((s) => (
                  <div key={s.label}>
                    <div className="font-display text-3xl font-bold text-gradient sm:text-4xl">
                      <Counter value={s.value} />
                    </div>
                    <div className="mt-1 text-xs uppercase tracking-widest text-muted-foreground">{s.label}</div>
                  </div>
                ))}
              </motion.div>
            </div>

            {/* Portrait */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.3, duration: 0.9 }}
              className="relative mx-auto w-full max-w-md"
            >
              <div className="absolute -inset-8 rounded-[2rem] bg-brand opacity-30 blur-3xl" />
              <div className="relative overflow-hidden rounded-[2rem] glass-strong shadow-card">
                <img
                  src={portrait}
                  alt="Manoj Barad — Senior Mobile Application Architect"
                  width={1024}
                  height={1280}
                  className="h-full w-full object-cover"
                />
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-background via-background/70 to-transparent p-6">
                  <div className="flex items-center gap-3">
                    <div className="grid h-10 w-10 place-items-center rounded-full bg-brand shadow-glow">
                      <Award className="h-5 w-5 text-primary-foreground" />
                    </div>
                    <div>
                      <div className="text-sm font-semibold">Top-Rated on Upwork</div>
                      <div className="text-xs text-muted-foreground">150+ delivered · 12+ years</div>
                    </div>
                  </div>
                </div>
              </div>

              <motion.div animate={{ y: [0, -10, 0] }} transition={{ duration: 5, repeat: Infinity }}
                className="absolute -left-6 top-10 hidden rounded-2xl glass-strong p-3 shadow-card sm:block">
                <div className="flex items-center gap-2">
                  <Heart className="h-4 w-4 text-rose-400" />
                  <div className="text-xs">
                    <div className="font-semibold">HealthKit · BLE</div>
                    <div className="text-muted-foreground">Medical-grade</div>
                  </div>
                </div>
              </motion.div>
              <motion.div animate={{ y: [0, 10, 0] }} transition={{ duration: 6, repeat: Infinity, delay: 1 }}
                className="absolute -right-6 bottom-24 hidden rounded-2xl glass-strong p-3 shadow-card sm:block">
                <div className="flex items-center gap-2">
                  <Brain className="h-4 w-4 text-amber" />
                  <div className="text-xs">
                    <div className="font-semibold">GPT · Claude · RAG</div>
                    <div className="text-muted-foreground">Production AI</div>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </div>

          <div className="mt-16 flex justify-center">
            <ChevronDown className="h-5 w-5 animate-bounce text-muted-foreground" />
          </div>
        </motion.div>
      </div>

      {/* MARQUEE */}
      <div className="relative border-y border-border/50 bg-card/30 py-6 overflow-hidden">
        <div className="flex animate-marquee gap-14 whitespace-nowrap text-xs uppercase tracking-[0.3em] text-muted-foreground">
          {[...Array(2)].map((_, i) => (
            <div key={i} className="flex items-center gap-14">
              {["Healthcare", "AI / LLM", "Fintech", "IoT & Wearables", "Enterprise SaaS", "BLE", "Telemedicine", "Flutter", "SwiftUI", "OpenAI", "HealthKit"].map((x) => (
                <span key={x} className="flex items-center gap-14">{x}<span className="h-1 w-1 rounded-full bg-teal" /></span>
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* ABOUT */}
      <Section id="about">
        <div className="grid gap-14 lg:grid-cols-[1fr_1.4fr]">
          <Reveal>
            <SectionLabel>About</SectionLabel>
            <h2 className="font-display text-4xl font-bold sm:text-5xl">
              Built for teams that <span className="text-gradient">can't afford to ship poorly.</span>
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="space-y-5 text-lg text-muted-foreground leading-relaxed">
              <p>
                I'm Manoj — a Senior Mobile Application Architect with 12+ years of hands-on experience turning ambitious product ideas into reliable, production-grade mobile applications. My work has powered healthcare platforms, fintech products, IoT ecosystems, and AI-first apps used by hundreds of thousands of people worldwide.
              </p>
              <p>
                I specialise in <span className="text-foreground font-medium">Native iOS (Swift/SwiftUI/UIKit)</span>, <span className="text-foreground font-medium">Flutter</span>, <span className="text-foreground font-medium">AI integration</span> (OpenAI, Claude, Gemini, RAG), <span className="text-foreground font-medium">BLE & IoT</span>, and <span className="text-foreground font-medium">HIPAA-conscious healthcare architecture</span>. I lead squads, mentor engineers, and personally write the code that has to work when it matters most.
              </p>
              <p>
                Clients hire me because I combine the engineering rigor of an enterprise architect with the speed and pragmatism of a founding engineer.
              </p>
              <div className="flex flex-wrap gap-2 pt-3">
                {["Swift Expert", "SwiftUI", "Flutter", "AI · LLM", "BLE / IoT", "Healthcare", "Clean Architecture", "Team Leadership"].map((t) => (
                  <span key={t} className="rounded-full glass px-3 py-1.5 text-xs font-medium">{t}</span>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </Section>

      {/* EXPERTISE */}
      <Section id="expertise">
        <Reveal>
          <div className="mx-auto max-w-2xl text-center">
            <SectionLabel>My Expertise</SectionLabel>
            <h2 className="font-display text-4xl font-bold sm:text-5xl">A full-stack mobile <span className="text-gradient">delivery capability</span></h2>
            <p className="mt-4 text-muted-foreground">From the first Figma frame to a five-star App Store launch — one accountable engineer, zero handoff friction.</p>
          </div>
        </Reveal>
        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {EXPERTISE.map((e, i) => (
            <Reveal key={e.title} delay={i * 0.05}>
              <div className="group relative h-full overflow-hidden rounded-2xl glass p-6 transition-all hover:-translate-y-1 hover:shadow-glow">
                <div className="absolute -right-8 -top-8 h-24 w-24 rounded-full bg-teal-soft blur-2xl opacity-0 transition-opacity group-hover:opacity-100" />
                <div className="relative">
                  <div className="grid h-11 w-11 place-items-center rounded-xl bg-teal-soft text-teal">
                    <e.icon className="h-5 w-5" />
                  </div>
                  <h3 className="mt-4 text-lg font-semibold">{e.title}</h3>
                  <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{e.desc}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* INDUSTRIES */}
      <Section id="industries" className="!py-20">
        <Reveal>
          <div className="mx-auto max-w-2xl text-center">
            <SectionLabel>Industries</SectionLabel>
            <h2 className="font-display text-3xl font-bold sm:text-4xl">Deep domain experience where <span className="text-gradient">it counts</span></h2>
          </div>
        </Reveal>
        <div className="mt-12 grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6">
          {INDUSTRIES.map((ind, i) => (
            <Reveal key={ind.name} delay={i * 0.05}>
              <div className="flex flex-col items-center gap-3 rounded-2xl glass p-6 text-center transition hover:bg-white/5">
                <div className="grid h-12 w-12 place-items-center rounded-xl bg-amber-soft text-amber">
                  <ind.icon className="h-6 w-6" />
                </div>
                <div className="text-sm font-medium">{ind.name}</div>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* PROJECTS */}
      <Section id="projects">
        <Reveal>
          <div className="flex flex-wrap items-end justify-between gap-6">
            <div className="max-w-xl">
              <SectionLabel>Selected Work</SectionLabel>
              <h2 className="font-display text-4xl font-bold sm:text-5xl">Real products. <span className="text-gradient">Real outcomes.</span></h2>
              <p className="mt-4 text-muted-foreground">A curated slice of shipped applications across healthcare, IoT, EV, fintech and consumer — spanning iOS, Flutter and React Native.</p>
            </div>
            <a href="#contact" className="inline-flex items-center gap-2 text-sm font-medium text-teal hover:underline">
              Request full case studies <ChevronRight className="h-4 w-4" />
            </a>
          </div>
        </Reveal>
        <div className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {PROJECTS.map((p, i) => (
            <Reveal key={p.name} delay={i * 0.05}>
              <article className={`group relative flex h-full flex-col overflow-hidden rounded-2xl glass p-6 transition-all hover:-translate-y-1 hover:shadow-card`}>
                <div className={`absolute inset-0 bg-gradient-to-br ${p.color} opacity-40 pointer-events-none`} />
                <div className="relative flex flex-1 flex-col">
                  <div className="flex items-center justify-between">
                    <span className="rounded-full bg-black/30 px-3 py-1 text-[10px] font-semibold uppercase tracking-widest text-teal">{p.tag}</span>
                    <ExternalLink className="h-4 w-4 text-muted-foreground transition group-hover:text-foreground" />
                  </div>
                  <h3 className="mt-6 font-display text-2xl font-bold">{p.name}</h3>
                  <div className="mt-1 text-xs font-mono uppercase tracking-widest text-amber">{p.role}</div>
                  <p className="mt-3 flex-1 text-sm text-muted-foreground leading-relaxed">{p.desc}</p>
                  <dl className="mt-4 grid grid-cols-3 gap-2 text-[10px] font-mono uppercase tracking-wider text-muted-foreground border-t border-white/5 pt-3">
                    <div><dt className="text-teal/70">Duration</dt><dd className="mt-0.5 text-foreground/80 normal-case tracking-normal">{p.duration}</dd></div>
                    <div><dt className="text-teal/70">Team</dt><dd className="mt-0.5 text-foreground/80 normal-case tracking-normal">{p.team}</dd></div>
                    <div><dt className="text-teal/70">Tools</dt><dd className="mt-0.5 text-foreground/80 normal-case tracking-normal">{p.tools}</dd></div>
                  </dl>
                  <div className="mt-4 flex flex-wrap gap-1.5">
                    {p.tech.map((t) => (
                      <span key={t} className="rounded-md bg-white/5 px-2 py-1 text-[11px] font-mono text-muted-foreground">{t}</span>
                    ))}
                  </div>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* EXPERIENCE TIMELINE */}
      <Section id="experience">
        <Reveal>
          <div className="mx-auto max-w-2xl text-center">
            <SectionLabel>Experience</SectionLabel>
            <h2 className="font-display text-4xl font-bold sm:text-5xl">A decade+ of <span className="text-gradient">shipping at scale</span></h2>
          </div>
        </Reveal>
        <div className="relative mt-14 mx-auto max-w-3xl">
          <div className="absolute left-4 top-2 bottom-2 w-px bg-gradient-to-b from-teal via-amber to-transparent sm:left-1/2" />
          {TIMELINE.map((t, i) => (
            <Reveal key={t.year} delay={i * 0.08}>
              <div className={`relative mb-10 grid gap-4 sm:grid-cols-2 ${i % 2 ? "sm:[&>div:first-child]:col-start-2" : ""}`}>
                <div className={`pl-12 sm:pl-0 ${i % 2 ? "sm:pl-12" : "sm:text-right sm:pr-12"}`}>
                  <div className="absolute left-2 top-2 h-4 w-4 rounded-full bg-brand shadow-glow sm:left-1/2 sm:-translate-x-1/2" />
                  <div className="text-xs font-mono uppercase tracking-widest text-teal">{t.year}</div>
                  <div className="mt-1 font-display text-xl font-bold">{t.role}</div>
                  <div className="text-sm text-muted-foreground">{t.org}</div>
                  <p className={`mt-3 text-sm text-muted-foreground leading-relaxed`}>{t.detail}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* TECH STACK */}
      <Section id="stack" className="!py-20">
        <Reveal>
          <div className="mx-auto max-w-2xl text-center">
            <SectionLabel>Tech Stack</SectionLabel>
            <h2 className="font-display text-4xl font-bold sm:text-5xl">The tools I <span className="text-gradient">reach for daily</span></h2>
          </div>
        </Reveal>
        <div className="mt-12 flex flex-wrap justify-center gap-2.5">
          {TECH.map((t, i) => (
            <motion.span
              key={t}
              initial={{ opacity: 0, scale: 0.85 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.02 }}
              className="rounded-full glass-strong px-4 py-2 text-sm font-medium hover:bg-white/10 transition"
            >
              {t}
            </motion.span>
          ))}
        </div>
      </Section>

      {/* SERVICES */}
      <Section id="services">
        <Reveal>
          <div className="mx-auto max-w-2xl text-center">
            <SectionLabel>Services</SectionLabel>
            <h2 className="font-display text-4xl font-bold sm:text-5xl">Ways we can <span className="text-gradient">work together</span></h2>
          </div>
        </Reveal>
        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {SERVICES.map((s, i) => (
            <Reveal key={s.title} delay={i * 0.05}>
              <div className="flex h-full flex-col rounded-2xl glass p-6 transition hover:bg-white/[0.06]">
                <div className="grid h-10 w-10 place-items-center rounded-lg bg-teal-soft text-teal">
                  <s.icon className="h-5 w-5" />
                </div>
                <h3 className="mt-4 font-semibold">{s.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{s.desc}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* PROCESS */}
      <Section id="process" className="!py-20">
        <Reveal>
          <div className="mx-auto max-w-2xl text-center">
            <SectionLabel>Process</SectionLabel>
            <h2 className="font-display text-4xl font-bold sm:text-5xl">A calm, <span className="text-gradient">predictable</span> way to build</h2>
          </div>
        </Reveal>
        <div className="mt-14 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
          {PROCESS.map((p, i) => (
            <Reveal key={p.step} delay={i * 0.08}>
              <div className="relative overflow-hidden rounded-2xl glass p-6">
                <div className="font-mono text-6xl font-bold text-teal opacity-20">{p.step}</div>
                <h3 className="mt-2 font-display text-xl font-bold">{p.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{p.desc}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* WHY HIRE ME */}
      <Section id="why">
        <div className="rounded-3xl glass-strong p-8 sm:p-14">
          <Reveal>
            <SectionLabel>Why Clients Choose Me</SectionLabel>
            <h2 className="font-display text-4xl font-bold sm:text-5xl">
              You get a <span className="text-gradient">senior architect</span>, not a code monkey.
            </h2>
          </Reveal>
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {[
              "12+ years shipping production mobile apps",
              "Clean, modular, testable architecture",
              "Deep healthcare & HIPAA-friendly experience",
              "AI integration expertise (LLMs, RAG, embeddings)",
              "BLE / IoT specialist for wearables & sensors",
              "Pixel-perfect UI with obsessive attention to detail",
              "Fast, transparent communication in your time zone",
              "Long-term support after launch",
              "Reliable, on-time delivery — every sprint",
            ].map((w, i) => (
              <Reveal key={w} delay={i * 0.04}>
                <div className="flex items-start gap-3 rounded-xl bg-white/[0.03] p-4">
                  <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-teal" />
                  <span className="text-sm">{w}</span>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </Section>

      {/* TESTIMONIALS */}
      <Section id="testimonials" className="!py-20">
        <Reveal>
          <div className="mx-auto max-w-2xl text-center">
            <SectionLabel>Testimonials</SectionLabel>
            <h2 className="font-display text-4xl font-bold sm:text-5xl">Trusted by <span className="text-gradient">founders & CTOs</span></h2>
          </div>
        </Reveal>
        <div className="mt-14 grid gap-5 md:grid-cols-3">
          {TESTIMONIALS.map((t, i) => (
            <Reveal key={i} delay={i * 0.08}>
              <figure className="flex h-full flex-col rounded-2xl glass p-6">
                <div className="flex gap-0.5">
                  {Array.from({ length: 5 }).map((_, k) => <Star key={k} className="h-4 w-4 fill-amber text-amber" />)}
                </div>
                <blockquote className="mt-4 flex-1 text-sm leading-relaxed text-foreground/90">"{t.quote}"</blockquote>
                <figcaption className="mt-6 text-xs uppercase tracking-widest text-muted-foreground">{t.author}</figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* FAQ */}
      <Section id="faq">
        <Reveal>
          <div className="mx-auto max-w-2xl text-center">
            <SectionLabel>FAQ</SectionLabel>
            <h2 className="font-display text-4xl font-bold sm:text-5xl">Common <span className="text-gradient">client questions</span></h2>
          </div>
        </Reveal>
        <div className="mx-auto mt-12 max-w-3xl divide-y divide-border/50 rounded-2xl glass overflow-hidden">
          {FAQ.map((f, i) => (
            <button
              key={f.q}
              onClick={() => setOpenFaq(openFaq === i ? null : i)}
              className="block w-full text-left"
            >
              <div className="flex items-center justify-between p-6">
                <span className="pr-6 font-medium">{f.q}</span>
                <ChevronDown className={`h-5 w-5 shrink-0 text-teal transition-transform ${openFaq === i ? "rotate-180" : ""}`} />
              </div>
              <motion.div
                initial={false}
                animate={{ height: openFaq === i ? "auto" : 0, opacity: openFaq === i ? 1 : 0 }}
                transition={{ duration: 0.3 }}
                className="overflow-hidden"
              >
                <p className="px-6 pb-6 text-sm text-muted-foreground leading-relaxed">{f.a}</p>
              </motion.div>
            </button>
          ))}
        </div>
      </Section>

      {/* CONTACT / CTA */}
      <Section id="contact">
        <div className="relative overflow-hidden rounded-3xl bg-brand p-10 shadow-glow sm:p-16">
          <div className="absolute inset-0 grid-bg opacity-30" />
          <div className="relative grid gap-10 lg:grid-cols-[1.3fr_1fr]">
            <div>
              <h2 className="font-display text-4xl font-bold text-primary-foreground sm:text-5xl">
                Have a product that has to <em className="not-italic underline decoration-white/40">work?</em>
              </h2>
              <p className="mt-4 max-w-xl text-lg text-primary-foreground/80">
                Let's talk. Share your idea, timeline and constraints — I'll come back within 24 hours with a clear next step.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <a href="mailto:hello@manojbarad.com" className="inline-flex items-center gap-2 rounded-full bg-background px-6 py-3 text-sm font-semibold text-foreground shadow-card transition hover:opacity-90">
                  <Mail className="h-4 w-4" /> Email me
                </a>
                <a href="https://wa.me/" className="inline-flex items-center gap-2 rounded-full bg-black/20 px-6 py-3 text-sm font-semibold text-primary-foreground backdrop-blur transition hover:bg-black/30">
                  <MessageCircle className="h-4 w-4" /> WhatsApp
                </a>
                <a href="#" className="inline-flex items-center gap-2 rounded-full bg-black/20 px-6 py-3 text-sm font-semibold text-primary-foreground backdrop-blur transition hover:bg-black/30">
                  <Calendar className="h-4 w-4" /> Schedule call
                </a>
              </div>
            </div>
            <div className="grid gap-3 self-center">
              {[
                { icon: Mail, label: "Email", value: "hello@manojbarad.com" },
                { icon: Phone, label: "Phone", value: "+91 · Available on request" },
                { icon: MapPin, label: "Based in", value: "Ahmedabad, India · Global clients" },
                { icon: Linkedin, label: "LinkedIn", value: "linkedin.com/in/manoj-barad" },
                { icon: Github, label: "GitHub", value: "github.com/manoj-barad" },
                { icon: ExternalLink, label: "Upwork", value: "Top-Rated · 12+ years" },
              ].map((c) => (
                <div key={c.label} className="flex items-center gap-3 rounded-xl bg-black/20 p-3 backdrop-blur">
                  <div className="grid h-9 w-9 place-items-center rounded-lg bg-white/10 text-primary-foreground">
                    <c.icon className="h-4 w-4" />
                  </div>
                  <div className="min-w-0">
                    <div className="text-[10px] uppercase tracking-widest text-primary-foreground/60">{c.label}</div>
                    <div className="truncate text-sm font-medium text-primary-foreground">{c.value}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Section>

      {/* FOOTER */}
      <footer className="border-t border-border/50 bg-card/40">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-6 py-10 sm:flex-row">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <span className="grid h-7 w-7 place-items-center rounded-md bg-brand text-primary-foreground text-xs font-bold">MB</span>
            © {new Date().getFullYear()} Manoj Barad · Senior Mobile Application Architect
          </div>
          <div className="flex items-center gap-4 text-muted-foreground">
            <a href="#" className="hover:text-foreground transition"><Linkedin className="h-4 w-4" /></a>
            <a href="#" className="hover:text-foreground transition"><Github className="h-4 w-4" /></a>
            <a href="mailto:hello@manojbarad.com" className="hover:text-foreground transition"><Mail className="h-4 w-4" /></a>
          </div>
        </div>
      </footer>
    </div>
  );
}
