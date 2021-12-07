import { defineConfig } from "vite";
const path = require("path");
import react from "@vitejs/plugin-react";

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
    rollupOptions: {
      // make sure to externalize deps that shouldn't be bundled
      // into your library
      external: ["react", "react-dom", "rxjs"],
      output: {
        // Provide global variables to use in the UMD build
        // for externalized deps
        globals: {
          preact: "Preact",
          rxjs: "Rxjs",
        },
      },
    },
  },
});
