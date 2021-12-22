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
      wrap="wrap"
      w="100%"
      mb={8}
      p={8}
      color={["white"]}
    >
      <Flex align="center">
        <Logo w="65px" color={["white"]} />
      </Flex>

      <Box display="block" flexBasis={{ base: "100%", md: "auto" }}>
        <Flex
          align="center"
          justify={["center", "space-between", "flex-end", "flex-end"]}
          direction={["column", "row", "row", "row"]}
          pt={[4, 4, 0, 0]}
        >
          <ConnectButton />
        </Flex>
      </Box>
    </Flex>
  );
};

export default Header;
