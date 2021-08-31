import React from "react";
import ReactDOM from "react-dom";
import App from "./App";

// Chakra UI
import { ChakraProvider, ColorModeScript } from "@chakra-ui/react";
import theme from "./theme/theme";

ReactDOM.render(
  <ChakraProvider theme={theme}>
    <ColorModeScript initialColorMode={theme.config.initialColorMode} />
    <App />
  </ChakraProvider>,
  document.getElementById("root")
);
