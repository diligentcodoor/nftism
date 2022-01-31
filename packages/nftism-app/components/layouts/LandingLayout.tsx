import { Flex, Spacer } from "@chakra-ui/react";
import HeadSection from "@components/sections/HeadSection";
import Header from "@components/sections/Header";
import Footer from "@components/sections/Footer";

import useLogin from "@lib/hooks/useLogin";

import styles from "../../styles/LandingLayout.module.scss";
import ErrorMessage from "@components/ui/ErrorMessage";

interface Props {
  children?: React.ReactNode;
}

const LandingLayout: React.FC<Props> = ({ children }) => {
  const { error } = useLogin();
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
      {error && <ErrorMessage message={error} />}
      <Spacer m={2} />
      {children}
      {/* <Footer /> */}
    </Flex>
  );
};

export default LandingLayout;
