import { defineConfig } from "astro/config";

export default defineConfig(({ command }) => {
  const isDev = command === "dev";

  return {
    site: "https://masarray.github.io",
    base: isDev ? "/" : "/iec60870-showcase/",
    output: "static",
  };
});
