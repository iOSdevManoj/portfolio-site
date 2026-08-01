/**
 * All portfolio content lives here, separate from presentation. Both the
 * landing page (`src/routes/index.tsx`) and the CV (`src/routes/cv.tsx`)
 * render from these exports, so a fact is edited in exactly one place.
 */
import {
  Activity,
  Blocks,
  Boxes,
  Compass,
  Gauge,
  Handshake,
  LifeBuoy,
  Search,
  Wrench,
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

/**
 * Builds a prefilled enquiry naming the engagement or budget level the client
 * clicked. The first email then arrives already scoped, which removes a
 * round-trip before anything useful can be said back.
 */
export function enquiryHref(topic: string) {
  return `mailto:${CONTACT.email}?subject=${encodeURIComponent(
    `Enquiry — ${topic}`,
  )}&body=${encodeURIComponent(
    [
      "Hi Manoj,",
      "",
      `I'm interested in: ${topic}`,
      "",
      "What we're building:",
      "Platforms (iOS / Android / web):",
      "Timeline:",
      "Budget range:",
      "",
      "Thanks,",
    ].join("\n"),
  )}`;
}

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
    desc: "The person you speak to is the person writing the code. Nobody is handed your project halfway through.",
  },
  {
    icon: Globe,
    title: "Overlap with your hours",
    desc: "Several hours of overlap every day with US, UK, EU and MENA teams, and a written update whether or not we speak.",
  },
  {
    icon: FileCheck,
    title: "NDA and IP, sorted upfront",
    desc: "NDA before we discuss specifics, your private repository throughout, and full ownership of the code transferred on delivery.",
  },
  {
    icon: Clock,
    title: "You know the price before I start",
    desc: "Scope and milestones agreed in writing and priced up front, so the cost is not something you discover as we go.",
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

/**
 * What a given budget typically covers. Deliberately framed as scope, not rate:
 * the engineering standard is identical at every level — what grows is how much
 * gets built, and how much planning, testing, documentation and support wraps
 * around it. `adds` states what each level gains over the one below, so the
 * ladder reads as increasing value rather than increasing price.
 */
export const BUDGET_GUIDE = [
  {
    icon: Wrench,
    range: "$20 – $50",
    name: "Quick fixes and second opinions",
    bestFor: "An existing app, one specific problem",
    desc: "A contained piece of work on a codebase that already runs. Useful when you need something corrected properly rather than worked around.",
    includes: [
      "Bug fixes and crash investigation",
      "UI and layout corrections",
      "Small code changes on an existing screen",
      "A short consultation or code read-through",
    ],
    adds: "",
    highlight: false,
  },
  {
    icon: Blocks,
    range: "$50 – $100",
    name: "A single feature or integration",
    bestFor: "Adding one well-defined capability",
    desc: "One feature, built properly and merged into your codebase — including the error and edge cases that usually get skipped at this size.",
    includes: [
      "A self-contained feature, end to end",
      "Third-party or REST API integration",
      "Firebase setup and problem-solving",
      "Reusable SwiftUI or Compose components",
      "Targeted performance work",
    ],
    adds: "Everything above, plus code written to be extended rather than patched",
    highlight: false,
  },
  {
    icon: Boxes,
    range: "$100 – $250",
    name: "Substantial features and structural work",
    bestFor: "Work that touches how the app is built",
    desc: "Features large enough to affect architecture, or focused refactoring that makes the next six months of work cheaper.",
    includes: [
      "Authentication and user session handling",
      "Bluetooth / BLE device integration",
      "AI and LLM feature integration",
      "Refactoring and architecture improvements",
      "Data layer and offline behaviour",
    ],
    adds: "Everything above, plus a written explanation of the approach and why",
    highlight: false,
  },
  {
    icon: Layers,
    range: "$250 – $500",
    name: "A complete module, delivered",
    bestFor: "A whole area of the product, finished",
    desc: "An entire part of the app built to production standard — designed, implemented, tested and documented so your team can maintain it without me.",
    includes: [
      "Complete modules and multi-screen flows",
      "Subscriptions and payment integration",
      "Dashboards and reporting screens",
      "Offline storage and sync",
      "Automated tests and handover documentation",
    ],
    adds: "Everything above, plus tests and documentation as part of delivery",
    highlight: false,
  },
  {
    icon: Rocket,
    range: "$500 – $1,000",
    name: "An MVP, built and launched",
    bestFor: "Getting a first version into users' hands",
    desc: "A working product rather than a prototype: the architecture is chosen for what comes after launch, not just for the demo.",
    includes: [
      "Multi-screen application, built end to end",
      "Backend integration and data modelling",
      "Architecture designed to grow with the product",
      "Deployment and release pipeline",
      "App Store and Play submission support",
    ],
    adds: "Everything above, plus architecture planning and a real release",
    highlight: true,
  },
  {
    icon: Handshake,
    range: "$1,000 +",
    name: "Full product and ongoing partnership",
    bestFor: "Products where mobile is the business",
    desc: "Complete ownership of the mobile and web build, with the technical judgement that goes around it — what to build, what to defer, and what will hurt in a year.",
    includes: [
      "End-to-end application development",
      "AI, HealthKit, BLE and IoT integration",
      "Backend and system architecture",
      "CI/CD and automated release pipelines",
      "Technical consulting and roadmap input",
      "Long-term maintenance and dedicated support",
    ],
    adds: "Everything above, plus strategy, ongoing support and a long-term technical partner",
    highlight: false,
  },
];

/**
 * How an engagement is shaped, as opposed to what it costs. Ordered by
 * commitment so a cautious client meets the low-risk entry point first, and
 * every card names who it suits, what arrives, and how it is priced — the three
 * questions that otherwise become the first email.
 */
export const ENGAGEMENTS = [
  {
    icon: Search,
    name: "Consultation and code review",
    best: "Best when you need an answer before you commit",
    desc: "A short, fixed engagement on an existing codebase or a plan you are weighing up. You get an honest technical read and a prioritised list of what to do — usable whether or not you hire me for the work.",
    points: [
      "Architecture and code quality assessment",
      "Crash, performance and battery findings",
      "Prioritised, written recommendations",
      "Fixed fee, fixed duration",
    ],
    pricing: "Fixed fee, agreed before we start",
    highlight: false,
  },
  {
    icon: Blocks,
    name: "Feature or module build",
    best: "Best when the product exists and the next piece is clear",
    desc: "A defined piece of work delivered into your codebase — designed, built, tested and documented, following your existing conventions rather than imposing mine.",
    points: [
      "Written scope agreed before any code",
      "Built to your conventions and review process",
      "Tests and documentation included",
      "Merged and released with your team",
    ],
    pricing: "Fixed price per scope",
    highlight: false,
  },
  {
    icon: Rocket,
    name: "End-to-end product build",
    best: "Best when you are starting from nothing",
    desc: "From first call to store listing. Architecture, build and release handled by one engineer, with a working version you can install at every milestone.",
    points: [
      "Architecture and milestone plan up front",
      "Installable build every week",
      "App Store and Play submission handled",
      "30 days of fixes after launch",
    ],
    pricing: "Milestone-based, quoted after scoping",
    highlight: false,
  },
  {
    icon: Handshake,
    name: "Ongoing engineering partner",
    best: "Best when mobile is central to the business",
    desc: "Reserved capacity each month, with the continuity that comes from one engineer who already knows your codebase. Most clients who start with a build end up here.",
    points: [
      "Reserved days each month",
      "Direct access on Slack or Teams",
      "Roadmap and architecture input",
      "Priority on urgent production issues",
    ],
    pricing: "Monthly retainer, per reserved day",
    highlight: true,
  },
];

export const PROCESS = [
  {
    step: "01",
    title: "Call & scope",
    desc: "Thirty minutes on what you are building, who it is for and what constrains it. You leave with a written scope, a timeline and a price. No charge, and no obligation to continue.",
  },
  {
    step: "02",
    title: "Architecture",
    desc: "System design, tech choices, third-party and compliance risks flagged early, and the milestone plan we hold ourselves to.",
  },
  {
    step: "03",
    title: "Build & demo",
    desc: "A build you can install and use every week, and code landing in your repository from the first day. You are never waiting until the end to find out what you bought.",
  },
  {
    step: "04",
    title: "Ship & support",
    desc: "Submission, review responses and phased rollout, then thirty days of fixes included. If you want me to stay on, a retainer keeps the same engineer on the codebase.",
  },
];

export const WHY = [
  "You speak directly with the engineer writing your code, every day",
  "Code your next engineer can read, extend and take over without a rewrite",
  "Bluetooth and connected-hardware experience most mobile developers do not have",
  "Patient data handled to HIPAA-conscious standards, not guesswork",
  "AI features built with fallbacks and cost controls, not just a demonstration",
  "App Store submissions handled end to end, rejections included",
  "A working build you can install every week, so progress is never a guess",
  "A written scope and a price before the work starts",
  "Reachable after launch, when most of the real questions arrive",
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
    a: "It depends on scope rather than on a rate card, so the guide above shows what different budgets usually cover — from a contained fix through to a full product build. Those are examples, not packages. After a short call I send a written scope and a fixed price, and you decide from there.",
  },
  {
    q: "Does a smaller budget mean lower-quality work?",
    a: "No. The engineering standard is the same at every level — the same review, the same care with edge cases, the same code you can hand to someone else. What changes with budget is how much gets built, and how much planning, testing, documentation and post-launch support wraps around it. If a budget cannot cover something properly I will say so before we start, rather than quietly deliver a thinner version.",
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
