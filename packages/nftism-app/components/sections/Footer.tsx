import { Flex } from "@chakra-ui/react";
import { FaDiscord, FaTwitter } from "react-icons/fa";
import { DISCORD_LINK, TWITTER_LINK } from "@lib/constants";
import SocialLink from "@components/ui/SocialLink";

const Footer: React.FC = () => {
  return (
    <Flex
      align="center"
      justify="space-around"
      direction="row"
      wrap="nowrap"
      width="100%"
      height="100%"
      px={8}
      py={6}
      opacity={1}
    >
      <SocialLink href={TWITTER_LINK} icon={FaTwitter} hoverColor="blue.500" />
      <SocialLink
        href={DISCORD_LINK}
        icon={FaDiscord}
        hoverColor="purple.500"
      />
    </Flex>
  );
};

export default Footer;
