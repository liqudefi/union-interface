import { ModalOverlay, Modal } from "union-ui";
import { useModal } from "hooks/useModal";

export const STAKE_MODAL = "stake-modal";

export const useStakeModal = () => useModal(STAKE_MODAL);
	
export function StakeModal() {
	const { close } = useStakeModal();
	return (
		<ModalOverlay>
			<Modal title="Stake" onClose={close}>
				Content
			</Modal>
		</ModalOverlay>
	)
}