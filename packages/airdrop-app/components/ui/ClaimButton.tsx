import {
  Alert,
  AlertDescription,
  AlertIcon,
  AlertTitle,
  Flex,
  Link,
} from "@chakra-ui/react";
import { ethers } from "ethers";
import { useCallback, useEffect, useState } from "react";
import { useWeb3Context } from "../../hooks/web3-context";
import {
  DEFAULT_NETWORK,
  etherscanLink,
  networkConfig,
} from "../../utils/blockchain";
import { AIRDROP_ABI } from "../../utils/constants";
import { getSnapshotEntry } from "../../utils/getSnapshotEntry";
import { generateMerkleProof } from "../../../lib/merkle";
import { MerkleTree } from "merkletreejs";
import HeaderButton from "./HeaderButton";
import { TransactionResponse } from "@ethersproject/providers";
import { AirdropType } from "../../../lib/snapshot";

interface Props {}

const ClaimButton: React.FC<Props> = () => {
  const { address, provider, providerChainID, checkWrongNetwork } =
    useWeb3Context();
  const [error, setError] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [claimed, setClaimed] = useState<boolean>(false);
  const [wrongNetwork, setWrongNetwork] = useState<boolean>(false);
  const [txnLink, setTxnLink] = useState<string | null>();
  const [buttonText, setButtonText] = useState<string>("Claim");

  useEffect(() => {
    if (providerChainID !== DEFAULT_NETWORK) {
      setButtonText("Wrong Network");
      setWrongNetwork(true);
      checkWrongNetwork();
    }
  }, [providerChainID, checkWrongNetwork, setButtonText]);

  const claim = useCallback(async () => {
    const airdrop = new ethers.Contract(
      networkConfig[DEFAULT_NETWORK].airdropContract,
      AIRDROP_ABI,
      provider.getSigner()
    );
    const { amount, merkleIndex } = getSnapshotEntry(address);
    const merkleProof = generateMerkleProof(merkleIndex, AirdropType.NFTism);

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
      setButtonText("Claimed");
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
        onClick={claim}
        isDisabled={claimed || wrongNetwork}
      >
        {buttonText}
      </HeaderButton>
      {txnLink && (
        <Link mt={5} href={txnLink} target="_blank" rel="noopener noreferrer">
          View your transaction
        </Link>
      )}
    </Flex>
  );
};

export default ClaimButton;
