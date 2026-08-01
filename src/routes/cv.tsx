import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft, Printer } from "lucide-react";

import { CONTACT, EXPERTISE, PROJECTS, TECH, TIMELINE } from "@/content/profile";

export const Route = createFileRoute("/cv")({
  component: CV,
  head: () => ({
    meta: [
      { title: "Manoj Barad — CV | Senior Mobile & Web Engineer" },
      {
        name: "description",
        content:
          "Curriculum vitae of Manoj Barad, senior mobile and web engineer: iOS, Android, Flutter, React Native and web, with 12+ years of delivered products.",
      },
      // A CV page has no SEO value and can outrank the portfolio for his name.
      { name: "robots", content: "noindex, follow" },
    ],
  }),
});

/**
 * Print-first CV. `CONTACT.resume` points here, so "Download CV" opens a page
 * the browser can save as PDF — no binary to keep in sync with the site, and
 * it stays correct whenever the shared profile data changes.
 */
function CV() {
  return (
    <div className="min-h-screen bg-white text-[#111] print:bg-white">
      {/* Screen-only toolbar */}
      <div className="border-b border-neutral-200 bg-neutral-50 print:hidden">
        <div className="mx-auto flex max-w-3xl items-center justify-between gap-4 px-6 py-3">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-sm font-medium text-neutral-600 transition hover:text-neutral-900"
          >
            <ArrowLeft className="h-4 w-4" /> Back to portfolio
          </Link>
          <button
            type="button"
            onClick={() => window.print()}
            className="inline-flex items-center gap-2 rounded-full bg-[#0d7f8c] px-4 py-2 text-sm font-semibold text-white transition hover:opacity-90"
          >
            <Printer className="h-4 w-4" /> Save as PDF
          </button>
        </div>
      </div>

      <main className="mx-auto max-w-3xl px-6 py-10 print:max-w-none print:px-0 print:py-0">
        <header className="border-b-2 border-[#0d7f8c] pb-5">
          <h1 className="text-3xl font-bold tracking-tight">Manoj Barad</h1>
          <p className="mt-1 text-lg text-[#0d7f8c]">Senior Mobile &amp; Web Engineer</p>
          <p className="mt-3 text-sm leading-relaxed text-neutral-700">
            {CONTACT.location} · {CONTACT.timezone} · {CONTACT.email} · {CONTACT.whatsappDisplay}
            <br />
            {[CONTACT.linkedin, CONTACT.github, CONTACT.upwork]
              .filter(Boolean)
              .map((u) => u.replace(/^https?:\/\/(www\.)?/, "").replace(/\?.*$/, ""))
              .join(" · ")}
          </p>
        </header>

        <Block title="Profile">
          <p className="text-sm leading-relaxed text-neutral-800">
            Senior engineer with 12+ years building mobile applications and the web systems behind
            them. Native iOS (Objective-C through Swift and SwiftUI) is my deepest skill, alongside
            Android, Flutter and React Native, plus React and Node.js on the web. I work
            independently and directly with client teams across the United States, the United
            Kingdom, Europe, the Middle East and India. Strongest domains: healthcare and regulated
            data, Bluetooth and connected hardware, and applied AI.
          </p>
        </Block>

        <Block title="Core skills">
          <div className="grid gap-x-8 gap-y-2 sm:grid-cols-2">
            {EXPERTISE.map((e) => (
              <div key={e.title} className="text-sm">
                <span className="font-semibold">{e.title}</span>
                <span className="text-neutral-700"> — {e.desc}</span>
              </div>
            ))}
          </div>
        </Block>

        <Block title="Experience">
          {TIMELINE.map((t) => (
            <div key={t.year} className="mb-4 last:mb-0">
              <div className="flex flex-wrap items-baseline justify-between gap-2">
                <span className="font-semibold">{t.role}</span>
                <span className="text-xs text-neutral-600">{t.year}</span>
              </div>
              <div className="text-sm text-[#0d7f8c]">{t.org}</div>
              <p className="mt-1 text-sm leading-relaxed text-neutral-700">{t.detail}</p>
            </div>
          ))}
        </Block>

        <Block title="Selected projects">
          {PROJECTS.map((p) => (
            <div key={p.name} className="mb-3.5 last:mb-0 print:break-inside-avoid">
              <div className="flex flex-wrap items-baseline justify-between gap-2">
                <span className="font-semibold">
                  {p.name} <span className="font-normal text-neutral-600">— {p.role}</span>
                </span>
                <span className="text-xs text-neutral-600">
                  {p.tag}
                  {p.duration ? ` · ${p.duration}` : ""}
                </span>
              </div>
              <p className="mt-0.5 text-sm leading-relaxed text-neutral-700">{p.desc}</p>
              {p.outcome && (
                <p className="mt-0.5 text-sm font-medium text-[#0d7f8c]">{p.outcome}</p>
              )}
              <p className="mt-0.5 text-xs text-neutral-500">{p.tech.join(" · ")}</p>
            </div>
          ))}
        </Block>

        <Block title="Technologies">
          <p className="text-sm leading-relaxed text-neutral-700">{TECH.join(" · ")}</p>
        </Block>

        <Block title="Working arrangement">
          <p className="text-sm leading-relaxed text-neutral-700">
            Available for fixed-scope builds, monthly retainers and architecture reviews. NDA before
            scoping, full IP transfer on delivery, work in your private repository. Daily overlap
            with US, UK, EU and MENA business hours, with a written update every working day.
            Invoiced in INR for Indian clients, or USD/EUR/GBP via Upwork or bank transfer.
          </p>
        </Block>
      </main>
    </div>
  );
}

function Block({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="mt-6 print:break-inside-avoid">
      <h2 className="mb-2.5 text-[11px] font-bold uppercase tracking-[0.16em] text-[#0d7f8c]">
        {title}
      </h2>
      {children}
    </section>
  );
}
