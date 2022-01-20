import {
  Box,
  Flex,
  Avatar,
  HStack,
  Link,
  IconButton,
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider,
  useDisclosure,
  useColorModeValue,
  Stack,
} from "@chakra-ui/react";
import { HamburgerIcon, CloseIcon, AddIcon } from "@chakra-ui/icons";

interface Link {
  name: string;
  href: string;
}
const links: Link[] = [
  { name: "NFTism", href: "/nftism" },
  { name: "Huxlxy NFT", href: "/huxlxy" },
];

interface NavLinkProps {
  href: string;
  children?: React.ReactNode;
}
const NavLink: React.FC<NavLinkProps> = ({ href, children }) => (
  <Link
    px={2}
    py={1}
    _hover={{
      textDecoration: "underline",
    }}
    href={href}
  >
    {children}
  </Link>
);

const Nav: React.FC = () => {
  return (
    <>
      <Box px={4}>
        <Flex h={16} alignItems={"center"} justifyContent={"space-between"}>
          <HStack spacing={8} alignItems={"center"}>
            <HStack
              as={"nav"}
              spacing={4}
              display={{ base: "flex", md: "flex" }}
            >
              {links.map(({ href, name }) => (
                <NavLink href={href} key={href}>
                  {name}
                </NavLink>
              ))}
            </HStack>
          </HStack>
        </Flex>
      </Box>
    </>
  );
};

export default Nav;
