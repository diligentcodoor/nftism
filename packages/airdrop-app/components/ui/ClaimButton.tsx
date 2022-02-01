import {
  Alert,
  AlertDescription,
  AlertIcon,
  AlertTitle,
  Flex,
  Link,
} from "@chakra-ui/react";
import { etherscanLink } from "../../utils/blockchain";
import HeaderButton from "./HeaderButton";
import { useClaim } from "../../hooks/useClaim";

const ClaimButton: React.FC = () => {
  const { claim, tx, loading, error } = useClaim();

  return error ? (
    <Alert status="error">
      <AlertIcon />
      <AlertTitle mr={2}>Claiming Failed</AlertTitle>
      <AlertDescription>
        You are not eligible. Please visit Discord for help.
      </AlertDescription>
    </Alert>
  ) : (
    <Flex direction="column" align="center">
      <HeaderButton
        isLoading={loading}
        loadingText="Pending"
        onClick={claim}
        isDisabled={true || !!tx}
      >
        Claim @ 5:30 pm UTC
        {/* {tx ? "Claimed" : "Claim"} */}
      </HeaderButton>
      {tx?.hash && (
        <Link
          mt={5}
          href={etherscanLink(tx.hash)}
          target="_blank"
          rel="noopener noreferrer"
        >
          View your transaction
        </Link>
      )}
    </Flex>
  );
};

export default ClaimButton;
