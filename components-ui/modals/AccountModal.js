import {
  ModalOverlay,
  Modal,
  Label,
  Heading,
  Box,
  Button,
  Text,
} from "union-ui";
import { useModal } from "hooks/useModal";
import { useWeb3React } from "@web3-react/core";
import usePublicData from "hooks/usePublicData";
import useActivity from "hooks/data/useActivity";

export const ACCOUNT_MODAL = "account-modal";

export const useAccountModal = () => useModal(ACCOUNT_MODAL);

export function AccountModal() {
  const data = useActivity();
  const { account } = useWeb3React();
  const { name } = usePublicData(account);
  const { close } = useAccountModal();

  console.log("Activity", data);
  return (
    <ModalOverlay>
      <Modal title="Account" onClose={close}>
        <Box align="center" justify="space-between">
          <Text m={0}>Wallet Connect</Text>
          <Button variant="pill">Disconnect</Button>
        </Box>
        <Heading m={0}>{name}</Heading>
        <Label size="small">{account}</Label>
      </Modal>
    </ModalOverlay>
  );
}
