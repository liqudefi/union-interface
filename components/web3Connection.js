import { UnsupportedChainIdError, useWeb3React } from "@web3-react/core";
import useENSName from "hooks/useENSName";
import truncateAddress from "util/truncateAddress";
import Activity from "./activity";
import Identicon from "./identicon";
import { useToggleSignInModal } from "./walletModal";
import Web3Button from "./web3Button";

const Web3Connection = () => {
  const { account, error } = useWeb3React();

  const ENSName = useENSName(account);

  const toggleSignInModal = useToggleSignInModal();

  return (
    <ul className="flex items-center">
      <li>
        <Activity />
      </li>
      <li className="ml-6 md:ml-8">
        <Web3Button onClick={toggleSignInModal} error={Boolean(error)}>
          {Boolean(error) ? (
            error instanceof UnsupportedChainIdError ? (
              "Wrong Network"
            ) : (
              "Error"
            )
          ) : (
            <div className="ml-1 flex items-center">
              <Identicon address={account} />
              <div className="ml-3">{ENSName ?? truncateAddress(account)}</div>
            </div>
          )}
        </Web3Button>
      </li>
    </ul>
  );
};

export default Web3Connection;
