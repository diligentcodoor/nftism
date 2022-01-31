import { useEffect, useState } from "react";
import { useAccount, useContractRead } from "wagmi";
import { DEFAULT_NETWORK, networkConfig } from "../utils/blockchain";
import { AIRDROP_ABIS } from "../utils/constants";
import { getSnapshotEntry } from "../utils/getSnapshotEntry";
import { useAirdrop } from "./airdrop";

export const useClaimed = (): {
  amount: number;
  claimed: Boolean;
  eligible: Boolean;
} => {
  const airdropType = useAirdrop();
  const [{ data: accountData, loading: accountLoading, error: accountError }] =
    useAccount();
  const [amount, setAmount] = useState<number>(0);
  const [claimed, setClaimed] = useState<Boolean>(false);
  const [eligible, setEligible] = useState<Boolean>(false);

  const [, isClaimed] = useContractRead(
    {
      addressOrName:
        networkConfig[DEFAULT_NETWORK].airdropContract[airdropType],
      contractInterface: AIRDROP_ABIS[airdropType],
    },
    "isClaimed",
    { args: accountData!.address, skip: true }
  );

  useEffect(() => {
    if (accountLoading || accountError) return;

    const getClaimed = async () => {
      const { data: hasClaimed, error } = await isClaimed({
        args: accountData!.address,
      });
      setClaimed(hasClaimed as unknown as Boolean);
    };
    getClaimed();
  }, [accountData?.address, accountLoading, accountError, isClaimed]);

  useEffect(() => {
    if (accountLoading || accountError) return;

    const getAmount = async () => {
      const amount = getSnapshotEntry(accountData!.address, airdropType).amount;
      const eligible = amount > 0;
      setAmount(amount);
      setEligible(eligible);
    };
    getAmount();
  }, [
    accountLoading,
    accountError,
    accountData!.address,
    setAmount,
    setEligible,
  ]);

  return { amount, claimed, eligible };
};
