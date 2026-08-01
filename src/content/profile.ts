/**
 * All portfolio content lives here, separate from presentation. Both the
 * landing page (`src/routes/index.tsx`) and the CV (`src/routes/cv.tsx`)
 * render from these exports, so a fact is edited in exactly one place.
 */
import {
  Activity,
  Bluetooth,
  Brain,
  Building2,
  Clock,
  Cloud,
  Cpu,
  FileCheck,
  Globe,
  Heart,
  Layers,
  Monitor,
  Rocket,
  Shield,
  Smartphone,
  Stethoscope,
  UserCheck,
  Users,
  Watch,
  Zap,
} from "lucide-react";

// ============================================================================
// CONFIG — edit these five blocks and the whole page updates.
// Empty strings hide the corresponding link/button instead of rendering a dead
// `#` anchor, so it is safe to leave something blank until you have the URL.
// ============================================================================

export const CONTACT = {
  email: "manojbarad@gmail.com",
  whatsapp: "919426675556", // digits only, no "+" — wa.me rejects the plus sign
  whatsappDisplay: "+91 94266 75556",
  // Optional. Paste a Cal.com / Calendly URL here and the "Book a call" button
  // switches to real self-serve booking. Until then it falls back to the
  // scheduling email below, so the button is never dead.
  calendar: "",
  resume: "/cv", // print-ready CV page; the browser saves it as PDF
  linkedin: "https://www.linkedin.com/in/manoj-barad--ios",
  github: "https://github.com/iOSdevManoj",
  upwork: "https://www.upwork.com/freelancers/~011df072813255b527?viewMode=1",
  location: "Ahmedabad, India",
  timezone: "IST · UTC+5:30",
};

/** Shown in the hero status pill. Update this — a stale date reads worse than none. */
export const AVAILABILITY = "Taking on new projects from September 2026";

export const MAILTO = `mailto:${CONTACT.email}?subject=${encodeURIComponent(
  "Project enquiry — mobile build",
)}&body=${encodeURIComponent(
  [
    "Hi Manoj,",
    "",
    "What we're building:",
    "Platforms (iOS / Android / both):",
    "Rough timeline:",
    "Budget range:",
    "",
    "Thanks,",
  ].join("\n"),
)}`;

/**
 * Scheduling request. Used when CONTACT.calendar is empty so "Book a call"
 * always does something useful: it asks for the three things needed to confirm
 * a slot without a second round-trip — timezone, two or three windows, and what
 * the call is about.
 */
const CALL_MAILTO = `mailto:${CONTACT.email}?subject=${encodeURIComponent(
  "Call request — 30 minutes",
)}&body=${encodeURIComponent(
  [
    "Hi Manoj,",
    "",
    "I'd like to book a 30-minute call.",
    "",
    "My time zone:",
    "Two or three times that suit me:",
    "  1.",
    "  2.",
    "  3.",
    "",
    "What I'd like to discuss:",
    "",
    "Thanks,",
  ].join("\n"),
)}`;

/** Real calendar when configured, structured email request otherwise. */
export const BOOKING_HREF = CONTACT.calendar || CALL_MAILTO;
export const BOOKING_IS_EXTERNAL = Boolean(CONTACT.calendar);

/** wa.me needs the number in international format with no "+", spaces or dashes. */
export const WHATSAPP = CONTACT.whatsapp
  ? `https://wa.me/${CONTACT.whatsapp}?text=${encodeURIComponent(
      "Hi Manoj — I found your portfolio. I'd like to discuss a mobile project.",
    )}`
  : "";

// ---------- data ----------

/** Keep these defensible — a client who asks you to back up a number should get an answer. */
export const STATS = [
  { value: "12+", label: "Years building production apps" },
  { value: "150+", label: "Projects delivered" },
  { value: "25+", label: "Apps live on the App Store & Play" },
  { value: "24h", label: "Reply to every enquiry" },
];

/** The four promises that separate an independent senior engineer from an agency. */
export const TRUST = [
  {
    icon: UserCheck,
    title: "You work with me directly",
    desc: "No account manager, no shared team, no junior developer taking over halfway.",
  },
  {
    icon: Globe,
    title: "Overlap with your hours",
    desc: "Daily overlap with US, UK, EU and MENA teams. Async-first by default.",
  },
  {
    icon: FileCheck,
    title: "NDA and IP, sorted upfront",
    desc: "NDA before scoping. Full IP transfer on delivery. Private repos throughout.",
  },
  {
    icon: Clock,
    title: "Scope quoted before work starts",
    desc: "You approve a written scope and milestones. No open-ended hourly drift.",
  },
];

export const EXPERTISE = [
  {
    icon: Smartphone,
    title: "Native iOS",
    desc: "Swift, SwiftUI, UIKit, Combine, structured concurrency. MVVM and clean architecture on codebases meant to live for years.",
  },
  {
    icon: Bluetooth,
    title: "BLE & connected hardware",
    desc: "CoreBluetooth pairing, background sync, firmware OTA, reconnection logic and the state machines that make it survive real-world use.",
  },
  {
    icon: Heart,
    title: "Healthcare & medical",
    desc: "HealthKit, HIPAA-conscious data flow, telemedicine, patient dashboards, and companion apps for regulated devices.",
  },
  {
    icon: Brain,
    title: "AI features that behave",
    desc: "OpenAI, Claude and Gemini in production: RAG, embeddings, streaming, fallbacks, cost control and on-device Core ML.",
  },
  {
    icon: Cpu,
    title: "Native Android",
    desc: "Kotlin and Jetpack Compose, coroutines and Flow, MVVM, background work and Play Store release — the Android half of a product built to the same standard as the iOS half.",
  },
  {
    icon: Layers,
    title: "Flutter & React Native",
    desc: "Production cross-platform apps with Riverpod/Bloc or TypeScript, plus platform channels and native modules when Dart or JS alone cannot reach the hardware.",
  },
  {
    icon: Monitor,
    title: "Web applications",
    desc: "React and TypeScript front-ends, admin dashboards and clinician portals — usually the web half of a mobile product, sharing its API and data model.",
  },
  {
    icon: Cloud,
    title: "Backend the app needs",
    desc: "Firebase, AWS, Node.js, REST/GraphQL, WebSockets — enough backend to unblock the mobile product, built to hand over.",
  },
  {
    icon: Shield,
    title: "Security & compliance",
    desc: "Keychain, biometrics, certificate pinning, encrypted local stores, and a commit history that survives an audit.",
  },
  {
    icon: Rocket,
    title: "Release & store review",
    desc: "CI/CD, TestFlight and Play Console tracks, phased rollout, and handling review rejections — including the ones about Bluetooth background modes and health data.",
  },
];

/** Read at a glance under the hero — the five platforms, each with its stack. */
export const PLATFORMS = [
  { icon: Smartphone, name: "iOS", detail: "Swift · SwiftUI · UIKit" },
  { icon: Cpu, name: "Android", detail: "Kotlin · Jetpack Compose" },
  { icon: Layers, name: "Flutter", detail: "Dart · Riverpod · Bloc" },
  { icon: Zap, name: "React Native", detail: "TypeScript · Native modules" },
  { icon: Monitor, name: "Web", detail: "React · Node.js · APIs" },
];

export const INDUSTRIES = [
  { icon: Stethoscope, name: "Healthcare & MedTech" },
  { icon: Watch, name: "Wearables & fitness" },
  { icon: Activity, name: "IoT & smart devices" },
  { icon: Building2, name: "Enterprise & SaaS" },
  { icon: Brain, name: "AI products" },
  { icon: Users, name: "Marketplaces & social" },
];

/**
 * Every entry is a delivered, shipped project. `outcome` is the line a client
 * actually reads — fill each with a real, specific result (a number, a launch,
 * a review passed). Leave it empty rather than invent one; the bubble renders
 * fine without it. `duration` is optional and hidden when blank.
 */
export const PROJECTS = [
  {
    name: "iPass",
    role: "iOS Developer",
    duration: "",
    tag: "Access control · BLE",
    featured: true,
    desc: "Bluetooth access-control app authenticating phone-to-reader over ECC key exchange, with offline credential caching so doors keep opening when the network doesn't.",
    outcome:
      "Doors stay operable through network outages — credentials authenticate locally over ECC",
    tech: ["SwiftUI", "CoreBluetooth", "ECC auth"],
  },
  {
    name: "CokePay",
    role: "Sr. iOS Developer",
    duration: "",
    tag: "Payments · IoT",
    featured: true,
    desc: "Vending-machine companion app over encrypted BLE — in-app wallet top-up, product selection, and a dispense handshake that reconciles correctly when the connection drops mid-transaction.",
    outcome:
      "No lost payments when a connection drops — the dispense handshake reconciles every transaction",
    tech: ["SwiftUI", "CoreBluetooth", "Wallet payments", "Lottie"],
  },
  {
    name: "STIMLEVE",
    role: "iOS Developer",
    duration: "1 year",
    tag: "Healthcare · BLE",
    featured: true,
    desc: "Rehabilitation platform synchronising electrical muscle stimulation with guided mobility exercises — real-time device control driven by session protocols clinicians define and patients follow unsupervised.",
    outcome: "Clinician-defined therapy protocols run safely at home, without supervision",
    tech: ["SwiftUI", "CoreBluetooth", "Session protocols"],
  },
  {
    name: "CamCrasher",
    role: "iOS Developer",
    duration: "",
    tag: "Automotive · Safety",
    featured: true,
    desc: "Driver-safety app that signals upcoming speed cameras with peripheral light cues instead of notifications, so the warning never pulls a driver's eyes off the road. Built on TomTom® data.",
    outcome: "Hazard warnings delivered without taking a driver's eyes off the road",
    tech: ["Swift", "MVVM", "CoreLocation", "TomTom"],
  },
  {
    name: "Moovii",
    role: "Flutter Developer",
    duration: "",
    tag: "Entertainment · Flutter",
    featured: true,
    desc: "Film and TV recommendation app whose matching sharpens as it learns a viewer's taste. One Flutter codebase, shipped to both stores.",
    outcome: "Live on the App Store — one Flutter codebase shipped to both stores",
    tech: ["Flutter", "Firebase", "REST", "Social auth"],
  },
  {
    name: "Handson",
    role: "Sr. React Native Developer",
    duration: "2 months",
    tag: "Enterprise · BLE",
    featured: true,
    desc: "Tool-tracking app for job sites: BLE tags report location in real time, with map clustering and spiderfied pins that stay readable when twenty tools sit in the same van.",
    outcome: "Crews locate tools on site in real time, even when a dozen sit in the same vehicle",
    tech: ["React Native", "BLE", "Map clustering"],
  },
  {
    name: "HummBugs",
    role: "Sr. React Native Developer",
    duration: "2 months",
    tag: "IoT · Cross-platform",
    featured: false,
    desc: "Cross-platform controller for BLE smart hardware, with animated device states driven directly by live characteristic updates.",
    outcome: "One React Native codebase driving BLE hardware on both iOS and Android",
    tech: ["React Native", "BLE", "Lottie"],
  },
  {
    name: "GoBe!",
    role: "iOS Developer",
    duration: "2.5 months",
    tag: "Social · Media",
    featured: false,
    desc: "Location-memory app for capturing places, architecture and street art, with in-app media editing and social sharing.",
    outcome: "Capture, edit and share a location without ever leaving the app",
    tech: ["Swift", "MVVM", "Media editing", "Social auth"],
  },
  {
    name: "Park & Recharge",
    role: "iOS Developer",
    duration: "1.5 months",
    tag: "EV · Payments",
    featured: false,
    desc: "EV charge-point companion: network access, session history charts and in-app payment for drivers mid-journey.",
    outcome: "Drivers find, use and pay for a charge point in a single session",
    tech: ["Swift", "Core Data", "Charts", "Payments"],
  },
];

export const TIMELINE = [
  {
    year: "2024 — Present",
    role: "Independent Senior Mobile Engineer",
    org: "Direct clients, worldwide",
    detail:
      "Contracted directly by product teams in the US, EU and MENA for iOS, Flutter and BLE work — usually as the senior mobile engineer on a small in-house team.",
  },
  {
    year: "2020 — 2024",
    role: "Lead iOS Engineer",
    org: "Product companies & long-term contracts",
    detail:
      "Owned mobile architecture across healthcare, fintech and IoT products: greenfield builds, legacy rescues and App Store releases.",
  },
  {
    year: "2016 — 2020",
    role: "Senior iOS Developer",
    org: "Product companies",
    detail:
      "Built and scaled consumer and B2B apps across sports, media, e-commerce and travel. Moved teams from MVC to testable, modular architecture.",
  },
  {
    year: "2013 — 2016",
    role: "iOS Developer",
    org: "Software consultancies",
    detail:
      "Objective-C through the Swift transition. Native SDK work, first App Store launches, and the habit of shipping to a deadline.",
  },
];

export const TECH = [
  "Swift",
  "SwiftUI",
  "UIKit",
  "Objective-C",
  "Combine",
  "Swift Concurrency",
  "Kotlin",
  "Jetpack Compose",
  "Coroutines",
  "CoreBluetooth",
  "HealthKit",
  "Core ML",
  "Core Data",
  "Room",
  "Flutter",
  "Dart",
  "React Native",
  "React",
  "Next.js",
  "TypeScript",
  "Tailwind CSS",
  "Node.js",
  "Firebase",
  "Supabase",
  "AWS",
  "PostgreSQL",
  "GraphQL",
  "WebSockets",
  "OpenAI",
  "Claude",
  "Docker",
  "GitHub Actions",
  "Fastlane",
  "XCTest",
  "Playwright",
  "Figma",
];

/** Three ways to buy. Clients self-select, which makes the first email far better. */
export const ENGAGEMENTS = [
  {
    icon: Rocket,
    name: "Fixed-scope build",
    best: "Best for: MVPs and defined feature sets",
    desc: "We agree the scope, architecture and milestones in writing before a line of code. You get a working, releasable app at each milestone.",
    points: [
      "Written scope and fixed milestones",
      "Architecture documented up front",
      "App Store or Play release included",
      "30 days of post-launch fixes",
    ],
    highlight: false,
  },
  {
    icon: Zap,
    name: "Monthly retainer",
    best: "Best for: teams shipping continuously",
    desc: "Reserved capacity every month. Weekly demos, direct access on your Slack, and a roadmap we adjust together as the product moves.",
    points: [
      "Reserved days per month",
      "Weekly demo, not a status deck",
      "Direct Slack / Teams access",
      "Roadmap and architecture input",
    ],
    highlight: true,
  },
  {
    icon: Cpu,
    name: "Architecture review",
    best: "Best for: an app that has stopped scaling",
    desc: "A short, fixed engagement on an existing codebase. You get a written assessment and a prioritised plan you can execute with or without me.",
    points: [
      "Codebase and architecture audit",
      "Crash, performance and battery review",
      "Written, prioritised remediation plan",
      "Fixed price, fixed duration",
    ],
    highlight: false,
  },
];

export const PROCESS = [
  {
    step: "01",
    title: "Call & scope",
    desc: "A 30-minute call on the product, users and constraints. You leave with a written scope, a timeline and a price — free, no obligation.",
  },
  {
    step: "02",
    title: "Architecture",
    desc: "System design, tech choices, third-party and compliance risks flagged early, and the milestone plan we'll hold ourselves to.",
  },
  {
    step: "03",
    title: "Build & demo",
    desc: "Weekly builds you can install and use. Clean, reviewed, documented code in your repo from day one — never a big-bang handover.",
  },
  {
    step: "04",
    title: "Ship & support",
    desc: "Store submission, review responses, phased rollout and monitoring. Then 30 days of fixes, or an ongoing retainer if you want me to stay.",
  },
];

export const WHY = [
  "You speak directly with the engineer writing your code, every day",
  "Architecture you can read, audit and hand to your next hire",
  "Bluetooth and connected-hardware experience most mobile developers do not have",
  "Patient data handled to HIPAA-conscious standards, not guesswork",
  "AI features built with fallbacks and cost controls, not just a demonstration",
  "App Store submissions handled end to end, rejections included",
  "A working build you can install every week, so progress is never a guess",
  "Fixed, written scope before the work starts",
  "Support after launch, not a disappearing act",
];

/**
 * Real client feedback only. Paste verbatim quotes from your Upwork reviews or
 * signed-off references, with a name or a role the client agreed to. If this
 * array is empty the section does not render — an empty testimonials block is
 * far better than an invented one, and buyers in this market can tell.
 *
 * Shape: { quote: string; author: string; role: string; source?: string }
 */
export const TESTIMONIALS: { quote: string; author: string; role: string; source?: string }[] = [];

export const FAQ = [
  {
    q: "Which platforms do you build for?",
    a: "Native iOS (Swift, SwiftUI), native Android (Kotlin, Jetpack Compose), and cross-platform with Flutter or React Native when one codebase for both stores is the sensible choice. I also build the web side — React and TypeScript front-ends, admin dashboards and the Node.js APIs behind them — so a product can be delivered end to end rather than split across several suppliers.",
  },
  {
    q: "Do you work alone or with a team?",
    a: "Alone, by design. You hire me and I write the code. For larger builds I'll work alongside your existing designers, backend and QA people rather than bringing in subcontractors — so you always know exactly who is on your project.",
  },
  {
    q: "What does a project typically cost?",
    a: "Fixed-scope builds are quoted after a free scoping call, based on the milestone plan we agree. Retainers are priced per reserved day and billed monthly. Architecture reviews are a flat fee. You'll always have the number in writing before anything starts.",
  },
  {
    q: "What time zones do you cover?",
    a: "I'm in IST (UTC+5:30) and keep daily overlap with US, UK, EU and MENA business hours. Work is async-first with a written daily update, plus a live call whenever it's faster than typing.",
  },
  {
    q: "How do you handle NDAs, IP and confidentiality?",
    a: "NDA signed before scoping if you want one. Work happens in your private repo under your account, full IP transfers to you on delivery, and the commit history is clean enough to hand to an auditor or a due-diligence team.",
  },
  {
    q: "Can you take over an existing codebase?",
    a: "Often, yes — it's a large part of what I do. It usually starts with an architecture review so you get an honest read on what's salvageable before committing to a rebuild.",
  },
  {
    q: "Do you work with Indian companies as well as overseas clients?",
    a: "Yes, both. I work with startups and enterprises across the US, UK, Europe and the Middle East, and with companies in India. Indian clients can be invoiced in INR and meet in person in Ahmedabad if that is useful; overseas clients are invoiced in USD, EUR or GBP through Upwork or by direct bank transfer.",
  },
  {
    q: "How will we communicate during the project?",
    a: "In English, in writing, every working day. You get a short daily update on what was completed and what is next, a working build you can install each week, and a call whenever it is faster than typing. I keep a daily overlap with your business hours, so you are never waiting a full day for an answer.",
  },
  {
    q: "How do we start?",
    a: "Send a short brief through the form of your choice below. You'll get a reply within 24 hours, and if it's a fit, a scoping call and a written proposal within a few days.",
  },
];
