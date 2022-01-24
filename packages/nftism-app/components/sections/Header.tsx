import { ReactNode } from "react";
import {
  Box,
  Flex,
  HStack,
  Link,
  IconButton,
  Button,
  useDisclosure,
  Stack,
} from "@chakra-ui/react";
import { HamburgerIcon, CloseIcon, AddIcon } from "@chakra-ui/icons";

import { ConnectButton } from "@components/ui/ConnectButton";
import Logo from "@components/ui/Logo";

type NamedLink = {
  name: string;
  href: string;
};

const Links: NamedLink[] = [
  {
    name: "Blog",
    href: "/blog",
  },
];

const NavLink = ({ href, children }: { href: string; children: ReactNode }) => (
  <Link px={2} py={1} href={href}>
    <Button color="black" variant="link">
      {children}
    </Button>
  </Link>
);

const Header: React.FC = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <Box w={{ base: "100%", lg: "80%" }} px={4}>
        <Flex h={16} alignItems={"center"} justifyContent={"space-between"}>
          <IconButton
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
              {Links.map(({ href, name }) => (
                <NavLink href={href} key={href}>
                  {name}
                </NavLink>
              ))}
            </HStack>
          </HStack>
          <Flex alignItems={"center"}>
            <ConnectButton />
          </Flex>
        </Flex>

        {isOpen ? (
          <Box pb={4} display={{ md: "none" }}>
            <Stack as={"nav"} spacing={4}>
              {Links.map(({ href, name }) => (
                <NavLink href={href} key={href}>
                  {name}
                </NavLink>
              ))}
            </Stack>
          </Box>
        ) : null}
      </Box>
    </>
  );
};

export default Header;
