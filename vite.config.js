import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

// export default defineConfig({
//   plugins: [react()],
//   // هذا الجزء مفقود لديكِ وهو السبب في عدم فهم Vite للرمز @
//   resolve: {
//     alias: {
//       "@": path.resolve(__dirname, "./src"),
//     },
//   },
//   server: {
//     proxy: {
//       "/role": {
//         target: "http://localhost:5173",
//         changeOrigin: true,
//         secure: false,
//       },
//       "/employee": {
//         target: "http://localhost:3000",
//         changeOrigin: true,
//         secure: false,
//       },
//       "/auth": {
//         target: "http://localhost:3000",
//         changeOrigin: true,
//         secure: false,
//       },
//       "/admin": {
//         target: "http://localhost:3000",
//         changeOrigin: true,
//         secure: false,
//       },
//     },
//   },
// });
// vite.config.js
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: { "@": path.resolve(__dirname, "./src") },
  },
  // احذفي قسم server.proxy تماماً أو علقيه
});
