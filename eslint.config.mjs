import js from "@eslint/js";
import globals from "globals";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";
import tseslint from "typescript-eslint";
import { defineConfig } from "eslint/config";

export default defineConfig([
  {
    ignores: ["**/dist/**", "node_modules", "release"],
  },

  {
    files: ["apps/renderer/**/*.{ts,tsx}"],
    languageOptions: {
      ecmaVersion: 2023,
      globals: globals.browser,
    },
    plugins: {
      "react-hooks": reactHooks,
      "react-refresh": reactRefresh,
    },
    extends: [
      js.configs.recommended,
      ...tseslint.configs.recommended,
      reactHooks.configs["recommended-latest"],
      reactRefresh.configs.vite,
    ],
    rules: {
      "react-refresh/only-export-components": "warn",
    },
  },

  {
    files: ["apps/main/**/*.ts", "apps/preload/**/*.ts"],
    languageOptions: {
      ecmaVersion: 2023,
      globals: globals.node,
    },
    extends: [js.configs.recommended, ...tseslint.configs.recommended],
    rules: {
      "no-console": "off",
    },
  },
]);
