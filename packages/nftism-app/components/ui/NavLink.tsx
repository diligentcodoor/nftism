import { ReactNode } from "react";
import NextLink from "next/link";

import { Button, Link as ChakraLink } from "@chakra-ui/react";

type Props = {
  href: string;
  children: ReactNode;
  disabled: boolean;
};

const isExternalLink = (href: string) => href.startsWith("http");

const NavLink: React.FC<Props> = ({ href, children, disabled = false }) => {
  const isExternal = isExternalLink(href);
  const linkBody = (
    <ChakraLink href={href} isExternal={isExternal}>
      <Button
        color="black"
        variant="link"
        disabled={disabled}
        _focus={{ boxShadow: "" }}
      >
        {children}
      </Button>
    </ChakraLink>
  );
  return isExternal ? (
    <NextLink href={href} passHref>
      {linkBody}
    </NextLink>
  ) : (
    linkBody
  );
};

export default NavLink;
