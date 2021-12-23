import { ethers } from "ethers";
import { Dispatch, SetStateAction, useCallback } from "react";
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

  const claim = useCallback(async () => {
    const airdrop = new ethers.Contract(AIRDROP_ADDRESS, AIRDROP_ABI, provider);
    const { amount, merkleIndex } = getSnapshotEntry(address);
    const merkleProof = generateMerkleProof(merkleIndex);

    const claimTx = await airdrop.claim(address, amount, merkleProof);
    await claimTx.wait();
    setClaimed(true);
  }, [address, provider, setClaimed]);

  return <HeaderButton onClick={claim}>Claim</HeaderButton>;
};

export default ClaimButton;
