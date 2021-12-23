import {
  Alert,
  AlertDescription,
  AlertIcon,
  AlertTitle,
  Flex,
  Link,
} from "@chakra-ui/react";
import { ethers } from "ethers";
import { Dispatch, SetStateAction, useCallback, useState } from "react";
import { useWeb3Context } from "../../hooks/web3-context";
import {
  DEFAULT_NETWORK,
  etherscanLink,
  networkConfig,
} from "../../utils/blockchain";
import { AIRDROP_ABI } from "../../utils/constants";
import { getSnapshotEntry } from "../../utils/getSnapshotEntry";
import { generateMerkleProof } from "../../utils/merkle";
import HeaderButton from "./HeaderButton";
import { TransactionResponse } from "@ethersproject/providers";

interface Props {}

const ClaimButton: React.FC<Props> = () => {
  const { address, provider } = useWeb3Context();
  const [error, setError] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [claimed, setClaimed] = useState<boolean>(false);
  const [txnLink, setTxnLink] = useState<string | null>();

  const claim = useCallback(async () => {
    const airdrop = new ethers.Contract(
      networkConfig[DEFAULT_NETWORK].airdropContract,
      AIRDROP_ABI,
      provider.getSigner()
    );
    const { amount, merkleIndex } = getSnapshotEntry(address);
    const merkleProof = generateMerkleProof(merkleIndex);

    try {
      setLoading(true);
      const claimTx: TransactionResponse = await airdrop.claim(
        address,
        amount,
        merkleProof
      );
      setTxnLink(etherscanLink(claimTx.hash));
      await claimTx.wait();
      setLoading(false);
      setClaimed(true);
    } catch (e: any) {
      setError(true);
    }
  }, [address, provider, setLoading, setClaimed]);

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
        isDisabled={claimed}
        onClick={claim}
      >
        {claimed ? "Claimed" : "Claim"}
      </HeaderButton>
      {txnLink && (
        <Link mt={5} href={txnLink}>
          View your transaction
        </Link>
      )}
    </Flex>
  );
};

export default ClaimButton;
