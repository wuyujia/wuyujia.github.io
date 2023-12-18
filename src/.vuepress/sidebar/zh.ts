import { sidebar } from "vuepress-theme-hope";

export const zhSidebar = sidebar({
  "/": [
    {
      text: "导航",
      icon: "",
      prefix: "guide/",
      children: "structure",
    },
    {
      text: "Java",
      icon: "",
      prefix: "java/",
      children: "structure",
    },
    {
      text: "MySQL",
      icon: "",
      prefix: "mysql/",
      children: "structure",
    },
    {
      text: "Redis",
      icon: "",
      prefix: "redis/",
      children: "structure",
    },
    {
      text: "Node",
      icon: "",
      prefix: "node/",
      children: "structure",
    },
    {
      text: "Linux",
      icon: "",
      prefix: "linux/",
      children: "structure",
    },
    {
      text: "工具集",
      icon: "",
      prefix: "utils/",
      children: "structure",
    },
    {
      text: "开发工具相关",
      icon: "",
      prefix: "dev/",
      children: "structure",
    },
    {
      text: "桌面软件开发",
      icon: "",
      prefix: "desktop/",
      children: "structure",
    },
    {
      text: "移动端开发",
      icon: "",
      prefix: "mobile/",
      children: "structure",
    },
    // {
    //   icon: "discover",
    //   text: "案例",
    //   prefix: "demo/",
    //   link: "demo/",
    //   children: "structure",
    // },
    
    // "slides",
  ],
});
