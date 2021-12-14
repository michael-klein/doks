import { defineConfig } from "vite";
const path = require("path");
import react from "@vitejs/plugin-react";
import del from "rollup-plugin-delete";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: { port: 3004 },
  build: {
    sourcemap: true,
    lib: {
      entry: path.resolve(__dirname, "src/main.tsx"),
      name: "MyLib",
      fileName: (format) => `docs.${format}.js`,
      formats: ["es"],
    },
    minify: true,
    rollupOptions: {
      plugins: [del({ targets: "dist/*", hook: "generateBundle" })],
      external: [
        "react",
        "react-dom",
        "rxjs",
        "rxjs/operators",
        "react-router",
        "react-router-dom",
      ],
      output: {
        // Provide global variables to use in the UMD build
        // for externalized deps
        globals: {
          react: "React",
          "react-dom": "ReactDOM",
          rxjs: "RXJS",
          "react-router": "react-router-dom",
        },
      },
    },
  },
});
