import type { TransactionResponse } from "@ethersproject/providers";
import { parseUnits } from "@ethersproject/units";
import useCurrentToken from "hooks/useCurrentToken";
import { useCallback } from "react";
import { useWeb3React } from "@web3-react/core";
import { Contract } from "@ethersproject/contracts";
import USER_MANAGER_ABI from "constants/abis/userManager.json";
import useMarketRegistryContract from "../contracts/useMarketRegistryContract";

export default function useStakeWithdraw() {
  const tokenAddress = useCurrentToken();
  const { library } = useWeb3React();
  const marketRegistryContract = useMarketRegistryContract();

  return useCallback(
    async (amount: number | string): Promise<TransactionResponse> => {
      const stakeAmount = parseUnits(String(amount), 18);

      const signer = library.getSigner();
      const res = await marketRegistryContract.tokens(tokenAddress);
      const userManagerAddress = res.userManager;
      const userManagerContract = new Contract(
        userManagerAddress,
        USER_MANAGER_ABI,
        signer
      );

      return userManagerContract.unstake(stakeAmount.toString());
    },
    [library, marketRegistryContract, tokenAddress]
  );
}