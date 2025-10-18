import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";
import { builtinModules } from "node:module";

export default defineConfig({
  plugins: [tsconfigPaths()],
  build: {
    outDir: "dist",
    lib: {
      entry: "src/index.ts",
      formats: ["cjs"],
      fileName: () => "index.cjs",
    },
    rollupOptions: {
      external: [
        "electron",
        ...builtinModules.flatMap((m) => [m, `node:${m}`]),
      ],
    },
    target: "node18",
    sourcemap: true,
    minify: false,
    emptyOutDir: true,
  },
});
