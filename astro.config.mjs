import { defineConfig } from "astro/config";
import sitemap from "@astrojs/sitemap";

// Served from https://kartikdangi1.github.io/Portfolio/ (GitHub Pages project site).
export default defineConfig({
  site: "https://kartikdangi1.github.io",
  base: "/Portfolio",
  trailingSlash: "always",
  integrations: [
    sitemap({
      i18n: { defaultLocale: "en", locales: { en: "en", de: "de" } }
    })
  ]
});
