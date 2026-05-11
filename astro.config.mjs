// @ts-check
import { defineConfig } from "astro/config";

import react from "@astrojs/react";
import tailwindcss from "@tailwindcss/vite";

import icon from "astro-icon";

import cloudflare from "@astrojs/cloudflare";

// https://astro.build/config
export default defineConfig({
  integrations: [
    react(),
    icon({
      include: {
        mdi: [
          "home",
          "snowflake",
          "about-circle-outline",
          "chevron-up",
          "link",
          "ios-share",
          "arrow-down-box",
          "instagram",
          "link-box-variant-outline",
          "youtube",
          "cloud-upload-outline",
          "menu",
          "tools",
          "toolbox-outline",
          "timetable",
        ],
        "icon-park-twotone": ["degree-hat"],
        "fluent-emoji-high-contrast": ["fork-and-knife-with-plate"],
      },
    }),
  ],

  site: "https://info.kmhs.kr",

  vite: {
    plugins: [tailwindcss()],
  },

  adapter: cloudflare({
    imageService: { build: "compile", runtime: "cloudflare-binding" },
  }),
});
