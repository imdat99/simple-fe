import { defineConfig } from "vite";
// import { h } from "src/core/render";
import path from "path";
export default defineConfig({
  resolve: {
    alias: {
      "@app": path.resolve(__dirname, "./src/app"),
      "@core": path.resolve(__dirname, "./src/core"),
    },
  },
  esbuild: {
    jsxFactory: "h",
  },
});
