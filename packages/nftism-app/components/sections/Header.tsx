import { useToken } from "wagmi";

import {
  Box,
  Flex,
  HStack,
  IconButton,
  Button,
  useDisclosure,
  Stack,
} from "@chakra-ui/react";
import { HamburgerIcon, CloseIcon } from "@chakra-ui/icons";

import { NFTISM_TOKEN_CONFIG } from "@lib/blockchain";
import { ConnectButton } from "@components/ui/ConnectButton";
import Logo from "@components/ui/Logo";
import useUser from "@lib/hooks/useUser";
import NavLink from "@components/ui/NavLink";
import { UserRole } from "@lib/session";

type NamedLink = {
  name: string;
  href: string;
  requiresLogin?: boolean;
};

const Links: NamedLink[] = [
  {
    name: "Archives",
    href: "/blog",
    requiresLogin: true,
  },
  {
    name: "Merch",
    href: "/shop",
    requiresLogin: true,
  },
  {
    name: "Price Chart",
    href: "https://www.dextools.io/app/ether/pair-explorer/0x265e4776011d61b52e9ab37827590ab7efbdae89",
    requiresLogin: false,
  },
  {
    name: "Buy $NFTism",
    href: "https://app.sushi.com/swap?outputCurrency=0xf8fe4dbe106ac2a1e6c96c3ca77b344a1b1a49e1",
    requiresLogin: false,
  },
];

const Header: React.FC = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { user } = useUser();
  const [, watchToken] = useToken();

  return (
    <>
      <Box w={{ base: "100%", lg: "80%" }} px={4}>
        <Flex h={16} alignItems={"center"} justifyContent={"space-between"}>
          <IconButton
            variant={"outline"}
            colorScheme={"red"}
            size={"md"}
            icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
            aria-label={"Open Menu"}
            display={{ md: "none" }}
            onClick={isOpen ? onClose : onOpen}
          />
          <HStack spacing={8} alignItems={"center"}>
            <Logo />
            <HStack
              as={"nav"}
              spacing={4}
              display={{ base: "none", md: "flex" }}
            >
              {Links.map(({ href, name, requiresLogin }) => (
                <NavLink
                  href={href}
                  key={href}
                  disabled={!!requiresLogin && user?.role() !== UserRole.MEMBER}
                >
                  {name}
                </NavLink>
              ))}
              <Button
                onClick={() => watchToken(NFTISM_TOKEN_CONFIG)}
                color="black"
                variant="link"
                _focus={{ boxShadow: "" }}
              >
                Add to Wallet
              </Button>
            </HStack>
          </HStack>
          <Flex alignItems={"center"}>
            <ConnectButton />
          </Flex>
        </Flex>

        {isOpen ? (
          <Box pb={4} display={{ md: "none" }}>
            <Stack as={"nav"} spacing={4}>
              {Links.map(({ href, name, requiresLogin }) => (
                <NavLink
                  href={href}
                  key={href}
                  disabled={!!requiresLogin && user?.role() !== UserRole.MEMBER}
                >
                  {name}
                </NavLink>
              ))}
              <Button
                _focus={{ boxShadow: "" }}
                onClick={() => watchToken(NFTISM_TOKEN_CONFIG)}
                color="black"
                variant="link"
              >
                Add to Wallet
              </Button>
            </Stack>
          </Box>
        ) : null}
      </Box>
    </>
  );
};

export default Header;
