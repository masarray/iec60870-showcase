import { defineConfig } from "astro/config";

const isDev = process.env.NODE_ENV !== "production";

export default defineConfig({
  site: "https://masarray.github.io",
  base: isDev ? "/" : "/iec60870-showcase",
  output: "static",
});
