import { useRouter } from "next/router";
import { AirdropType } from "../../lib/src/types";

export const useAirdrop = (): AirdropType => {
  const router = useRouter();
  const { airdrop } = router.query;
  return airdrop as AirdropType;
};
