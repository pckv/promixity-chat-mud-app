import { defineConfig } from "vite";
import { VitePluginFonts } from "vite-plugin-fonts";
import solidPlugin from "vite-plugin-solid";

export default defineConfig({
  plugins: [
    solidPlugin(),
    VitePluginFonts({
      google: {
        families: ["Space Mono"],
      },
    }),
  ],
  server: {
    port: 3000,
  },
  build: {
    target: "esnext",
  },
});
