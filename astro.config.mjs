import { defineConfig } from "astro/config";

export default defineConfig({
  site: "https://masarray.github.io/iec60870-showcase",
  base: "/iec60870-showcase/",
  trailingSlash: "ignore",
  build: { assets: "_astro" },
});
