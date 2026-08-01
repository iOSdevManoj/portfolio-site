import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import viteReact from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import { nitro } from "nitro/vite";
import { defineConfig } from "vite";
import tsConfigPaths from "vite-tsconfig-paths";

export default defineConfig({
  server: { port: 8080 },

  // Vite runs PostCSS in dev but Lightning CSS at build, so a CSS feature can
  // look correct in the preview and break in the deployed output. Pinning the
  // transformer for both keeps dev honest. Lightning CSS also handles vendor
  // prefixing — do not hand-write `-webkit-` properties, it rewrites them.
  css: { transformer: "lightningcss" },

  resolve: {
    alias: { "@": `${process.cwd()}/src` },
    // Two copies of React (or of the query client) break hooks and hydration.
    dedupe: [
      "react",
      "react-dom",
      "react/jsx-runtime",
      "react/jsx-dev-runtime",
      "@tanstack/react-query",
      "@tanstack/query-core",
    ],
  },

  optimizeDeps: {
    // React core only. Adding @tanstack/react-start here pulls its
    // node:async_hooks server entry into the client bundle and breaks hydration.
    include: [
      "react",
      "react-dom",
      "react-dom/client",
      "react/jsx-runtime",
      "react/jsx-dev-runtime",
    ],
  },

  plugins: [
    tailwindcss(),
    tsConfigPaths({ projects: ["./tsconfig.json"] }),
    tanstackStart({
      // Route the bundled server entry through src/server.ts (the SSR error wrapper).
      server: { entry: "server" },
      // Keep server-only modules out of the client graph.
      importProtection: {
        behavior: "error",
        client: { files: ["**/server/**"], specifiers: ["server-only"] },
      },
    }),
    // No preset: nitro detects the target from the environment, so it emits a
    // Vercel build on Vercel and a Node server locally.
    nitro(),
    viteReact(),
  ],
});
