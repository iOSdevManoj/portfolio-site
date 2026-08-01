import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import { useEffect, type ReactNode } from "react";

import appCss from "../styles.css?url";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-7xl font-bold text-gradient">404</h1>
        <h2 className="mt-4 text-xl font-semibold">Page not found</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          The page you're looking for doesn't exist.
        </p>
        <Link
          to="/"
          className="mt-6 inline-flex items-center rounded-full bg-brand px-5 py-2.5 text-sm font-medium text-primary-foreground"
        >
          Go home
        </Link>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  const router = useRouter();
  useEffect(() => {
    console.error("Root error boundary:", error);
  }, [error]);
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-xl font-semibold">This page didn't load</h1>
        <p className="mt-2 text-sm text-muted-foreground">Try refreshing.</p>
        <button
          onClick={() => {
            router.invalidate();
            reset();
          }}
          className="mt-6 rounded-full bg-brand px-5 py-2.5 text-sm font-medium text-primary-foreground"
        >
          Try again
        </button>
      </div>
    </div>
  );
}

const SITE_URL = "https://portfolio-site-roan-mu-47.vercel.app";
const TITLE = "Manoj Barad — Senior Mobile & Web Engineer | iOS, Android, Flutter, React Native";
const DESCRIPTION =
  "Senior mobile and web engineer with 12+ years building iOS, Android, Flutter and React Native apps, with the web dashboards and APIs behind them. Healthcare, Bluetooth hardware and AI products. You work directly with the engineer.";
// Social preview, 1200x630. Regenerate with `python3 scripts/make-og-cover.py`.
const OG_IMAGE = `${SITE_URL}/og-cover.png`;

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: TITLE },
      { name: "description", content: DESCRIPTION },
      { name: "author", content: "Manoj Barad" },
      {
        name: "keywords",
        content:
          "Freelance iOS Developer, Android Developer, Flutter Developer, React Native Developer, Senior Mobile Engineer, Web Developer, Swift, SwiftUI, Kotlin, Jetpack Compose, TypeScript, React, Node.js, Healthcare Apps, BLE, CoreBluetooth, IoT, AI Integration, HealthKit, HIPAA, Hire Mobile Developer India",
      },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESCRIPTION },
      { property: "og:type", content: "website" },
      { property: "og:site_name", content: "Manoj Barad" },
      { property: "og:image", content: OG_IMAGE },
      // LinkedIn and Slack lay the card out before the image loads; without
      // explicit dimensions they fall back to a small thumbnail.
      { property: "og:image:width", content: "1200" },
      { property: "og:image:height", content: "630" },
      { property: "og:image:type", content: "image/png" },
      {
        property: "og:image:alt",
        content:
          "Manoj Barad — Senior Mobile & Web Engineer. iOS, Android, Flutter, React Native, Web.",
      },
      { property: "og:locale", content: "en_US" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: TITLE },
      { name: "twitter:description", content: DESCRIPTION },
      { name: "twitter:image", content: OG_IMAGE },
      {
        name: "twitter:image:alt",
        content:
          "Manoj Barad — Senior Mobile & Web Engineer. iOS, Android, Flutter, React Native, Web.",
      },
      { name: "theme-color", content: "#0D4F5C" },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      // An SVG icon at a brand-new path is the reliable way to displace a cached
      // favicon — browsers hold /favicon.ico for a long time and often ignore a
      // same-URL swap. Modern browsers prefer the SVG; ?v=2 busts the .ico for
      // the rest. Bump the version if the icon ever changes again.
      { rel: "icon", href: "/icon.svg", type: "image/svg+xml" },
      { rel: "icon", href: "/favicon.ico?v=2", sizes: "any" },
      { rel: "apple-touch-icon", href: "/apple-touch-icon.png?v=2" },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700&family=Inter:wght@300;400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap",
      },
    ],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Person",
          name: "Manoj Barad",
          jobTitle: "Senior Mobile & Web Engineer",
          url: SITE_URL,
          image: OG_IMAGE,
          description: DESCRIPTION,
          address: { "@type": "PostalAddress", addressLocality: "Ahmedabad", addressCountry: "IN" },
          knowsAbout: [
            "iOS Development",
            "Android Development",
            "Swift",
            "SwiftUI",
            "Kotlin",
            "Flutter",
            "React Native",
            "Web Development",
            "React",
            "Node.js",
            "Healthcare Apps",
            "Bluetooth Low Energy",
            "IoT",
            "AI Integration",
            "Mobile Architecture",
          ],
          sameAs: [
            "https://www.linkedin.com/in/manoj-barad--ios",
            "https://www.upwork.com/freelancers/~011df072813255b527",
            "https://github.com/iOSdevManoj",
          ],
        }),
      },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();
  return (
    <QueryClientProvider client={queryClient}>
      <Outlet />
    </QueryClientProvider>
  );
}
