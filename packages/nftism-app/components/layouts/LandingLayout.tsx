import { Flex, Spacer } from "@chakra-ui/react";
import HeadSection from "@components/sections/HeadSection";
import Header from "@components/sections/Header";

import styles from "../../styles/LandingLayout.module.scss";

interface Props {
  children?: React.ReactNode;
}

const LandingLayout: React.FC<Props> = ({ children }) => {
  return (
    <Flex
      bg="white"
      direction="column"
      align="center"
      m="0 auto"
      className={styles.animate}
    >
      <HeadSection />
      <Header />
      <Spacer m={2} />
      {children}
      {/* <Footer /> */}
    </Flex>
  );
};

export default LandingLayout;
