import Link from "next/link";
import { Icon } from "@chakra-ui/react";
import { IconType } from "react-icons/lib";

interface Props {
  href: string;
  icon: IconType;
  hoverColor: string;
}

const SocialLink: React.FC<Props> = ({ href, icon, hoverColor }) => (
  <Link href={href} passHref>
    <Icon
      as={icon}
      color="white"
      opacity={0.5}
      w={10}
      h={10}
      cursor="pointer"
      _hover={{ opacity: 1, color: hoverColor }}
    />
  </Link>
);

export default SocialLink;
