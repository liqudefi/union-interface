import { useWeb3React } from "@web3-react/core";
import {
  CreditRequestModal,
  useCreditRequestModal,
} from "components-ui/modals";
import generateLink, {
  generateTwitterLink,
  generateTelegramLink,
} from "util/generateLink";
import { Card, Heading, Button, Label, ButtonRow, Text } from "@unioncredit/ui";
import { ReactComponent as Telegram } from "@unioncredit/ui/lib/icons/telegram.svg";
import { ReactComponent as Twitter } from "@unioncredit/ui/lib/icons/twitter.svg";
import { Copyable } from "./Copyable";
import useIsMobile from "hooks/useIsMobile";

export function ShareCard({ title, content, size }) {
  const { account, chainId } = useWeb3React();
  const { isOpen: isCreditRequestOpen, open: openCreditRequest } =
    useCreditRequestModal();

  const isMobile = useIsMobile();

  if (!account) return null;

  const url = generateLink(account, chainId);

  return (
    <>
      <Card variant="blue" mt="24px" size={size}>
        <Card.Body>
          {title && <Heading align="center">{title}</Heading>}
          {content && (
            <Text align="center" mb="24px">
              {content}
            </Text>
          )}
          <Label as="p" align="center" m={0} mb="4px" color="blue600">
            Share your vouch link
          </Label>
          <Label as="p" align="center" mb="24px" color="blue500">
            <Copyable value={url}>
              {url.slice(0, 12)}...{url.slice(-12)}
            </Copyable>
          </Label>
          <Button label="Get QR Code" fluid onClick={openCreditRequest} />
          <ButtonRow fluid mt="8px">
            <a target="_blank" href={generateTwitterLink(url)}>
              <Button
                variant="secondary"
                color="blue"
                icon={Twitter}
                label={isMobile ? null : "Twitter"}
                fluid
              />
            </a>
            <a target="_blank" href={generateTelegramLink(url)}>
              <Button
                variant="secondary"
                color="blue"
                icon={Telegram}
                label={isMobile ? null : "Telegram"}
                fluid
              />
            </a>
          </ButtonRow>
        </Card.Body>
      </Card>
      {isCreditRequestOpen && <CreditRequestModal />}
    </>
  );
}