import { defineConfig } from "vite";
import reactRefresh from "@vitejs/plugin-react-refresh";

export default defineConfig({
  base: "/",
  build: {
    outDir: "dist",
  },
  plugins: [reactRefresh()],
  server: {
    port: 3002,
    host:'0.0.0.0',
    hmr: {
      host: 'pdf.monit.pk',

      protocol: 'wss',
      clientPort: 3002
    },
  },
});
