import { defineConfig } from "astro/config";

export default defineConfig({
  site: "https://masarray.github.io",
  base: "/iec60870-showcase/", // ← WAJIB
  trailingSlash: "ignore",
  build: { assets: "_astro" },
});
