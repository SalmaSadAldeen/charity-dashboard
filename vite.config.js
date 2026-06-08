import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      // هذه الطريقة البسيطة والحديثة لربط الـ @ بمجلد الـ src مباشرة في Vite
      "@": "/src",
    },
  },
});
