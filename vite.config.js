import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import vuetify from "vite-plugin-vuetify";

import dns from "dns";
dns.setDefaultResultOrder("verbatim");

export default () => {
  // Use the server deployment path as the production base so built assets
  // are referenced correctly when deployed under /seiv2025/p2/t9
  const baseURL =
    process.env.APP_ENV === "development" ? "/" : "/seiv2025/p2/t9/";

  return defineConfig({
    plugins: [vue(), vuetify({ autoImport: true })],

    server: {
      host: "localhost",
      port: 8081,
    },

    base: baseURL,
  });
};