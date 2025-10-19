import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig({
  root: __dirname,
  base: "./",
  plugins: [react(), tsconfigPaths()],
  build: {
    outDir: "dist",
    sourcemap: true,
  },
  server: {
    port: 5173,
    strictPort: true,
  },
});
