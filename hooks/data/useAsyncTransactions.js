import { isAddress } from "@ethersproject/address";
import { Contract } from "@ethersproject/contracts";
import { formatUnits } from "@ethersproject/units";
import { useState, useEffect } from "react";
import { useWeb3React } from "@web3-react/core";
import U_TOKEN_ABI from "constants/abis/uToken.json";
import { EVENT_START_BLOCK } from "constants/variables";
import dayjs from "dayjs";
import useCurrentToken from "../useCurrentToken";
import useMarketRegistryContract from "../contracts/useMarketRegistryContract";
import useReadProvider from "hooks/useReadProvider";
import { getAsyncLogs } from "lib/asyncLogs";

const parseTransactionsLog = (provider, uTokenContract) => async (logs) => {
  const borrowFilter = uTokenContract.filters.LogBorrow();

  const txs = await Promise.all(
    logs.map(async (log) => {
      const block = await provider.getBlock(log.blockNumber);

      const logData = uTokenContract.interface.parseLog(log);

      const [account, amount, fee] = logData.args;

      const type =
        borrowFilter.topics[0] === log.topics[0] ? "BORROW" : "REPAY";

      const data = {
        account,
        amount: Number(formatUnits(amount, 18)),
        blockNumber: log.blockNumber,
        date: dayjs(block.timestamp * 1000).format("MMMM D, YYYY h:mm A"),
        dateShort: dayjs(block.timestamp * 1000).format("MM/DD/YY"),
        hash: log.transactionHash,
        type,
      };

      if (fee) data.fee = Number(formatUnits(fee, 18));

      return data;
    })
  );

  return txs;
};

const getTransactions =
  (marketRegistryContract) =>
  async (account, tokenAddress, provider, chainId) => {
    const res = await marketRegistryContract.tokens(tokenAddress);
    const uTokenAddress = res.uToken;
    const uTokenContract = new Contract(uTokenAddress, U_TOKEN_ABI, provider);

    const borrowFilter = uTokenContract.filters.LogBorrow(account);
    const repayFilter = uTokenContract.filters.LogRepay(account);

    return getAsyncLogs(
      provider,
      chainId,
      [repayFilter, borrowFilter],
      parseTransactionsLog(provider, uTokenContract)
    );
  };

/**
 * @name useTransactions
 *
 * @param {Number} count The number of txs to return in the array
 */
export default function useAsyncTransactions() {
  const { account, chainId } = useWeb3React();
  const readProvider = useReadProvider();
  const [transactions, setTransactions] = useState([]);
  const [fromBlock, setFromBlock] = useState("latest");

  const curToken = useCurrentToken();
  const marketRegistryContract = useMarketRegistryContract();

  const shouldFetch =
    !!marketRegistryContract &&
    typeof account === "string" &&
    isAddress(curToken) &&
    !!readProvider &&
    !!chainId;

  useEffect(() => {
    if (!shouldFetch) return;

    (async () => {
      const sortTxs = (txs) =>
        txs.sort((a, b) => b.blockNumber - a.blockNumber);

      const iterator = await getTransactions(marketRegistryContract)(
        account,
        curToken,
        readProvider,
        chainId
      );

      for await (const item of iterator) {
        if (item && item?.data.length > 0) {
          setTransactions((arr) => sortTxs([...arr, ...item.data]));
        }
        setFromBlock(item.fromBlock);
      }
    })();
  }, [shouldFetch]);

  return {
    data: transactions,
    toBlock: EVENT_START_BLOCK[chainId],
    fromBlock,
  };
}
