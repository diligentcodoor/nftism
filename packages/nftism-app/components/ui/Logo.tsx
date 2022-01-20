import React from "react";
import { Box } from "@chakra-ui/react";
import Image from "next/image";
import Link from "next/link";

export default function Logo(props: any) {
  return (
    <Box {...props} rounded="full" cursor="pointer" overflow="hidden">
      <Link href="/" passHref>
        <Image src="/logo.jpg" height="100%" width="100%" alt="logo" />
      </Link>
    </Box>
  );
}
