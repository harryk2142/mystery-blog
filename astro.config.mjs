import { defineConfig } from "astro/config";
import mdx from "@astrojs/mdx";

import sitemap from "@astrojs/sitemap";

// https://astro.build/config
export default defineConfig({
  site: "https://the-ai-files.de",
  integrations: [
    mdx(),
    sitemap({
      filter: (page) => !page.includes("tags") && !page.includes("api"),
    }),
  ],
  server: {
    port: 3000,
    // open: true,
  },

  vite: {
    build: {
      modulePreload: false,
      rollupOptions: {
        output: {
          assetFileNames: "assets/[name][extname]",
          inlineDynamicImports: false,
        },
      },
    },
  },
});
