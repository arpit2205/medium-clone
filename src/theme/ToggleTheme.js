import { IconButton, useColorMode } from "@chakra-ui/react";
import { SunIcon, MoonIcon } from "@chakra-ui/icons";

function ToggleTheme() {
  const { colorMode, toggleColorMode } = useColorMode();
  return (
    <header>
      <IconButton
        onClick={toggleColorMode}
        icon={colorMode === "light" ? <MoonIcon /> : <SunIcon />}
        variant={[null]}
      />
    </header>
  );
}

export default ToggleTheme;
