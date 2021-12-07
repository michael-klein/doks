import { defineConfig } from "vite";
const path = require("path");
import react from "@vitejs/plugin-react";
import del from "rollup-plugin-delete";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    lib: {
      entry: path.resolve(__dirname, "src/main.tsx"),
      name: "MyLib",
      fileName: (format) => `docs.${format}.js`,
      formats: ["es"],
    },
    minify: true,
    rollupOptions: {
      plugins: [del({ targets: "dist/*", hook: "generateBundle" })],
    },
  },
});
