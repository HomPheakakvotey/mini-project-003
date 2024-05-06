import {nextui} from '@nextui-org/theme'
import flowbite from "flowbite-react/tailwind";

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}',
    flowbite.content(),

  ],
  theme: {
    extend: {},
  },
  darkMode: "class",
  plugins: [nextui(),flowbite.plugin(),],
}
