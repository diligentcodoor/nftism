import React from "react";
import { Box } from "@chakra-ui/react";
import Image from "next/image";
import Link from "next/link";

export default function Logo(props: any) {
  return (
    <Box cursor="pointer">
      <Link href="/" passHref>
        <a>
          <Image
            width={100}
            height={33}
            src="/nftism-logo.png"
            alt="NFTism Logo"
          />
        </a>
      </Link>
    </Box>
  );
}
