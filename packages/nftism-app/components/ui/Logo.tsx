import React, { useState } from "react";
import { Box } from "@chakra-ui/react";
import Image from "next/image";
import Link from "next/link";

export default function Logo(props: any) {
  const [isHovering, setIsHovered] = useState(false);
  const onMouseEnter = () => setIsHovered(true);
  const onMouseLeave = () => setIsHovered(false);

  return (
    <Box
      cursor="pointer"
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      <Link href="/" passHref>
        <a>
          {isHovering ? (
            <Image
              width={100}
              height={33}
              src="/nftism.gif"
              alt="NFTism Logo"
            />
          ) : (
            <Image
              width={100}
              height={33}
              src="/nftism-logo.png"
              alt="NFTism Logo"
            />
          )}
        </a>
      </Link>
    </Box>
  );
}
