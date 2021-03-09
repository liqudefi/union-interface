import { MaxUint256 } from "@ethersproject/constants";
import { Contract } from "@ethersproject/contracts";
import type { TransactionResponse } from "@ethersproject/providers";
import { parseUnits } from "@ethersproject/units";
import { useWeb3React } from "@web3-react/core";
import useERC20Contract from "hooks/contracts/useERC20Contract";
import useCurrentToken from "hooks/useCurrentToken";
import { useCallback } from "react";
import { signDaiPermit } from "eth-permit";
import USER_MANAGER_ABI from "constants/abis/userManager.json";
import useMarketRegistryContract from "../contracts/useMarketRegistryContract";

export default function useStakeDeposit() {
  const { account, chainId, library } = useWeb3React();
  const marketRegistryContract = useMarketRegistryContract();
  const DAI = useCurrentToken();
  const DAIContract = useERC20Contract(DAI);

  return useCallback(
    async (amount: number | string): Promise<TransactionResponse> => {
      const signer = library.getSigner();
      const res = await marketRegistryContract.tokens(DAI);
      const userManagerAddress = res.userManager;
      const userManagerContract = new Contract(
        userManagerAddress,
        USER_MANAGER_ABI,
        signer
      );

      const stakeAmount = parseUnits(String(amount), 18);
      let gasLimit: any;
      const allowance = await DAIContract.allowance(
        account,
        userManagerAddress
      );
      //Approve is not required to call stakeWithPermit
      if (allowance.lt(stakeAmount)) {
        const result = await signDaiPermit(
          library.provider,
          DAI,
          account,
          userManagerAddress
        );

        try {
          gasLimit = await userManagerContract.estimateGas.stakeWithPermit(
            stakeAmount.toString(),
            result.nonce,
            result.expiry,
            result.v,
            result.r,
            result.s
          );
        } catch (err) {
          gasLimit = 800000;
        }

        return userManagerContract.stakeWithPermit(
          stakeAmount.toString(),
          result.nonce,
          result.expiry,
          result.v,
          result.r,
          result.s,
          {
            gasLimit,
          }
        );
      } else {
        try {
          gasLimit = await userManagerContract.estimateGas.stake(
            stakeAmount.toString()
          );
        } catch (err) {
          gasLimit = 800000;
        }

        return userManagerContract.stake(stakeAmount.toString(), {
          gasLimit,
        });
      }
    },
    [account, chainId, DAI, DAIContract, marketRegistryContract]
  );
}