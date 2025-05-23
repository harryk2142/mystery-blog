import mdx from "@astrojs/mdx";
import preact from "@astrojs/preact";
import sitemap from "@astrojs/sitemap";
import rehypeAstroRelativeMarkdownLinks from "astro-rehype-relative-markdown-links";
import { defineConfig } from "astro/config";
import dotenv from "dotenv";

dotenv.config(); // load env vars from .env

// https://astro.build/config
export default defineConfig({
	// site: "https://harryk2142.github.io",
	site: "https://the-ai-files.de",
	base: "/",
	root: ".",
	markdown: {
		remarkPlugins: [],
		rehypePlugins: [rehypeAstroRelativeMarkdownLinks],
	},
	integrations: [
		mdx({
			remarkPlugins: [],
			rehypePlugins: [rehypeAstroRelativeMarkdownLinks],
		}),
		sitemap({
			filter: (page) => !page.includes("tags") && !page.includes("api"),
		}),
		preact({
			compat: true,
		}),
	],
	server: {
		port: 3000,
		// open: true,
	},

	vite: {
		define: {
			FB_API_KEY: JSON.stringify(process.env.FIREBASE_COMMENTS_API_KEY),
			FB_PROJECT_ID: JSON.stringify(process.env.FIREBASE_COMMENTS_PROJECT_ID),
			DEBUG: process.env.DEBUG,
		},
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
