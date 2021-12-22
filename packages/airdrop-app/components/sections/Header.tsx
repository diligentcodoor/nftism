import React from "react";
import { Box, Flex } from "@chakra-ui/react";
import Logo from "../ui/Logo";
import ConnectButton from "../ui/ConnectButton";

const Header: React.FC = () => {
  return (
    <Flex
      as="nav"
      align="center"
      justify="space-between"
      wrap="nowrap"
      w="100%"
      mb={8}
      p={8}
      color={["white"]}
    >
      <Logo w="65px" color={["white"]} />

      <ConnectButton />
    </Flex>
  );
};

export default Header;
