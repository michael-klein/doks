import { defineConfig } from "vite";
import preact from "@preact/preset-vite";
const path = require("path");
const { defineConfig } = require("vite");

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [preact()],
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
      external: ["preact", "rxjs"],
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
