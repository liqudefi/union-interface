import { isAddress } from "@ethersproject/address";
import { Contract } from "@ethersproject/contracts";
import { JsonRpcProvider } from "@ethersproject/providers";
import { formatUnits } from "@ethersproject/units";
import { useWeb3React } from "@web3-react/core";
import U_TOKEN_ABI from "constants/abis/uToken.json";
import useSWR from "swr";
import useMarketRegistryContract from "../contracts/useMarketRegistryContract";
import useCurrentToken from "../useCurrentToken";
import USER_MANAGER_ABI from "constants/abis/userManager.json";
import useReadProvider from "hooks/useReadProvider";

const getTrust =
  (marketRegistryContract, provider) =>
  async (_, account, tokenAddress, count) => {
    const ethereumRpc = new JsonRpcProvider(
      // TODO:
      `https://mainnet.infura.io/v3/05bc032e727c40d79202e3373090ed55`
    );
    const res = await marketRegistryContract.tokens(tokenAddress);
    const uTokenAddress = res.uToken;
    const userManagerAddress = res.userManager;

    const userManagerContract = new Contract(
      userManagerAddress,
      USER_MANAGER_ABI,
      provider
    );

    const uTokenContract = new Contract(uTokenAddress, U_TOKEN_ABI, provider);

    const addresses = await userManagerContract.getBorrowerAddresses(account);

    const size = count ?? addresses.length;

    const data = await Promise.all(
      addresses.slice(0, size).map(async (address) => {
        const res = await userManagerContract.getBorrowerAsset(
          account,
          address
        );

        const vouched = Number(formatUnits(res.vouchingAmount, 18));

        const used = Number(formatUnits(res.lockedStake, 18));

        const trust = Number(formatUnits(res.trustAmount, 18));

        const percentage = vouched > 0 ? used / vouched : 0;

        const isOverdue = await uTokenContract.checkIsOverdue(address);

        const health = isOverdue ? 0 : ((vouched - used) / vouched) * 100;

        const ens = await ethereumRpc.lookupAddress(address);

        const isMember = await userManagerContract.checkIsMember(address);

        return {
          address,
          health,
          isOverdue,
          percentage,
          trust,
          used,
          utilized: percentage,
          vouched,
          ens,
          isMember,
        };
      })
    );

    return data;
  };

export default function useTrustData(address) {
  const readProvider = useReadProvider();
  const { account: connectedAccount } = useWeb3React();
  const account = address || connectedAccount;

  const curToken = useCurrentToken();

  const marketRegistryContract = useMarketRegistryContract(readProvider);

  const shouldFetch =
    !!marketRegistryContract &&
    typeof account === "string" &&
    isAddress(curToken) &&
    !!readProvider;

  return useSWR(
    shouldFetch ? ["Trust", account, curToken] : null,
    getTrust(marketRegistryContract, readProvider)
  );
}