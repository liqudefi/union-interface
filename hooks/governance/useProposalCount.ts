import type { Contract } from "@ethersproject/contracts";
import useGovernanceContract from "hooks/contracts/useGovernanceContract";
import useReadProvider from "hooks/useReadProvider";
import useSWR from "swr";

const getProposalCount = (contract: Contract) => async () => {
  const res = await contract.proposalCount();
  return parseInt(res);
};

export default function useProposalCount() {
  const library = useReadProvider();
  const contract = useGovernanceContract(library);

  const shouldFetch = Boolean(contract);

  return useSWR(
    shouldFetch ? ["ProposalCount"] : null,
    getProposalCount(contract),
    {
      shouldRetryOnError: false,
      refreshWhenHidden: false,
      refreshWhenOffline: false,
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
    }
  );
}
