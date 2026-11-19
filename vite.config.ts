import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

// GitHub Pages project-site path for:
// https://Amool-kk.github.io/amool-portfolio/
export default defineConfig({
  base: "/",
  plugins: [react(), tailwindcss()],
});
