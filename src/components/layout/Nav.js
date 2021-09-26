import React, { useState } from "react";
import {
  Box,
  Flex,
  Text,
  Spacer,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuGroup,
  MenuDivider,
  IconButton,
  Button,
  useToast,
} from "@chakra-ui/react";
import { HamburgerIcon, ChevronDownIcon } from "@chakra-ui/icons";
import { FiGithub } from "react-icons/fi";
import SideBar from "./SideBar";
import ToggleTheme from "../../theme/ToggleTheme";
import { useAuth } from "../../contexts/AuthContext";
import { useHistory, Link } from "react-router-dom";

function Nav() {
  const [width, setWidth] = useState(window.screen.width);
  const [error, setError] = useState("");
  const toast = useToast();
  const history = useHistory();
  window.addEventListener("resize", () => {
    setWidth(window.screen.width);
  });

  const { currentUser, logout } = useAuth();

  const handleLogout = async () => {
    setError("");
    try {
      await logout();
      toast({
        title: "Logged out successfully",
        status: "success",
        duration: 5000,
      });
      history.push("/");
    } catch (error) {
      setError(error.message);
      toast({
        title: "Failed to logout",
        status: "error",
        duration: 5000,
      });
    }
  };

  return (
    <>
      {/* <SideBar /> */}
      <Box py="10" px={["6", "10"]} w="100%">
        <Flex justify="center">
          <Text
            as={Link}
            to="/"
            fontSize={["3xl", "4xl"]}
            fontWeight="semibold"
          >
            Medium
          </Text>
          <Spacer />
          <IconButton
            onClick={() =>
              window.open("https://github.com/arpit2205/medium-clone", "_blank")
            }
            variant="ghost"
            // size="lg"
            icon={<FiGithub />}
          />
          <ToggleTheme />

          <Box ml="2">
            {currentUser ? (
              <Menu placement="bottom-end">
                {width > 768 ? (
                  <MenuButton as={Button} rightIcon={<ChevronDownIcon />}>
                    My profile
                  </MenuButton>
                ) : (
                  <MenuButton
                    as={IconButton}
                    aria-label="Options"
                    icon={<HamburgerIcon />}
                    // variant=""
                  />
                )}

                <MenuList>
                  <MenuGroup title="Actions">
                    <MenuItem as={Link} to="/write">
                      Write article
                    </MenuItem>
                    <MenuItem as={Link} to="/my-articles">
                      My articles
                    </MenuItem>
                    {/* <MenuItem>Saved articles</MenuItem> */}
                  </MenuGroup>
                  <MenuDivider />
                  <MenuGroup title={currentUser && currentUser.email}>
                    <MenuItem onClick={handleLogout}>Logout</MenuItem>
                  </MenuGroup>
                </MenuList>
              </Menu>
            ) : (
              <Button as={Link} to="/login" colorScheme="blue">
                Sign in
              </Button>
            )}
          </Box>
        </Flex>
      </Box>
    </>
  );
}

export default Nav;
