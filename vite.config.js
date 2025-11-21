import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// ⚠️ IMPORTANTÍSIMO
export default defineConfig({
  plugins: [react()],
  base: "/gametracker-frontend/",  // EL NOMBRE EXACTO DEL REPO
});
