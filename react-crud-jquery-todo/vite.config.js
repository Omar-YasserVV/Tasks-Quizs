// Change your main.jsx to main.js (and update imports accordingly)
// OR ensure you have JSX support properly configured

// In vite.config.js (create one if it doesn't exist):
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  esbuild: {
    loader: "jsx",
  },
  optimizeDeps: {
    esbuildOptions: {
      loader: {
        ".js": "jsx",
      },
    },
  },
});
