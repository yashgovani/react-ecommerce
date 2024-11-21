import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import svgr from "vite-plugin-svgr";
import envCompatible from "vite-plugin-env-compatible";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), svgr(), envCompatible({ files: [".env.local"] })],
  envPrefix: "ECOMMERCE_",
});
