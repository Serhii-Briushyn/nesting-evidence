import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "node:path";

// https://vite.dev/config/
export default defineConfig({
  root: __dirname,
  base: "./",
  plugins: [react()],
  resolve: {
    alias: {
      "@app": path.resolve(__dirname, "app"),
      "@features": path.resolve(__dirname, "features"),
      "@pages": path.resolve(__dirname, "pages"),
      "@shared": path.resolve(__dirname, "shared"),
    },
  },
});
