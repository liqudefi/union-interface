import {
  TransactionHistory,
  Wrapper,
  ContactsSummaryRow,
  ContactsSummaryRowSkeleton,
} from "components-ui";
import {
  Text,
  Stats,
  Stat,
  Button,
  Bar,
  ButtonRow,
  Label,
  Tooltip,
  Grid,
  Row,
  Col,
  Box,
  Heading,
  Table,
  TableRow,
  TableCell,
} from "union-ui";
import {
  BorrowModal,
  useBorrowModal,
  PaymentModal,
  usePaymentModal,
  CreditRequestModal,
  useCreditRequestModal,
} from "components-ui/modals";
import Link from "next/link";
import format from "util/formatValue";
import { roundDown, roundUp, toPercent } from "util/numbers";
import useBorrowData from "hooks/data/useBorrowData";
import useCreditLimit from "hooks/data/useCreditLimit";
import useVouchData from "hooks/data/useVouchData";
import createArray from "util/createArray";

import { config } from "./config";

const getPctUsed = (borrowed, creditLimit) => {
  if (creditLimit === 0 && borrowed === 0) return 0;
  return borrowed / (creditLimit + borrowed);
};

export default function BorrowView() {
  const { isOpen: isBorrowModalOpen, open: openBorrowModal } = useBorrowModal();
  const { isOpen: isPaymentModalOpen, open: openPaymentModal } =
    usePaymentModal();
  const { isOpen: isCreditRequestOpen, open: openCreditRequest } =
    useCreditRequestModal();
  const { data: creditLimit = 0 } = useCreditLimit();
  const { data: borrowData } = useBorrowData();
  const { data: vouchData } = useVouchData();

  const {
    borrowedRounded = 0,
    interest = 0,
    paymentDueDate = "-",
    paymentPeriod = "-",
    fee = 0,
    isOverdue = false,
  } = !!borrowData && borrowData;

  const pctUsed = getPctUsed(borrowedRounded, roundDown(creditLimit));
  // TODO: what should this actually be?
  const unavailable = creditLimit - creditLimit;
  const isVouchLoading = !vouchData;

  return (
    <>
      <Wrapper title={config.title} tabItems={config.tabItems}>
        <Stats mb="40px">
          <Box>
            <Stat
              label="Credit Limit"
              value={`DAI ${format(roundDown(creditLimit))}`}
              cta={
                <Button
                  variant="pill"
                  icon="chevron"
                  iconPosition="end"
                  label="Request extra"
                  onClick={openCreditRequest}
                />
              }
            />
            <Stat
              label="Balance owed"
              value={`DAI ${borrowedRounded}`}
              caption={
                <Bar
                  label={`${toPercent(pctUsed)}`}
                  percentage={pctUsed * 100}
                />
              }
            />
            <Stat
              label="Available Credit"
              // TODO: what should this actually be?
              value={`DAI ${format(roundDown(creditLimit))}`}
              caption={
                <Label as="p" size="small">
                  {format(unavailable)} Unavailable{" "}
                  <Tooltip
                    position="top"
                    content={`
                  These are funds which are currently tied up elsewhere and as a 
                  result, not available to borrow at this time
                `}
                  />
                </Label>
              }
            />
            <Stat
              label={
                <Text mb={0}>
                  Minimum Payment{" "}
                  <Tooltip
                    position="top"
                    content="Represents the amount due now in order to repay your loan on time"
                  />
                </Text>
              }
              value={`DAI ${roundUp(interest)}`}
              caption={paymentDueDate}
            />
          </Box>
          <ButtonRow direction="vertical">
            <Button
              icon="borrow"
              label="Borrow funds"
              onClick={openBorrowModal}
            />
            <Button
              icon="repayment"
              variant="secondary"
              label="Make a payment"
              onClick={openPaymentModal}
            />
          </ButtonRow>
        </Stats>
        <Grid>
          <Row>
            <Col md={4}>
              <Heading level={2}>Credit providers</Heading>
              <Text mb="12px">Accounts providing you with credit</Text>
              <Table>
                {isVouchLoading
                  ? createArray(3).map((_, i) => (
                      <ContactsSummaryRowSkeleton key={i} />
                    ))
                  : vouchData.map((item, i) => (
                      <ContactsSummaryRow {...item} key={i} />
                    ))}
                <TableRow>
                  <TableCell align="right" span={1}>
                    <Link href="/contacts">
                      <Button
                        inline
                        label="All contacts"
                        variant="pill"
                        icon="chevron"
                        iconPosition="end"
                      />
                    </Link>
                  </TableCell>
                </TableRow>
              </Table>
            </Col>
            <Col md={8}>
              <Heading level={2}>Transaction History</Heading>
              <Text mb="12px">Your credit based transaction history</Text>
              <TransactionHistory />
            </Col>
          </Row>
        </Grid>
      </Wrapper>
      {isBorrowModalOpen && (
        <BorrowModal
          {...{
            fee,
            isOverdue,
            creditLimit,
            paymentDueDate,
            paymentPeriod,
            balanceOwed: borrowedRounded,
          }}
        />
      )}
      {isPaymentModalOpen && (
        <PaymentModal
          {...{
            paymentDueDate,
            balanceOwed: borrowedRounded,
            interest,
          }}
        />
      )}
      {isCreditRequestOpen && <CreditRequestModal />}
    </>
  );
}
