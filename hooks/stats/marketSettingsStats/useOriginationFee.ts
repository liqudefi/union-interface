import useUTokenContract from "hooks/contracts/useUTokenContract";
import { formatUnits } from "@ethersproject/units";
import { BigNumber } from "@ethersproject/bignumber";
import { Contract } from "@ethersproject/contracts";
import useSWR from "swr";

const getOriginationFee = (uTokenContract: Contract) => async (_: any) => {
  const originationFee: BigNumber = await uTokenContract.originationFee();
  const decimals = BigNumber.from(18);
  return formatUnits(originationFee, decimals);
};

export default function useOriginationFee() {
  const uTokenContract: Contract = useUTokenContract();
  const shouldFetch = !!uTokenContract;

  return useSWR(
    shouldFetch ? ["originationFee"] : null,
    getOriginationFee(uTokenContract)
  );
}