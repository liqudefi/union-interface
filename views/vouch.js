import ApplicationCard from "@components/applicationCard";
import Button from "@components/button";
import CreditRequestModal from "@components/creditRequestModal";
import LabelPair from "@components/labelPair";
import VouchBar from "@components/vouchBar";
import VouchTable from "@components/vouchTable";
import { useCreditRequestModalToggle } from "@contexts/Vouch";
import useCurrentToken from "@hooks/useCurrentToken";
import { getCreditLimit } from "@lib/contracts/getCreditLimit";
import { getVouched } from "@lib/contracts/getVouched";
import getVouchBarData from "@util/getVouchBarData";
import { useWeb3React } from "@web3-react/core";
import { useAutoEffect, useAutoMemo } from "hooks.macro";
import { Fragment, useState } from "react";

export default function VouchView() {
  const { account, library, chainId } = useWeb3React();

  const curToken = useCurrentToken();

  const toggleCreditRequestModal = useCreditRequestModalToggle();

  const [creditLimit, setCreditLimit] = useState(0);
  const [vouchData, setVouchData] = useState([]);

  useAutoEffect(() => {
    let isMounted = true;

    const getVouchData = async () => {
      try {
        if (isMounted) {
          const res = await getVouched(account, curToken, library, chainId);

          setVouchData(res);
        }
      } catch (err) {
        if (isMounted) {
          console.error(err);
        }
      }
    };

    const getCreditData = async () => {
      try {
        if (isMounted) {
          const res = await getCreditLimit(curToken, account, library, chainId);

          setCreditLimit(res.toFixed(4));
        }
      } catch (err) {
        if (isMounted) {
          console.error(err);
        }
      }
    };

    getVouchData();
    getCreditData();

    return () => {
      isMounted = false;
    };
  });

  const vouchTableData = useAutoMemo(vouchData);

  return (
    <Fragment>
      <div className="container">
        <ApplicationCard />

        <div className="flex justify-between mb-6">
          <LabelPair
            label="Total credit vouched for you"
            value={creditLimit}
            valueType="DAI"
            large
          />

          <div className="hidden md:block">
            <Button invert onClick={toggleCreditRequestModal}>
              Open request for credit
            </Button>
          </div>
        </div>

        <VouchBar className="mb-10" slices={getVouchBarData(vouchData)} />

        <div className="mb-6">
          <h1>Addresses who vouched for you</h1>

          <Button
            full
            invert
            onClick={toggleCreditRequestModal}
            className="mt-6 inline-block md:hidden"
          >
            Open request for credit
          </Button>
        </div>

        <VouchTable data={vouchTableData} />
      </div>

      <CreditRequestModal />
    </Fragment>
  );
}