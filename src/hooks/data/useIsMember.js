import { useWeb3React } from "@web3-react/core";
import useSWRImmutable from "swr/immutable";
import useReadProvider from "hooks/useReadProvider";
import useUserContract from "hooks/contracts/useUserContract";

const getIsMember = async (_, account, userManager) => {
  const isMember = await userManager.checkIsMember(account);
  return isMember;
};

export default function useIsMember(address) {
  const { account: connectedAccount } = useWeb3React();
  const provider = useReadProvider();
  const userManager = useUserContract(provider);

  const account = address || connectedAccount;

  const shouldFetch = !!userManager && typeof account === "string";

  return useSWRImmutable(
    shouldFetch ? ["IsMember", account, userManager] : null,
    getIsMember
  );
}