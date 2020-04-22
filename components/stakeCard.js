import { useDepositModalToggle, useWithdrawModalToggle } from "@contexts/Stake";
import useCurrentToken from "@hooks/useCurrentToken";
import { getErc20Balance } from "@lib/contracts/getErc20Balance";
import { getRewards } from "@lib/contracts/getRewards";
import { getRewardsMultiplier } from "@lib/contracts/getRewardsMultiplier";
import { getRewardsPerYear } from "@lib/contracts/getRewardsPerYear";
import { getStakeAmount } from "@lib/contracts/getStakeAmount";
import { stake } from "@lib/contracts/stake";
import { unstake } from "@lib/contracts/unstake";
import { withdrawRewards } from "@lib/contracts/withdrawRewards";
import { useWeb3React } from "@web3-react/core";
import { useAutoCallback, useAutoEffect } from "hooks.macro";
import { useState } from "react";
import { placeholderTip } from "../text/tooltips";
import Button from "./button";
import DepositModal from "./depositModal";
import LabelPair from "./labelPair";
import WithdrawModal from "./withdrawModal";

const StakeCard = () => {
  const { account, library, chainId } = useWeb3React();

  const toggleDepositModal = useDepositModalToggle();
  const toggleWithdrawModal = useWithdrawModalToggle();

  const curToken = useCurrentToken();

  const curUnionToken = useCurrentToken("UNION");

  const [totalStake, setTotalStake] = useState(0);
  const [utilizedStake, setUtilizedStake] = useState(0);
  const [defaultedStake, setDefaultedStake] = useState(0);
  const [unionBalance, setUnionBalance] = useState(0);
  const [withdrawableStake, setWithdrawableStake] = useState(0);
  const [rewards, setRewards] = useState(0);
  const [upy, setUpy] = useState(0);
  const [rewardsMultiplier, setRewardsMultiplier] = useState(0);

  useAutoEffect(() => {
    const getUnionBalance = async () => {
      try {
        const res = await getErc20Balance(
          curUnionToken,
          library.getSigner(),
          chainId
        );

        setUnionBalance(res.toFixed(3));
      } catch (err) {
        console.error(err);
      }
    };

    const getStakeData = async () => {
      try {
        const res = await getStakeAmount(account, curToken, library, chainId);

        setTotalStake(res.stakingAmount);
        setUtilizedStake(res.creditUsed);
        setDefaultedStake(res.freezeAmount);
        setWithdrawableStake(res.stakingAmount - res.vouchingAmount);
      } catch (err) {
        console.error(err);
      }
    };

    const getRewardData = async () => {
      try {
        const res = await getRewards(curToken, library.getSigner(), chainId);

        setRewards(res.toFixed(3));
      } catch (err) {
        console.error(err);
      }
    };

    const getUpyData = async () => {
      try {
        const res = await getRewardsPerYear(
          curToken,
          library.getSigner(),
          chainId
        );

        setUpy(res.toFixed(2));
      } catch (err) {
        console.error(err);
      }
    };

    const getRewardsMultiplierData = async () => {
      try {
        const res = await getRewardsMultiplier(
          curToken,
          library.getSigner(),
          chainId
        );

        setRewardsMultiplier(res.toFixed(2));
      } catch (err) {
        console.error(err);
      }
    };

    if (library && account) {
      getStakeData();
      getRewardData();
      getUpyData();
      getUnionBalance();
      getRewardsMultiplierData();
    }
  });

  const onDeposit = useAutoCallback(async (amount) => {
    try {
      await stake(curToken, amount, library.getSigner(), chainId);
    } catch (err) {
      console.error(err);
    }
  });

  const onWithdraw = useAutoCallback(async (amount) => {
    try {
      await unstake(curToken, amount, library.getSigner(), chainId);
    } catch (err) {
      console.error(err);
    }
  });

  const onWithdrawRewards = useAutoCallback(async () => {
    try {
      await withdrawRewards(curToken, library.getSigner(), chainId);
    } catch (err) {
      console.error(err);
    }
  });

  return (
    <div className="bg-pink-light border border-pink-pure rounded p-6">
      <LabelPair
        className="mb-4"
        label="Your total stake"
        large
        value={totalStake}
        valueType="DAI"
      />

      <LabelPair
        className="text-grey-pure"
        label="Utilized Stake"
        tooltip={placeholderTip}
        value={utilizedStake}
        valueType="DAI"
      />
      <LabelPair
        className="text-grey-pure"
        label="Defaulted Stake"
        tooltip={placeholderTip}
        value={defaultedStake}
        valueType="DAI"
      />
      <LabelPair
        className="text-grey-pure"
        label="Withdrawable Stake"
        tooltip={placeholderTip}
        value={withdrawableStake}
        valueType="DAI"
      />

      <LabelPair
        className="mb-4 mt-16"
        label="Rewards multiplier"
        large
        value={`${rewardsMultiplier}x`}
      />

      <LabelPair
        className="text-grey-pure"
        label="Rewards"
        tooltip={placeholderTip}
        value={rewards}
        valueType="UNION"
      />

      <LabelPair
        className="text-grey-pure"
        label="Earned Per Year"
        tooltip={placeholderTip}
        value={upy}
        valueType="UNION"
      />

      <LabelPair
        className="text-grey-pure"
        label="Wallet Balance"
        tooltip={placeholderTip}
        value={unionBalance}
        valueType="UNION"
      />

      <div className="flex -mx-2 mt-12">
        <div className="flex-1 px-2">
          <Button secondary full onClick={toggleDepositModal}>
            Deposit
          </Button>
        </div>
        <div className="flex-1 px-2">
          <Button invert full onClick={toggleWithdrawModal}>
            Withdraw
          </Button>
        </div>
      </div>
      <div className="mt-4">
        <Button invert full onClick={onWithdrawRewards}>
          Withdraw Rewards
        </Button>
      </div>

      <DepositModal totalStake={totalStake} onDeposit={onDeposit} />
      <WithdrawModal totalStake={totalStake} onWithdraw={onWithdraw} />
    </div>
  );
};

export default StakeCard;
