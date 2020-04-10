import Button from "@components/button";
import {
  useEmailModalToggle,
  useWalletModalToggle,
} from "@contexts/Application";
import { useWeb3React } from "@web3-react/core";
import Head from "next/head";
import { useRouter } from "next/router";
import { Fragment, useEffect } from "react";

export default function Home() {
  const { account, library } = useWeb3React();

  const router = useRouter();

  const toggleWalletModal = useWalletModalToggle();

  useEffect(() => {
    if (account && library) router.push("/stake");
  }, [account, library]);

  return (
    <Fragment>
      <Head>
        <title>Union</title>
      </Head>

      <div className="container">
        <div className="bg-white border max-w-md mx-auto rounded p-4 sm:p-6 md:p-8 text-center">
          <div
            className="bg-border-pure mx-auto"
            style={{ height: 130, width: 280 }}
          />

          <h1 className="mb-4 mt-6">Join Union</h1>
          <p className="text-lg leading-6 text-grey-pure mb-8">
            Borrow tokens with no collateral, vouch for other people and earn
            higher interest when staking.
          </p>

          <Button onClick={toggleWalletModal} full>
            Start now
          </Button>

          <p className="mt-4">
            Already have an account?{" "}
            <button
              className="underline font-medium"
              onClick={toggleWalletModal}
            >
              Sign in
            </button>
          </p>
        </div>
      </div>
    </Fragment>
  );
}
