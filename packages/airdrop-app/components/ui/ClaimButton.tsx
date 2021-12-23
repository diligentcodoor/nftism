import {
  Alert,
  AlertDescription,
  AlertIcon,
  AlertTitle,
  CloseButton,
} from "@chakra-ui/react";
import { ethers } from "ethers";
import { Dispatch, SetStateAction, useCallback, useState } from "react";
import { useWeb3Context } from "../../hooks/web3-context";
import { AIRDROP_ABI, AIRDROP_ADDRESS } from "../../utils/constants";
import { getSnapshotEntry } from "../../utils/getSnapshotEntry";
import { generateMerkleProof } from "../../utils/merkle";
import HeaderButton from "./HeaderButton";

interface Props {
  setClaimed: Dispatch<SetStateAction<boolean>>;
}

const ClaimButton: React.FC<Props> = ({ setClaimed }) => {
  const { address, provider } = useWeb3Context();
  const [error, setError] = useState<boolean>(false);

  const claim = useCallback(async () => {
    const airdrop = new ethers.Contract(
      AIRDROP_ADDRESS,
      AIRDROP_ABI,
      provider.getSigner()
    );
    const { amount, merkleIndex } = getSnapshotEntry(address);
    const merkleProof = generateMerkleProof(merkleIndex);

    try {
      const claimTx = await airdrop.claim(address, amount, merkleProof);
      await claimTx.wait();
      setClaimed(true);
    } catch (e: any) {
      setError(true);
    }
  }, [address, provider, setClaimed]);

  AlertIcon;
  AlertTitle;
  AlertDescription;
  CloseButton;

  return error ? (
    <Alert status="error">
      <AlertIcon />
      <AlertTitle mr={2}>Claiming Failed</AlertTitle>
      <AlertDescription>
        You are not eligible. Please visit Discord for help.
      </AlertDescription>
    </Alert>
  ) : (
    <HeaderButton onClick={claim}>Claim</HeaderButton>
  );
};

export default ClaimButton;
