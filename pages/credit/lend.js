import { useWeb3React } from "@web3-react/core";
import LoggedOutView from "views/loggedOut";
import LendView from "views/credit/lend";
import { PageHead } from "components-ui";

export default function LendPage() {
  const { account, library } = useWeb3React();

  return (
    <>
      <PageHead title="Lend | Union" />
      {account && library ? <LendView /> : <LoggedOutView />}
    </>
  );
}