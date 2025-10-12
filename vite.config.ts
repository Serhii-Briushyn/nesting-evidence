import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "node:path";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  root: path.resolve(__dirname, "app/renderer"),
  resolve: {
    alias: {
      "@app": path.resolve(__dirname, "app/renderer/app"),
      "@features": path.resolve(__dirname, "app/renderer/features"),
      "@pages": path.resolve(__dirname, "app/renderer/pages"),
      "@shared": path.resolve(__dirname, "app/renderer/shared"),
    },
  },
});
