import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  // added line for servre port and CICD pipeline for github actions.
  base: "/blissful-delivery-repo/", // set the base for github repo deployment using CI/CD actions
  server: {
    // change the port
    port: 3001,
    open: true,
  },
});
