import { sidebar } from "vuepress-theme-hope";

export const zhSidebar = sidebar({
  "/": [
    "",
    {
      text: "导航",
      icon: "note",
      prefix: "guide/",
      children: "structure",
    },
    {
      icon: "discover",
      text: "案例",
      prefix: "demo/",
      link: "demo/",
      children: "structure",
    },
    
    "slides",
  ],
});
