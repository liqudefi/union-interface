import {
  ModalOverlay,
  Label,
  Heading,
  Box,
  Button,
  Text,
  Divider,
} from "union-ui";
import { AccountActivity, Modal } from "components-ui";
import { useModal } from "hooks/useModal";
import { useWeb3React } from "@web3-react/core";
import usePublicData from "hooks/usePublicData";
import { walletconnect } from "lib/connectors";
import useToast, { FLAVORS } from "hooks/useToast";
import { logout } from "lib/auth";
import truncateAddress from "util/truncateAddress";

export const ACCOUNT_MODAL = "account-modal";

export const useAccountModal = () => useModal(ACCOUNT_MODAL);

export function AccountModal({ activity }) {
  const { account, connector, deactivate } = useWeb3React();
  const { name } = usePublicData(account);
  const { close } = useAccountModal();

  const addToast = useToast();

  const handleSignOut = () => {
    if (connector === walletconnect) connector.close();

    deactivate();
    addToast(FLAVORS.LOGGED_OUT);
    logout();
    close();
  };

  return (
    <ModalOverlay>
      <Modal title="Account" onClose={close}>
        <Modal.Body>
          <Box align="center" justify="space-between">
            <Text mb="9px">Wallet Connect</Text>
            <Button variant="pill" onClick={handleSignOut} label="Disconnect" />
          </Box>
          <Heading mt="4px">{name}</Heading>
          <Label size="small" grey={600}>
            {truncateAddress(account)}
          </Label>
          <Divider />
          <Box align="center" justify="space-between" mt="20px" mb="16px">
            <Text m={0} size="large">
              Activity
            </Text>
          </Box>
          <AccountActivity {...activity} limit={5} />
        </Modal.Body>
      </Modal>
    </ModalOverlay>
  );
}
