import { Flex } from "@chakra-ui/react";
import HeadSection from "../sections/HeadSection";
import Header from "../sections/Header";
import Footer from "../sections/Footer";

import styles from "../../styles/LandingLayout.module.scss";

interface Props {
  children?: React.ReactNode;
}

const LandingLayout: React.FC<Props> = ({ children }) => (
  <Flex
    bg="white"
    color="black"
    direction="column"
    align="center"
    m="0 auto"
    // className={styles.animate}
  >
    <HeadSection />
    <Header />
    {children}
    {/* <Footer /> */}
  </Flex>
);

export default LandingLayout;
