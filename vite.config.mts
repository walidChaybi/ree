/// <reference types="vitest" />

import react from "@vitejs/plugin-react";
import path from "path";
import { defineConfig } from "vite";
import eslint from "vite-plugin-eslint";
import packageJson from "./package.json";

// https://vitejs.dev/config/
export default defineConfig({
  base: "/rece/rece-ui",
  server: {
    port: parseInt(process.env.PORT || "", 10) || 3000,
    host: process.env.HOST || "0.0.0.0",
    strictPort: true,
    hmr: {
      clientPort: parseInt(process.env.PORT || "", 10) || 3000
    }
  },
  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: ["src/__tests__/setupTests.ts"],
    maxWorkers: 4,
    testTimeout: 10000,
    include: ["src/__tests__/**/?(*.)test.ts?(x)"],
    coverage: {
      include: ["src/*"],
      exclude: ["src/App.tsx", "src/index.tsx", "src/ressources/*", "src/__tests__/*", "src/mock/*", "src/api/configuration/*"]
    }
  },
  define: {
    "process.env": {
      //     ...env.stringified["process.env"],
      VERSION: JSON.stringify(packageJson.version),
      DATE_BUILD: JSON.stringify(`${new Date().toISOString()} (${new Date().toLocaleString()})`)
    }
  },
  plugins: [
    react({
      include: "src/**/*.{js,jsx,ts,tsx}",
      exclude: ["src/__tests__/*", "src/mock/*"]
    }),
    eslint()
  ],
  resolve: {
    alias: {
      "@api": path.resolve(__dirname, "/src/api"),
      "@dto": path.resolve(__dirname, "/src/dto"),
      "@mock": path.resolve(__dirname, "/src/mock"),
      "@model": path.resolve(__dirname, "/src/model"),
      "@ressources": path.resolve(__dirname, "/src/ressources"),
      "@views": path.resolve(__dirname, "/src/views"),
      "@scss": path.resolve(__dirname, "/src/scss"),
      "@layouts": path.resolve(__dirname, "/src/layouts"),
      "@pages": path.resolve(__dirname, "/src/views/pages"),
      "@router": path.resolve(__dirname, "/src/views/router"),
      "@util": path.resolve(__dirname, "/src/views/common/util"),
      "@hook": path.resolve(__dirname, "/src/views/common/hook"),
      "@composant": path.resolve(__dirname, "/src/views/common/composant"),
      "@core": path.resolve(__dirname, "/src/views/core"),
      "@widget": path.resolve(__dirname, "/src/views/common/widget"),
      "@utilMetier": path.resolve(__dirname, "/src/views/common/utilMetier"),
      dsfr: path.resolve(__dirname, "/public/dsfr")
    }
  },
  build: {
    manifest: true,
    outDir: "build"
  }
});
