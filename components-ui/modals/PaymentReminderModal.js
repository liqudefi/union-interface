import { ModalOverlay, ButtonRow, Button, Box, Text, Label } from "union-ui";
import Calendar from "union-ui/lib/icons/calendar.svg";
import { Modal } from "components-ui";
import { useModal } from "hooks/useModal";
import useBorrowData from "hooks/data/useBorrowData";
import { roundUp } from "util/numbers";
import makeUrls from "add-event-to-calendar";
import { useMemo } from "react";

export const PAYMENT_REMINDER_MODAL = "payment-reminder-modal";

export const usePaymentReminderModal = () => useModal(PAYMENT_REMINDER_MODAL);

export function PaymentReminderModal() {
  const { close } = usePaymentReminderModal();

  const { data: borrowData } = useBorrowData();

  const { interest = 0, paymentDueDate = "-" } = !!borrowData && borrowData;

  const date = useMemo(() => {
    const date = new Date();
    date.setDate(date.getDate() + 14);
    return date;
  }, []);

  const calendarData = {
    location: "",
    name: "Union repayment reminder",
    details: "Reminder to repay your loan on https://union.finance",
    startsAt: date,
    endsAt: date,
  };

  const urls = makeUrls(calendarData);

  return (
    <ModalOverlay onClick={close}>
      <Modal onClose={close} title="Payment reminder">
        <Text align="center" mb="24px">
          Save your payment due date to your calendar to avoid entering a
          defaulted state on your loan.
        </Text>
        <Box justify="space-between" mt="24px">
          <Label as="p" size="small" grey={400}>
            First payment amount
          </Label>
          <Label as="p" size="small" grey={400}>
            {roundUp(interest)} DAI
          </Label>
        </Box>
        <Box justify="space-between" mt="4px">
          <Label as="p" size="small" grey={400}>
            First payment due
          </Label>
          <Label as="p" size="small" grey={400}>
            {paymentDueDate}
          </Label>
        </Box>
        <ButtonRow align="center" justify="center" mt="18px">
          <Button
            as="a"
            download="Union payment reminder"
            target="_blank"
            rel="norefferer"
            href={urls.ics}
            label="ICS file download"
            fluid
            icon={Calendar}
          />
          <Button
            as="a"
            target="_blank"
            rel="norefferer"
            href={urls.google}
            label="Google calendar"
            fluid
            icon={Calendar}
            variant="secondary"
          />
        </ButtonRow>
      </Modal>
    </ModalOverlay>
  );
}