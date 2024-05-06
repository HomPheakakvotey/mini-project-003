import { Label } from "flowbite-react";

export type SiteConfig = typeof siteConfig;

export const siteConfig = {
  name: "Next.js + NextUI",
  description: "Make beautiful websites regardless of your design experience.",
  navItems: [
    {
      label: "Home",
      href: "/",
    },
    {
      label: "About Us",
      href: "/about",
    },
    {
      label: "Policy",
      href: "/policy",
    },
    {
      label: "My Shop",
      href: "/myshop",
    },
  ],
  navMenuItems: [
    {
      label: "Home",
      href: "/",
    },
    {
      label: "About Us",
      href: "/about",
    },
    {
      label: "Policy",
      href: "/policy",
    },
    {
      label: "My Shop",
      href: "/myshop",
    },
    {
      label: "Cart",
      href: "/cart",
    },
    {
      label: "Login",
      href: "/login",
    },
    {
      label: 'Logout',
      href: '/logout',
    },
  ],
  links: {
    github: "https://github.com/nextui-org/nextui",
    twitter: "https://twitter.com/getnextui",
    docs: "https://nextui.org",
    discord: "https://discord.gg/9b6yyZKmH4",
    sponsor: "https://patreon.com/jrgarciadev",
  },
};
