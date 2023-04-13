import { defineUserConfig } from "vuepress";
import { searchProPlugin } from "vuepress-plugin-search-pro";
import theme from "./theme.js";

export default defineUserConfig({
  base: "/",
  port: 3000,
  head: [
    ['link', { rel: 'icon', href: '/logo.jpg' }]
  ],
  locales: {
    "/": {
      lang: "zh-CN",
      title: "Notes",
      description: "学习笔记",
    },
    
  },

  theme,

  plugins: [
    searchProPlugin({
      // 配置选项
    }),
  ],
  
  // Enable it with pwa
  // shouldPrefetch: false,
});
