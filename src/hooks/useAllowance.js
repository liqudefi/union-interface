import useSWR from "swr";
import { useWeb3React } from "@web3-react/core";

import { MaxUint256 } from "@ethersproject/constants";
import { useCallback } from "react";
import useERC20Contract from "hooks/contracts/useERC20Contract";
import usePermits from "hooks/usePermits";
import getReceipt from "util/getReceipt";
import { useAddActivity } from "hooks/data/useActivity";
import activityLabels from "util/activityLabels";
import truncateAddress from "util/truncateAddress";
import handleTxError from "util/handleTxError";
import isHash from "util/isHash";

const getAllowance = (_, contract, account, spender) => {
  return contract.allowance(account, spender);
};

export default function useAllowance(tokenAddress, spender, signatureKey) {
  const { signPermit } = usePermits();
  const addActivity = useAddActivity();
  const { account, chainId, library } = useWeb3React();

  const contract = useERC20Contract(tokenAddress);

  const shouldFetch =
    !!contract && typeof account === "string" && typeof chainId === "number";

  const resp = useSWR(
    shouldFetch ? ["Allowance", contract, account, spender] : null,
    getAllowance
  );

  const approve = async () => {
    try {
      const { hash } = await contract.approve(spender, MaxUint256);
      await getReceipt(hash, library, {
        pending: "Approving",
        success: "Approved",
      });
      addActivity(
        activityLabels.claim({ hash, token: truncateAddress(tokenAddress) })
      );
    } catch (err) {
      const hash = isHash(err.message) && err.message;
      addActivity(
        activityLabels.claim({ hash, token: truncateAddress(tokenAddress) }),
        true
      );
      handleTxError(err, "Failed to approve");
    }
  };

  const approveWithSignature = useCallback(async (amount, permitType) => {
    await signPermit(signatureKey, tokenAddress, spender, amount, permitType);
  }, []);

  return { ...resp, approve, approveWithSignature };
}