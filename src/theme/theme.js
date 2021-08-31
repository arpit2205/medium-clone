import { extendTheme } from "@chakra-ui/react";

// 2. Extend the theme to include custom colors, fonts, etc
// const colors = {
//     brand: {
//       900: "#1a365d",
//       800: "#153e75",
//       700: "#2a69ac",
//     },
//   }

// Config for dark mode
const config = {
  initialColorMode: "light",
  useSystemColorMode: false,
};

const theme = extendTheme({ config });

export default theme;
