import { useCallback } from "react";
import { useAccount, useContractWrite } from "wagmi";
import { AirdropType } from "../../lib/src/types";
import {
  DEFAULT_NETWORK,
  etherscanLink,
  networkConfig,
} from "../utils/blockchain";
import { AIRDROP_ABIS } from "../utils/constants";
import { getSnapshotEntry } from "../utils/getSnapshotEntry";
import { generateMerkleProof } from "../utils/merkleProof";
import { useAirdrop } from "./airdrop";

export const useClaim = () => {
  const airdropType = useAirdrop();
  const [{ data: accountData, loading: accountLoading, error: accountError }] =
    useAccount();
  const [{ data: tx, loading, error }, mint] = useContractWrite(
    {
      addressOrName:
        networkConfig[DEFAULT_NETWORK].airdropContract[airdropType],
      contractInterface: AIRDROP_ABIS[airdropType],
    },
    airdropType === AirdropType.NFTism ? "claim" : "mint"
  );

  const claim = useCallback(async () => {
    const { amount, merkleIndex } = getSnapshotEntry(
      accountData!.address,
      airdropType
    );
    const merkleProof = generateMerkleProof(merkleIndex, airdropType);

    await mint({ args: [accountData!.address, amount, merkleProof] });
  }, [airdropType, accountData, mint]);

  return { claim, tx, loading, error };
};
